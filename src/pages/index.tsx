import React from 'react';
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {data,error} = useSWR("/api/lastfm", fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const {artist,name,album,url,image} = data;
  const nowplaying = Boolean(artist || name || album || url);
  const thumbnail = Boolean(image);

  return (
    <div>
      <h1>
        <a href="https://www.last.fm/ja/user/shiyui">Shiyui</a> Now Playing
      </h1>
      <hr />
      <p>{nowplaying ? "" : "NotListening to Music"} </p>
      <div style={{ display: nowplaying ? "block" : "none" }}>
        <div style={{ display: thumbnail ? "block" : "none" , float: "left" }}>
          <img src={image} alt="thumbnail" />
        </div>
        <div style={{display: "inline-block", marginLeft: "10px" }}>
        <p>Name: {name}</p>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>
        <p>
          Music URL: <a href={url}>last.fm</a>
        </p>
      </div>
        <hr />
      </div>
    </div>
  );
}