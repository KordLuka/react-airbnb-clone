import prisma from '@/app/libs/prismadb';
import { Listing } from '@prisma/client';

export default async function getListings(): Promise<Listing[]> {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return listings;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
