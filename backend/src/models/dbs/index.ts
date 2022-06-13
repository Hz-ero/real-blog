import { Post, Admin } from "../../shared/models/index";
import { ObjectId } from "mongodb";
import { Overwrite } from "tsrpc-proto";

export type DbPost = Overwrite<Post, { _id: ObjectId }>;
export type DbAdmin = Overwrite<Admin, { _id: ObjectId }>