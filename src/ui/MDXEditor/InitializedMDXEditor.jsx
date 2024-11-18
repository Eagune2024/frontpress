'use client'

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

export default function InitializedMDXEditor({ editorRef, ...props }) {
  return (
    <MDXEditor
      className='dark-theme dark-editor'
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarClassName: 'my-classname',
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