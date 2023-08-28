import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ListingClient from "@/app/components/listings/ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser();

    return (
        <ListingClient listing={listing} currentUser={currentUser} />
    )
}

export default ListingPage