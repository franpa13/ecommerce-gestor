// Carousel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./carousel-reusable";


const meta: Meta<typeof Carousel> = {
    title: "UI/Carousel",
    component: Carousel,
    tags: ["autodocs"],
    argTypes: {
        images: { control: "object" },
        loop: { control: "boolean" },
        initial: { control: "number" },
        spacing: { control: "number" },
    },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
    args: {
        images: [
            "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?auto=format&fit=crop&w=800&q=80",
        ],
        loop: true,
        initial: 0,
        spacing: 0,
    },
};

export const NoLoop: Story = {
    args: {
        ...Default.args,
        ...Default.args,
        loop: false,
    },
};

export const StartAtSecond: Story = {
    args: {
        ...Default.args,
        ...Default.args,
        initial: 1,
    },
};
export const Responsive: Story = {
  args: {
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=800&q=80",
    ],
    loop: true,
    initial: 0,
    spacing: 8,
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
  },
};
