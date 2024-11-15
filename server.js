
const express = require('express')
const next = require('next')
const { createServerClient } = require('@supabase/ssr')
const cookieStore = new Map()
require('dotenv').config();

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    cookies: {
      getAll() {
        return [...cookieStore].map(([key, value]) => ({ [key]: value }))
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value)
        )
      },
    },
  }
)
supabase.auth.signInWithPassword({
  email: process.env.NEXT_PUBLIC_SUPABASE_USER,
  password: process.env.NEXT_PUBLIC_SUPABASE_PASSWORD,
})
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.get('/getNoteListSortbyBook', async (req, res) => {
    const { data: booklist, error } = await supabase.from('Notebook').select('name, id')
    const noteResList = await Promise.all(booklist.map((book) => (supabase.from('Note').select('name, id').eq('notebook_id', book.id))))
    res.json(booklist.map((book, index) => ({ ...book, notelist: noteResList[index].data })))
  })

  server.get("*", (req, res) => {
    return handle(req, res);
  })

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})