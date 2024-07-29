import React from 'react'
import { useMenuStore } from '@/hooks/use-menu'
import OtherMedia from '../MediaComponents/OtherMedia'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EditorToolBar } from '../TextComponent/EditorToolbar'
import useEditorStore from '@/hooks/use-editor'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import useUploadDataStore from '@/hooks/use-upload-data'
import {v4 as uuidv4} from 'uuid'
import GallerMenu from './GallerMenu'
import SecondaryGalleryMenu from './SecondaryGalleryMenu'


type Props = {}

const SideBarMenu = (props: Props) => {
    const {isMenuOpen,selectedMenu, onCloseMenu,setSelectedmenu, selectedEntryId} = useMenuStore()
    const {createEditor} = useEditorStore()
    const {entries, addEntry,updateEntry,getEntry} = useUploadDataStore()

    const {getEditor} = useEditorStore()

    const editor = getEditor(selectedEntryId)

    const addEditor = (type:string) => {
        let Content = ``
        if(type === 'heading'){
            Content = `            
            <div>
                <h1>Heading to write</h1>
            </div>`
        } else if(type === 'para-heading'){
            Content = `            
            <div>
                <h2>Heading to write</h2>
                <p>
                  Write about post...
                </p>
            </div>`
        } else if(type === 'para'){
            Content = `            
            <div>
                <p>
                  Write about post...
                </p>
            </div>`
        }
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
        
        addEntry(newEditor,'text',null,'','',selectedEntryId)
    }

    const addImageComp = () => {
        const id = uuidv4()
        addEntry(id,'image',null,'','',selectedEntryId)
    }

    const addVideoComp = () => {
        const id = uuidv4()
        addEntry(id,'video',null,'','',selectedEntryId)
    }

    const addgalleryComp = () => {
        const id = uuidv4()
        addEntry(id,'gallery',null,'','',selectedEntryId)
    }


    const data = getEntry(selectedEntryId)

    const updateAltText = (e:React.ChangeEvent<HTMLInputElement>) => {
        updateEntry(selectedEntryId,data?.content!,e.target.value,data?.extra2)
    }


    const MakeSmall = () => {
        updateEntry(selectedEntryId,data?.content!,data?.extra1,'small')
    }

    const Makelarge = () => {
        updateEntry(selectedEntryId,data?.content!,data?.extra1,'large')
    }

    
  return (
    <div className={`fixed top-0 w-[335px] right-0 z-50 bg-white shadow-xl h-full transition-all ease-in duration-200 ${isMenuOpen ? "translate-x-0" : "translate-x-[400px] opacity-0"}`}>
        <div className='p-2 px-10'>
            <div className={`${selectedMenu === 'main' ? 'block' : 'hidden'} py-5`}>
                <button onClick={onCloseMenu} className='mb-8 text-sm'>Close</button>
                <div className='side-bar-menu overflow-auto'>
                    <div>
                        <h4 className='text-xl font-semibold mb-8'>Insert Blcok</h4>
                        <div>
                            <span className='text-sm font-semibold'>Basic</span>
                            <div className='mt-5 text-sm'>
                                <div onClick={() => setSelectedmenu('secondary-text')} className='flex items-center justify-between hover:bg-neutral-100 rounded-lg py-2 px-1'>
                                    <div className='flex items-center space-x-3'>
                                        <span>
                                            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M1.25 2A.75.75 0 012 1.25h16a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V2.75h-6.5v14.773h1.978a.75.75 0 010 1.5H7.273a.75.75 0 010-1.5H9.25V2.75h-6.5V5a.75.75 0 01-1.5 0V2z"></path></svg>
                                        </span>
                                        <span className='font-medium'>Text</span>
                                    </div>
                                    <span>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="right-icon"><path d="M4.47 1.154a.814.814 0 00-1.149 0 .806.806 0 000 1.143l3.636 3.62-3.636 3.62a.806.806 0 000 1.143.814.814 0 001.148 0L8.667 6.5a.817.817 0 00.224-.381.806.806 0 00-.228-.79L4.47 1.155z"></path></svg>
                                    </span>
                                </div>
                            </div>
                            <div onClick={addImageComp} className='mt-3 text-sm'>
                                <div className='flex items-center justify-between hover:bg-neutral-100 rounded-lg py-2 px-1'>
                                    <div className='flex items-center justify-between space-x-3'>
                                        <span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M16 1.5H4A2.5 2.5 0 001.5 4v12a2.5 2.5 0 001.265 2.174l9.29-9.29a2.75 2.75 0 013.89 0l2.555 2.555V4A2.5 2.5 0 0016 1.5zm2.5 12.059a.741.741 0 01-.03-.029l-3.586-3.586a1.25 1.25 0 00-1.768 0L4.561 18.5H16a2.5 2.5 0 002.5-2.5v-2.441zM4 0a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V4a4 4 0 00-4-4H4zm2.5 5.75a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"></path></svg>
                                        </span>
                                        <span className='font-medium'>
                                            Image
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div onClick={addVideoComp} className='mt-3 text-sm'>
                                <div className='flex items-center justify-between hover:bg-neutral-100 rounded-lg py-2 px-1'>
                                    <div className='flex items-center justify-between space-x-3'>
                                        <span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M2 2.5h16a.5.5 0 01.5.5v14a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5zM0 3a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm8.25 5.151L11.771 10l-3.523 1.849V8.15zm5.062.964a1 1 0 010 1.77l-5.098 2.676a1 1 0 01-1.465-.885V7.324a1 1 0 011.465-.885l5.098 2.676z"></path></svg>
                                        </span>
                                        <span className='font-medium'>
                                            Video
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <span className='text-sm font-semibold'>Rich Media</span>
                                <div onClick={addgalleryComp} className='mt-3 text-sm'>
                                    <div className='flex items-center justify-between hover:bg-neutral-100 rounded-lg py-2 px-1'>
                                        <div className='flex items-center justify-between space-x-3'>
                                            <span>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path d="M20 13a3 3 0 01-3 3v-1.5a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0017 5.5V4a3 3 0 013 3v6zM0 7v6a3 3 0 003 3v-1.5A1.5 1.5 0 011.5 13V7A1.5 1.5 0 013 5.5V4a3 3 0 00-3 3z" fill="currentColor"></path><rect x="4.75" y="2.75" width="10.5" height="14.5" rx="2.25" stroke="currentColor" strokeWidth="1.5"></rect></svg>
                                            </span>
                                            <span className='font-medium'>
                                                Gallery
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${selectedMenu === 'image' ? "block" : 'hidden'} mt-5`}>
                <button onClick={onCloseMenu} className='mb-8 text-sm'>Close</button>
                <div>
                    <div className='flex items-center space-x-3 mb-8'>
                        <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M16 1.5H4A2.5 2.5 0 001.5 4v12a2.5 2.5 0 001.265 2.174l9.29-9.29a2.75 2.75 0 013.89 0l2.555 2.555V4A2.5 2.5 0 0016 1.5zm2.5 12.059a.741.741 0 01-.03-.029l-3.586-3.586a1.25 1.25 0 00-1.768 0L4.561 18.5H16a2.5 2.5 0 002.5-2.5v-2.441zM4 0a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V4a4 4 0 00-4-4H4zm2.5 5.75a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"></path></svg>
                        </span>
                        <span className='text-xl font-semibold'>Image</span>
                    </div>
                    <div>
                        <span className='font-semibold'>Media</span>
                        <div className='mt-5'>
                            <OtherMedia />
                            <div className='mt-7'>
                                <label htmlFor="" className='font-medium'>Alt Text</label>
                                <div className='mt-3'>
                                    <input 
                                        type="text"
                                         className='outline-none bg-transparent focus:outline-none placeholder:text-[14px] break-words break-normal whitespace-pre focus:border-2 focus:border-pink-500 px-3 py-2 border-2 rounded-lg text-base w-full'
                                         placeholder='Enter alt text'
                                         onChange={updateAltText}
                                    />
                                </div>
                            </div>
                            <div className='mt-7'>
                                <label htmlFor="" className='font-medium'>layout</label>
                                <div className='mt-3 grid grid-cols-2'>
                                    <button onClick={MakeSmall} className={`border-[2px] rounded-s-xl py-3 flex items-center justify-center ${data?.extra2  === 'small' ? 'border-purple-500' : ''}`}>
                                        <span>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" className="icon-12"><path fillRule="evenodd" clipRule="evenodd" d="M12.53.47a.75.75 0 010 1.06L9.534 4.527h1.856a.75.75 0 010 1.5h-3.64a.748.748 0 01-.777-.75V1.61a.75.75 0 011.5 0v1.857L11.47.47a.75.75 0 011.06 0zM1.61 6.972a.75.75 0 000 1.5h1.857L.47 11.47a.75.75 0 001.06 1.06l2.997-2.997v1.856a.75.75 0 001.5 0v-3.64a.748.748 0 00-.75-.777m-3.667 0h3.667z"></path></svg>
                                        </span>
                                    </button>
                                    <button onClick={Makelarge} className={`border-[2px] rounded-e-xl py-3 flex items-center justify-center  ${data?.extra2  === 'large' ? 'border-purple-500' : ''}`}>
                                        <span>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" className="icon-12"><path fillRule="evenodd" clipRule="evenodd" d="M12.53.47a.75.75 0 010 1.06L9.534 4.527h1.856a.75.75 0 010 1.5h-3.64a.748.748 0 01-.777-.75V1.61a.75.75 0 011.5 0v1.857L11.47.47a.75.75 0 011.06 0zM1.61 6.972a.75.75 0 000 1.5h1.857L.47 11.47a.75.75 0 001.06 1.06l2.997-2.997v1.856a.75.75 0 001.5 0v-3.64a.748.748 0 00-.75-.777m-3.667 0h3.667z"></path></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${selectedMenu === 'video' ? "block" : 'hidden'} mt-5`}>
                <button onClick={onCloseMenu} className='mb-8 text-sm'>Close</button>
                <div>
                    <div className='flex items-center space-x-3 mb-8'>
                        <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M16 1.5H4A2.5 2.5 0 001.5 4v12a2.5 2.5 0 001.265 2.174l9.29-9.29a2.75 2.75 0 013.89 0l2.555 2.555V4A2.5 2.5 0 0016 1.5zm2.5 12.059a.741.741 0 01-.03-.029l-3.586-3.586a1.25 1.25 0 00-1.768 0L4.561 18.5H16a2.5 2.5 0 002.5-2.5v-2.441zM4 0a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V4a4 4 0 00-4-4H4zm2.5 5.75a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"></path></svg>
                        </span>
                        <span className='text-xl font-semibold'>Video</span>
                    </div>
                    <div>
                        <span className='font-semibold'>Media</span>
                        <div className='mt-5'>
                            <OtherMedia />
                            <div className='mt-7'>
                                <label htmlFor="" className='font-medium'>layout</label>
                                <div className='mt-3 grid grid-cols-2'>
                                    <button onClick={MakeSmall} className={`border-[2px] rounded-s-xl py-3 flex items-center justify-center ${data?.extra2  === 'small' ? 'border-purple-500' : ''}`}>
                                        <span>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" className="icon-12"><path fillRule="evenodd" clipRule="evenodd" d="M12.53.47a.75.75 0 010 1.06L9.534 4.527h1.856a.75.75 0 010 1.5h-3.64a.748.748 0 01-.777-.75V1.61a.75.75 0 011.5 0v1.857L11.47.47a.75.75 0 011.06 0zM1.61 6.972a.75.75 0 000 1.5h1.857L.47 11.47a.75.75 0 001.06 1.06l2.997-2.997v1.856a.75.75 0 001.5 0v-3.64a.748.748 0 00-.75-.777m-3.667 0h3.667z"></path></svg>
                                        </span>
                                    </button>
                                    <button onClick={Makelarge} className={`border-[2px] rounded-e-xl py-3 flex items-center justify-center ${data?.extra2  === 'large' ? 'border-purple-500' : ''}`}>
                                        <span>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" className="icon-12"><path fillRule="evenodd" clipRule="evenodd" d="M12.53.47a.75.75 0 010 1.06L9.534 4.527h1.856a.75.75 0 010 1.5h-3.64a.748.748 0 01-.777-.75V1.61a.75.75 0 011.5 0v1.857L11.47.47a.75.75 0 011.06 0zM1.61 6.972a.75.75 0 000 1.5h1.857L.47 11.47a.75.75 0 001.06 1.06l2.997-2.997v1.856a.75.75 0 001.5 0v-3.64a.748.748 0 00-.75-.777m-3.667 0h3.667z"></path></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${selectedMenu === 'gallery' ? "block" : 'hidden'}`}>
                <GallerMenu />
            </div>
            <div className={`${selectedMenu === 'secondary-gallery' ? "block" : 'hidden'}`}>
                <SecondaryGalleryMenu/>
            </div>
            <div className={`${selectedMenu === 'text' ? "block" : 'hidden'} mt-5`}>
                <button onClick={onCloseMenu} className='mb-5 text-sm'>Close</button>
                <EditorToolBar editor={editor} />
            </div>
            <div className={`${selectedMenu === 'secondary-text' ? "block" : 'hidden'} mt-5`}>
                <div onClick={() => setSelectedmenu('main')} className='absolute top-6 left-3 cursor-pointer'>
                    <ChevronLeft size={20}/>
                </div>
                <div>
                    <div onClick={() => addEditor('heading')}  className='bg-gray-50 p-2 mt-10'>
                        <div className='p-2 text-xl flex items-center justify-center font-bold bg-white m-5 hover:bg-gray-200 cursor-pointer h-[150px]'>
                            <span>Heading</span>
                        </div>
                    </div>
                    <div onClick={() => addEditor('para-heading')}  className='bg-gray-50 p-2 mt-2'>
                        <div className='p-2 text-xl flex flex-col items-center justify-center font-bold bg-white m-5 hover:bg-gray-200 cursor-pointer h-[150px]'>
                            <p className='text-center pb-3'>Heading</p>
                            <p className='text-xs font-normal text-center'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>
                    </div>
                    <div onClick={() => addEditor('para')} className='bg-gray-50 p-2 mt-2'>
                        <div className='p-2 text-xl flex flex-col items-center justify-center font-bold bg-white m-5 hover:bg-gray-200 cursor-pointer h-[150px]'>
                            <p className='text-xs font-normal text-center'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideBarMenu