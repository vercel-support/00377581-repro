import express, { RouterOptions, Router, Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { dbConnection } from './middlewares';

export const _app = express();
const createRouter: (options?: RouterOptions) => Router = express.Router;
export const router = createRouter();

// Express middlewares
_app.use(express.json({ limit: '5mb' }));
_app.use(express.urlencoded({ extended: true }));
_app.use(express.static('public'));

// Cors middlewares
_app.use(cors());

// Helmet middlewares
_app.use(helmet.dnsPrefetchControl());
_app.use(helmet.hidePoweredBy());
_app.use(helmet.hsts());
_app.use(helmet.ieNoOpen());
_app.use(helmet.noSniff());
_app.use(helmet.permittedCrossDomainPolicies());
_app.use(helmet.referrerPolicy());
_app.use(helmet.xssFilter());

// Custom middlewares
_app.use(dbConnection);

export default process.env.NODE_ENV === 'production'
  ? _app
  : (router as Express);
