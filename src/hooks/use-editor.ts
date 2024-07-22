import {create} from "zustand"
import {Editor,EditorOptions} from "@tiptap/react"
import {v4 as uuid} from "uuid"

interface EditorState {
    editors: Record<string, Editor | null>
    createEditor : (config:Partial<EditorOptions>) => string
    getEditor:(id:string) => Editor | null
    removeEditor:(id:string) => void
}

const useEditorStore = create<EditorState>((set,get) => ({
    editors:{},

    createEditor:(config) => {
        const id = uuid()
        const editor = new Editor(config);
        set(state => ({editors:{...state.editors,[id]:editor}}))
        return id
    },

    removeEditor:(id) => {
        set(state => {
            const updatedEditor = {...state.editors}
            if(updatedEditor[id]){
                updatedEditor[id].destroy()
                delete updatedEditor[id]
            }
            return {editors:updatedEditor}
        })
    },

    getEditor:(id) => {
        return get().editors[id]
    }
}))

export default useEditorStore