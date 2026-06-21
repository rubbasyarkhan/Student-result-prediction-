import React, { useState } from 'react';
import api from '../api/axios';
import { UploadCloud, FileSpreadsheet, Download, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Please select a valid CSV spreadsheet file');
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setPredictions([]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/predict/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPredictions(response.data.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Bulk prediction failed. Verify CSV headers.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (predictions.length === 0) return;

    const headers = Object.keys(predictions[0]).join(',');
    const rows = predictions.map(row => Object.values(row).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'predictions.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8 font-display select-none">
      {/* Upload Zone Panel */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bulk Evaluator</h2>
            <p className="text-xs text-gray-400">Upload CSV batches (maximum 99 rows) for instant classification</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 bg-red-950/40 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Custom Glow Dropzone Area */}
          <div className="relative group">
            <input
              type="file"
              accept=".csv"
              id="file-upload"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`w-full py-10 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-6 transition-all duration-300 ${
              file 
                ? 'border-emerald-500/50 bg-emerald-950/5'
                : 'border-white/10 group-hover:border-emerald-500/30 bg-black/20'
            }`}>
              {file ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{file.name}</h4>
                  <p className="text-xs text-gray-400 mt-1 font-light">
                    {(file.size / 1024).toFixed(2)} KB • Ready to analyze
                  </p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/5 transition-colors mb-4">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-200">Drag & drop your CSV file</h4>
                  <p className="text-xs text-gray-500 mt-1 font-light max-w-xs">
                    Or click here to browse. Ensure headers match the template.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div className="text-[10px] text-gray-500 font-light">
              Columns must exactly align with ML model specifications. Download template schema if unsure.
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              {loading ? 'Evaluating Batch...' : 'Analyze Spreadsheet'}
            </button>
          </div>
        </form>
      </div>

      {/* Uploaded predictions result list */}
      {predictions.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Evaluation Results ({predictions.length})</h3>
            </div>
            
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Download predictions.csv</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Results table representation */}
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="min-w-full divide-y divide-white/5 text-left text-xs bg-black/20">
              <thead>
                <tr className="bg-white/5 text-gray-300 font-semibold uppercase tracking-wider">
                  {Object.keys(predictions[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-3 border-b border-white/5"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-400 font-light">
                {predictions.map((row, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    {Object.entries(row).map(([key, value], cellIndex) => {
                      const isPredictionCell = key.toLowerCase() === 'prediction';
                      return (
                        <td
                          key={cellIndex}
                          className="px-4 py-3"
                        >
                          {isPredictionCell ? (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                value === 'H'
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                  : value === 'M'
                                  ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/10 border-red-500/20 text-red-400'
                              }`}
                            >
                              Class {value}
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
