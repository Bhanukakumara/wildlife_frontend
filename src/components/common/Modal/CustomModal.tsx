import { X } from "@mui/icons-material";

interface CustomModalProps {
  open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

const CustomModal = ({ onClose, title, children, actions }: CustomModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {title && (
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
        
        {actions && (
          <div className="flex justify-end space-x-3 p-6 pt-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal;