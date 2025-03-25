import './globals.css';
import { Providers } from './providers';
import { MainNavbar } from '@/interfaces/navigation/MainNavbar';
import { ToastProvider } from "@/components/ui/toast";
import { ToastViewport } from "@/components/ui/toast";

export const metadata = {
  title: 'WorkChain - Decentralized Freelance Platform',
  description: 'Connect and collaborate in a decentralized freelance marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50">
        <Providers>
          <ToastProvider>
            <div className="relative h-full flex flex-col">
              {/* Navbar siempre visible */}
              <MainNavbar />
              {/* Contenido principal con scroll */}
              <main className="flex-1 overflow-auto">
                <div className="container mx-auto px-4 py-8">
                  {children}
                </div>
              </main>
            </div>
            <ToastViewport />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
