export type User = {
  id: string;
  email: string;
};

export type Url = {
  id: string;
  userId: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  updatedAt: Date;
  deletedAt?: string | number | Date;
};
