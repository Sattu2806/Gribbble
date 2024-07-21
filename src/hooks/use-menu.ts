import {create} from "zustand"

export type Menu = "main" | "text" | "image" | "video" | "gallery" | "secondary-text" | "secondary-gallery" | null

interface MenuStore {
    isMenuOpen:boolean
    onOpenMenu:() => void,
    onCloseMenu:() => void,
    ontoggleMenu:() => void,
    selectedMenu: Menu,
    setSelectedmenu:(menu:Menu) => void,
    getSelectedmenu: () => Menu,
}

export const useMenuStore = create<MenuStore> ((set,get) => ({
    isMenuOpen:false,
    onOpenMenu:() => set({isMenuOpen:true}),
    onCloseMenu:() => set({isMenuOpen:false}),
    ontoggleMenu:() => set({isMenuOpen: !get().isMenuOpen}),
    selectedMenu:'text',
    setSelectedmenu:(menu:Menu) => set({selectedMenu:menu}),
    getSelectedmenu:() => get().selectedMenu,
}))