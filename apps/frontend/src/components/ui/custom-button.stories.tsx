import type { Meta, StoryObj } from "@storybook/react";

import { Save } from "lucide-react";
import { CustomButton } from "./custom-button";

const meta: Meta<typeof CustomButton> = {
  title: "UI/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],

  // Valores por defecto para los controles
  args: {
    label: "Mi botón",
    loading: false,
    disabled: false,
    variant: "default",
  },

  // Permite que Storybook detecte los tipos
  argTypes: {
    onClick: { action: "clicked" },
    icon: { control: false }, // evitar problemas, los iconos no se controlan desde panel
  },
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    label: "Guardar",
    icon: <Save className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    label: "Cargando...",
    loading: true,
    icon: <Save className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Deshabilitado",
    disabled: true,
  },
};

export const Outline: Story = {
  args: {
    label: "Outline",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    label: "Eliminar",
    icon: <Save className="h-4 w-4" />,
    variant: "destructive",
  },
};
