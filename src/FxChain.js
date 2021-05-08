import React from "react";
import * as Tone from "tone";
import { useGlobalContext } from "./context";

const FxChain = () => {
  const { recordedAudio } = useGlobalContext();

  const getRandom = (min, max) => {
    // returns random number >= min and < max
    return Math.random() * (max - min) + min;
  };
  const createFx = (type) => {
    if (type === 1) {
      const intensity = getRandom(0.3, 1);
      return new Tone.Distortion(intensity);
    }
    if (type === 2) {
      const delayT = getRandom(0.1, 1);
      const feedback = getRandom(0.2, 0.8);
      console.log(delayT, feedback);
      return new Tone.FeedbackDelay(delayT, feedback);
    }
    if (type === 3) {
      const pitchShift = new Tone.PitchShift().toDestination();
      pitchShift.pitch = getRandom(-12, 6);
      console.log(pitchShift.pitch);
      return pitchShift;
    }
  };
  const generateFx = (e) => {
    e.preventDefault();

    const player = new Tone.Player(recordedAudio);
    player.set({
      fadeIn: 0.3,
      fadeOut: 0.3,
      reverse: true,
      playbackRate: getRandom(-0.7, 1.7),
    });
    //create fx & connect
    const fx0 = createFx(2);
    const fx1 = createFx(3);
    const fxn = createFx(1); // next to iterate this step
    player.connect(fx0).connect(fx1).connect(fxn).toDestination();

    player.autostart = true;
  };
  return <button onClick={generateFx}>generate random fx chain</button>;
};

export default FxChain;
