import { Outlet } from 'react-router';
import { Footer } from '../components/layout/footer/footer';
import { Header } from '../components/layout/header/header';


export const MainLayout = () => {
    return (
        <div className="min-h-screen w-full flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
  
            {/* Footer */}
            <Footer />
        </div>
    )
}
