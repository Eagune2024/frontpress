'use client'

import React, { useState, useEffect } from 'react';
import PreviewFrame from '@/app/editor/[id]/components/PreviewFrame';
import useInterval from '@/utils/useInterval';
import { listen } from '@/utils/Message';
import { MessageTypes, dispatchMessage } from '@/utils/Message';

export default function IDE({ project, origin }) {
  const [isRendered, setIsRendered] = useState(false);

  const dispatch = () => {
    dispatchMessage({
      type: MessageTypes.SKETCH,
      payload: {
        files: project.files,
        basePath: window.location.pathname,
      }
    });
    dispatchMessage({
      type: MessageTypes.START
    });
  }

  const clearInterval = useInterval(() => {
    dispatchMessage({ type: MessageTypes.REGISTER });
  }, 100);
  if (isRendered) {
    clearInterval();
    dispatch();
  }

  function handleMessageEvent(message) {
    if (message.type === MessageTypes.REGISTER) {
      if (!isRendered) {
        setIsRendered(true);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = listen(handleMessageEvent);
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <PreviewFrame origin={origin} />
  )
}