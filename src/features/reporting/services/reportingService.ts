import { API_ENDPOINTS } from "@common/constants/apiEndpoints";
import { LocationDto } from "../dtos/Location";
import apiClient from "@common/api/apiClient";
import { HttpStatusCode, isAxiosError } from "axios";
import { cityDto } from "../dtos/Location";

const supportedJurisdictionEndpoint = API_ENDPOINTS.jurisdiction.get;

// --- Public Functions

/**
 * Handles user within supported jurisdiction check by sending their coordinates to backend API.
 */
export const fetchJurisdiction = async (userLocation: LocationDto) => {
  try {
    const { data } = await apiClient.get(supportedJurisdictionEndpoint, {
      params: {
        ...userLocation,
      },
    });

    if (!data) {
      return null;
    }
    const { state, city } = data;

    return { state, city } as cityDto;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      if (error.status === HttpStatusCode.TooManyRequests) {
        console.log("too many requests");
        return;
      }
      console.log("error: ", error);
      //TODO: handle this
    } else if (isAxiosError(error) && error.request) {
      throw new Error("Error connecting to internet. Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("An unknown error occurred. Try again later.");
    }
  }
};
