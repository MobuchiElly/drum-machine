import React, { useState, useEffect } from 'react';

const padData = [
  { id: 'Heater-1', keyTrigger: 'Q', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { id: 'Heater-2', keyTrigger: 'W', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { id: 'Heater-3', keyTrigger: 'E', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { id: 'Heater-4', keyTrigger: 'A', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { id: 'Clap', keyTrigger: 'S', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { id: 'Open-HH', keyTrigger: 'D', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { id: 'Kick-n-Hat', keyTrigger: 'Z', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { id: 'Kick', keyTrigger: 'X', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { id: 'Closed-HH', keyTrigger: 'C', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

const App = () => {
  const [display, setDisplay] = useState('Kick');

  useEffect(() => {
    const handleKeyPress = (event) => {
      const drumPad = document.getElementById(event.key.toUpperCase());
      if (drumPad) {
        drumPad.click();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const playSound = (id, sound) => {
    const audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.play();
    setDisplay(sound.replace(/-/g, ' '));
  };

  const renderDrumPads = () => {
    return padData.map((pad) => (
      <div
        key={pad.id}
        className="drum-pad"
        id={pad.id}
        style={{ backgroundColor: 'grey', marginTop: '10px', boxShadow: 'black 3px 3px 5px' }}
        onClick={() => playSound(pad.keyTrigger.toUpperCase(), pad.id)}
      >
        <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
        {pad.keyTrigger}
      </div>
    ));
  };

  return (
    <div>
      <div id="root">
        <div className="inner-container" id="drum-machine">
          <div className="pad-bank">
            {renderDrumPads()}
          </div>
          <div className="logo">
            <div className="inner-logo ">FCC&nbsp;</div>
            <i className="inner-logo fa fa-free-code-camp"></i>
          </div>
          <div className="controls-container">
            <div className="control">
              <p>Power</p>
              <div className="select">
                <div className="inner" style={{ float: 'right' }}></div>
              </div>
            </div>
            <p id="display">{display}</p>
            <div className="volume-slider">
              <input max="1" min="0" step="0.01" type="range" value="0.58"></input>
            </div>
            <div className="control">
              <p>Bank</p>
              <div className="select">
                <div className="inner" style={{ float: 'left' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
