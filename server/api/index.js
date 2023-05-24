import express from "express";

export const router = express.Router();

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
