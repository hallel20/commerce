import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/declare";

const clientMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(403).json({ message: "Not authenticated!" });
    return;
  }
  // Proceed to the next middleware or route handler
  next();
};

export default clientMiddleware;
