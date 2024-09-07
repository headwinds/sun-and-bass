"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { ExternalLink, Link, Music } from "lucide-react";

import { lineup } from "../data/lineup";

// This function would need to be implemented to fetch images based on the artist's name or country
// It's a placeholder and won't actually work as is
const getArtistImage = (photoUrl: string, name: string) => {
  // Implement your logic here to return the appropriate image URL
  // This could involve API calls, database lookups, etc.
  if (photoUrl) {
    return photoUrl;
  }
  return `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
    name
  )}`;
};

type Artist = {
  name: string;
  photo: string;
  website: string;
  linktree: string;
  soundcloudUrl: string;
  homeCountry: string;
};

const artists = lineup.artists.map((artist: Artist) => ({
  name: artist.name,
  image: getArtistImage(artist.photoUrl, artist.name),
  website: artist.websiteUrl,
  linktree: artist.linktreeUrl,
  music: artist.soundcloudUrl,
  homeCountry: artist.homeCountry,
}));

export function ArtistGallery() {
  const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">
        Sun and Bass 2024 Artists
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {artists.map((artist, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {artist.name}
                </h2>
                <div className="flex space-x-2">
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={artist.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700 transition-colors duration-300"
                  >
                    <Link size={20} />
                  </a>
                  <a
                    href={artist.music}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <Music size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
