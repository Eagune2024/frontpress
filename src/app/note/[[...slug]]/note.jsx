'use client'

import EditNoteTitleDialog from "./EditNoteTitleDialog"
import MDXEditor from '@/ui/MDXEditor'
import useDebounce from '@/utils/useDebounce'

export default function Note ({ currentBookId, note }) {
  const saveContent = async (content) => {
    await fetch('http://localhost:3000/editNote', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        content,
      })
    })
  }

  const save = useDebounce(saveContent, 1500)

  return (
    <>
      <div className="border-b border-solid border-black h-14 flex items-center pl-4">
        { note.name }
        <EditNoteTitleDialog currentBookId={currentBookId} note={note} />
      </div>
      <div className="flex-1 overflow-auto">
        <MDXEditor markdown={note.content} onChange={save} />
      </div>
    </>
  )
}