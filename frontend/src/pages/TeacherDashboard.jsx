import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PredictionForm from '../components/PredictionForm';
import BulkUpload from '../components/BulkUpload';
import HistoryTable from '../components/HistoryTable';
import api from '../api/axios';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('predict');

  const handleDownloadTemplate = async () => {
    try {
      const response = await api.get('/template/download', {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download template:', error);
      alert('Failed to download template');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Make predictions, upload bulk data, and view all predictions</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('predict')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                activeTab === 'predict'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Make Prediction
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                activeTab === 'bulk'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Bulk Upload
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Predictions
            </button>
            <button
              onClick={handleDownloadTemplate}
              className="px-4 py-2 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Download Template
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'predict' && <PredictionForm />}
          {activeTab === 'bulk' && <BulkUpload />}
          {activeTab === 'history' && <HistoryTable teacherView={true} />}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
