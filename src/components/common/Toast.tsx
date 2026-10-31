import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[6px_6px_0_#d6a943] font-mono-code text-xs"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#d6a943] shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-[#d6a943] shrink-0 mt-0.5" />}

          <div className="flex-1 font-bold leading-relaxed">{toast.message}</div>

          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-white hover:text-[#d6a943] p-1 border border-white/20 transition cursor-pointer"
            title="Dismiss"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
