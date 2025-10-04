import { useState, useEffect } from 'react';
import styled from 'styled-components';

export function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const intervalTime = 25; // update every 25ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(Math.round((currentStep / totalSteps) * 100), 100));
      if (currentStep >= totalSteps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledWrapper>
      <div className="container">
        <div className="cloud front">
          <span className="left-front" />
          <span className="right-front" />
        </div>
        <span className="sun sunshine" />
        <span className="sun" />
        <div className="cloud back">
          <span className="left-back" />
          <span className="right-back" />
        </div>
      </div>
      <div className="loading-text">
        <p>Loading</p>
        <p>{progress}%</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column; /* stack animation + text */
  align-items: center;
  justify-content: center;
  z-index: 9999;

  /* Light / Dark mode background */
  @media (prefers-color-scheme: light) {
    background: #ffffff;
    .loading-text p {
    color: #333333; /* dark text for light background */
     }
  }
  @media (prefers-color-scheme: dark) {
    background: #222222;
  }

  .container {
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .loading-text {
    margin-top: 20px;
    text-align: center;
    font-size: 1.5rem;
    font-family: sans-serif;
    color: #ffffff;
   
}

  /* Clouds & sun styles */
  .cloud { width: 250px; }
  .front { padding-top: 45px; margin-left: 25px; display: inline; position: absolute; z-index: 11; animation: clouds 8s infinite; animation-timing-function: ease-in-out; }
  .back { margin-top: -30px; margin-left: 150px; z-index: 12; animation: clouds 12s infinite; animation-timing-function: ease-in-out; }
  .right-front { width: 45px; height: 45px; border-radius: 50% 50% 50% 0%; background-color: #4c9beb; display: inline-block; margin-left: -25px; z-index: 5; }
  .left-front { width: 65px; height: 65px; border-radius: 50% 50% 0% 50%; background-color: #4c9beb; display: inline-block; z-index: 5; }
  .right-back { width: 50px; height: 50px; border-radius: 50% 50% 50% 0%; background-color: #4c9beb; display: inline-block; margin-left: -20px; z-index: 5; }
  .left-back { width: 30px; height: 30px; border-radius: 50% 50% 0% 50%; background-color: #4c9beb; display: inline-block; z-index: 5; }
  .sun { width: 120px; height: 120px; background: linear-gradient(to right, #fcbb04, #fffc00); border-radius: 50%; display: inline; position: absolute; }
  .sunshine { animation: sunshines 2s infinite; }

  @keyframes sunshines { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.4); opacity: 0; } }
  @keyframes clouds { 0% { transform: translateX(15px); } 50% { transform: translateX(0px); } 100% { transform: translateX(15px); } }
`;
