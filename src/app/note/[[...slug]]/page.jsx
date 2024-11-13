import HomeLayout from '@/app/layout/homeLayout'
import { ScrollArea } from "@/ui/scroll-area"
import supabase from "@/utils/supabaseClient";
import { Button } from "@/ui/button"
import { FileTextIcon, FileIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { redirect } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const { data: booklist, error } = await supabase.from('Notebook').select('name, id, created_at')
  const noteResList = await Promise.all(booklist.map((book) => (supabase.from('Note').select('name, id, created_at').eq('notebook_id', book.id))))
  return noteResList.reduce((params, { data: notelist }, index) => {
    return params.concat([{ 'slug': [`${booklist[index].id}`] }]).concat(notelist.map((note) => ({ 'slug': [`${booklist[index].id}`, `${note.id}`] })))
  }, [{ 'slug': undefined }])
}

export default async function HomeNoteLayout ({ params }) {
  const { slug } = await params
  const { data: booklist, errorNoteBook } = await supabase.from('Notebook').select('name, id, created_at')

  if (!slug && booklist.length) {
    redirect(`/note/${booklist[0].id}`)
  }

  const [currentBookId, currentNoteId] = slug
  const { data: notelist, errorNote } = await supabase.from('Note').select('name, id, created_at').eq('notebook_id', currentBookId)

  if (!currentNoteId && notelist.length) {
    redirect(`/note/${currentBookId}/${notelist[0].id}`)
  }

  const { data } = await supabase.from('Note').select('name, id, content, created_at').eq('id', currentNoteId).maybeSingle()
  const note = data || {}

  return (
    <HomeLayout>
      <div className="flex flex-1 border border-black m-4 rounded-lg overflow-hidden">
        <div className="h-full flex flex-col border-r border-black w-72">
          <ScrollArea className="flex-1 flex flex-col gap-4 py-2 border-r">
            <nav className="grid gap-1 px-2">
              {
                booklist.map((book) => (
                  <Link key={book.id} href={`/note/${book.id}`}>
                    <Button variant={ `${book.id}` === currentBookId ? '' : 'ghost'} className="h-8 w-full" >
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
          <ScrollArea className="flex-1 flex flex-col gap-4 py-2">
            <nav className="grid gap-1 px-2">
              {
                notelist.map((note, index) => (
                  <Link key={note.id} href={`/note/${currentBookId}/${note.id}`}>
                    <Button variant={ `${note.id}` === currentNoteId ? '': 'ghost' } className="h-8 justify-start w-full">
                      <FileIcon className="mr-2 h-6 w-6"/>
                      { note.name }
                    </Button>
                  </Link>
                ))
              }
            </nav>
          </ScrollArea>
        </div>
        <div className="flex-1">
          <div className="border-b border-solid border-black h-14 flex items-center pl-4">
            { note.name }
            <Button variant="link"><Pencil2Icon className="mr-2"/></Button>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}