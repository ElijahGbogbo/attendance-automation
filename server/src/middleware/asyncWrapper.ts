import type { AsyncHandler } from "../types/attendanceProcessingTypes.ts"
import type { Request, Response, NextFunction, RequestHandler } from "express";

export function asyncWrapper(asyncFn: AsyncHandler): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await asyncFn(req, res, next)
        } catch (error) {
            next(error);
        }
    }
}
