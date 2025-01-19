import type { Meta, StoryObj } from "@storybook/react";

import { Cell } from "./index";
import { TCellType } from "../../helpers/hooks/useBoard";

const meta = {
    title: "Example/Cell",
    component: Cell,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Cell>;

export default meta;
type Story = StoryObj<typeof meta>;

const cell: TCellType = {
    id: 0,
    x: 0,
    y: 0,
    num: 7,
    isChecked: false,
    isFlag: false,
    key: 0,
};

export const Primary: Story = {
    args: {
        ...cell,
        rightClick: (x, y) => console.log(x, y),
        updateItem: (x, y) => console.log(x, y),
    },
};

export const Checked: Story = {
    args: {
        ...cell,
        isChecked: true,
        rightClick: (x, y) => console.log(x, y),
        updateItem: (x, y) => console.log(x, y),
    },
};

export const Flag: Story = {
    args: {
        ...cell,
        isFlag: true,
        rightClick: (x, y) => console.log(x, y),
        updateItem: (x, y) => console.log(x, y),
    },
};
