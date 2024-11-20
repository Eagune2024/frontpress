'use client'

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  jsxPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  InsertTable,
  Separator,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './index.css'
import InsertDemoButton, { InsertDemoDirectiveDescriptor } from './insertDemo'

export default function InitializedMDXEditor({ editorRef, ...props }) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        jsxPlugin({
          jsxComponentDescriptors: [InsertDemoDirectiveDescriptor]
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <Separator />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <InsertTable />
              <Separator />
              <InsertDemoButton />
            </>
          )
        })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}