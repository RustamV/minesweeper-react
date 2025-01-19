import { create } from "zustand";

type TThemeStore = {
    size: TSizeOption["value"];
    currentSizeOption: TSizeOption;
    setSize: (value: TSizeOption["value"]) => void;
};

type TSizeOption = {
    mines: number;
    value: number;
    label: string;
    cellSize: string;
};

const sizeOptions: TSizeOption[] = [
    { mines: 10, label: "9", value: 9, cellSize: "30px" },
    {
        mines: 32,
        label: "16",
        value: 16,
        cellSize: "25px",
    },
    {
        mines: 50,
        label: "25",
        value: 25,
        cellSize: "25px",
    },
];

const findFieldSize = (
    value: TSizeOption["value"]
): TSizeOption | undefined => {
    return sizeOptions.find((item) => item.value === value);
};

const useFieldSize = create<TThemeStore>((set) => ({
    size: sizeOptions[0].value,
    currentSizeOption: sizeOptions[0],
    setSize: (value: TSizeOption["value"]) =>
        set({ size: value, currentSizeOption: findFieldSize(value) }),
}));

export { useFieldSize, sizeOptions };
