import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Generates authentication token.
 * @param userId - The id of the user.
 * @returns An authentication token.
 */
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

/**
 * Verifies an authentication token.
 * @param token - The authentication token.
 * @returns The decoded user id.
 * @throws Will throw an error if the token is invalid or expired.
 */
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { userId: number };
  } catch (error) {
    throw error;
  }
};
