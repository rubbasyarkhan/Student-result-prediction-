import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navbar from '../components/Navbar';
import PredictionForm from '../components/PredictionForm';
import HistoryTable from '../components/HistoryTable';
import { Sparkles, History, Activity, Database, CheckCircle2 } from 'lucide-react';

const StudentDashboard = () => {
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
              Student <span className="text-emerald-400">Portal</span>
            </h1>
            <p className="text-gray-400 mt-2 font-light text-sm">
              Process predictions and track academic outcome estimations.
            </p>
          </div>
          
          {/* Quick status box */}
          <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-950/20 border border-emerald-500/25 rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-glow-green" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">Model Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Active Model</div>
              <div className="text-lg font-bold text-white mt-0.5">Random Forest</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Variables Analyzed</div>
              <div className="text-lg font-bold text-white mt-0.5">16 Features</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Accuracy Goal</div>
              <div className="text-lg font-bold text-white mt-0.5">High precision</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="mb-8 border-b border-white/5">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('predict')}
              className={`pb-4 text-sm font-semibold tracking-wide flex items-center gap-2 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'predict'
                  ? 'border-emerald-500 text-emerald-400 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Make Prediction
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
              Prediction History
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="transition-opacity duration-300">
          {activeTab === 'predict' && <PredictionForm />}
          {activeTab === 'history' && <HistoryTable teacherView={false} />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
