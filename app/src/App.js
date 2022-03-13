import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import Egg1 from './assets/0.png';
import Egg2 from './assets/1.png';
import Egg3 from './assets/2.png';
import CandyMachine from './CandyMachine';
import Particles from 'react-tsparticles';
import particlesConfig from './config/configParticles';

// Constants
const TWITTER_HANDLE = '0xNorya';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
//Declare Your Function
  //state
  const [walletAddress, setWalletAddress] = useState(null);

  //Actions
  const checkIfWalletIsConnected = async () => {
    try{
      const { solana } = window;

        if (solana && solana.isPhantom) {
        console.log('Got a Phantom Wallet');
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        
        //sets pub key
        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Get a Phantom Wallet Fren!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //define the method
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  //Render this when user not connected 
  const renderNotConnectedContainer = () => (
    <div>
    {/* <Particles height="100vh" width="100vw" params={particlesConfig} /> */}
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet} 
      >
        Connect your Wallet
      </button> 
      </div>
    );

  //check for Phantom Wallet
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App" style={{ position: 'relative', overflow: "hidden" }}>
      <div style  ={{ position: 'absolute'}}>
        <Particles height="100vh" width="100vw" params={particlesConfig} />
      </div>
      <div className="container">
        <div className="header-container">
          <p className="header">Odd Ballz</p>
          <p className="sub-text">3 Unique NFTs in honor of our most beloved odd ball traits</p>
          {/* <div classname="innerGradient"></div> */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
      {walletAddress && <CandyMachine walletAddress={window.solana} />}
      {/* <div classname="egg-1">
        <img alt="Egg 1" src={Egg1} />
        <img alt="Egg 1" src={Egg2} />
        <img alt="Egg 1" src={Egg1} /> */}
        {/* <img alt="Egg 2" classname="egg-1" src={Egg2} />
        <img alt="Egg 3" classname="Egg-3" src={Egg3} /> */}
      {/* </div> */}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
