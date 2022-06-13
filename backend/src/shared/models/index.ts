export interface User {
  uid: string;
  username: string;
  email: string;
  createdAt: string;
  avatar?: string;
}

export interface Admin {
  _id: string;
  username: string;
  password: string;
  createdAt: string;
  avatar?: string;
}

export type Reply = Omit<Comment, "replies"> & { toUser?: string };

export interface Comment {
  uid: string;
  content: string;
  createdAt: Date;
  user: User;
  replies: Reply[];
  likes?: User[];
}

export type ID = { _id: string };
export type Tag = { tag: string };
export type Category = { category: string };
export type QueryType = Category | Tag | ID | {};
export type Tags = Array<Tag>;
export type Categories = Array<Category>;
export type Posts = Array<Post>;

export interface Post {
  _id: string;
  title: string;
  content: string;
  published: boolean;
  tags: Array<string>;
  category: string;
  view?: number;

  createdAt: Date;
  updatedAt?: Date;

  comments?: Array<Comment>;
}

// deduce typescript type
export class TypeDeduce {
  static isID(it: QueryType): it is ID {
    return (it as ID)._id !== undefined;
  }

  static isTag(it: QueryType): it is Tag {
    return (it as Tag).tag !== undefined;
  }

  static isCategory(it: QueryType): it is Category {
    return (it as Category).category !== undefined;
  }

  static isEmpty(it: QueryType): it is {} {
    return Object.keys(it).length === 0;
  }
}
