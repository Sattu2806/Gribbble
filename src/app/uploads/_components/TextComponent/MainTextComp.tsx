import React, { useEffect } from 'react'
import EditorComp from './EditorComp'
import { useMenuStore } from '@/hooks/use-menu'
import useUploadDataStore from '@/hooks/use-upload-data'
import { ArrowDown, ArrowUp, Copy, Trash2,Plus } from 'lucide-react'
import {v4 as uuidv4} from "uuid"
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import useEditorStore from '@/hooks/use-editor'

type Props = {
    entryId:string
}

const MainTextComp = ({entryId}: Props) => {
    const {setSelectedEntryId, setSelectedmenu,onOpenMenu,isMenuOpen,selectedEntryId} = useMenuStore()
    const {getEntry,updateEntry,removeEntry,moveEntryDown,moveEntryUp,copyEntry} = useUploadDataStore()
    const {createEditor,getEditor} = useEditorStore()


    const addEditor = (htmlContent:string) => {
        let Content = htmlContent
        const newEditor = createEditor({
            extensions:[
                StarterKit,Underline,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Link.configure({
                    openOnClick: true,
                    defaultProtocol:'https'
                })
            ],
            editorProps:{
                attributes:{
                    class:'prose w-full leading-3 p-5 focus:outline-[2px] focus:border-[2px] focus:border-pink-500 focus:outline-pink-500 rounded-xl transition-all ease-in duration-150 prose-a:font-semibold prose-a:text-pink-500 prose:leading-loose'
                }
            },
            content: Content
        })
        
        return newEditor
    }

    const editor = getEditor(entryId)
    
  return (
    <div>
        <div className='flex items-center mt-10'>
            <div className='w-10/12 mx-auto px-32 md:px-16 sm:px-6 relative'>
                <div>
                    <EditorComp entryId={entryId} />
                </div>
            <div className={`absolute -top-12 -right-0 w-10 p-2 py-4 rounded-full flex flex-col items-center justify-center gap-3 bg-white shadow-xl ${isMenuOpen && selectedEntryId === entryId ? "" :"hidden"}`}>
                    <ArrowUp onClick={() => moveEntryUp(entryId)} size={16}/>
                    <ArrowDown onClick={() => moveEntryDown(entryId)} size={16}/>
                    <div className='inline-block bg-neutral-800 h-[0.1px] w-2/4'/>
                    <Copy
                        onClick={() => {
                            const htmlContent = editor ? editor.getHTML() :''
                            const newEditorId = addEditor(htmlContent)
                            copyEntry(entryId,newEditorId)
                        }}
                        size={16}
                    />
                    <div className='inline-block bg-neutral-800 h-[0.1px] w-2/4'/>
                    <Trash2 onClick={() => removeEntry(entryId)} className='text-red-500' size={16} />
            </div>
            </div>
        </div>
        <div className='flex opacity-0 hover:opacity-100 transition-all duration-150 ease-in items-center mt-10'>
            <div className='line border-2 h-[1.5px] border-pink-500 w-full rounded-full'></div>
            <button onClick={() => {setSelectedEntryId(entryId);setSelectedmenu('main');onOpenMenu()}} className='p-3 rounded-full bg-pink-500 flex items-center text-white'>
                <svg
                    data-v-351edcb1=""
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    svg-inline=""
                    role="presentation"
                    focusable="false"
                    fill="currentColor"
                    tabIndex={1}
                    className="w-4"
                >
                    <path
                        data-v-351edcb1=""
                        d="M20 10h-6V4a2 2 0 00-4 0v6H4a2 2 0 000 4h6v6a2 2 0 004 0v-6h6a2 2 0 000-4z"
                    ></path>
                </svg>
            </button>
            <div className='line border-2 h-[1.5px] border-pink-500 w-full rounded-full'></div>
        </div>
    </div>
  )
}

export default MainTextComp