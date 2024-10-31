import { ReactNode } from "react";
import { IoClose } from "react-icons/io5"; // Optional: for close icon

interface ModalProps {
  children: ReactNode; // Content of the modal
  onClose: () => void; // Function to close the modal
  title?: string; // Optional: Title of the modal
}

const Modal = ({ children, onClose, title }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90vw] md:w-[50vw] lg:w-[40vw] p-6 rounded-lg shadow-lg relative">
        
        {/* Modal Title and Close Button */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Content (Children) */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
