import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        Elevate your dining experience with <span className="highlight">Big Bite</span>! <br />
        Download our app and enjoy seamless ordering, exclusive deals, and the tastiest bites at your fingertips.
      </p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="Download on Google Play" />
        <img src={assets.app_store} alt="Download on the App Store" />
      </div>
    </div>
  );
};

export default AppDownload;
