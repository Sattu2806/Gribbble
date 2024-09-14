import {create} from "zustand"

interface CollectionStore {
    isCollectionOpen:boolean
    onOpenCollection:() => void
    onCloseCollection:()=>void
    toCreateCollection:boolean
    onOpenCreateCollection:() => void
    onCloseCreateCollection:() => void
    uploadId:string | undefined
    setUploadId:(id:string) => void
    isChanged:boolean
    toggleIsChanged:() => void
}

export const useCollectionStore = create<CollectionStore>((set, get) => ({
    isCollectionOpen: false,
    onOpenCollection: () => set({ isCollectionOpen: true }),
    onCloseCollection: () => set({ isCollectionOpen: false }),
    toCreateCollection: false,
    onOpenCreateCollection: () => set({ toCreateCollection: true }),
    onCloseCreateCollection: () => set({ toCreateCollection: false }),
    uploadId: undefined,
    setUploadId: (id: string) => set({ uploadId: id }),
    isChanged: false,
    toggleIsChanged: () => set({ isChanged: !get().isChanged }), 
}));
