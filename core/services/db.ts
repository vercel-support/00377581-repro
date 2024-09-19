import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Init of database connection
export async function initDb() {
  try {
    const MONGODB_URI = process.env.DB_CONNECTION ?? ''

    if (cached.conn) {
      return cached.conn
    }

    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI, {
          serverSelectionTimeoutMS: 5000
          // bufferCommands: true, // default: true
          // minPoolSize: 1,
          // maxPoolSize: 1
        })
        .then((mongoose) => {
          return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
  } catch (err) {
    console.log(err)
  }
}
