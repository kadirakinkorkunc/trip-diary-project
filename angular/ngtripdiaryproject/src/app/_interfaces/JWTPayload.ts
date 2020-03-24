export interface JWTPayload {
  user_id: number;
  first_name:string;
  last_name:string;
  username: string;
  email: string;
  exp: number;
}