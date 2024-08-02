import {create} from "zustand"

interface TitleStore {
    title:string
    setTitle: (value:string) => void
}

export const useTitleStore = create<TitleStore> (set => ({
    title: '',
    setTitle: (value) => set({title:value})
}))