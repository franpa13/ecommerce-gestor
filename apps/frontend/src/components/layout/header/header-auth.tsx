import { Link } from "react-router"


export const HeaderAuth = () => {
    return (
        <nav className="bg-white sticky top-0 z-20 shadow-lg px-4 py-2 w-full start-0 border-b border-gray-200">
            <Link to="/ecommerce" className="flex items-center space-x-2 rtl:space-x-reverse">
                <img src="/logo-ecommerce.jpg" className="h-13" alt="Ecommerce Logo" />
                <span className="self-center text-xl font-bold text-gray-900 whitespace-nowrap">
                    TecnoCart
                </span>
            </Link>

        </nav>
    )
}
