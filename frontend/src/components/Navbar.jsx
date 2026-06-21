import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-emerald-500/10 backdrop-blur-md bg-black/40">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-500/15 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold tracking-tight text-white text-lg">
            Edu<span className="text-emerald-400">Predict</span>
          </span>
        </Link>
        
        {/* User profile & Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-300 text-xs">
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{user?.name}</span>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">{role}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#12281e] text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Sign Out</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
