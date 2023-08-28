import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '../types';
import useLoginModal from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        setIsLoading(true);
        const req = hasFavorited
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);

        await req();

        router.refresh();
        toast.success('Success');
        setIsLoading(false);
      } catch (error) {
        toast.error('Something went wrong.');
        console.log(error);
        setIsLoading(false);
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
    isLoading,
  };
};

export default useFavorite;
