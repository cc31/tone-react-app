import React, { useState, useContext, useEffect, useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [userMed, setUserMed] = useState({
    audioContext: null,
    mediaRecorder: null,
  });
  // const [loading, setLoading] = useState(false);

  // fetch user media
  const getMedia = useCallback(async () => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      /* use the stream */
      if (stream) {
        const audioContext = new AudioContext();
        const mediaRecorder = new MediaRecorder(stream);
        setUserMed({ audioContext, mediaRecorder });
      }
    } catch (err) {
      /* handle the error */
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getMedia();
  }, [getMedia]);

  return (
    <AppContext.Provider
      value={{
        isRecording,
        setIsRecording,
        recordedAudio,
        setRecordedAudio,
        userMed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
