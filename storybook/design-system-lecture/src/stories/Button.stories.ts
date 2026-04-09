import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Button } from "./Button";

const meta = {
    title: "Example/Button", //경로
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        primary: { control: "boolean", description: "버튼" },
        backgroundColor: { control: "color", description: "버튼의 배경 색상" },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        primary: true,
        label: "Button",
        // backgroundColor: "#2f3fcc",
        size: "medium"
    },
};

export const Secondary: Story = {
    args: {
        label: "Button",
    },
};

export const Small: Story = {
    args: {
        size: "small",
        label: "Button",
    },
};

export const Large: Story = {
    args: {
        size: "large",
        label: "Button",
    },
};
