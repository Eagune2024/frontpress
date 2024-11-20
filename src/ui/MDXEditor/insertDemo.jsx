import { Button } from "@/ui/button"
import { usePublisher, insertJsx$ } from '@mdxeditor/editor'
import IDE from "@/app/editor/[id]/components/IDE"

export const InsertDemoDirectiveDescriptor = {
    name: 'DemoNode',
    kind: 'text',
    source: './external',
    props: [{ name: 'projectJSON', type: 'string' }],
    hasChildren: false,
    Editor: ({ mdastNode: { attributes } }) => {
      const projectJSON = attributes.find((attr) => (attr.name === 'projectJSON'))?.value
      const project = JSON.parse(projectJSON)
      return (<IDE project={project} origin={process.env.NEXT_PUBLIC_PREVIEW_URL} />)
    }
}

export default function InsertDemoButton () {
  const insertJsx = usePublisher(insertJsx$)

  const insertDemo = async () => {
    const res = await fetch('http://localhost:3000/getProject/24')
    const project = await res.json()
    insertJsx({
      name: 'DemoNode',
      kind: 'flow',
      props: { projectJSON: JSON.stringify(project) }
    })
  }

  return (
    <Button onClick={insertDemo}>插入Demo</Button>
  )
}