'use client'

import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { FileIcon } from "@radix-ui/react-icons"
import Link from 'next/link';
import CreateNoteDialog from "./CreateNoteDialog";

export default function NoteList ({ currentBookId, currentNoteId, notelist }) {
  return (
    <>
      { process.env.NODE_ENV !== "production" && <div className="border-b border-solid border-black h-14"><CreateNoteDialog currentBookId={currentBookId} currentNoteId={currentNoteId} /></div> }
      <ScrollArea className="flex-1 flex flex-col gap-4 py-2">
        <nav className="grid gap-1 px-2">
          {
            notelist.map((note, index) => (
              <Link key={note.id} href={`/note/${currentBookId}/${note.id}`}>
                <Button variant={ `${note.id}` === currentNoteId ? '': 'ghost' } className="text-lg h-12 justify-start w-full">
                  <FileIcon className="mr-2 h-6 w-6"/>
                  { note.name }
                </Button>
              </Link>
            ))
          }
        </nav>
      </ScrollArea>
    </>
  )
}