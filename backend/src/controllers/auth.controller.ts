import { createUser } from "@/services/user/createNewUser";
import { fetchUserByEmail } from "@/services/user/fetchUserByEmail";
import { isEmailTaken } from "@/services/user/isEmailTaken";
import { LoginParams, SignupParams } from "@/types/requests";
import { createResponse } from "@/utils/createResponse";
import { hashPassword, verifyPassword } from "@/utils/passwordUtils";
import { generateToken } from "@/utils/tokenUtils";
import { Request, Response } from "express";

export const signupController = async (
  req: Request<{}, {}, SignupParams>,
  res: Response
) => {
  const { email, password, name } = req.body;

  if (!email || !name || !password) {
    res
      .status(400)
      .json(createResponse(false, "Email, Name and Password are required"));
    return;
  }

  try {
    // Check if email already exists
    if (await isEmailTaken(email)) {
      res
        .status(400)
        .json(createResponse(false, "Email address already exists!"));
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const createdUser = await createUser({
      name,
      email,
      hashed_password: hashedPassword,
    });

    // Generate the token
    const token = generateToken(createdUser.id);

    res.status(201).json(
      createResponse(true, "User registered successfully", {
        token,
      })
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(createResponse(false, "An unexpected error occurred."));
  }
};

export const loginController = async (
  req: Request<{}, {}, LoginParams>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json(createResponse(false, "Email and Password are required"));
    return;
  }

  try {
    const foundUser = await fetchUserByEmail(email);

    const isMatch = await verifyPassword(password, foundUser.hashed_password);

    if (!isMatch) {
      res.status(400).json(createResponse(false, "Invalid email or password"));
      return;
    }

    const token = generateToken(foundUser.id);

    res.status(200).json(
      createResponse(true, "Login successful", {
        token,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json(createResponse(false, "Login failed!"));
  }
};
