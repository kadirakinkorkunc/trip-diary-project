export interface JWTPayload {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  exp: number;
}