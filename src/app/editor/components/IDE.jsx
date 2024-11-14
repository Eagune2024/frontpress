'use client'

import React, { useState, useEffect, useRef } from 'react';
import Header from "./Header"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/ui/resizable"
import SideBar from './Sidebar';
import Editor from './Editor';

export const FilesContext = React.createContext();

export default function IDE({}) {
  const [filesValue, setFileValue] = useState({
    files: [],
    selectedFile: null
  });
  const editorRef = useRef();

  return (
    <FilesContext.Provider value={{ filesValue, setFileValue }}>
      <Header />
      <ResizablePanelGroup direction="horizontal" className="h-full overflow-hidden">
        <ResizablePanel defaultSize={50}>
          <SideBar />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-black" />
        <ResizablePanel defaultSize={150} className="relative">
          <Editor ref={editorRef}  className="relative" />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-black" />
        <ResizablePanel defaultSize={150}>
          <section className="flex flex-col h-full">
            <header className="h-10 flex pl-2 items-center border-x-0 border border-black">
              <h2>预览</h2>
            </header>
            <div className='w-full relative flex-1'>
            </div>
          </section>
        </ResizablePanel>
      </ResizablePanelGroup>
    </FilesContext.Provider>
  )
}