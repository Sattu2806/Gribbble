import {create} from "zustand"

interface CommentStore {
    isCommentOpen:boolean,
    onOpenComment:() => void
    onCloseComment:() => void
}

export const useCommentStore = create<CommentStore>((set) => ({
    isCommentOpen:false,
    onOpenComment:() => set({isCommentOpen:true}), 
    onCloseComment:() => set({isCommentOpen:false})
}))