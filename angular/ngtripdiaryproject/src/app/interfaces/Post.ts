import { Member } from "./Member";

export interface Post {
  id:number;
  title:string;
  place:string;
  notes:string;
  start_date:Date;
  end_date:Date;
  created_at:Date;

  owner:Member
}