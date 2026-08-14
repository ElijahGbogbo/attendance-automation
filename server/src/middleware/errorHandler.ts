import type { ErrorRequestHandler } from "express";
import { CustomAPIError } from "../errors/customErrorHandler.ts";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            success: false, 
            message: err.message
        })
    }
    return res.status(500).json({
        success: false, 
        message: "Internal server error."
    })
}
