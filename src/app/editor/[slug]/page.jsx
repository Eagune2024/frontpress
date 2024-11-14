import supabase from "@/utils/supabaseClient";
import IDE from "./components/IDE"

export async function generateStaticParams() {
  const { data: projectlist, error } = await supabase.from('Project').select('id')
  return [{ 'slug': undefined }].concat(projectlist.map((project) => ({ 'slug': `${project.id}` })))
}

export default async function EditorView ({ params }) {
  const { slug } = await params

  const { data } = await supabase.from('Project').select('name, id, files, created_at').eq('id', slug).maybeSingle()
  const project = data || {}

  return (
    <div className='w-screen h-screen flex flex-col rounded-xl border border-black overflow-hidden'>
      <IDE project={project} origin={process.env.NEXT_PUBLIC_PREVIEW_URL} />
    </div>
  )
}
