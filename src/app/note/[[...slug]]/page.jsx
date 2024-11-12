import HomeLayout from '@/app/layout/homeLayout'
import { Suspense } from "react";
import { ScrollArea } from "@/ui/scroll-area"
import supabase from "@/utils/supabaseClient";
import { unstable_cache } from 'next/cache'
import { Button } from "@/ui/button"
import { FileTextIcon } from "@radix-ui/react-icons"
import { redirect } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const { data: booklist, error } = await getBookList()
  return [{ 'slug': undefined }].concat(booklist.map((book) => ({ 'slug': [`${book.id}`] })))
}

const getBookList = unstable_cache(
  async () => {
    return await supabase.from('Notebook').select('name, id, created_at')
  },
  ['BookList'],
  { revalidate: 60, tags: ['BookList'] }
)

export default async function HomeNoteLayout ({ params }) {
  const { slug } = await params
  const { data: booklist, error } = await getBookList()

  if (!slug && booklist.length) {
    redirect(`/note/${booklist[0].id}`)
  }

  const [currentBookId, currentNoteId] = slug
  
  console.log(currentBookId, currentNoteId)

  return (
    <HomeLayout>
      <div className="flex flex-1 border border-black m-4 rounded-lg overflow-hidden">
        <div className="h-full flex flex-col border-r border-black w-72">
          <ScrollArea className="flex-1 flex flex-col gap-4 py-2 border-r">
            <nav className="grid gap-1 px-2">
              {
                booklist.map((book) => (
                  <Link key={book.id} href={`/note/${book.id}`}>
                    <Button variant={`${book.id}` === currentBookId ? '' : 'ghost'} className="h-8 w-full" >
                      <FileTextIcon className="mr-1 h-4 w-4" />
                      { book.name }
                      <span className="ml-auto dark:text-white">{ book.note }</span>
                    </Button>
                  </Link>
                ))
              }
            </nav>
          </ScrollArea>
        </div>
        <div className="h-full flex flex-col border-r border-black w-80">
        </div>
        <div className="flex-1">
          <div className="border-b border-solid border-black h-14 flex items-center pl-4"></div>
        </div>
      </div>
    </HomeLayout>
  )
}