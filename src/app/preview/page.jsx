'use client'

import React, { useEffect, useState } from 'react';
import { registerFrame, MessageTypes, listen, dispatchMessage } from "@/utils/Message";
import EmbedFrame from './components/EmbedFrame';
import { Hook } from 'console-feed';
import { isBrowser } from '@/utils/isBrowser';

if (isBrowser()) {
  const editor = window.parent.parent;
  const consoleBuffer = [];
  const LOGWAIT = 500;
  Hook(window.console, (log) => {
    consoleBuffer.push({ log });
  });
  setInterval(() => {
    if (consoleBuffer.length > 0) {
      const message = {
        messages: consoleBuffer,
        source: 'sketch'
      };
      editor.postMessage(message, process.env.NEXT_PUBLIC_PREVIEW_URL || window.origin);
      consoleBuffer.length = 0;
    }
  }, LOGWAIT);
}


export default function PreviewView () {
  const [files, setFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [basePath, setBasePath] = useState('');

  if (isBrowser()) {
    registerFrame(window.parent, process.env.NEXT_PUBLIC_PREVIEW_URL || window.origin);
  }

  function handleMessageEvent(message) {
    const { type, payload } = message;
    switch (type) {
      case MessageTypes.SKETCH:
        setFiles(payload.files);
        setBasePath(payload.basePath);
        break;
      case MessageTypes.START:
        setIsPlaying(true);
        break;
      case MessageTypes.STOP:
        setIsPlaying(false);
        break;
      case MessageTypes.REGISTER:
        dispatchMessage({ type: MessageTypes.REGISTER });
        break;
      default:
        break;
    }
  }
  
  useEffect(() => {
    const unsubscribe = listen(handleMessageEvent);
    return function cleanup() {
      unsubscribe();
    };
  });

  return (
    <EmbedFrame isPlaying={isPlaying} files={files} basePath={basePath} />
  )
}