import { Role } from "../constants/roles";
import { Request } from "express";

export const hasRole = (req: Request, allowedRoles: Role[]): boolean => {
  const user = req.user;
  if (!user) return false;
  return allowedRoles.includes(user.role);
};
