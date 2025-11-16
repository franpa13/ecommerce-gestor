import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./data-table";
import type { ColumnDef } from "@tanstack/react-table";

// ----------------------
// Mock data
// ----------------------
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const mockData: User[] = [
  { id: 1, name: "Juan Perez", email: "juan@test.com", role: "Admin" },
  { id: 2, name: "Maria Lopez", email: "maria@test.com", role: "User" },
  { id: 3, name: "Carlos Ruiz", email: "carlos@test.com", role: "User" },
  { id: 4, name: "Ana Torres", email: "ana@test.com", role: "Manager" },
];

// ----------------------
// Columnas para la tabla
// ----------------------
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

// ----------------------
// Storybook metadata
// ----------------------
const meta: Meta<typeof DataTable<User, any>> = {
  title: "UI/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    columns,
    data: mockData,
    pagination: true,
    searchable: true,
    searchColumn: "name",
    pageSize: 10,
    selectable: false,
    sortable: true,
    columnVisibility: true,
  },
  argTypes: {
    pagination: { control: "boolean" },
    searchable: { control: "boolean" },
    selectable: { control: "boolean" },
    sortable: { control: "boolean" },
    columnVisibility: { control: "boolean" },
    searchPlaceholder: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<User, any>>;

// ----------------------
// Stories
// ----------------------

// Default
export const Default: Story = {};

// Con selección de filas
export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

// Con búsqueda global
export const Searchable: Story = {
  args: {
    searchable: true,
    searchColumn: "name",
  },
};

// Con paginación
export const Paginated: Story = {
  args: {
    pagination: true,
    pageSize: 2,
  },
};

// Con visibilidad de columnas
export const ColumnVisibility: Story = {
  args: {
    columnVisibility: true,
  },
};

// Con todo activado
export const FullFeatured: Story = {
  args: {
    pagination: true,
    searchable: true,
    selectable: true,
    sortable: true,
    columnVisibility: true,
  },
};
