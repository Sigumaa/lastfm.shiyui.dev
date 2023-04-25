import React from 'react';
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {data,error} = useSWR("/api/lastfm", fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {artist,name,album,url} = data;
  const nowplaying = Boolean(artist || name || album || url);

  return (
    <div>
      <h1>
        <a href="https://www.last.fm/ja/user/shiyui">Shiyui</a> Now Playing
      </h1>
      <hr />
      <p>{nowplaying ? "" : "Not"} Listening to Music</p>
      <div style={{ display: nowplaying ? "block" : "none" }}>
        <p>Name: {name}</p>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>
        <p>
          Music URL: <a href={url}>last.fm</a>
        </p>
        <hr />
      </div>
    </div>
  );
}