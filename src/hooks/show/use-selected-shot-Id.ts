import {create} from "zustand"

interface SelectedShotStore {
    selectedShotId:string | null
    setSelectedShotId:(id:string | null) => void
    getSelectedShotId:() => string | null
    isShotOpen:boolean
    onOpenShot:() => void
    onCloseShot:() => void
}

export const useSelectedShotStore = create<SelectedShotStore>((set,get) => ({
    selectedShotId:null,
    setSelectedShotId:(id) => set({selectedShotId:id}),
    getSelectedShotId:() => get().selectedShotId,
    isShotOpen:false,
    onOpenShot:() => set({isShotOpen:true}),
    onCloseShot:() => set({isShotOpen:false})
}))