import { Shield } from 'lucide-react';

export default function SafariPrivacyReport() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Privacy Report</h2>
            <div className="bg-blue-100/70 rounded-lg p-4 flex items-center gap-4">
                <div className="flex items-center gap-1 font-bold text-gray-700">
                    <Shield size={16} fill="black" stroke="none" />
                    <span>16</span>
                </div>
                <p className="text-sm text-gray-700">
                    In the last seven days, Safari has prevented 16 trackers from profiling you.
                </p>
            </div>
        </div>
    );
}
