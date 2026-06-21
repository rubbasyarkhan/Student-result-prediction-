import React, { useState, useEffect } from 'react';
import api from '../api/axios';

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
      setError(err.response?.data?.detail || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No prediction history available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {teacherView ? 'All Predictions' : 'Prediction History'}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Predicted Class
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                Timestamp
              </th>
              {teacherView && (
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                  User
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {item.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.prediction === 'H'
                        ? 'bg-green-100 text-green-800'
                        : item.prediction === 'M'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.prediction}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                {teacherView && (
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {item.user_email || 'Unknown'}
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
