import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import PredictionForm from '../components/PredictionForm';
import BulkUpload from '../components/BulkUpload';
import HistoryTable from '../components/HistoryTable';
import api from '../api/axios';
import { 
  Sparkles, 
  History, 
  UploadCloud, 
  Download, 
  Database, 
  FileSpreadsheet, 
  Users 
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('predict');
  const dashboardRef = useRef(null);

  useEffect(() => {
    // Fade in dashboard contents
    gsap.fromTo(
      dashboardRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

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
    <div className="min-h-screen text-gray-100 font-display select-none">
      <Navbar />
      
      <div 
        ref={dashboardRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        {/* Dashboard Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Instructor <span className="text-emerald-400">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-2 font-light text-sm">
              Perform single predictions, bulk process batches of student data, and view history.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-950/20 border border-emerald-500/25 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-glow-green" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Instructor Access</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Authorized Role</div>
              <div className="text-lg font-bold text-white mt-0.5">Teacher (Full Access)</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Bulk Upload Limit</div>
              <div className="text-lg font-bold text-white mt-0.5">99 Records / File</div>
            </div>
          </div>

          {/* Glowing download action card */}
          <button 
            onClick={handleDownloadTemplate}
            className="glass-panel p-6 rounded-2xl flex items-center space-x-4 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-950/10 transition-all duration-300 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-400 text-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-emerald-400 tracking-wider uppercase font-bold">CSV Template</div>
              <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-1">
                Download Scheme
              </div>
            </div>
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="mb-8 border-b border-white/5">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <button
              onClick={() => setActiveTab('predict')}
              className={`pb-4 text-sm font-semibold tracking-wide flex items-center gap-2 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'predict'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Single Prediction
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`pb-4 text-sm font-semibold tracking-wide flex items-center gap-2 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'bulk'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              Bulk Upload
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-4 text-sm font-semibold tracking-wide flex items-center gap-2 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'history'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <History className="w-4 h-4" />
              All Predictions
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="transition-all duration-300">
          {activeTab === 'predict' && <PredictionForm />}
          {activeTab === 'bulk' && <BulkUpload />}
          {activeTab === 'history' && <HistoryTable teacherView={true} />}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
