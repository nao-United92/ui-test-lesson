import Counter from "./Counter";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Counter",
  component: Counter
} as Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof Counter>;

export const InitialCount: Story = {
  args: {},
};
