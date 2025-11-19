import { useState } from "react";
import { CustomButton } from "../../ui/custom-button";
import { Input } from "../../ui/input";
import { userActions } from "../../../const/actions-header";
import { EcommerceNavigation } from "./ecommerce-navigation";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section>
            <nav className="bg-white sticky top-0 z-20 shadow-lg w-full start-0 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2">

                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                        <img src="/logo-ecommerce.jpg" className="h-13" alt="Ecommerce Logo" />
                        <span className="self-center text-xl font-bold text-gray-900 whitespace-nowrap">
                            TecnoCart
                        </span>
                    </a>

                    {/* Desktop right side */}
                    <div className="hidden md:flex items-center space-x-4">

                        {/* Search */}
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <CustomButton
                                variant="ghost"
                                className="absolute right-1 top-1 p-1 h-8 w-8 hover:bg-transparent"
                                icon={
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                                label=""
                            />
                        </div>

                        {/* User actions */}
                        <div className="flex items-center space-x-1">
                            {userActions.map((action) => (
                                <CustomButton
                                    key={action.label}
                                    variant="ghost"
                                    icon={action.icon}
                                    label={action.label}
                                    onClick={action.onClick}
                                    className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <CustomButton
                        variant="ghost"
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        icon={
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                            </svg>
                        }
                        label=""
                    />
                </div>
            </nav>
            {/* Mobile Menu Animated */}
            {/* Overlay (fondo oscuro) */}
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
                ></div>
            )}

            {/* Mobile Menu */}
            <div
                className={`
        md:hidden fixed top-0 right-0 w-64 h-screen bg-white shadow-xl border-l border-gray-200
        z-50 transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
    `}
            >
                {/* Header del menú */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Menú</h2>

                    {/* Botón cerrar */}
                    <CustomButton
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        icon={
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        }
                        label=""
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    />
                </div>

                {/* Contenido */}
                <div className="p-2 space-y-6">

                    {/* Buscador */}
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />

                        <CustomButton
                            variant="ghost"
                            className="absolute right-2 top-1 p-1 h-7 w-7 hover:bg-transparent"
                            icon={
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                            label=""
                        />
                    </div>

                    {/* Acciones del usuario */}
                    <div className="flex flex-col space-y-2 text-gray-700">

                        {userActions.map((action) => (
                            <CustomButton
                                key={action.label}
                                variant="ghost"
                                icon={action.icon}
                                label={action.label}
                                onClick={action.onClick}
                                className="flex items-center justify-start p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                            />
                        ))}

                    </div>

                </div>
            </div>

            <EcommerceNavigation></EcommerceNavigation>
        </section>
    );
};
