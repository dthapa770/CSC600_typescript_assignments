// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

const SCALAR = 3;

export function chunk(arr: any, chunkSize: number): any[][] {
  if (chunkSize <= 0) {
    return [];
  }
  let result = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize)
    result.push(arr.slice(i, i + chunkSize));
  return result;
}

export const SquaresVisualizer = new Visualizer(
  "Squares",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    const colors = [
      "lightgreen",
      "green",
      "darkgreen",
      "orange",
      "magenta",
      "red",
    ];

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.001);
    //p5.stroke(255, 255, 255, 255);
    //p5.noFill();

    const values = analyzer.getValue();
    //chunk values into 32 chunks (256 / 8 = 32)
    let chunks = chunk(values, 8);
    //get average of all chunks and make it positive
    let values32 = chunks.map((val) =>
      Math.abs(val.reduce((acc, val) => acc + val, 0) / val.length)
    );
    let squareWidth = width / values32.length;

    let xOffset = 0;
    const SQUARE_NUMBER_SIZE = 0.02;

    //console.log(values32);
    p5.beginShape();
    for (let i = 0; i < values32.length; i++) {
      const amplitude = values32[i] as number;
      let squareAmount = Math.floor(amplitude / SQUARE_NUMBER_SIZE);
      for (let y = 0; y < squareAmount; y++) {
        p5.fill(colors[y] ?? "red");
        p5.square(xOffset, y * squareWidth, squareWidth);
      }
      xOffset += squareWidth;
    }
    p5.endShape();
  }
);
