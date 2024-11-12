'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

export default function HomeLayout({ children }) {
  const pathname = usePathname()
 
  const linkCommonClass = 'p-6 h-full hover:bg-slate-200'
  const pptClassNames = classnames(linkCommonClass, { 'bg-slate-200': pathname === '/ppt' })
  const noteClassNames = classnames(linkCommonClass, { 'bg-slate-200': pathname === '/note' })
  const demoClassNames = classnames(linkCommonClass, { 'bg-slate-200': pathname === '/demo' })

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center bg-slate-50">
        <Link href="" className="focus:shadow-none">
          <div className="flex justify-center w-40"></div>
        </Link>
        <Link href="/ppt" className={pptClassNames}>演示</Link>
        <Link href="/note" className={noteClassNames}>笔记</Link>
        <Link href="/demo" className={demoClassNames}>代码</Link>
      </div>
      { children }
    </div>
  );
}