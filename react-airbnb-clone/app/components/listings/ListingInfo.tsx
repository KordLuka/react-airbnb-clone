'use client'

import { SafeUser } from "@/app/types";
import { Category } from "../navbar/Categories";
import Avatar from "../Avatar";
import dynamic from "next/dynamic";
import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";

interface ListingInfoProps {
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
    category?: Category;
    currentUser?: SafeUser | null
}

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

const ListingInfo: React.FC<ListingInfoProps> = ({
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    category,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        text-xl 
                        font-semibold 
                        flex 
                        flex-row 
                        items-center
                        gap-2
                    "
                >
                    <div>Hosted by {currentUser?.name}</div>
                    <Avatar src={currentUser?.image} />
                </div>
                <div className="
                       flex 
                       flex-row 
                       items-center 
                       gap-4 
                       font-light
                       text-neutral-500
                     "
                >
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category?.label}
                    description={category?.description}
                />
            )}
            <hr />
            <div
                className="
                    text-lg font-light text-neutral-500
                ">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo