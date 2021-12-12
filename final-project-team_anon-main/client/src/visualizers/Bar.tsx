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

export const BarVisualizer = new Visualizer(
  "Bar",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);

    const values = analyzer.getValue();
    let middle = height / 2;
    //chunk values into 32 chunks
    let chunks = chunk(values, 8);
    //get average of all chunks to have less bars
    let values32 = chunks.map(
      (val) => val.reduce((acc, val) => acc + val, 0) / val.length
    );
    let singleWidth = width / values32.length;
    let leftDistance = 0;

    //console.log(values32);
    p5.beginShape();
    for (let i = 0; i < values32.length; i++) {
      const amplitude = values32[i] as number;
      let negative = false;
      let val = amplitude;
      if (amplitude < 0) {
        negative = true;
        val = -amplitude;
      }
      let heightElement = val * SCALAR * middle;
      if (negative) {
        p5.fill("green");
        p5.rect(leftDistance, middle, singleWidth, -heightElement);
      } else {
        p5.fill("red");
        p5.rect(leftDistance, middle, singleWidth, heightElement);
      }
      leftDistance += singleWidth;
    }
    p5.endShape();
  }
);
