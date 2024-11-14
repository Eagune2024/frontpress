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

export default function IDE({project}) {
  const indexHtmlFile = project.files.filter((file) => file.name === 'index.html')[0]

  const [filesValue, setFileValue] = useState({
    files: project.files,
    selectedFile: indexHtmlFile.id
  });
  const editorRef = useRef();

  const syncFileContent = () => {
    const curFile = filesValue.files?.find((file) => file.id === filesValue.selectedFile)
    if (curFile) {
      curFile.content = editorRef.current?.getContent()
    }
    setFileValue(filesValue)
  }

  return (
    <FilesContext.Provider value={{ filesValue, setFileValue }}>
      <Header syncFileContent={syncFileContent} />
      <ResizablePanelGroup direction="horizontal" className="h-full overflow-hidden">
        <ResizablePanel defaultSize={50}>
          <SideBar />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-black" />
        <ResizablePanel defaultSize={150} className="relative">
          <Editor ref={editorRef} className="relative" />
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