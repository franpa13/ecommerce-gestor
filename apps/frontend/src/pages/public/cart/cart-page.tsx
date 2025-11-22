import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { CustomButton } from "../../../components/ui/custom-button";

import { Separator } from "../../../components/ui/separator";
import { TitleSection } from "../../../components/ui/title-section";
import type { CartItem } from "../../../interfaces/cart-types";
import { deleteProductInCart } from "../../../services/cart/delete-product-in-cart";

import { updateCart } from "../../../services/cart/update-cart";

import { useCartStore } from "../../../store/use-cart-store";
import { Trash2 } from "lucide-react";

export const CartPage = () => {

    const items = useCartStore(state => state.items);
    const { totalPrice, addItem, decreaseItem, removeItem } = useCartStore(state => state);

    const updateItem = async (item: CartItem, quantity: number) => {
        try {
            await updateCart(item.product.id, quantity)

        } catch (error) {
            toast.error("Ha ocurrido un error, intentelo nuevamente")

        } finally {
            console.log("finally");

        }
    }

    const moreitems = (item: CartItem) => {
        addItem(item.product)
        updateItem(item, item.quantity + 1)
    }
    const restitems = (item: CartItem) => {
        decreaseItem(item.product.id)
        updateItem(item, item.quantity - 1)
    }
    const deleteItem = async (item: CartItem) => {
        removeItem(item.product.id)
        await deleteProductInCart(item.product.id)
    }
    return (
        <div className="min-h-screen  py-12">
            <div className="container mx-auto ">
                <TitleSection title="Tu Carrito" className="mb-10" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* 🛒 Productos en el carrito */}
                    <div className="lg:col-span-2 space-y-6">

                        {items.length === 0 && (
                            <Card className="p-10 text-center shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Tu carrito está vacío 🛍️
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Agrega productos para continuar con tu compra.
                                </p>
                            </Card>
                        )}

                        {items.map((item) => (
                            <Card key={item.product.id} className="p-4 flex gap-5 rounded-2xl shadow-sm hover:shadow-md transition">

                                {/* Imagen */}
                                <img
                                    src={item.product.imgUrl || ""}
                                    alt={item.product.name}
                                    className="w-28 h-28 rounded-xl object-cover shadow-sm"
                                />

                                {/* Info del producto */}
                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {item.product.name}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.product.description || "Sin descripción."}
                                        </p>
                                    </div>

                                    {/* Precio + Cantidad */}
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-xl font-bold text-gray-900">
                                            ${item.product.price}
                                        </span>
                                      
                                        <div className="flex items-center gap-3">
                                            <CustomButton
                                                onClick={() => restitems(item)}
                                                label="-"
                                                variant="outline"
                                                size="icon"
                                                className="rounded-full w-8 h-8 hover:text-white"
                                            />
                                            <span className="font-semibold text-gray-800">
                                                {item.quantity}
                                            </span>
                                            <CustomButton
                                                label="+"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => moreitems(item)}
                                                className="rounded-full w-8 h-8 hover:text-white"
                                            />
                                            <CustomButton
                                                onClick={() => deleteItem(item)}
                                                label=""
                                                variant="outline"
                                                icon={<Trash2 className="text-red-600" />}
                                                size="icon"
                                                className="rounded-full w-8 h-8 "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* 🧾 Resumen del pedido */}
                    <Card className="p-6 sticky top-24 h-fit shadow-lg rounded-2xl">
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Resumen del Pedido
                            </h2>
                        </CardHeader>

                        <CardContent className="space-y-4 text-gray-700">

                            <Separator />

                            <div className="flex justify-between text-lg font-semibold text-gray-900">
                                <span>Total</span>
                                <span>{totalPrice}</span>
                            </div>

                            <CustomButton
                                label="Proceder al Pago"
                                className="w-full mt-5 text-white bg-blue-600 hover:bg-blue-700"
                            />
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
};
