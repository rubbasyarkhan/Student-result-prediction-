import React, { useState } from 'react';
import api from '../api/axios';

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

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Single Prediction</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {prediction && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Predicted Class:</strong> {prediction}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nationality</label>
            <select
              name="NationalITy"
              value={formData.NationalITy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="KW">Kuwait</option>
              <option value="Jordan">Jordan</option>
              <option value="Palestine">Palestine</option>
              <option value="Iraq">Iraq</option>
              <option value="Lebanon">Lebanon</option>
              <option value="SaudiArabia">Saudi Arabia</option>
              <option value="Egypt">Egypt</option>
              <option value="Syria">Syria</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="Lybia">Libya</option>
              <option value="Iran">Iran</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Morocco">Morocco</option>
              <option value="venzuela">Venezuela</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Place of Birth</label>
            <select
              name="PlaceofBirth"
              value={formData.PlaceofBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="KuwaIT">Kuwait</option>
              <option value="Jordan">Jordan</option>
              <option value="Palestine">Palestine</option>
              <option value="Iraq">Iraq</option>
              <option value="Lebanon">Lebanon</option>
              <option value="SaudiArabia">Saudi Arabia</option>
              <option value="Egypt">Egypt</option>
              <option value="Syria">Syria</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="Lybia">Libya</option>
              <option value="Iran">Iran</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Morocco">Morocco</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Stage ID</label>
            <select
              name="StageID"
              value={formData.StageID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lowerlevel">Lower Level</option>
              <option value="MiddleSchool">Middle School</option>
              <option value="HighSchool">High School</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Grade ID</label>
            <select
              name="GradeID"
              value={formData.GradeID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="G-01">G-01</option>
              <option value="G-02">G-02</option>
              <option value="G-03">G-03</option>
              <option value="G-04">G-04</option>
              <option value="G-05">G-05</option>
              <option value="G-06">G-06</option>
              <option value="G-07">G-07</option>
              <option value="G-08">G-08</option>
              <option value="G-09">G-09</option>
              <option value="G-10">G-10</option>
              <option value="G-11">G-11</option>
              <option value="G-12">G-12</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Section ID</label>
            <select
              name="SectionID"
              value={formData.SectionID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Topic</label>
            <select
              name="Topic"
              value={formData.Topic}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="IT">IT</option>
              <option value="Math">Math</option>
              <option value="Arabic">Arabic</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Quran">Quran</option>
              <option value="History">History</option>
              <option value="Geology">Geology</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Semester</label>
            <select
              name="Semester"
              value={formData.Semester}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="F">First</option>
              <option value="S">Second</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Relation</label>
            <select
              name="Relation"
              value={formData.Relation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Father">Father</option>
              <option value="Mum">Mother</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Raised Hands (0-100)</label>
            <input
              type="number"
              name="raisedhands"
              value={formData.raisedhands}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Visited Resources (0-100)</label>
            <input
              type="number"
              name="VisITedResources"
              value={formData.VisITedResources}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Announcements View (0-100)</label>
            <input
              type="number"
              name="AnnouncementsView"
              value={formData.AnnouncementsView}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Discussion (0-100)</label>
            <input
              type="number"
              name="Discussion"
              value={formData.Discussion}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Parent Answering Survey</label>
            <select
              name="ParentAnsweringSurvey"
              value={formData.ParentAnsweringSurvey}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Parent School Satisfaction</label>
            <select
              name="ParentschoolSatisfaction"
              value={formData.ParentschoolSatisfaction}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Student Absence Days</label>
            <select
              name="StudentAbsenceDays"
              value={formData.StudentAbsenceDays}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Under-7">Under 7</option>
              <option value="Above-7">Above 7</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 mt-4"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
