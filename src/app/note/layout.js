import HomeLayout from '../layout/homeLayout'
import BookListView from './BookListView'
import { Suspense } from "react";
import { ScrollArea } from "@/ui/scroll-area"

export default function HomeNoteLayout ({ children }) {
  return (
    <HomeLayout>
      <div className="flex flex-1 border border-black m-4 rounded-lg overflow-hidden">
        <div className="h-full flex flex-col border-r border-black w-72">
          <ScrollArea className="flex-1 flex flex-col gap-4 py-2 border-r">
            <Suspense fallback={<div className="m-2">Loading...</div>}>
              <BookListView />
            </Suspense>
          </ScrollArea>
        </div>
        <div className="h-full flex flex-col border-r border-black w-80">
          { children }
        </div>
        <div className="flex-1">
          <div className="border-b border-solid border-black h-14 flex items-center pl-4"></div>
        </div>
      </div>
    </HomeLayout>
  )
}