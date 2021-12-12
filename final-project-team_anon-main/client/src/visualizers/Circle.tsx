// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const CircleVisualizer = new Visualizer(
  "Circle",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    //change angle mode so that circle can be displayed
    p5.angleMode(p5.DEGREES);
    //p5.noFill();
    p5.fill("green");

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke("green");

    //center everything
    p5.translate(p5.width / 2, p5.height / 2);
    const values = analyzer.getValue();
    //right half of circle
    p5.beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      let r = p5.map(Number(values[index]), -1, 1, 100, 200);
      let x = r * p5.sin(i);
      let y = r * p5.cos(i);
      p5.vertex(x, y);
    }
    p5.endShape();
    //left half of circle
    p5.beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      let r = p5.map(Number(values[index]), -1, 1, 100, 200);
      let x = r * -p5.sin(i);
      let y = r * p5.cos(i);
      p5.vertex(x, y);
    }
    p5.endShape();
    //right half of inner circle
    p5.fill("lightgreen");
    p5.stroke("lightgreen");
    p5.beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      let r = p5.map(Number(values[index]), -1, 1, 50, 100);
      let x = r * p5.sin(i);
      let y = r * p5.cos(i);
      p5.vertex(x, y);
    }
    p5.endShape();
    //left half of inner circle
    p5.beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
      let r = p5.map(Number(values[index]), -1, 1, 50, 100);
      let x = r * -p5.sin(i);
      let y = r * p5.cos(i);
      p5.vertex(x, y);
    }
    p5.endShape();
  }
);
