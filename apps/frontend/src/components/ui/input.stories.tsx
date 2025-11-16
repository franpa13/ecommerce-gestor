import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";


const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  args: {
    placeholder: "Ingresa tu texto...",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "Texto inicial",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Contraseña",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Deshabilitado",
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Entrada inválida",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Email</label>
      <Input {...args} type="email" placeholder="email@ejemplo.com" />
    </div>
  ),
};
