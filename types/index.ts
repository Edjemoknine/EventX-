export type CreateUserType = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserType = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};