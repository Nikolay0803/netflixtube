import axios from "axios";
import React, { useState, useCallback } from "react";
import {
  AiOutlineCheck as CheckIcon,
  AiOutlinePlus as PlusIcon,
} from "react-icons/ai";

type FavoriteButtonProps = {
  movieId: string;
  isFavorite: boolean;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  isFavorite,
}) => {
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = useCallback(async () => {
    setLoading(true);
    try {
      let response;

      if (isFavoriteMovie) {
        response = await axios.delete("/api/favorites", {
          data: { movieId },
        });
      } else {
        response = await axios.post("/api/favorites", { movieId });
      }

      if (response.status === 200) {
        setIsFavoriteMovie((prevFavoriteValue) => !prevFavoriteValue);
      }
    } catch (error) {
      console.error("Error updating favorite status", error);
    } finally {
      setLoading(false);
    }
  }, [isFavoriteMovie, movieId]);

  const Icon = isFavoriteMovie ? CheckIcon : PlusIcon;

  return (
    <div
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        bg-white
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:bg-green-500
        relative
      "
      onClick={toggleFavorite}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <Icon className="text-black text-2xl" />
    </div>
  );
};

export default FavoriteButton;
