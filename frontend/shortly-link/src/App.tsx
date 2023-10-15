import React, { useState } from "react";
import axios from "axios"

const App: React.FC = () => {
  const [url, setURL] = useState<string>('')
  const [shortURL, setShortURL] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/shorten', { url });
      const { short_url } = response.data;
      setShortURL(short_url);
    } catch (error) {
      console.error(error);
    }
  }

  const handleOpenUrl = () => {
    if (shortURL) {
      window.open(`http://127.0.0.1:8000/${shortURL}`, '_blank');
    }
  }

  const handleCopyUrl = () => {
    if (shortURL) {
      navigator.clipboard.writeText(`http://127.0.0.1:8000/${shortURL}`)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-stone-500 flex-col">
      <h1 className="text-white text-center">Shorten URL</h1>
      <form className="flex flex-col my-4" onSubmit={handleSubmit}>
        <input className="h-12 outline-none w-80" type="text" value={url} onChange={(event) => setURL(event.target.value)} />
        <button className="text-white my-4 bg-red-500 h-12 hover:bg-red-400" type="submit">Shorten</button>
      </form>
      {shortURL && (
        <div>
          <div>
            <p className="text-white">Shortened URL: <a href={`http://127.0.0.1:8000/${shortURL}`}>{`http://127.0.0.1:8000/${shortURL}`}</a></p>
          </div>
          <div className="flex justify-between flex-col py-8">
            <button className="text-white bg-sky-400 my-2 h-10 hover:bg-sky-300" onClick={handleOpenUrl}>Open URL</button>
            <button className="text-white bg-sky-400 h-10 hover:bg-sky-300" onClick={handleCopyUrl}>Copy URL</button>
          </div>
        </div>
      )
      }
    </div >
  )

}

export default App