import {create} from "zustand"

interface GallerySlideStore {
    selectedSlideIndex:number
    setSelectedSlideIndex:(index:number) => void
}

export const useSelectedSlideStore = create<GallerySlideStore>(set => ({
    selectedSlideIndex: 0,
    setSelectedSlideIndex: (index:number) => set(state => ({selectedSlideIndex: index}))
}))