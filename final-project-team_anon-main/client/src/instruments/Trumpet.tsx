// 3rd party library imports
import * as Tone from "tone";
import classNames from "classnames";
import { List, Range } from "immutable";
import React, { useState } from "react";

// project imports
import { Instrument, InstrumentProps } from "../Instruments";

function TrumpetType({ title, onClick, active }: any): JSX.Element {
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

function Trumpet({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [leftValve, setLeftValve] = useState(false);
  const [middleValve, setMiddleValve] = useState(false);
  const [rightValve, setRightValve] = useState(false);

  const notes = ["C3", "D3", "E3", "F3"];

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth((oldSynth) => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    "sawtooth",
  ]) as List<OscillatorType>;

  const pressValve = (type: string) => {
    switch (type) {
      case "left":
        setLeftValve((prev) => !prev);
        break;
      case "middle":
        setMiddleValve((prev) => !prev);
        break;
      case "right":
        setRightValve((prev) => !prev);
        break;
    }
  };

  const getCurrentNote = () => {
    let idx = 0;
    if (leftValve) {
      idx++;
    }
    if (middleValve) {
      idx++;
    }
    if (rightValve) {
      idx++;
    }
    return notes[idx];
  };

  const makeSoundDown = () => {
    if (!synth) {
      return;
    }
    let note = getCurrentNote();
    synth.triggerAttack(note);
  };

  const makeSoundUp = () => {
    if (!synth) {
      return;
    }
    synth.triggerRelease("+0.1");
  };

  return (
    <div className="pv4">
      <div id="wrapper">
        <div id="main-pipe">
          <div className="filler" />
        </div>
        <div id="lead-pipe" />
        <div id="reciever" />
        <div id="mouth" onMouseDown={makeSoundDown} onMouseUp={makeSoundUp}>
          <div id="mouthpiece-stem" />
          <div id="mouthpiece-cup" />
        </div>

        <div id="valves">
          <div
            className={classNames("valve", leftValve ? "pressed" : "null")}
            onClick={() => pressValve("left")}
          >
            <div className="bottom-cap" />
            <div className="top-cap" />
            <div className="piston" />
            <div className="button" />
          </div>
          <div
            className={classNames("valve", middleValve ? "pressed" : "null")}
            onClick={() => pressValve("middle")}
          >
            <div className="bottom-cap" />
            <div className="top-cap" />
            <div className="piston" />
            <div className="button" />
          </div>
          <div
            className={classNames("valve", rightValve ? "pressed" : "null")}
            onClick={() => pressValve("right")}
          >
            <div className="bottom-cap" />
            <div className="top-cap" />
            <div className="piston" />
            <div className="button" />
          </div>
          <div className="front-triangle" />
        </div>
      </div>
      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <TrumpetType
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

export const TrumpetInstrument = new Instrument("Trumpet", Trumpet);
