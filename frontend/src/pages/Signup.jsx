import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';
import { Brain, User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const itemsRef = useRef([]);
  itemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP Entrance animation
    gsap.fromTo(
      cardRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power4.out' }
    );

    gsap.fromTo(
      itemsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signup(formData);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
      // Animate card shake on error
      gsap.to(cardRef.current, {
        x: '+=10',
        yoyo: true,
        repeat: 5,
        duration: 0.05,
        onComplete: () => {
          gsap.set(cardRef.current, { x: 0 });
        }
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 font-display overflow-hidden select-none">

      <div 
        ref={cardRef}
        className="w-full max-w-md glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle top glow ring */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div ref={addToRefs} className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-700 items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
            <Brain className="w-7 h-7 text-black" />
          </div>
          <h2 ref={addToRefs} className="text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p ref={addToRefs} className="text-sm text-gray-400 mt-2 font-light">
            Register as a Student or Teacher
          </p>
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 bg-red-950/40 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div ref={addToRefs} className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <User className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-2.5 custom-input text-sm"
                required
              />
            </div>
          </div>

          {/* Email field */}
          <div ref={addToRefs} className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@university.edu"
                className="w-full pl-11 pr-4 py-2.5 custom-input text-sm"
                required
              />
            </div>
          </div>
          
          {/* Password field */}
          <div ref={addToRefs} className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 custom-input text-sm"
                required
              />
            </div>
          </div>

          {/* Role select */}
          <div ref={addToRefs} className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="role">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 custom-input text-sm bg-black text-gray-200 cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
              }}
              required
            >
              <option value="student" className="bg-[#0c0d12]">Student</option>
              <option value="teacher" className="bg-[#0c0d12]">Teacher (Instructor)</option>
            </select>
          </div>
          
          {/* Submit button */}
          <div ref={addToRefs} className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2 group transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{loading ? 'Registering...' : 'Register'}</span>
              <UserPlus className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>
        
        {/* Footer text */}
        <p ref={addToRefs} className="mt-6 text-center text-sm text-gray-400 font-light">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
