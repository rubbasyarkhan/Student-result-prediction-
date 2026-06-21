import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { History, Calendar, User, Eye, AlertCircle } from 'lucide-react';

const HistoryTable = ({ teacherView = false }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/predict/history');
      setHistory(response.data.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch prediction history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <span className="text-xs text-gray-400 font-light">Loading historical records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 bg-red-950/40 border border-red-500/30 text-red-400 p-6 rounded-2xl text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
          <History className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">No History Available</h4>
          <p className="text-xs text-gray-500 max-w-xs mt-1 font-light leading-relaxed">
            There are no past records logged under this account classification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {teacherView ? 'Master Log File' : 'Prediction Registry'}
          </h2>
          <p className="text-xs text-gray-400">Chronological history of student classification instances</p>
        </div>
      </div>
      
      <div className="overflow-x-auto border border-white/5 rounded-xl">
        <table className="min-w-full divide-y divide-white/5 text-left text-xs bg-black/20">
          <thead>
            <tr className="bg-white/5 text-gray-300 font-semibold uppercase tracking-wider">
              <th className="px-5 py-4 border-b border-white/5">
                Evaluation ID
              </th>
              <th className="px-5 py-4 border-b border-white/5">
                Predicted Outcome
              </th>
              <th className="px-5 py-4 border-b border-white/5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Timestamp
              </th>
              {teacherView && (
                <th className="px-5 py-4 border-b border-white/5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Requested By
                  </span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-400 font-light">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-5 py-4 font-mono text-emerald-500">
                  #EP-{String(item.id).padStart(5, '0')}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                      item.prediction === 'H'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/5'
                        : item.prediction === 'M'
                        ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}
                  >
                    {item.prediction === 'H' && 'Class H (High Achievement)'}
                    {item.prediction === 'M' && 'Class M (Medium Achievement)'}
                    {item.prediction === 'L' && 'Class L (Low Achievement Risk)'}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                {teacherView && (
                  <td className="px-5 py-4 text-gray-300 font-medium">
                    {item.user_email || 'System Default'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
