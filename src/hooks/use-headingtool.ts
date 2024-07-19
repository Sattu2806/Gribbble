import {create} from "zustand"

interface HeadingStore {
    selectedText: string;
    setSelectedText: (text:string) => void
}

const useHeadingStore = create<HeadingStore> (set => ({
    selectedText: "Body",
    setSelectedText(text) {
        set(state => ({selectedText: text}))
    },
}))

export default useHeadingStore