import { Outlet } from "react-router";
import { HeaderAuth } from "../components/layout/header/header-auth";
import { Footer } from "../components/layout/footer/footer";
import { Toaster } from "sonner";

export const AuthLayout = () => {
  return (
    <section className="min-h-screen flex flex-col ">
      <HeaderAuth />

      {/* Contenido principal */}
      <main className="flex-1 flex justify-center items-start py-12">
        <div className="w-full max-w-7xl px-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </section>
  );
};
