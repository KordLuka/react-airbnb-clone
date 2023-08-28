import prisma from '@/app/libs/prismadb';
import { Listing } from '@prisma/client';

interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
): Promise<Listing> {
  try {
    const { listingId } = params;

    if (!listingId)
      throw new Error('There is not listing that meets the conditions');

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    return listing;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
