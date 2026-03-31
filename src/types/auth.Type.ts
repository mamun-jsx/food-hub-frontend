export interface AuthSession {
  session: {
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    id: string;
  };
  user: {
    id: string;
    role: "ADMIN" | "PROVIDER" | "CUSTOMER";
    name?: string;
    email?: string;
    image?: string;
  };
}