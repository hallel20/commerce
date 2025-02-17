import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/declare";

const adminMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(403).json({ message: "Not authenticated!" });
    return;
  }
  if (req.user.role !== "admin")
    res.status(403).json({
      message: "You are not allowed to access this route",
    });

  // Proceed to the next middleware or route handler
  next();
};

export default adminMiddleware;
