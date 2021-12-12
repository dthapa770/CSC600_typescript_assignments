// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range, set } from "immutable";
import React, { useState } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

function FluteType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames("dim pointer ph2 pv1 ba mr2 br1 fw7 bw1", {
        "b--black black": active,
        "gray b--light-gray": !active,
      })}
    >
      {title}
    </div>
  );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  //false => not pressed
  const [holeStatus, setHoleStatus] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth((oldSynth) => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    "amsine" as OscillatorType,
  ]) as List<OscillatorType>;

  const toggleHole = (holeIndex: number) => {
    setHoleStatus((prevState: boolean[]) => {
      let copy = [...prevState];
      copy[holeIndex] = !copy[holeIndex];
      return copy;
    });
  };

  const mouseDown = () => {
    let notes = ["D", "E", "F", "G", "A", "B"];
    let idx = holeStatus.filter((val: boolean) => val).length;
    let note = notes[idx];
    if (!note) {
      return;
    }
    let octave = 3;
    synth?.triggerAttack(`${note}${octave}`, "0.5");
  };

  const mouseUp = () => {
    synth?.triggerRelease("+0.2");
  };

  return (
    <div className="pv4">
      <div className="flute">
        <div className="fluteBody">
          <div
            className="fluteMouth"
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          >
            <div className="fluteMouthPiece" />
          </div>
          <div className="fluteHoles">
            {holeStatus.map((val, idx) => {
              return (
                <div key={idx} className="hole" onClick={() => toggleHole(idx)}>
                  {holeStatus[idx] && (
                    <div className="finger" onClick={() => toggleHole(idx)}>
                      <div className="nail" onClick={() => toggleHole(idx)} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <FluteType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const FluteInstrument = new Instrument("Flute", Flute);
