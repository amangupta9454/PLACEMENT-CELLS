import { useState } from 'react';

const ResumeBuilder = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
          <p className="text-gray-500 text-sm">Create and polish your professional resume with our built-in tool.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Editor Enabled</span>
        </div>
      </div>

      <div className="flex-1 relative glass-panel rounded-2xl overflow-hidden border border-[var(--panel-border)] bg-gray-50 shadow-inner">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-gray-500 animate-pulse">Loading Premium Resume Builder...</p>
            </div>
          </div>
        )}
        
        <iframe
          src="https://resume-aman.lovable.app"
          className="w-full h-[calc(100vh-210px)] border-none"
          onLoad={() => setLoading(false)}
          title="Resume Builder"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
        />
      </div>
      
      <div className="flex items-center justify-center gap-4 py-2 border-t border-dashed border-gray-200">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">Powered by Lovable Resume Builder Integration</p>
      </div>
    </div>
  );
};

export default ResumeBuilder;
