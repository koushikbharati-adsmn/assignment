import { Response, NextFunction } from "express";
import { createResponse } from "../utils/createResponse";
import { verifyToken } from "../utils/tokenUtils";
import { AuthenticatedRequest } from "../types/requests";

export const verifyAuthToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = { id: decodedToken.userId };
    next();
  } catch (error) {
    if ((error as Error).name === "TokenExpiredError") {
      res.status(401).json(createResponse(false, "Token expired"));
      return;
    }
    res.status(401).json(createResponse(false, "Invalid token"));
  }
};
