"use client"
import axios from "axios";
import Image from 'next/image'
import styles from './page.module.css'
import {youtube_parser} from './utils'
import { useRef, useState } from 'react';

export default function Home() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': 'f694a8085fmshd9ccaaf94be9610p1ad24cjsnb95f633ff2c3',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }
  return (
    <div className="app">
    <span className="logo">youtube to mp3</span>
    <section className="content">
      <h1 className="content_title">YouTube to MP3 Converter</h1>
      <p className="content_description">
        Transform YouTube videos into MP3s in just a few clicks!
      </p>

      <form onSubmit={handleSubmit} className="form">
        <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
        <button type="submit" className="form_button">Search</button>
      </form>

      {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}
      
    </section>
  </div>
  )
}
