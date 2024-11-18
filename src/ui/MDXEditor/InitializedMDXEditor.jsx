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
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './index.css'

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
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          )
        })
      ]}
      {...props}
      ref={editorRef}
    />
  )
}