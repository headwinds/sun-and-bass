"use client";

import React, { useState, useMemo } from "react";
import Masonry from "react-masonry-css";
import { Search } from "lucide-react";
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
  GithubLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Flag from "react-world-flags";
import Link from "next/link";
import Fuse from "fuse.js";
import { SearchInput } from "./input";
import ReactPlayer from "react-player/youtube";
import { PerplexityLogo } from "./perplexityLogo";

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

const SearchInternet = ({ artist }: { artist: Artist }) => {
  const googleUrl = getGoogleSearch(artist) ?? "";

  const perplexityUrl = getPerplexitySearch(artist) ?? "";

  return (
    <>
      <Link href={googleUrl} target="_blank" rel="noopener noreferrer">
        <MagnifyingGlass size={32} weight="fill" />
      </Link>
      <Link href={perplexityUrl} target="_blank" rel="noopener noreferrer">
        <PerplexityLogo width="30" height="30" />
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
  sunAndBassUrl?: string | null;
};

const allArtists: Artist[] = lineup.artists as Artist[];

const Country = ({ country }: { country: string }) => {
  return (
    <div className="flex items-center space-x-2 justify-center">
      <div className="w-[50px] h-[35px]">
        <Flag code={getCode(country)} />
      </div>
      {/*<span>{country}</span>*/}
    </div>
  );
};

const getYoutubeThumbnail = (url: string): string => {
  if (url === null || url === undefined) {
    return "";
  }
  const videoId = url.match(/v=([^&]*)/)?.[1] ?? "";
  if (videoId === "") return "";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return thumbnailUrl;
};

const ArtistImgOrPlayer = ({
  artist,
  selectedArtistYoutube,
  onClick,
  onContributeClick
}: {
  artist: Artist;
  selectedArtistYoutube: Artist | null;
  onClick?: () => void;
  onContributeClick?: () => void;
}) => {
  const isSelectedYoutube =
    artist?.artistName === selectedArtistYoutube?.artistName;

  if (artist.youtubeUrl && isSelectedYoutube) {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={artist.youtubeUrl}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
    );
  }

  if (artist.youtubeUrl && !isSelectedYoutube) {

      const photoUrl = getYoutubeThumbnail(artist.youtubeUrl);

      if (photoUrl === "") {
        return null;
      }

      return (
        <button onClick={onClick}>
          <Image
            src={photoUrl}
            alt={artist.artistName}
            className="w-full h-48 object-cover"
            //fill={true}
            //className="object-cover"
            width={260}
            height={200}
          />
        </button>
      );
  }

  if (artist.soundcloudUrl) {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <ReactPlayer
          url={artist.soundcloudUrl}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
    );
  }

  if (artist.photoUrl) {
    return (
      <Image
        src={artist.photoUrl}
        alt={artist.artistName}
        className="w-full h-48 object-cover"
        //fill={true}
        //className="object-cover"
        width={300}
        height={200}
      />
    );
  }

  return (
    <button onClick={() => onContributeClick()}>
    <div className="w-full h-full  flex items-center justify-center m-4">
      <p className="text-gray-500 text-1xl">😔 Got a Youtube link?</p>
    </div>
    </button>
  );
};

export function ArtistGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtistYoutube, setSelectedArtistYoutube] =
    useState<Artist | null>(null);

  const handleYoutube = (artist: Artist) => {
    setSelectedArtistYoutube(artist);
  };

  const fuse = useMemo(
    () =>
      new Fuse(allArtists, {
        keys: ["artistName", "homeCountry"],
        threshold: 0.3,
      }),
    []
  );

  const filteredArtists = useMemo(() => {
    if (!searchTerm) return allArtists;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse]);

  const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const onContributeClick = () => {
    window.open("https://github.com/headwinds/sun-and-bass/discussions", "_blank");
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
      `}</style>
      <h1
        className="text-4xl font-bold text-center mb-8"
        style={{ fontFamily: "'Satisfy', cursive" }}
      >
        Sun and Bass Artists 2024
      </h1>

      <div className="flex flex-col justify-center w-full items-center m-4">
        <h2>
          Visit the official{" "}
          <a href="https://sunandbass.net/" className="underline">
            sunandbass.net
          </a>{" "}
          and live stream on{" "}
          <a
            href="https://bassdrive.com"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            bassdrive.com
          </a>
        </h2>
        <p>This fan site is not affiliated with sun and bass</p>
        <a href="https://github.com/headwinds/sun-and-bass" target="_blank">
          <GithubLogo size={32} weight="fill" />{" "}
        </a>
      </div>
      <div className="relative mb-8 max-w-md mx-auto">
        <SearchInput
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredArtists.map((artist, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4">
                <div className="flex text-xl font-semibold mb-2 truncate justify-between items-normal">
                  <h2>{artist.artistName}</h2>
                  {artist.homeCountry ? (
                    <Country country={artist.homeCountry} />
                  ) : (
                    ""
                  )}
                </div>
                <ArtistImgOrPlayer
                  artist={artist}
                  selectedArtistYoutube={selectedArtistYoutube}
                  onClick={() => handleYoutube(artist)}
                  onContributeClick={onContributeClick}
                />

                <div className="flex space-x-2 rounded-sm bg-stone-100 p-2">
                  {artist.youtubeUrl ? (
                    <button onClick={() => handleYoutube(artist)}>
                      <div className="text-red-500 hover:text-red-700 transition-colors duration-300">
                        <YoutubeLogo size={32} weight="fill" />
                      </div>
                    </button>
                  ) : null}
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
                  <SearchInternet artist={artist} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
