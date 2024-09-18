// app/(pages)/favorites/page.tsx

import getFavoritesMovies from "@/app/actions/getFavoritesMovies";
import Navbar from "@/app/components/Navbar";
import MoviesList from "@/app/components/MoviesList";
import getCurrentUser from "@/app/actions/getCurrentUser";

const FavoritesMovies = async () => {
  try {
    const favoritesMovies = await getFavoritesMovies();
    const currentUser = await getCurrentUser();
    return (
      <>
        <Navbar username={currentUser?.name} />
        <div className="pb-40 pt-72">
          <MoviesList title="Улюблені" movies={favoritesMovies} />
        </div>
      </>
    );
  } catch (error) {
    return (
      <>
        <Navbar />
        <div className="pb-40 pt-72">
          <p>Не вдалося завантажити улюблені фільми. Спробуйте пізніше.</p>
        </div>
      </>
    );
  }
};

export default FavoritesMovies;
