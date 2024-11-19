'use client'

import EditNoteTitleDialog from "./EditNoteTitleDialog"
import MDXEditor from '@/ui/MDXEditor'
import useDebounce from '@/utils/useDebounce'
import DeleteNoteAlertDialog from './DeleteNoteAlertDialog'

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
        <span className="mr-2">{ note.name }</span>
        { process.env.NODE_ENV !== "production" && <EditNoteTitleDialog currentBookId={currentBookId} note={note} /> }
        { process.env.NODE_ENV !== "production" && <DeleteNoteAlertDialog currentBookId={currentBookId} note={note} /> }
      </div>
      <div className="flex-1 overflow-auto">
        <MDXEditor markdown={note.content} onChange={save} />
      </div>
    </>
  )
}