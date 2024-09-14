import { createApi } from "unsplash-js";
import { Photo, PhotoDetails } from "../types";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY as string,
});

export const fetchPhotos = async (
  page: number = 1,
  perPage: number = 100
): Promise<Photo[]> => {
  try {
    const response = await unsplash.photos.list({ page, perPage });
    if (response.type === "error") {
      throw new Error(`Error fetching photos: ${response.errors[0]}`);
    }
    return response.response?.results || [];
  } catch (error) {
    throw error;
  }
};

export const searchPhotos = async (
  query: string,
  page: number = 1,
  perPage: number = 100
): Promise<Photo[]> => {
  try {
    const response = await unsplash.search.getPhotos({ query, page, perPage });
    if (response.type === "error") {
      throw new Error(`Error searching photos: ${response.errors[0]}`);
    }
    return response.response?.results || [];
  } catch (error) {
    throw error;
  }
};

export const fetchPhotoDetailsById = async (
  id: string
): Promise<PhotoDetails | null> => {
  try {
    const response = await unsplash.photos.get({ photoId: id });
    if (response.type === "error") {
      throw new Error(`Error fetching photo details: ${response.errors[0]}`);
    }
    return response.response as PhotoDetails;
  } catch (error) {
    throw error;
  }
};
