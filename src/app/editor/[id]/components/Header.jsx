import { useContext } from 'react';
import { FilesContext } from './IDE';
import { MessageTypes, dispatchMessage } from '@/utils/Message';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/ui/menubar"
import Link from "next/link";

export default function Header({ syncFileContent, saveProject }) {
  const { filesValue } = useContext(FilesContext);

  const startSketch = (files) => {
    dispatchMessage({
      type: MessageTypes.SKETCH,
      payload: {
        files,
        basePath: window.location.pathname,
      }
    });
    dispatchMessage({
      type: MessageTypes.START
    });
  }
  
  const startProject = () => {
    syncFileContent();
    startSketch(filesValue.files);
  }

  return (
    <>
      <Menubar className="px-4 h-12 shadow-none">
        <MenubarMenu>
          <MenubarTrigger>项目</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={saveProject}>
              保存项目<MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="focus:shadow-none">文件</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              新建文件
            </MenubarItem>
            <MenubarItem>
              新建文件夹
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="focus:shadow-none">运行</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={startProject}>
              开始运行
            </MenubarItem>
            <MenubarItem>
              停止运行
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <div className='flex-1'></div>
        <MenubarMenu>
          <Link href="/" className="focus:shadow-none">
            <div className="flex justify-center w-14"></div>
          </Link>
        </MenubarMenu>
      </Menubar>
    </>
  );
}