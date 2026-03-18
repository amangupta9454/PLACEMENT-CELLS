import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import Banner from '../components/Banner';
import AlertModal from '../components/AlertModal';

export const DashboardLayout = ({ role }) => {
  const { socket } = useSocket();
  const [banner, setBanner] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('new_notification', (data) => {
      // data: { title, message, type, ... }
      if (data.type === 'high') {
        setModal({ title: data.title, message: data.message });
      } else {
        setBanner({ title: data.title, message: data.message, type: data.type });
        // Auto dismiss banner after 10s
        setTimeout(() => setBanner(null), 10000);
      }
    });

    return () => {
      socket.off('new_notification');
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors duration-300">
      <Navbar />
      
      {banner && (
        <div className="fixed top-16 left-0 w-full z-40">
           <Banner message={`${banner.title}: ${banner.message}`} type={banner.type} onClose={() => setBanner(null)} />
        </div>
      )}

      <div className="flex flex-1 pt-16 mt-2">
        <Sidebar role={role} />
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>

      <AlertModal 
        isOpen={!!modal} 
        title={modal?.title} 
        message={modal?.message} 
        onClose={() => setModal(null)} 
      />
    </div>
  );
};

export default DashboardLayout;
