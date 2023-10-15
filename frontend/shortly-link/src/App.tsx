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
    <div>
      <h1>Shorten URL</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(event) => setURL(event.target.value)} />
        <button type="submit">Shorten</button>
      </form>
      {shortURL && (
        <div>
          <div>
            <p>Shortened URL: <a href={`http://127.0.0.1:8000/${shortURL}`}>{`http://127.0.0.1:8000/${shortURL}`}</a></p>
          </div>
          <button onClick={handleOpenUrl}>Open URL</button>
          <button onClick={handleCopyUrl}>Copy URL</button>
        </div>
      )}
    </div>
  )

}

export default App