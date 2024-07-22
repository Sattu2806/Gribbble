import {create}from "zustand"

interface UploadData {
    id:string
    type:'text' | 'image' | 'video' | 'gallery',
    content:string | null,
    extra1:string // alt text image
    extra2:string // size components
}

interface DataActions {
    entries:UploadData[]
    addEntry:(id:string,type:UploadData['type'],content?:string | null, extra1?:string,extra2?:string,afterId?:string) => void
}

const useUploadDataStore = create<DataActions>((set,get) => ({
    entries:[],
    addEntry:(id,type,content = null,extra1='',extra2 = 'small',afterId) => {
        const newEntry : UploadData = {id,type,content,extra1,extra2}
        set(state => {
            const entries = [...state.entries]
            const index = entries.findIndex(entry => entry.id === afterId)

            if(index !== -1){
                entries.splice(index+1,0,newEntry)
            }else {
                entries.push(newEntry)
            }

            return {entries}
        })
    }
}))

export default useUploadDataStore