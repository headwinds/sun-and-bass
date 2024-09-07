import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const defaultApiKey = "AIzaSyB76mMFB49GXeWsjF3sYyN1BZJxyeOfDGc";

// Import required modules
import axios from "axios";

// Function to get the video ID from the URL
/*
const getVideoId = (url: string): string => {
  const urlData = new URL(url);
  const queryInfo = urlData.searchParams;
  return queryInfo.get("v") as string;
};*/

// Function to get the thumbnail URL
export const getThumbnailUrl = async (
  videoId: string,
  apiKey: string = defaultApiKey
): Promise<string> => {
  // Construct the API endpoint
  const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  // Make a GET request to the API
  const response = await axios.get(endpoint);

  // Extract the thumbnail URLs
  const thumbnails = response.data.items[0].snippet.thumbnails;

  // Return the high-resolution thumbnail URL
  return thumbnails.high.url;
};
