import { Listing, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type NewListing = Omit<
  Listing,
  'id' | 'createdAt' | 'locationValue' | 'userId'
> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any;
};
