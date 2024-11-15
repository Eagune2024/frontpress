'use client'

import { ScrollArea } from "@/ui/scroll-area"
import { Button } from "@/ui/button"
import { FileTextIcon } from "@radix-ui/react-icons"
import Link from 'next/link';

export default function BookList ({ currentBookId, booklist }) {
  return (
    <>
      <ScrollArea className="flex-1 flex flex-col gap-4 py-2 w-72 border-r">
        <nav className="grid gap-1 px-2">
          {
            booklist.map((book) => (
              <Link key={book.id} href={`/note/${book.id}`}>
                <Button variant={ `${book.id}` === currentBookId ? '' : 'ghost'} className="text-lg h-12 w-full" >
                  <FileTextIcon className="mr-1 h-4 w-4" />
                  { book.name }
                  <span className="ml-auto dark:text-white">{ book.note }</span>
                </Button>
              </Link>
            ))
          }
        </nav>
      </ScrollArea>
    </>
  )
}
