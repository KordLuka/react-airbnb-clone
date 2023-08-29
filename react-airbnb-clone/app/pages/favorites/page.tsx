import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/components/favorites/FavoritesClient";

const FavoritesPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default FavoritesPage