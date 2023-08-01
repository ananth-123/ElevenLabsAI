"use client"

import { useState } from "react"

export function MicButton({ sttFromMic, micOn, setMicOn }) {
  return (
    <div
      onClick={() => {
        if (!micOn) {
          setMicOn(true)
          sttFromMic()
        }
      }}
      className={
        "absolute p-4 mb-2 rounded-full  h-fit cursor-pointer left-1/2 -translate-x-1/2 bottom-5 " +
        (!micOn ? "bg-red-600" : "bg-gray-500")
      }
    >
      <svg
        className={micOn ? "block" : "hidden"}
        focusable="false"
        width="30"
        height="30"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="white"
        className={micOn ? "hidden" : "block"}
      >
        <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"></path>
        <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path>
      </svg>
    </div>
  )
}
