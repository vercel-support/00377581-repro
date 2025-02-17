import 'dotenv/config'
import { readdir } from 'node:fs/promises'
import { type Server } from 'node:http'
import { consola } from 'consola'
import pc from 'picocolors'
import { _app } from '../core'
import { resolve } from 'node:path'

const BASE_URL = 'http://localhost'
const PORT = process.env.PORT ?? '3000'

const isIndex = (r: string) => r === 'index'

const getRoutes = async (dir: string, routes: Set<string>, baseDir = dir) => {
  const dirents = await readdir(dir, { withFileTypes: true })

  const promises = dirents.map(async (dirent) => {
    if (dirent.name.endsWith('.ts')) {
      const route = dirent.name.split('.ts')[0]
      const subDir = dir.replace(baseDir, '')

      if (subDir) {
        routes.add(isIndex(route) ? subDir : `${subDir}/${route}`)
      } else {
        routes.add(isIndex(route) ? '/' : `/${route}`)
      }
    }

    if (dirent.isDirectory()) {
      const childDir = `${dir}/${dirent.name}`
      await getRoutes(childDir, routes, baseDir)
    }
  })

  await Promise.all(promises)
}

// https://vercel.com/docs/concepts/functions/serverless-functions#adding-utility-files-to-the-/api-directory
const isIgnoredPath = (path: string) =>
  path.startsWith('_') || path.startsWith('.') || path.endsWith('.d.ts') || path === '404'

const createExpressRoutes = async (routes: Set<string>, baseDir: string) => {
  const promises = Array.from(routes).map(async (route) => {
    if (route.split('/').some((path) => isIgnoredPath(path))) return

    try {
      const { default: module } = await import(baseDir + route)
      if (module?.stack) {
        _app.use(module)
      } else {
        consola.warn(pc.yellow(`${pc.bold(route)} has no default exported router`))
      }
    } catch (err: any) {
      consola.error(pc.red(`Failed to import route ${route}: ${err.message}`))
    }
  })

  await Promise.all(promises)
}

const gracefulShutdown = (server: Server, signal: NodeJS.Signals) => {
  consola.start('Shutting down server...')

  server.close((err) => {
    if (err) consola.error(err)
    consola.success('Server shut down!')
    process.kill(process.pid, signal)
    process.exit(err ? 1 : 0)
  })
}

const main = async (): Promise<void> => {
  consola.start('Collecting routes...')
  const routes = new Set<string>()
  const baseDir = resolve(__dirname, '../api')
  await getRoutes(baseDir, routes)
  consola.info(`Found ${routes.size} routes`)
  consola.start('Creating routes...')
  await createExpressRoutes(routes, baseDir)
  consola.success('Routes created!')

  const server = _app.listen(PORT, () => {
    console.log(
      pc.cyan(
        '\n  ___  _    _             \r\n / _ \\| | _| |_ _   _ ___ \r\n| | | | |/ / __| | | / __|\r\n| |_| |   <| |_| |_| \\__ \\\r\n \\___/|_|\\_\\\\__|\\__,_|___/'
      )
    )

    console.log(`\n${pc.cyan('Server running on')} ${pc.bold(`${BASE_URL}`)}`)
  })

  process.once('SIGUSR2', () => gracefulShutdown(server, 'SIGUSR2'))
  process.on('SIGINT', (signal) => gracefulShutdown(server, signal))
  process.on('SIGTERM', (signal) => gracefulShutdown(server, signal))
}

main().catch((err) => {
  consola.error(err)
  process.exit(1)
})
