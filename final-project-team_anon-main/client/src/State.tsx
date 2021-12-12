// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from "./instruments/Piano";
import { WaveformVisualizer } from "./visualizers/Waveform";
import { GuitarInstrument } from "./instruments/Guitar";
import { FluteInstrument } from "./instruments/Flute";
import { DrumInstrument } from "./instruments/Drum";
import { TrumpetInstrument } from "./instruments/Trumpet";
import { BarVisualizer } from "./visualizers/Bar";
import { CircleVisualizer } from "./visualizers/Circle";
import { SquaresVisualizer } from "./visualizers/Squares";
import { CircleSquareVisualizer } from "./visualizers/CircleSquare";

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([
  PianoInstrument,
  GuitarInstrument,
  FluteInstrument,
  DrumInstrument,
  TrumpetInstrument,
]);
const visualizers = List([
  WaveformVisualizer,
  BarVisualizer,
  CircleVisualizer,
  SquaresVisualizer,
  CircleSquareVisualizer,
]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
