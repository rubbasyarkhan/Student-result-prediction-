import React, { useState } from 'react';
import api from '../api/axios';
import { 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  GraduationCap,
  BookOpen,
  Activity,
  Users,
  Home
} from 'lucide-react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    gender: 'M',
    NationalITy: 'KW',
    PlaceofBirth: 'KuwaIT',
    StageID: 'lowerlevel',
    GradeID: 'G-01',
    SectionID: 'A',
    Topic: 'IT',
    Semester: 'F',
    Relation: 'Father',
    raisedhands: 0,
    VisITedResources: 0,
    AnnouncementsView: 0,
    Discussion: 0,
    ParentAnsweringSurvey: 'Yes',
    ParentschoolSatisfaction: 'Good',
    StudentAbsenceDays: 'Under-7',
  });

  const [activeSection, setActiveSection] = useState('academic');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('hands') || name.includes('Resources') || name.includes('View') || name.includes('Discussion')
        ? parseInt(value) || 0
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      const response = await api.post('/predict/', formData);
      setPrediction(response.data.data.prediction);
    } catch (err) {
      setError(err.response?.data?.detail || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 'academic', label: 'Academic Profile', icon: BookOpen },
    { id: 'behavioral', label: 'Student Activity', icon: Activity },
    { id: 'parental', label: 'Parent Engagement', icon: Users },
    { id: 'demographics', label: 'Demographics & Absence', icon: Home },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Form Column (Takes 2/3 space on large screens) */}
      <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Student Classifier</h2>
              <p className="text-xs text-gray-400">Fill details across the four metric sections below</p>
            </div>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-white/5 mb-6 overflow-x-auto">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-2 pb-3 px-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-200 cursor-pointer ${
                    activeSection === sec.id
                      ? 'border-emerald-500 text-emerald-400 font-bold'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {sec.label}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Academic Section */}
            {activeSection === 'academic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Stage Level</label>
                  <select
                    name="StageID"
                    value={formData.StageID}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="lowerlevel" className="bg-[#07080a]">Lower Level</option>
                    <option value="MiddleSchool" className="bg-[#07080a]">Middle School</option>
                    <option value="HighSchool" className="bg-[#07080a]">High School</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Grade Level</label>
                  <select
                    name="GradeID"
                    value={formData.GradeID}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const val = `G-${String(i + 1).padStart(2, '0')}`;
                      return (
                        <option key={val} value={val} className="bg-[#07080a]">
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Section ID</label>
                  <select
                    name="SectionID"
                    value={formData.SectionID}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="A" className="bg-[#07080a]">Section A</option>
                    <option value="B" className="bg-[#07080a]">Section B</option>
                    <option value="C" className="bg-[#07080a]">Section C</option>
                    <option value="D" className="bg-[#07080a]">Section D</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Topic / Subject</label>
                  <select
                    name="Topic"
                    value={formData.Topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {['IT', 'Math', 'Arabic', 'Science', 'English', 'Quran', 'History', 'Geology', 'Biology', 'Chemistry', 'French', 'Spanish'].map(t => (
                      <option key={t} value={t} className="bg-[#07080a]">{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Semester</label>
                  <select
                    name="Semester"
                    value={formData.Semester}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="F" className="bg-[#07080a]">First Semester (Fall)</option>
                    <option value="S" className="bg-[#07080a]">Second Semester (Spring)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 2. Student Activity Section */}
            {activeSection === 'behavioral' && (
              <div className="space-y-6 animate-fade-in">
                {[
                  { name: 'raisedhands', label: 'Raised Hands', desc: 'Classroom hand raising frequency' },
                  { name: 'VisITedResources', label: 'Visited Resources', desc: 'Number of times e-learning resources were opened' },
                  { name: 'AnnouncementsView', label: 'Announcements Views', desc: 'Checking news board notifications' },
                  { name: 'Discussion', label: 'Discussion Forum Participation', desc: 'Active involvement in discussions' }
                ].map((input) => (
                  <div key={input.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">{input.label}</label>
                        <span className="text-[10px] text-gray-500 font-light">{input.desc}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/25">
                        {formData[input.name]} / 100
                      </span>
                    </div>
                    <input
                      type="range"
                      name={input.name}
                      value={formData[input.name]}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 3. Parent Engagement Section */}
            {activeSection === 'parental' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Responsible Guardian</label>
                  <select
                    name="Relation"
                    value={formData.Relation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="Father" className="bg-[#07080a]">Father</option>
                    <option value="Mum" className="bg-[#07080a]">Mother</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Survey Completed by Parent</label>
                  <select
                    name="ParentAnsweringSurvey"
                    value={formData.ParentAnsweringSurvey}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="Yes" className="bg-[#07080a]">Yes</option>
                    <option value="No" className="bg-[#07080a]">No</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Parent School Satisfaction</label>
                  <select
                    name="ParentschoolSatisfaction"
                    value={formData.ParentschoolSatisfaction}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <option value="Good" className="bg-[#07080a]">Good</option>
                    <option value="Bad" className="bg-[#07080a]">Bad (Needs Improvement)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 4. Demographics & Absence Section */}
            {activeSection === 'demographics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Gender</label>
                  <div className="flex gap-4">
                    {['M', 'F'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`flex-1 py-3 text-sm font-semibold border rounded-lg transition-all duration-200 cursor-pointer ${
                          formData.gender === g
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                            : 'border-white/10 hover:border-white/20 text-gray-400'
                        }`}
                      >
                        {g === 'M' ? 'Male' : 'Female'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Absenteeism Days</label>
                  <div className="flex gap-4">
                    {[
                      { val: 'Under-7', label: '< 7 Days' },
                      { val: 'Above-7', label: '≥ 7 Days' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, StudentAbsenceDays: opt.val })}
                        className={`flex-1 py-3 text-sm font-semibold border rounded-lg transition-all duration-200 cursor-pointer ${
                          formData.StudentAbsenceDays === opt.val
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                            : 'border-white/10 hover:border-white/20 text-gray-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Nationality</label>
                  <select
                    name="NationalITy"
                    value={formData.NationalITy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {['KW', 'Jordan', 'Palestine', 'Iraq', 'Lebanon', 'SaudiArabia', 'Egypt', 'Syria', 'USA', 'India', 'Lybia', 'Iran', 'Tunisia', 'Morocco', 'venzuela'].map(n => (
                      <option key={n} value={n} className="bg-[#07080a]">{n}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">Place of Birth</label>
                  <select
                    name="PlaceofBirth"
                    value={formData.PlaceofBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 custom-input text-sm bg-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {['KuwaIT', 'Jordan', 'Palestine', 'Iraq', 'Lebanon', 'SaudiArabia', 'Egypt', 'Syria', 'USA', 'India', 'Lybia', 'Iran', 'Tunisia', 'Morocco'].map(p => (
                      <option key={p} value={p} className="bg-[#07080a]">{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Form Bottom Submission Section */}
        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between">
          <div className="text-[10px] text-gray-500 max-w-xs font-light">
            Current configuration target: classification RandomForest model. Make sure to complete all tabs.
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Evaluating...' : 'Predict Performance'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prediction Output HUD Dashboard Widget */}
      <div className="lg:col-span-1 flex flex-col space-y-6">
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex-1 flex flex-col justify-between min-h-[300px]">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center justify-between border-b border-white/5 pb-4">
            <span>Result Analytics</span>
            <GraduationCap className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Conditional Result displays */}
          {!prediction ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <HelpCircle className="w-12 h-12 text-gray-600 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold text-white">No Evaluation Made</h4>
                <p className="text-xs text-gray-500 max-w-xs mt-1 font-light leading-relaxed">
                  Enter student metrics and submit the profile questionnaire to trigger the Random Forest classifier.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6 animate-scale-in">
              {/* Output gauge */}
              <div className="relative">
                <div 
                  className={`w-32 h-32 rounded-full flex items-center justify-center border-4 relative ${
                    prediction === 'H' 
                      ? 'border-emerald-500/30 shadow-2xl shadow-emerald-500/10 animate-pulse'
                      : prediction === 'M'
                      ? 'border-yellow-500/30 shadow-2xl shadow-yellow-500/10'
                      : 'border-red-500/30 shadow-2xl shadow-red-500/10 animate-bounce'
                  }`}
                >
                  <span 
                    className={`text-5xl font-black ${
                      prediction === 'H' 
                        ? 'text-emerald-400' 
                        : prediction === 'M' 
                        ? 'text-yellow-400' 
                        : 'text-red-400'
                    }`}
                  >
                    {prediction}
                  </span>
                </div>
              </div>

              {/* Status information */}
              <div>
                <h3 
                  className={`text-lg font-bold ${
                    prediction === 'H' 
                      ? 'text-emerald-400' 
                      : prediction === 'M' 
                      ? 'text-yellow-400' 
                      : 'text-red-400'
                  }`}
                >
                  {prediction === 'H' && 'High Achievement'}
                  {prediction === 'M' && 'Medium Achievement'}
                  {prediction === 'L' && 'Low Achievement Risk'}
                </h3>
                
                <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed max-w-xs">
                  {prediction === 'H' && 'The student demonstrates robust behavioral engagement. Low risk of failure. Expected to pass with excellent grades.'}
                  {prediction === 'M' && 'The student exhibits standard attendance and moderate activity parameters. Average outcomes anticipated.'}
                  {prediction === 'L' && 'CRITICAL: High risk parameters detected (excessive absences or minimal interaction logs). Immediate counseling suggested.'}
                </p>
              </div>
            </div>
          )}

          {/* Model information badge */}
          <div className="border-t border-white/5 pt-4 text-center">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">
              Classification Pipeline: Random Forest Ensemble
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
