import HomeLayout from '@/app/layout/homeLayout'
import { redirect } from 'next/navigation';
import BookList from './booklist';
import NoteList from './notelist';
import Note from './note';

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/getNoteListSortbyBook')
  const booklist = await res.json()
  return booklist.reduce((params, book, index) => {
    return params.concat([{ 'slug': [`${book.id}`] }]).concat(book.notelist.map((note) => ({ 'slug': [`${book.id}`, `${note.id}`] })))
  }, [{ 'slug': undefined }])
}

export default async function HomeNoteLayout ({ params }) {
  const { slug } = await params

  const res = await fetch('http://localhost:3000/getNoteListSortbyBook')
  const booklist = await res.json()

  if (!slug && booklist.length && process.env.NODE_ENV === "production") {
    redirect(`/note/${booklist[0].id}`)
  }

  const [currentBookId, currentNoteId] = slug || []
  const notelist = booklist.find((book) => `${book.id}` === currentBookId)?.notelist || []

  if (!currentNoteId && notelist.length && process.env.NODE_ENV === "production") {
    redirect(`/note/${currentBookId}/${notelist[0].id}`)
  }

  const resNote = await fetch('http://localhost:3000/getNote/' + currentNoteId)
  const note = await resNote.json()

  return (
    <HomeLayout>
      <div className="flex flex-1 border border-black m-4 rounded-lg overflow-hidden">
        <div className="h-full flex flex-col border-r border-black w-72 overflow-hidden">
          <BookList currentBookId={currentBookId} booklist={booklist} />
        </div>
        {
          currentBookId &&
          <div className="h-full flex flex-col border-r border-black w-80">
            <NoteList currentBookId={currentBookId} currentNoteId={currentNoteId} notelist={notelist} />
          </div>
        }
        <div className="flex-1 flex flex-col">
          { note && <Note currentBookId={currentBookId} note={note} /> }
        </div>
      </div>
    </HomeLayout>
  )
}