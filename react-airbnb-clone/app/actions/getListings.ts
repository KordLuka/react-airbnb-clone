import prisma from '@/app/libs/prismadb';
import { Listing } from '@prisma/client';
import { SafeListing } from '../types';

export interface IListingParams {
  userId?: string;
}

export default async function getListings(
  params: IListingParams
): Promise<SafeListing[]> {
  try {
    const { userId } = params;
    const query = {
      userId,
    };
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return listings.map((listing: Listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
