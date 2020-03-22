import { JWTPayload } from "./JWTPayload";

export interface Post {
  id:number;
  title:string;
  place:string;
  notes:string;
  start_date:Date;
  end_date:Date;
  created_at:Date;

  owner:JWTPayload;
}