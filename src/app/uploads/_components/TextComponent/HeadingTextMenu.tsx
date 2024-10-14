import React, { Fragment, useEffect } from 'react'
import useHeadingStore from '@/hooks/use-headingtool'
import { Editor } from '@tiptap/react'
import { CheckCheck } from 'lucide-react'

type Props = {
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  editor: Editor | null | undefined
}

const HeadingTextMenu = ({open,setOpen,editor}: Props) => {
  const {setSelectedText} = useHeadingStore()



  useEffect(() => {
    if(editor){
      if(editor.isActive('heading', {level:1})){
        setSelectedText('Heading 1')
      } else if(editor.isActive('heading', {level:2})){
        setSelectedText('Heading 2')
      } else if(editor.isActive('paragraph')){
        setSelectedText('Body')
      }
    }

  },[editor])

  if(!editor){
    return null
  }


  return (
    <Fragment>
      {open && (
        <div className='absolute top-16 left-0 right-0 w-full text-sm text-neutral-500 bg-white'>
          <ul className='p-4 mx-auto border-[2px] rounded-lg space-y-2'>
            <li className='w-full'>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({level:1}).run()}
                  className={`${editor.isActive('heading', {level:1}) ?
                   "p-2 px-4 bg-pink-400 rounded-md text-white" : "p-2 px-4 hover:bg-neutral-100 rounded-md"} w-full flex items-center justify-between `}
                > 
                  <span>Heading 1</span> {editor.isActive('heading', {level:1}) ? <CheckCheck size={16} /> : ""}
                </button>
            </li>
            <li className='w-full'>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({level:2}).run()}
                  className={`${editor.isActive('heading', {level:2}) ?
                   "p-2 px-4 bg-pink-400 rounded-md text-white" : "p-2 px-4 hover:bg-neutral-100 rounded-md"} w-full flex items-center justify-between `}
                > 
                  <span>Heading 2</span> {editor.isActive('heading', {level:2}) ? <CheckCheck size={16} /> : ""}
                </button>
            </li>
            <li className='w-full'>
                <button
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`${editor.isActive('paragraph') ?
                   "p-2 px-4 bg-pink-400 rounded-md text-white " : "p-2 px-4 hover:bg-neutral-100 rounded-md"} w-full flex items-center justify-between `}
                > 
                  <span>Body</span> {editor.isActive('paragraph') ? <CheckCheck size={16} /> : ""}
                </button>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  )
}

export default HeadingTextMenu