import { Editor,  BubbleMenu } from '@tiptap/react'
import { Link } from 'lucide-react'
import React, { useCallback } from 'react'

type Props = {
    editor:Editor | null
}

const TextEditor = ({editor}: Props) => {

    const setLink = useCallback(() => {

        if(!editor){
            return null
        }
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
      }, [editor])

    if(!editor){
        return
    }
  return (
    <div className='mt-6 pb-10'>
        <div className='flex items-center justify-around'>
            <button 
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled = {!editor.can().chain().focus().toggleBold().run()}
                className={`${editor.isActive('bold') ?
                     "p-3 w-full outline outline-2 outline-purple-600 bg-purple-100 rounded-s-lg" 
                     : 
                     "p-3 w-full outline outline-slate-200 rounded-s-lg"}`}
                     style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-12 pointer-events-none"><path fillRule="evenodd" clipRule="evenodd" d="M2 .25a.75.75 0 00-.75.75v11c0 .414.336.75.75.75h5.712c.892 0 1.734-.385 2.346-1.047A3.62 3.62 0 0011 9.25a3.62 3.62 0 00-.942-2.453 3.324 3.324 0 00-.669-.558 3.62 3.62 0 00.976-2.49 3.62 3.62 0 00-.942-2.452A3.193 3.193 0 007.077.25H2zm5.077 5.5c.454 0 .903-.195 1.244-.564a2.12 2.12 0 00.544-1.436 2.12 2.12 0 00-.544-1.436c-.341-.37-.79-.564-1.244-.564H2.75v4h4.327zM2.75 7.25v4h4.962c.454 0 .903-.195 1.243-.564A2.12 2.12 0 009.5 9.25a2.12 2.12 0 00-.545-1.436c-.34-.37-.79-.564-1.243-.564H2.75z"></path></svg>
            </button>
            <button 
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled = {!editor.can().chain().focus().toggleItalic().run()}
                className={`${editor.isActive('italic') ?
                     "p-3 w-full outline outline-2 outline-purple-600 bg-purple-100 " 
                     : 
                     "p-3 w-full outline outline-slate-200"}`}
                     style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-12 pointer-events-none"><path fillRule="evenodd" clipRule="evenodd" d="M8.893.25h2.732a.75.75 0 010 1.5h-2.23l-3.563 9.5h2.356a.75.75 0 110 1.5H2a.75.75 0 010-1.5h2.23l3.563-9.5H5.437a.75.75 0 010-1.5h3.456z"></path></svg>
            </button>
            <button 
                type='button'
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled = {!editor.can().chain().focus().toggleUnderline().run()}
                className={`${editor.isActive('underline') ?
                     "p-3 w-full outline outline-2 outline-purple-600 bg-purple-100 rounded-e-lg" 
                     : 
                     "p-3 w-full outline outline-slate-200 rounded-e-lg" }`}
                     style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-12 w-4 pointer-events-none"><path fillRule="evenodd" clipRule="evenodd" d="M2.5 0a.75.75 0 01.75.75v3.556c0 .968.356 1.887.973 2.555.615.666 1.435 1.028 2.277 1.028.842 0 1.662-.362 2.277-1.028.617-.668.973-1.587.973-2.555V.75a.75.75 0 011.5 0v3.556c0 1.33-.487 2.615-1.37 3.572-.886.96-2.1 1.51-3.38 1.51-1.28 0-2.494-.55-3.38-1.51-.883-.957-1.37-2.243-1.37-3.572V.75A.75.75 0 012.5 0zM.25 12.25A.75.75 0 011 11.5h11a.75.75 0 010 1.5H1a.75.75 0 01-.75-.75z"></path></svg>
            </button>
        </div>
        <div className='mt-6'>
            <span className='text-sm font-semibold'>Alignment</span>
            <div className='border-[1px] rounded-lg mt-3'>
                <div className='flex items-center justify-around'>
                <button 
                    type='button'
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    disabled = {!editor.can().chain().focus().setTextAlign('left').run()}
                    className={`${editor.isActive({textAlign:'left'}) ?
                        "p-3 w-full outline outline-2 outline-purple-600 bg-purple-100 rounded-s-lg" 
                        : 
                        "p-3 w-full outline outline-slate-200 rounded-s-lg"}`}
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-12 pointer-events-none"><path fillRule="evenodd" clipRule="evenodd" d="M0 1.25A.75.75 0 01.75.5h6.5a.75.75 0 010 1.5H.75A.75.75 0 010 1.25zm0 5a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H.75A.75.75 0 010 6.25zm.75 4.25a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5H.75z"></path></svg>
                </button>
                <button 
                    type='button'
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    disabled = {!editor.can().chain().focus().setTextAlign('center').run()}
                    className={`${editor.isActive({textAlign:'center'}) ?
                        "p-3 w-full outline outline-2 outline-purple-600 bg-purple-100 " 
                        : 
                        "p-3 w-full outline outline-slate-200"}`}
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-12 pointer-events-none"><path fillRule="evenodd" clipRule="evenodd" d="M3 1.25A.75.75 0 013.75.5h5.5a.75.75 0 010 1.5h-5.5A.75.75 0 013 1.25zm-3 5a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H.75A.75.75 0 010 6.25zm3.75 4.25a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z"></path></svg>
                </button>
                <button 
                    type='button'
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    disabled = {!editor.can().chain().focus().setTextAlign('right').run()}
                    className={`${editor.isActive({textAlign:'right'}) ?
                        "p-3 w-full outline outline-2 outline-purple-600 bg-purple-100 rounded-e-lg" 
                        : 
                        "p-3 w-full outline outline-slate-200 rounded-e-lg" }`}
                        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-12 pointer-events-none"><path fillRule="evenodd" clipRule="evenodd" d="M13 1.25a.75.75 0 00-.75-.75h-6.5a.75.75 0 000 1.5h6.5a.75.75 0 00.75-.75zm0 5a.75.75 0 00-.75-.75H.75a.75.75 0 000 1.5h11.5a.75.75 0 00.75-.75zm-.75 4.25a.75.75 0 010 1.5h-9.5a.75.75 0 010-1.5h9.5z"></path></svg>
                </button>
                </div>
            </div>
        </div>
        <div>
            {editor && (
                <BubbleMenu editor={editor} className='bg-white p-2 shadow-2xl text-pink-600' tippyOptions={{duration:200}}>
                    <button onClick={setLink} className={editor.isActive('link') ? "bg-pink-100" :""}>
                        <Link />
                    </button>
                </BubbleMenu>
            )}
        </div>
    </div>
  )
}

export default TextEditor