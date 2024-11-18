import dynamic from 'next/dynamic'
import { forwardRef } from "react"

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false
})
const ForwardRefEditor = forwardRef((props, ref) => <Editor {...props} editorRef={ref} />)
ForwardRefEditor.displayName = 'ForwardRefEditor'

export default ForwardRefEditor