import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';
import { Brain, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      if (result.role === 'student') {
        navigate('/student-dashboard');
      } else if (result.role === 'teacher') {
        navigate('/teacher-dashboard');
      }
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
            Welcome Back
          </h2>
          <p ref={addToRefs} className="text-sm text-gray-400 mt-2 font-light">
            Sign in to access your EduPredict portal
          </p>
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 bg-red-950/40 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div ref={addToRefs} className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-11 pr-4 py-3 custom-input text-sm"
                required
              />
            </div>
          </div>
          
          {/* Password field */}
          <div ref={addToRefs} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 custom-input text-sm"
                required
              />
            </div>
          </div>
          
          {/* Submit button */}
          <div ref={addToRefs}>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2 group transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>
        
        {/* Footer text */}
        <p ref={addToRefs} className="mt-8 text-center text-sm text-gray-400 font-light">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
