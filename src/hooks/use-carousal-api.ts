import { CarouselApi } from "@/components/ui/carousel"
import {create} from "zustand"

interface Carousalref {
    api:CarouselApi | null
    setApi: (api:CarouselApi) => void
}

export const useCarousalApiStore = create<Carousalref>(set =>({
    api:null,
    setApi:(api) => set(state => ({api}))
}))