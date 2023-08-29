'use client'

import { SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Category, categories } from "../navbar/Categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval, } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from 'react-date-range'

interface ListingClientProps {
    listing: Listing;
    currentUser?: SafeUser | null;
    reservations?: SafeReservation[]
}

const initialDateRange: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: SafeReservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                router.push('/pages/trips');
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))

    }, [loginModal, totalPrice, dateRange, listing, currentUser, router])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange.startDate, dateRange.endDate, listing.price])

    const category: Category | undefined = useMemo(() => {
        return categories.find((c) => c.label === listing.category);
    }, [listing?.category])

    return (
        <Container>
            <div className="
                max-w-screen-lg
                mx-auto
            ">
                <div className="
                    flex flex-col gap-6
                ">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing?.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
                        <ListingInfo
                            currentUser={currentUser}
                            category={category}
                            description={listing?.description}
                            roomCount={listing?.roomCount}
                            guestCount={listing?.guestCount}
                            bathroomCount={listing?.bathroomCount}
                            locationValue={listing?.locationValue}
                        />
                        <div className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        ">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value: Range) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient