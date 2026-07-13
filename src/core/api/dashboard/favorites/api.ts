// api/Favorites.js
import axios from "axios";

export const GetFavorites = async () => {
  // مرورگر به‌طور خودکار کوکی accessToken را به این مسیر (که روی همان دامنه است) می‌فرستد
  const Response = await axios.get("/api/favorites/user");
  return Response.data;
};
