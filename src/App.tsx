import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShopPage } from './components/ShopPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activePage, notification } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A1B22] selection:bg-[#7A1C2E] selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-5 z-50 animate-bounce max-w-sm">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold border ${
              notification.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : notification.type === 'info'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Bars */}
      <AnnouncementBar />
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product' && <ProductDetailsPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'confirmation' && <OrderConfirmationPage />}
        {activePage === 'about' && <AboutView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'admin' && <AdminDashboardView />}
      </main>

      {/* Slide-over Cart & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
