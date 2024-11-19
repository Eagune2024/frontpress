import Preview from "./components/Preview"

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/getProjectList')
  const projectlist = await res.json()
  return projectlist.map((project) => ({ 'id': `${project.id}` }))
}

export default async function EditorView ({ params }) {
  const { id } = await params

  const res = await fetch('http://localhost:3000/getProject/' + id)
  const project = await res.json()

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Preview project={project} origin={process.env.NEXT_PUBLIC_PREVIEW_URL} />
    </div>
  )
}
