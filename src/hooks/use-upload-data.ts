import {create}from "zustand"

export interface UploadDataType {
    id:string
    type:'text' | 'image' | 'video' | 'gallery',
    content:string | null,
    extra1:string // alt text image
    extra2:string // size components
}

interface DataActions {
    entries:UploadDataType[]
    addEntry:(id:string,type:UploadDataType['type'],content?:string | null, extra1?:string,extra2?:string,afterId?:string) => void,
    getEntry:(id:string) => UploadDataType | undefined,
    updateEntry:(id:string,content:string | null, extra1?:string,extra2?:string) => void,
    moveEntryUp:(id:string) => void
    moveEntryDown:(id:string) => void
    copyEntry:(originalId:string,newId:string) => void
    removeEntry:(id:string) => void
}

const useUploadDataStore = create<DataActions>((set,get) => ({
    entries:[],
    addEntry:(id,type,content = null,extra1='',extra2 = 'small',afterId) => {
        const newEntry : UploadDataType = {id,type,content,extra1,extra2}
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
    },
    getEntry:(id) =>{
        return get().entries.find(entry => entry.id === id)
    },

    updateEntry:(id, content, extra1 = '', extra2 = '') => {
        set(state => ({
            entries:state.entries.map(entry => 
                entry.id === id ? { ...entry, content, extra1, extra2 } : entry
            )
        }));
    },
    moveEntryUp:(id) => {
        set(state => {
            const index = state.entries.findIndex(entry => entry.id === id)
            if(index > 0){
                const newEntries = [...state.entries];
                [newEntries[index],newEntries[index - 1]] = [newEntries[index - 1] , newEntries[index]]
                return {entries: newEntries}
            }
            return state
        })
    },

    moveEntryDown:(id) => {
        set(state => {
            const index = state.entries.findIndex(entry => entry.id === id)
            if(index !== -1 && index < state.entries.length - 1){
                const newEntries = [...state.entries];
                [newEntries[index],newEntries[index + 1]] = [newEntries[index+1],newEntries[index]]
                return {entries: newEntries}
            }
            return state
        })
    },

    copyEntry:(originalId,newId) => {
        set(state => {
            const index = state.entries.findIndex(entry => entry.id === originalId)
            if(index !== -1){
                const entryToCopy = state.entries[index]
                const newEntry = {...entryToCopy,id:newId}
                const newEntries = [...state.entries]
                newEntries.splice(index + 1 ,0,newEntry)
                return {entries: newEntries}
            }

            return state
        })
    },

    removeEntry:(id) => {
        set(state => ({entries:state.entries.filter(entry => entry.id !== id)}))
    }
}))

export default useUploadDataStore