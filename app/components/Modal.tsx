export default function Modal({ children, onClose, isOpen }: { children: React.ReactNode; onClose: () => void; isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white  rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}> 
        {children}
      </div>
    </div>
  );
}