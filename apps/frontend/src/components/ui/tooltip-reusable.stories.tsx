// ReusableTooltip.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import { CustomButton } from "./custom-button";
import { Info } from "lucide-react";
import { ReusableTooltip } from "./tooltip-reusable";

const meta: Meta<typeof ReusableTooltip> = {
  title: "UI/ReusableTooltip",
  component: ReusableTooltip,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReusableTooltip>;

export const Default: Story = {
  args: {
    content: "Tooltip por defecto",
    side: "top",
    align: "center",
    children: <CustomButton label="Hove rqui" />,
  },
};

export const IconButton: Story = {
  args: {
    content: "Este es un tooltip con un ícono",
    side: "right",
    align: "center",
    children: (
      <button className="p-2 border rounded">
        <Info size={18} />
      </button>
    ),
  },
};

export const LongText: Story = {
  args: {
    content:
      "Este tooltip tiene un texto más largo para probar cómo se comporta.",
    side: "bottom",
    align: "start",
    children: <CustomButton label="Texto largo" variant="secondary" />,
  },
};
