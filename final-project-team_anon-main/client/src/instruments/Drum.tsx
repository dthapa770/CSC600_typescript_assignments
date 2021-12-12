// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React from "react";
import { MouseEvent } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

function DrumType({ title, onClick, active }: any): JSX.Element {
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

function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: "C", idx: 0 },
    { note: "Db", idx: 0.5 },
    { note: "D", idx: 1 },
    { note: "Eb", idx: 1.5 },
    { note: "E", idx: 2 },
    { note: "F", idx: 3 },
    { note: "Gb", idx: 3.5 },
    { note: "G", idx: 4 },
    { note: "Ab", idx: 4.5 },
    { note: "A", idx: 5 },
    { note: "Bb", idx: 5.5 },
    { note: "B", idx: 6 },
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
    "sine",
    "sawtooth",
    "square",
    "triangle",
    "fmsine",
    "fmsawtooth",
    "fmtriangle",
    "amsine",
    "amsawtooth",
    "amtriangle",
  ]) as List<OscillatorType>;

  const playSound = (evt: MouseEvent<HTMLDivElement>, octave: number) => {
    let notes = ["C", "D", "E", "F", "G", "A", "B"];
    let elem = evt.target as HTMLDivElement;
    let rect = elem.getBoundingClientRect();
    let middlePoint = [rect.x + rect.width / 2, rect.y + rect.height / 2];
    let clickPos = [evt.clientX, evt.clientY];
    let y = clickPos[0] - middlePoint[0];
    let x = clickPos[1] - middlePoint[1];
    let dist = Math.sqrt(x * x + y * y);
    let maxDist = rect.height / 2;
    let relDist = dist / maxDist;
    let idx = Math.floor(notes.length * relDist);
    let note = notes[idx];
    synth?.triggerAttackRelease(`${note}${octave}`, "0.2");
  };

  return (
    <div className="pv4">
      <div className="drums">
        d
        <div className="firstDrum">
          <div className="innerDrum" onClick={(evt) => playSound(evt, 3)} />
        </div>
        <div className="secondDrum">
          <div className="innerDrum" onClick={(evt) => playSound(evt, 2)} />
        </div>
        <div className="thirdDrum">
          <div className="innerDrum" onClick={(evt) => playSound(evt, 4)} />
        </div>
      </div>
      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <DrumType
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

export const DrumInstrument = new Instrument("Drums", Drum);
