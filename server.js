
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

const startNodeServer = (handle) => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }))

  server.get('/getNoteListSortbyBook', async (req, res) => {
    const { data: booklist, error } = await supabase.from('Notebook').select('name, id')
    const noteResList = await Promise.all(booklist.map((book) => (supabase.from('Note').select('name, id').eq('notebook_id', book.id) .order('id', { ascending: true }))))
    res.json(booklist.map((book, index) => ({ ...book, notelist: noteResList[index].data })))
  })

  server.get('/getNote/:id', async (req, res) => {
    const { data } = await supabase.from('Note').select().eq('id', req.params.id).maybeSingle()
    res.json(data)
  })

  server.post('/createNote', async (req, res) => {
    const { data: { user } } = await supabase.auth.getUser()
    const result = await supabase.from('Note').insert({ ...req.body, user_id: user.id })
    res.json(result)
  })

  server.post('/editNote', async (req, res) => {
    const result = await supabase.from('Note').update({ ...req.body }).eq('id', req.body.id)
    res.json(result)
  })
  
  server.get('/getProjectCount', async (req, res) => {
    const { count } = await supabase.from('Project').select('*', { count: 'exact', head: true })
    res.json(count)
  })

  server.get('/getProjectList/:page', async (req, res) => {
    const { data } = await supabase.from('Project').select('id, name, created_at').range((req.params.page - 1) * 10, req.params.page * 10)
    res.json(data)
  })

  if (process.env.NODE_ENV !== "production") {
    server.get("*", (req, res) => {
      return handle(req, res);
    })
  }

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");

    if (process.env.NODE_ENV === "production") {
      const exec = require('child_process').exec;
      console.log('开始构建');
      console.log('======================');
      const child_process = exec('rm -rf build && rm -rf .next && next build', (err, stdout, stderr) => {
        if (err) {
          console.log(err);
        }
        if (stderr) {
          console.log('stderr: ' + stderr);
        }
      })
      child_process.stdout.on('data', data => {
        console.log(data)
      })
      child_process.on('exit', (code, signal) => {
        console.log('======================');
        console.log('构建完成');
        process.exit(1);
      })
    }
  })
}

if (process.env.NODE_ENV !== "production") {
  const app = next({ dev: true });
  const handle = app.getRequestHandler()
  app.prepare().then(() => startNodeServer(handle)).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
} else {
  startNodeServer()
}