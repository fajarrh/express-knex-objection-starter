import express from "express";
import RequestMiddleware from "@middleware/RequestMiddleware";

import AuthMiddleware from "@middleware/AuthMiddleware";
import AuthController from "@controller/AuthController";

const router = express.Router();

router.use(RequestMiddleware);
router.use("/login", AuthMiddleware, AuthController);

export default router;
