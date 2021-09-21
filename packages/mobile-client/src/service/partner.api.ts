// import { ApiResponse } from "apisauce";
// import { Categories } from "../common/interfaces";
// import { ApiCallback } from "../contexts/Service";

// export function getCategories(api: ApiCallback) {
//   return async (): Promise<ApiResponse<Categories[]>> =>
//     api("get", "/search/categories", {});
// }
// export function getPartners(api: ApiCallback) {
//   return async (
//     city: string,
//     lat: number,
//     lon: number,
//     categories?: Categories[]
//   ) => {
//     const categoriesId = categories
//       ?.reduce((acc, cur) => `${acc + cur.id},`, "")
//       .slice(0, -1);

//     return api("get", "/", {
//       params: { city, lat, lon, categories: categoriesId },
//     });
//   };
// }
