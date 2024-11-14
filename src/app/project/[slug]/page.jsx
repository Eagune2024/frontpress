import supabase from "@/utils/supabaseClient";
import Preview from "./components/Preview"

export async function generateStaticParams() {
  const { data: projectlist, error } = await supabase.from('Project').select('id')
  return [{ 'slug': undefined }].concat(projectlist.map((project) => ({ 'slug': `${project.id}` })))
}

export default async function EditorView ({ params }) {
  const { slug } = await params

  const { data } = await supabase.from('Project').select('name, id, files, created_at').eq('id', slug).maybeSingle()
  const project = data || {}

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Preview project={project} origin={process.env.PREVIEW_URL} />
    </div>
  )
}
