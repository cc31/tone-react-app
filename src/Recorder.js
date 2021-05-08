import React from "react";
import { useGlobalContext } from "./context";

const Recorder = () => {
  const {
    isRecording,
    setIsRecording,
    recordedAudio,
    setRecordedAudio,
    userMed,
  } = useGlobalContext();

  const startRecording = (mediaRecorder) => {
    mediaRecorder.start();
    setIsRecording(true);

    // If audio data available then push it to the chunk array
    mediaRecorder.ondataavailable = (ev) => {
      dataArray.push(ev.data);
    };

    // Chunk array to store the audio data
    let dataArray = [];

    // Convert the audio data in to blob after stopping the recording
    mediaRecorder.onstop = (ev) => {
      // blob of type mp3
      let audioData = new Blob(dataArray, { type: "audio/mp3;" });

      // After fill up the chunk array make it empty
      dataArray = [];

      // Creating audio url with reference of created blob named 'audioData'
      let audioSrc = window.URL.createObjectURL(audioData);
      setRecordedAudio(audioSrc);
    };
  };

  const stopRecording = (mediaRecorder) => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const toggleRecording = (e) => {
    e.preventDefault();
    isRecording
      ? stopRecording(userMed.mediaRecorder)
      : startRecording(userMed.mediaRecorder);
  };

  return (
    <div>
      <button
        onClick={toggleRecording}
        className={isRecording ? "recording" : null}
      >
        {isRecording ? "stop recording" : "record"}
      </button>
      {recordedAudio && (
        <audio src={recordedAudio} id="srcPlayback" controls></audio>
      )}
    </div>
  );
};

export default Recorder;
