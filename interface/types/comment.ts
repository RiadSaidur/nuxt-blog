export interface COMMENT {
  author?: string;
  body: string;
  childs: number;
  createdAt: string;
}

export interface COMMENT_LIST {
  comments: COMMENT[]
}