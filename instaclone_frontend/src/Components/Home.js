import React from 'react';
import "./Instaclone.css";
import { useNavigate } from 'react-router-dom';

function Home() {
  console.log("Hello")
  let navigate = useNavigate()
  const onClickLand = ()=>{
    navigate("/instaPost")
  }
  return (
    <div id='mainContainer'>
      <div className='home'>
        <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/1312/original/10x_Academy_logo.png" alt="10ximage" />
        <div id='home'>
          <h1>10X Team 04</h1>
          <button onClick={onClickLand} className='landingbtn'>Enter</button>
        </div>
      </div>
    </div>
  )
}

export default Home