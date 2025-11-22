
export const Footer = () => {
    return (
        <footer className="  bg-white mt-auto shadow-2xl ">
            <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg text-black font-semibold mb-4">Nuestra Empresa</h3>
                        <ul className="space-y-2 text-black">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Prensa</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg text-black font-semibold mb-2">Servicio al Cliente</h3>
                        <ul className="space-y-2 text-black">
                            <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg text-black font-semibold mb-2">Legal</h3>
                        <ul className="space-y-2 text-black">
                            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-black">Síguenos</h3>
                        <div className="flex space-x-4">
                            {/* Iconos de redes sociales */}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-black">
                    <p>&copy; 2024 TecnoCart. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
