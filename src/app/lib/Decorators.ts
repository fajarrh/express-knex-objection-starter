import "reflect-metadata";
const METHOD_METADATA = Symbol("methodMetadata");
const MIDDLEWARE_METADATA = Symbol("middlewareMetadata");
const CONTROLLER_METADATA = Symbol("controllerMetadata");

import { Request, Response, NextFunction, Router, Application } from "express";
import * as constrollers from "../../router";

export function Controller(prefix: string) {
  return function (target: any) {
    Reflect.defineMetadata(CONTROLLER_METADATA, prefix, target);
  };
}

export function Post(path: string) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    defineMethod(target, methodName, "POST", path);
  };
}

export function Get(path: string) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    defineMethod(target, methodName, "GET", path);
  };
}

export function Delete(path: string) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    defineMethod(target, methodName, "DELETE", path);
  };
}

export function Patch(path: string) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    defineMethod(target, methodName, "PATCH", path);
  };
}

export function Put(path: string) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    defineMethod(target, methodName, "PUT", path);
  };
}

function defineMethod(
  target: any,
  methodName: string,
  httpMethod: string,
  path: string
) {
  const methods =
    Reflect.getMetadata(METHOD_METADATA, target.constructor) || [];
  methods.push({ methodName, httpMethod, path });
  Reflect.defineMetadata(METHOD_METADATA, methods, target.constructor);
}

export function Middleware(
  middleware: Array<(req: Request, res: Response, next: NextFunction) => void>
) {
  return function (
    target: any,
    methodName?: string,
    descriptor?: PropertyDescriptor
  ) {
    if (methodName) {
      const middlewares =
        Reflect.getMetadata(MIDDLEWARE_METADATA, target.constructor) || {};
      middlewares[methodName] = middlewares[methodName] || [];
      middlewares[methodName].push(...middleware);
      Reflect.defineMetadata(
        MIDDLEWARE_METADATA,
        middlewares,
        target.constructor
      );
    } else {
      const middlewares =
        Reflect.getMetadata(MIDDLEWARE_METADATA, target) || [];
      middlewares.push(...middleware);
      Reflect.defineMetadata(MIDDLEWARE_METADATA, middlewares, target);
    }
  };
}

export function createRouter(controller: any) {
  const controllerPrefix = Reflect.getMetadata(
    CONTROLLER_METADATA,
    controller.constructor
  );
  const methods = Reflect.getMetadata(METHOD_METADATA, controller.constructor);
  const controllerMiddlewares =
    Reflect.getMetadata(MIDDLEWARE_METADATA, controller.constructor) || [];

  const router = Router();

  // Bind controller instance to methods
  const controllerInstance =
    controller instanceof Function ? new controller() : controller;

  for (let i = 0; i < methods.length; i++) {
    const { methodName, httpMethod, path: routePath } = methods[i];
    const method = controllerInstance[methodName];
    const fullPath = controllerPrefix + routePath;

    if (typeof method === "function") {
      const methodMiddlewares =
        Reflect.getMetadata(
          MIDDLEWARE_METADATA,
          controller.constructor.prototype
        ) || {};

      const combinedMiddlewares = [
        ...controllerMiddlewares,
        ...(methodMiddlewares[methodName] || []),
      ];

      router[httpMethod.toLowerCase()](
        fullPath,
        ...combinedMiddlewares,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            await method.call(controllerInstance, req, res, next);
          } catch (err) {
            next(err);
          }
        }
      );
    }
  }

  return router;
}

export async function registerRoutes(app: Application) {
  const indexPath = constrollers; // Path ke file index.ts
  try {
    const controllerClassNames = Object.keys(indexPath);

    for (const className of controllerClassNames) {
      const controllerClass = indexPath[className];

      if (controllerClass) {
        const controllerInstance = new controllerClass();
        app.use(createRouter(controllerInstance));
        console.log(`@controller: ${className}`);
      } else {
        console.error(`Controller class not found: ${className}`);
      }
    }
  } catch (error) {
    console.error(`Error loading controllers from ${indexPath}:`, error);
  }
}
