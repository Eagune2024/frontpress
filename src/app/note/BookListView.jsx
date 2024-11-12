import supabase from "@/utils/supabaseClient";
import { unstable_cache } from 'next/cache'
import { Button } from "@/ui/button"
import { FileTextIcon } from "@radix-ui/react-icons"

const getBookList = unstable_cache(
  async () => {
    return await supabase.from('Notebook').select('name, id, created_at')
  },
  ['BookList'],
  { revalidate: 60, tags: ['BookList'] }
)

export default async function BookListView () {
  const { data: BookList, error } = await getBookList()

  return (
    <nav className="grid gap-1 px-2">
      {
        BookList.map((book) => (
          <Button variant="ghost" className="h-8" key={book.id}>
            <FileTextIcon className="mr-1 h-4 w-4" />
            { book.name }
            <span className="ml-auto dark:text-white">{ book.note }</span>
          </Button>
        ))
      }
    </nav>
  )
}