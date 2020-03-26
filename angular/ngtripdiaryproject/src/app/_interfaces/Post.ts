import { JWTPayload } from "./JWTPayload";
import { Tag } from "./Tag";

export interface Post {
  id: number;
  title: string;
  place: string;
  notes: string;
  start_date: Date;
  tags: Tag;
  end_date: Date;
  created_at: Date;

  owner: JWTPayload;
}