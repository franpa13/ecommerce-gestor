import type { Meta, StoryObj } from "@storybook/react";
import { CardShop  } from "./custom-card";
import {type Product } from '../../interfaces/cart-types';


// Datos mockeados
const mockProduct: Product = {
  id: "1",
  name: "Zapatillas Nike Air Max",
  description: "Zapatillas cómodas para correr",
  price: 59999,
  stock: 10,
  imgUrl: "https://picsum.photos/400", // imagen random
  categoryId: "shoes",
};

const meta: Meta<typeof CardShop > = {
  title: "UI/CardReusable",
  component: CardShop ,
  tags: ["autodocs"],
  argTypes: {
    prod: {
      control: "object",
      description: "Producto a renderizar en la card",
    },
  },
  args: {
    prod: mockProduct,
  },
};


export default meta;
type Story = StoryObj<typeof CardShop>;

export const Default: Story = {
  args: {
    prod: mockProduct,
  },
};

export const WithoutImage: Story = {
  args: {
    prod: {
      ...mockProduct,
      imgUrl: "",
    },
  },
};

export const CheapProduct: Story = {
  args: {
    prod: {
      ...mockProduct,
      price: 1999,
    },
  },
};

export const LongName: Story = {
  args: {
    prod: {
      ...mockProduct,
      name: "Zapatillas súper ultra mega cómodas edición limitada 2025",
    },
  },
};
