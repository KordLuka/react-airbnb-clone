import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { SafeUser } from '@/app/types';

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  checkCurrentUser(currentUser);

  const { listingId } = params;

  checkListingId(listingId);

  const favoriteIds = [...(currentUser?.favoriteIds || [])];

  favoriteIds.push(listingId as string);

  const user = await updateUserFavoritesIds(favoriteIds, currentUser);

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  checkCurrentUser(currentUser);

  const { listingId } = params;

  checkListingId(listingId);

  const favoriteIds = [...(currentUser?.favoriteIds || [])].filter(
    (favouriteId) => favouriteId !== listingId
  );

  const user = await updateUserFavoritesIds(favoriteIds, currentUser);

  return NextResponse.json(user);
}

function checkListingId(listingId: unknown): void {
  if (!listingId || typeof listingId !== 'string')
    throw new Error('Invalid ID');
}

function checkCurrentUser(currentUser?: SafeUser | null): Response | undefined {
  if (!currentUser) {
    return NextResponse.error();
  }
}

async function updateUserFavoritesIds(
  favoriteIds: string[],
  currentUser?: SafeUser | null
) {
  const user = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favoriteIds,
    },
  });

  return user;
}
