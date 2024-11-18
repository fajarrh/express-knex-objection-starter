import { CorsOptions } from "cors";

const options: CorsOptions = {
  credentials: Boolean(process.env.CORS_CRENDENTIALS),
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_ALLOW_METHODS,
  allowedHeaders: process.env.CORS_ALLOW_HEADERS,
};

export default options;
