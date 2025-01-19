import { create } from "zustand";

type TModalStore = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
};

// Фабрика для стора модального окна
const createModalStore = () =>
    create<TModalStore>((set) => ({
        isOpen: false,

        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false }),
        toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
    }));

const useAuthModal = createModalStore();
const useSettingsModal = createModalStore();
const useEndModal = createModalStore();
const useStatisticsModal = createModalStore();

export { useEndModal, useAuthModal, useSettingsModal, useStatisticsModal };
