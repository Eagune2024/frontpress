import IDE from "./components/IDE"

export default function EditorView () {
  return (
    <div className='w-screen h-screen flex flex-col rounded-xl border border-black overflow-hidden'>
      <IDE />
    </div>
  )
}