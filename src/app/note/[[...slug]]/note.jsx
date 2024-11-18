'use client'

import EditNoteTitleDialog from "./EditNoteTitleDialog"
import MDXEditor from '@/ui/MDXEditor'

export default function Note ({ currentBookId, note }) {
  const markdown = `
  # Welcome

  This is a **live demo** of MDXEditor with all default features on.

  > The overriding design goal for Markdown’s formatting syntax is to make it as readable as possible.
  > The idea is that a Markdown-formatted document should be publishable as-is, as plain text,
  > without looking like it’s been marked up with tags or formatting instructions.

  In here, you can find the following markdown elements:

  * Headings
  * Lists
    * Unordered
    * Ordered
    * Check lists
    * And nested ;)
  * Links
  * Bold/Italic/Underline formatting
  * Tables
  * Code block editors
  * And much more.

  The current editor content is styled using the \`@tailwindcss/typography\`

  ## What can you do here?

  This is a great location for you to test how editing markdown feels. If you have an existing markdown source, you can switch to source mode using the toggle group in the top right, paste it in there, and go back to rich text mode.

  If you need a few ideas, here's what you can try:

  1. Add your own code sample
  2. Change the type of the headings
  3. Insert a table, add a few rows and columns
  4. Switch back to source markdown to see what you're going to get as an output
  5. Test the diff feature to see how the markdown has changed
  6. Add a frontmatter block through the toolbar button

  ## A code sample

  MDXEditor embeds CodeMirror for code editing.


  ## A live code example

  The block below is a live React component. You can configure multiple live code presets that specify the available npm packages and the default imports. You can also specify a default component that will be rendered in the live code block.

  ## A table

  Play with the table below - add rows, columns, change column alignment. When editing,
  you can navigate the cells with \`enter\`, \`shift+enter\`, \`tab\` and \`shift+tab\`.
`


  return (
    <>
      <div className="border-b border-solid border-black h-14 flex items-center pl-4">
        { note.name }
        <EditNoteTitleDialog currentBookId={currentBookId} note={note} />
      </div>
      <div className="flex-1 overflow-auto">
        <MDXEditor markdown={markdown} onChange={console.log} />
      </div>
    </>
  )
}