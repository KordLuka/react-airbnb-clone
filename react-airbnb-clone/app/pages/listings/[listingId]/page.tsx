import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import getReservations from "@/app/actions/getReservations";
import ListingClient from "@/app/components/listings/ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    return (
        <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
    )
}

export default ListingPage