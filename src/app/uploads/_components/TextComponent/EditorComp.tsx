import React, { useState } from 'react'
import {Editor, EditorContent, useEditor} from "@tiptap/react"
import useEditorStore from '@/hooks/use-editor'
import { useMenuStore } from '@/hooks/use-menu'

type Props = {
    entryId:string
}

const EditorComp = ({entryId}: Props) => {
    const {getEditor} = useEditorStore()
    const {setSelectedEntryId,setSelectedmenu,onOpenMenu} = useMenuStore()

    const editor = getEditor(entryId)

    if(!editor){
        return null
    }
  return (
    <div>
        <EditorContent onClick={() => {setSelectedEntryId(entryId);setSelectedmenu('text');onOpenMenu()}} editor={editor}/>
    </div>
  )
}

export default EditorComp


