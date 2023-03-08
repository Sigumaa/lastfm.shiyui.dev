import React, {useEffect, useState} from "react";
export default function Home() {
  const [nowplaying, setNowplaying] = useState(false)
  const [artist, setArtist] = useState('')
  const [name, setName] = useState('')
  const [album, setAlbum] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function getNowPlaying() {
      const response = await fetch('/api/lastfm')
      const data = await response.json()
      if (response.status !== 200) {
        setNowplaying(false)
        return
      }
      setNowplaying(true)
      setArtist(data.artist)
      setName(data.name)
      setAlbum(data.album)
      setUrl(data.url)
    }
    getNowPlaying()
  }, [])

  return (
    <div>
      <h1><a href={'https://www.last.fm/ja/user/shiyui'}>Shiyui</a> Now Playing</h1>
      <hr />
      <p>{nowplaying ? '': 'Not'} Listening to Music</p>
      <div style={{display: nowplaying ? 'block' : 'none'}}>
      <p>Artist: {artist}</p>
      <p>Name: {name}</p>
      <p>Album: {album}</p>
      <p>Music URL: <a href={url}>last.fm</a></p>
      <hr />
      </div>
    </div>
  )
}

