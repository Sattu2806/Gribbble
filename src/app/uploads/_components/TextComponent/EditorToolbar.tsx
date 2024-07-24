import {Editor} from "@tiptap/react"
import {ChevronDown} from "lucide-react"
import HeadingTextMenu from './HeadingTextMenu'
import TextEditor from './TextEditor'
import useHeadingStore from '@/hooks/use-headingtool'
import { useState } from "react"

export const EditorToolBar = ({editor}:{editor:Editor | null}) => {
    const [open, setOpen] = useState<boolean>(false)
    const {selectedText} = useHeadingStore()

    if(!editor){
        return null
    }
    return(
        <div className=' bg-white'>
            <div>
                <div className='flex space-x-3 items-center mb-5'>
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M1.25 2A.75.75 0 012 1.25h16a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V2.75h-6.5v14.773h1.978a.75.75 0 010 1.5H7.273a.75.75 0 010-1.5H9.25V2.75h-6.5V5a.75.75 0 01-1.5 0V2z"></path></svg>
                    </span>
                    <h3 className='text-xl font-semibold'>Text</h3>
                </div>
                <div>
                    <span className='text-sm font-semibold'>Font</span>
                    <div  className='mt-2'>
                        <div className='p-3 border-2 rounded-lg relative'>
                            <div onClick={() => setOpen(!open)} className='flex items-center justify-between cursor-pointer'>
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