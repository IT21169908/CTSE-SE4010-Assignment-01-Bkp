import { Request, Response, NextFunction } from "express";
import { sendRPCMessage } from "../utils/message-broker";
import { Role } from "../constants/roles";

// export const authenticateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) return res.status(401).json({ message: "No token" });

//     const user = await sendRPCMessage("auth-service", { token });

//     if (!user) return res.status(403).json({ message: "Unauthorized" });

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: "Auth Service Error", error: err });
//   }
// };

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Simulate a logged-in user for testing
  req.user = {
    _id: "60c72b2f9e1d4f3a4c8d1234",
    name: "Test User",
    email: "test@user.com",
    role: Role.ADMIN,
  };
  next();
};
