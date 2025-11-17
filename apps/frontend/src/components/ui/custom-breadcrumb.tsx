import { Link, useLocation } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";


interface CustomBreadcrumbProps {
  /**
   * Permite reemplazar los nombres de cada segmento
   * Ej: { products: "Productos", "air-max": "Air Max 2025" }
   */
  labels?: Record<string, string>;
}

export const CustomBreadcrumb = ({ labels = {} }: CustomBreadcrumbProps) => {
  const location = useLocation();

  // /products/shoes/air-max → ["products", "shoes", "air-max"]
  const segments = location.pathname.split("/").filter(Boolean);

  const buildHref = (index: number) =>
    "/" + segments.slice(0, index + 1).join("/");

  const formatLabel = (segment: string) =>
    labels[segment] ||
    segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* HOME */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = buildHref(index);

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatLabel(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{formatLabel(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
