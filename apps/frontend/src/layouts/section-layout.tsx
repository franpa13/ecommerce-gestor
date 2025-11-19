interface Props {
    children: React.ReactNode;
    tag?: string;
    tagClassName?: string;
}

export const SectionLayout = ({ children, tag = "#TecnoCart", tagClassName = "" }: Props) => {
    return (
        <section className="bg-gray-100 px-2 md:px-0  mt-5 relative">

            {/* Tag arriba a la izquierda */}
            <div
                className={`
          absolute -top-2 left-2 
          bg-blue-200 text-black 
          px-2 py-1 text-xs font-bold 
          ${tagClassName}
        `}
            >
                {tag}
            </div>

            {/* Contenido */}
            {children}
        </section>
    );
};
