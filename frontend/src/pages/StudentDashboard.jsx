import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PredictionForm from '../components/PredictionForm';
import HistoryTable from '../components/HistoryTable';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('predict');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Make predictions and view your history</p>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4">
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
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Prediction History
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'predict' && <PredictionForm />}
          {activeTab === 'history' && <HistoryTable teacherView={false} />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
