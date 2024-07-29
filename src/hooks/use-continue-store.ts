import {create} from "zustand"

interface Options {
    value:string
    label:string
}

interface ContinuousStore {
    isContinuosOpen:boolean
    onOpenContinuos:() => void
    onCloseContinuos:() => void
    selectedOption : Options | null
    textareaValue:string
    tagsArray:string[]
    setSelectedOption:(option:Options | null) => void
    setTextareaValue:(value:string) => void
    setTagArray:(value:string[]) => void
    extractTags:(value:string) => void
}

export const useContinueStore = create<ContinuousStore>(set => ({
    isContinuosOpen:false,
    onOpenContinuos:() => set((() => ({isContinuosOpen:true}))),
    onCloseContinuos:() => set((() => ({isContinuosOpen:false}))),
    selectedOption:null,
    textareaValue:"",
    tagsArray:[],

    setSelectedOption:(option) => set({selectedOption:option}),
    setTextareaValue:(value) => set({textareaValue:value}),
    setTagArray:(value) => set({tagsArray:value}),
    extractTags:(value) => {
        const tags = value.split(" ").filter(tag => tag.startsWith('#')).map(tag => tag.slice(1))
        set({tagsArray:tags})
    }
}))