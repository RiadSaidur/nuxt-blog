export interface POST {
  Body: string;
  Place: string;
  Title: string;
  VisitDate: string;
  // optionals
  postID?: string;
  createdAt?: string;
  updatedAt?: string;
}