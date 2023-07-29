'use client'
import { getTokenOrRefresh } from '@/lib/token_util';
import { ResultReason, CancellationReason } from 'microsoft-cognitiveservices-speech-sdk';
import { useState } from 'react';

const speechsdk =  require( 'microsoft-cognitiveservices-speech-sdk');

const MicTest = () => {
  const [displayText, setDisplayText] = useState("")
  
  const sttFromMic = async () => { 
  let out = ""
  let stopper
  const tokenObj = await getTokenOrRefresh();
  const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
  speechConfig.speechRecognitionLanguage = 'en-US';
  
  const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

  var pronunciationAssessmentConfig = speechsdk.PronunciationAssessmentConfig.fromJSON("{\"referenceText\":\"good morning\",\"gradingSystem\":\"HundredMark\",\"granularity\":\"Phoneme\",\"phonemeAlphabet\":\"IPA\",\"nBestPhonemeCount\":5}");
  pronunciationAssessmentConfig.applyTo(recognizer);

  setDisplayText('speak into your microphone...')
  recognizer.recognizing = (s, e) => {
    setDisplayText(`RECOGNIZING: Text=${e.result.text}`);
    console.log("Recognizing")
    clearTimeout(stopper)
};
recognizer.recognized = (s, e) => {
  console.log("Reconed")
    if (e.result.reason == ResultReason.RecognizedSpeech) {
      out += e.result.text + " "
      
      // var h = speechsdk.PronunciationAssessmentResult.fromResult(e.result.text)
      console.log(e.result.text.properties.getProperty(speechsdk.PropertyId.SpeechServiceResponse_JsonResult))
  

      
      setDisplayText(`RECOGNIZED: Text=${e.result.text}`);
    }
    else if (e.result.reason == ResultReason.NoMatch) {
        setDisplayText("NOMATCH: Speech could not be recognized.");
    }
    stopper = setTimeout(()=>{
      recognizer.stopContinuousRecognitionAsync();
    }, 5000)
};
recognizer.canceled = (s, e) => {
  console.log(`CANCELED: Reason=${e.reason}`);

  if (e.reason == CancellationReason.Error) {
      console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
      console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
      console.log("CANCELED: Did you set the speech resource key and region values?");
  }


  recognizer.stopContinuousRecognitionAsync();
};

recognizer.sessionStopped = (s, e) => {
  console.log("\n    Session stopped event.");
  console.log("Final Result: ", out);
  recognizer.stopContinuousRecognitionAsync();
};

recognizer.startContinuousRecognitionAsync();


}

return (
  <div className="app-container">
      <h1 className="display-4 mb-3">Speech sample app</h1>

      <div className="row main-container">
          <div className="col-6">
              <i className="fas fa-microphone fa-lg mr-2" onClick={() => sttFromMic()}>Mic Button</i>
              Convert speech to text from your mic.
              
          </div>
          <div className="col-6 output-display rounded">
              <code>{displayText}</code>
          </div>
      </div>
  </div>
);
}

export default MicTest