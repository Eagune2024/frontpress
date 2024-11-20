import { Button } from "@/ui/button"
import { usePublisher, insertJsx$ } from '@mdxeditor/editor'
import IDE from "@/app/editor/[id]/components/IDE"

const project = {
  "name": "New",
  "id": 24,
  "files": [
      {
          "name": "root",
          "id": "672d66e9c82a4138c9ebeb73",
          "_id": "672d66e9c82a4138c9ebeb73",
          "children": [
              "672d66e9c82a4138c9ebeb71",
              "672d66e9c82a4138c9ebeb70",
              "672d66e9c82a4138c9ebeb72"
          ],
          "fileType": "folder",
          "content": ""
      },
      {
          "name": "index.js",
          "content": "function write() {\n  document.write('xxxxx')\n}\nwrite()  \n",
          "id": "672d66e9c82a4138c9ebeb70",
          "_id": "672d66e9c82a4138c9ebeb70",
          "isSelectedFile": true,
          "fileType": "file",
          "fileContentType": "javascript",
          "children": [],
          "filePath": ""
      },
      {
          "name": "index.html",
          "content": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">\n    <meta charset=\"utf-8\" />\n  </head>\n  <body>\n    <main>\n    </main>\n    <script src=\"index.js\"></script>\n  </body>\n</html>\n",
          "id": "672d66e9c82a4138c9ebeb71",
          "_id": "672d66e9c82a4138c9ebeb71",
          "fileType": "file",
          "fileContentType": "html",
          "children": [],
          "filePath": ""
      },
      {
          "name": "style.css",
          "content": "html, body {\n  margin: 0;\n  padding: 0;\n  background: aliceblue;\n}\n",
          "id": "672d66e9c82a4138c9ebeb72",
          "_id": "672d66e9c82a4138c9ebeb72",
          "fileType": "file",
          "fileContentType": "css",
          "children": [],
          "filePath": ""
      }
  ],
  "created_at": "2024-11-08T01:18:32.25193+00:00"
}

export const InsertDemoDirectiveDescriptor = {
    name: 'DemoNode',
    kind: 'text',
    source: './external',
    props: [{ name: 'projectId', type: 'string' }],
    hasChildren: false,
    Editor: (props) => {
      console.log(props)
      return (<IDE project={project} origin={process.env.NEXT_PUBLIC_PREVIEW_URL} />)
    }
}

export default function InsertDemoButton () {
  const insertJsx = usePublisher(insertJsx$)

  const insertDemo = () => {
    insertJsx({
      name: 'DemoNode',
      kind: 'flow',
      props: { projectId: '24' }
    })
  }

  return (
    <Button onClick={insertDemo}>插入Demo</Button>
  )
}