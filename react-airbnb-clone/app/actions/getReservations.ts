import prisma from '@/app/libs/prismadb';
import { Listing, Reservation } from '@prisma/client';
import { SafeReservation } from '../types';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
): Promise<SafeReservation[]> {
  try {
    const { authorId, listingId, userId } = params;

    const query = {
      listingId,
      userId,
      listing: authorId && { userId: authorId },
    };

    const reservations: (Reservation & { listing: Listing })[] =
      await prisma.reservation.findMany({
        where: query,
        include: {
          listing: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    const safeReservations = reservations.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      listing: {
        ...r.listing,
        createdAt: r.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
