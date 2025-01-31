declare namespace Express {
  interface Request {
    user?: {
      id: number;
      oid?: string;
      username?: string;
    };
    now: () => Date;
    getQuery: (key: string, defaulValue?: any) => any;
    validation: (
      schema: (yup: typeof import("yup")) => import("yup").AnyObjectSchema,
      opt?: import("yup").ValidateOptions
    ) => Promise<any>;
  }
}
