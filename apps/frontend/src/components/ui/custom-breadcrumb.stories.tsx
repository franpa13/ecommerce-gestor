import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { CustomBreadcrumb } from "./custom-breadcrumb";

const withRouter = (path: string, component: React.ReactNode) => (
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="*" element={component} />
    </Routes>
  </MemoryRouter>
);

const meta: Meta<typeof CustomBreadcrumb> = {
  title: "UI/CustomBreadcrumb",
  component: CustomBreadcrumb,
  argTypes: {
    labels: {
      control: "object",
    },
  },
  render: (args, { parameters }) =>
    withRouter(parameters.path ?? "/", <CustomBreadcrumb {...args} />),
};

export default meta;

type Story = StoryObj<typeof CustomBreadcrumb>;

export const Home: Story = {
  parameters: { path: "/" },
};

export const OneSegment: Story = {
  parameters: { path: "/products" },
};

export const DeepRoute: Story = {
  parameters: { path: "/products/shoes/air-max" },
};

export const WithLabels: Story = {
  parameters: { path: "/products/shoes/air-max" },
  args: {
    labels: {
      products: "Productos",
      shoes: "Zapatillas",
      "air-max": "Nike Air Max 2025",
    },
  },
};
