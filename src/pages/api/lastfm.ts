import { NextApiRequest, NextApiResponse } from 'next';

interface RecentTracksData {
  recenttracks: RecentTracks;
}

interface RecentTracks {
  track: RecentTrack[];
  "@attr": RecentTracksAttr;
}

interface RecentTracksAttr {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

interface RecentTrack {

  artist: Artist;
  streamable: string;
  image: Image[];
  mbid: string;
  album: Album;
  name: string;
  "@attr": RecentTrackAttr;
  url: string;
  date: Date;
}

interface Artist {
  mbid: string;
  "#text": string;
}

interface Image {
  size: string;
  "#text": string;
}

interface Album {
  mbid: string;
  "#text": string;
}

interface RecentTrackAttr {
  nowplaying: string;
}

interface Date {
  uts: string;
  "#text": string;
}

interface NowPlayingTrack {
  artist: Artist
  Streamable: string
  image: Image[]
  mbid: string
  album: Album
  name: string
  url: string
  date: Date
}

const {
  LASTFM_API_KEY: key,
  LASTFM_USER_NAME: user,
} = process.env;

async function getNowPlayingTrack() {
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${key}&format=json&limit=1`;
  const res = await fetch(url);
  const data: RecentTracksData = await res.json();

  if (
    data.recenttracks.track.length === 0 ||
    data.recenttracks.track[0]['@attr'].nowplaying !== 'true'
  ) {
    return null;
  }

  return {
    artist: data.recenttracks.track[0].artist["#text"],
    Streamable: data.recenttracks.track[0].streamable,
    image: data.recenttracks.track[0].image,
    mbid: data.recenttracks.track[0].mbid,
    album: data.recenttracks.track[0].album["#text"],
    name: data.recenttracks.track[0].name,
    url: data.recenttracks.track[0].url,
    date: data.recenttracks.track[0].date,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const track = await getNowPlayingTrack();
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({isPlaying: false});
  }
}