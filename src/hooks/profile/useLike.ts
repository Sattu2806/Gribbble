import { CarouselApi } from "@/components/ui/carousel"
import {create} from "zustand"


interface LikeProfilestore {
    likeProfile: boolean
    setLikeProfile: (value: boolean) => void
}

export const useLikeProfilestore = create<LikeProfilestore>((set) =>({
    likeProfile: false,
    setLikeProfile(value) {
        set({likeProfile: value})
    },
}))