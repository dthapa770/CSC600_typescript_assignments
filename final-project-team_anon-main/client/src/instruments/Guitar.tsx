// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

function GuitarType({ title, onClick, active }: any): JSX.Element {
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

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
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

  const mouseDown = (note: string, octave: number) => {
    synth?.triggerAttackRelease(`${note}${octave}`, "0.5");
  };

  const octave = 2;

  return (
    <div className="pv4">
      <div id="guitar">
        <div className="board">
          <div className="frets">
            <div className="fret" />
            <div className="fret" />
            <div className="fret" />
            <div className="fret" />
            <div className="fret" />
            <div className="fret" />
          </div>
          <div className="strings">
            <div
              className="string"
              onMouseDown={() => mouseDown("C", octave)}
            />
            <div
              className="string"
              onMouseDown={() => mouseDown("D", octave)}
            />
            <div
              className="string"
              onMouseDown={() => mouseDown("E", octave)}
            />
            <div
              className="string"
              onMouseDown={() => mouseDown("F", octave)}
            />
            <div
              className="string"
              onMouseDown={() => mouseDown("G", octave)}
            />
            <div
              className="string"
              onMouseDown={() => mouseDown("A", octave)}
            />
          </div>
        </div>
      </div>
      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <GuitarType
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

export const GuitarInstrument = new Instrument("Guitar", Guitar);
