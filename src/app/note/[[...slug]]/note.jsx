'use client'

import EditNoteTitleDialog from "./EditNoteTitleDialog"
import MDXEditor from '@/ui/MDXEditor'

export default function Note ({ currentBookId, note }) {
  const markdown = `
  * Item 1
  * Item 2
  * Item 3
    * nested item

  1. Item 1
  2. Item 2
`


  return (
    <>
      <div className="border-b border-solid border-black h-14 flex items-center pl-4">
        { note.name }
        <EditNoteTitleDialog currentBookId={currentBookId} note={note} />
      </div>
      <MDXEditor markdown={markdown} onChange={console.log} />
    </>
  )
}