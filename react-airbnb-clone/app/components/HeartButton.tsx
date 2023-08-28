'use client'

import { AiFillHeart, AiOutlineHeart, } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
    const { hasFavorited, toggleFavorite, isLoading } = useFavorite({ listingId, currentUser });

    return (
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-60
                transition
                cursor-pointer
            "
        >
            <AiOutlineHeart
                size={28}
                className={`
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                    ${!isLoading ? 'opacity-90' : 'opacity-0'}
                `}
            />
            {!isLoading ? <AiFillHeart
                size={24}
                className={
                    hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
                }
            /> : <CgSpinner size={24} className="fill-rose-500 animate-spin" />}
        </div>
    )
}

export default HeartButton