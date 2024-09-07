"use client";

import React from "react";
import Masonry from "react-masonry-css";
import {
  TiktokLogo,
  SoundcloudLogo,
  ThreadsLogo,
  LinktreeLogo,
  FacebookLogo,
  Camera,
  XLogo,
  LinkSimple,
  MagnifyingGlass,
  Robot,
  GithubLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Flag from "react-world-flags";
import Link from "next/link";

import { lineup, countryMap } from "../data/lineup";

const getCode = (country: string): string => {
  return countryMap[country] as string;
};

const getSearchName = (artist: Artist): string => {
  return String(`Drum and Bass Artist: ${artist.artistName}`);
};

const getGoogleSearch = (artist: Artist): string => {
  return String(
    `https://www.google.com/search?q=${encodeURIComponent(
      getSearchName(artist)
    )}`
  );
};

const getPerplexitySearch = (artist: Artist): string => {
  const nlp = `this drum and bass music artist who goes by ${artist.artistName} hailing from ${artist.homeCountry} will dj at sun and bass 2024`;

  return String(
    `https://www.perplexity.ai/search?q=${encodeURIComponent(
      getSearchName(artist)
    )}&focus=[internet,dj,drum and bass,youtube]&q=${encodeURIComponent(nlp)}`
  );
};

const Search = ({ artist }: { artist: Artist }) => {
  const googleUrl = getGoogleSearch(artist) ?? "";
  console.log("what", googleUrl);
  const perplexityUrl = getPerplexitySearch(artist) ?? "";

  return (
    <>
      <Link href={googleUrl}>
        <MagnifyingGlass size={32} weight="fill" />
      </Link>
      <Link href={perplexityUrl}>
        <Robot size={32} weight="fill" />
      </Link>
    </>
  );
};

type Artist = {
  artistName: string;
  linktreeUrl?: string | null;
  youtubeUrl?: string | null;
  websiteUrl?: string | null;
  soundcloudUrl?: string | null;
  photoUrl?: string | null;
  photoSource?: string | null;
  homeCountry?: string;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  facebookUrl?: string | null;
  twitterUrl?: string | null;
};

const artists: Artist[] = lineup.artists as Artist[];

const Country = ({ country }: { country: string }) => {
  return (
    <div className="flex items-center space-x-2 justify-center">
      <div className="w-[60px] h-[60px]">
        <Flag code={getCode(country)} />
      </div>
      {/*<span>{country}</span>*/}
    </div>
  );
};

export function ArtistGallery() {
  const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 justify-center">
      <h1 className="text-4xl font-bold text-center mb-8 font-bold font-sans">
        Sun and Bass 2024 Artists
      </h1>
      <div className="flex flex-col justify-center w-full items-center m-4">
        <h2>
          Visit the official{" "}
          <a href="https://sunandbass.net/" className="underline">
            sunandbass.net
          </a>
        </h2>
        <p>This site is not affiliated with sun and bass</p>
        <a href="https://github.com/headwinds/sun-and-bass">
          <GithubLogo size={32} weight="fill" />{" "}
        </a>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {artists.map((artist, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {artist.photoUrl ? (
                <Image
                  src={artist.photoUrl}
                  alt={artist.artistName}
                  className="w-full h-48 object-cover"
                  //fill={true}
                  //className="object-cover"
                  width={300}
                  height={200}
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">😔 no photo</span>
                </div>
              )}
              <div className="p-4">
                <div className="flex text-xl font-semibold mb-2 truncate justify-between items-normal">
                  <h2>{artist.artistName}</h2>
                  {artist.homeCountry ? (
                    <Country country={artist.homeCountry} />
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex space-x-2 rounded-sm bg-stone-100 p-2">
                  {artist.websiteUrl ? (
                    <a
                      href={artist.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                    >
                      <LinkSimple size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.linktreeUrl ? (
                    <a
                      href={artist.linktreeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-700 transition-colors duration-300"
                    >
                      <LinktreeLogo size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.soundcloudUrl ? (
                    <a
                      href={artist.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <SoundcloudLogo size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.instagramUrl ? (
                    <a
                      href={artist.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:text-yellow-600 transition-colors duration-300"
                    >
                      <ThreadsLogo size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.facebookUrl ? (
                    <a
                      href={artist.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      <FacebookLogo size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.twitterUrl ? (
                    <a
                      href={artist.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[black] hover:text-[black] transition-colors duration-300"
                    >
                      <XLogo size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.tiktokUrl ? (
                    <a
                      href={artist.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <TiktokLogo size={32} weight="fill" />
                    </a>
                  ) : null}
                  {artist.photoSource ? (
                    <a
                      href={artist.photoSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-800 hover:text-stone-600 transition-colors duration-300"
                    >
                      <Camera size={32} weight="fill" />
                    </a>
                  ) : null}

                  <Search artist={artist} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
