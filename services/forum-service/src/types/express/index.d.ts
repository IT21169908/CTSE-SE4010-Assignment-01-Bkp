import { Role } from "../../constants/roles";

declare global {
  namespace Express {
    interface User {
      _id: string;
      name: string;
      email: string;
      role: Role;
    }

    interface Request {
      user?: User;
    }
  }
}
