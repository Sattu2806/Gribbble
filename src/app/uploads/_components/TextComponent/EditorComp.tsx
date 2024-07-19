import React, { useState } from 'react'
import {Editor, EditorContent, useEditor} from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import {ChevronDown} from "lucide-react"
import HeadingTextMenu from './HeadingTextMenu'
import TextEditor from './TextEditor'
import useHeadingStore from '@/hooks/use-headingtool'

type Props = {}

const EditorComp = (props: Props) => {
    const editor = useEditor({
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
        content: `          
        <div>
            <p>
              Write about post...
            </p>
        </div>
        `
    })


    console.log("editor",editor)

    if(!editor){
        return null
    }
  return (
    <div>
        <EditorContent editor={editor}/>
        <EditorToolBar editor={editor} /> 
    </div>
  )
}

export default EditorComp


const EditorToolBar = ({editor}:{editor:Editor}) => {
    const [open, setOpen] = useState<boolean>(false)
    const {selectedText} = useHeadingStore()
    return(
        <div className='absolute right-0 -top-28 w-[300px] bg-white p-4'>
            <div>
                <div className='flex space-x-3 items-center mb-10'>
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M1.25 2A.75.75 0 012 1.25h16a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V2.75h-6.5v14.773h1.978a.75.75 0 010 1.5H7.273a.75.75 0 010-1.5H9.25V2.75h-6.5V5a.75.75 0 01-1.5 0V2z"></path></svg>
                    </span>
                    <h3 className='text-xl font-semibold'>Text</h3>
                </div>
                <div>
                    <span className='text-sm font-semibold'>Text</span>
                    <div onClick={() => setOpen(!open)} className='mt-5'>
                        <div className='p-3 border-2 rounded-lg relative'>
                            <div className='flex items-center justify-between cursor-pointer'>
                                <span className='text-sm text-neutral-500'>{selectedText}</span>
                                <span>
                                    <ChevronDown size={14}/>
                                </span>
                            </div>
                            <HeadingTextMenu editor={editor} open={open} setOpen={setOpen}/>
                        </div>
                        <TextEditor editor={editor}/>
                    </div>
                </div>
            </div>
        </div>
    )
}