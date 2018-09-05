import { Request, Response, NextFunction } from "express";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler';
import { Routes, Route } from "./routes";

export const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for json body parsing
app.use(bodyParser.json({ limit: '5mb' }));

// enable corse for all origins
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
});

// To register routes dynamically
const registerPaths = (routes: Route[], parent: string, ) => {
  routes.forEach(route => {
    for (let action in route.actions) {
      app[action](parent + route.path, (req: Request, res: Response, next: NextFunction) => {
        route.actions[action](req, res, next);
      });
    }
    if (route.routes) {
      registerPaths(route.routes, parent + route.path);
    }
  });
}

// init routes registation
registerPaths(Routes, '');

app.use(errorhandler({
  debug: process.env.ENV !== 'prod',
  log: true,
}));
