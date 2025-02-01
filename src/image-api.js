import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    "Accept-Version": "v1",
    Authorization: "Client-ID mz647j0jWRCqtN3KbD5y0xQ1oRiCtqnkZQufUmVee4Y",
  },
});

export const fetchPicturesWithQuery = async (query, page = 1) => {
  const response = await instance.get(`/search/photos`, {
    params: {
      query: query,
      orientation: "landscape",
      page,
      per_page: 20,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
