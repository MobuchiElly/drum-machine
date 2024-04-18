import React, { useState, useEffect } from "react";
import padData from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faFilePowerpoint } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [display, setDisplay] = useState("");
  const [volumeRange, setVolumeRange] = useState(0.58);
  const [power, setPower] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const drumPad = document.getElementById(event.key.toUpperCase());
      if (drumPad) {
        drumPad.click();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const playSound = (id, sound) => {
    const audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.volume = volumeRange;
    if (power){
      audio.play();
    }
    if(power){
      setDisplay(sound.replace(/-/g, " "));
    }
  };

  useEffect(() => {  
    if (!power) {
      setDisplay('');
    }
  }, [power])
  

  return (
    <div className="bg-gray-600 w-screen h-screen flex justify-center items-center">
      {/* <div id="root"> */}

      <div
        className="relative inner-container flex flex-col lg:flex-row justify-center items-center py-6 bg-[rgb(179,179,179)]"
        id="drum-machine"
        style={{
          minWidth: "70%",
          minHeight: "85%",
          border: "3px solid rgb(255,165,0)",
        }}
      >
        <div
          className="pad-bank flex flex-wrap justify-center items-center max-h-60 border-2"
          style={{ minWidth: "50%"}}
        >
          {padData.map((pad) => (
            <div
              key={pad.id}
              className="drum-pad h-24 w-1/3 flex justify-center items-center"
              id={pad.id}
              style={{
                backgroundColor: "grey",
                boxShadow: "black 3px 3px 5px",
              }}
              onClick={(e) => {playSound(pad.keyTrigger.toUpperCase(), pad.id);
                let c = e.currentTarget.classList || null;
                c?.add('scale-90');
                setTimeout(() => {
                  c?.remove('scale-90');
                }, 100);
              }}
            >
              <audio className="clip" id={pad.keyTrigger} src={pad.url}></audio>
              {pad.keyTrigger}
            </div>
          ))}
        </div>

        <div className="logo absolute right-0 top-2">
            <div className="inner-logo ">FCC&nbsp;</div>
            <i className="inner-logo fa fa-free-code-camp"></i>
        </div>
            {/* Control section */}
        <div className="ml-0 lg:ml-4 p-6 text-center flex flex-col justify-center items-center">
          <div className="controls-container">
            <div className="control">
            <p>{power ? "Power Off" : "Power On"}</p>
              <div className="power-text" onClick={(e) => setPower(!power)}>
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className={`${power ? "icon-on" : "icon-off"} hover:scale-125`}
                />
              </div>
              <div className="select">
                <div className="inner" style={{ float: "right" }}></div>
              </div>
            </div>
            <p id="display" className="h-10 bg-gray-500 font-bold flex items-center justify-center">{display}</p>
            <div className="volume-slider">
              <input
                max="1"
                min="0"
                step="0.01"
                type="range"
                value={volumeRange}
                onChange={(e) => setVolumeRange(parseFloat(e.target.value))}
              ></input>
            </div>
            <div className="control">
              <p>Bank</p>
              <div className="select">
                <div className="inner" style={{ float: "left" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default App;
