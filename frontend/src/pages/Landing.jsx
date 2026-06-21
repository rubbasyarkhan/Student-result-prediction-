import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Users, 
  GraduationCap, 
  ChevronRight, 
  FileText, 
  CheckCircle,
  Activity,
  Layers
} from 'lucide-react';

const Landing = () => {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const explainerRef = useRef(null);

  useEffect(() => {
    // GSAP page load animations
    const ctx = gsap.context(() => {
      // Split text-like animation
      gsap.fromTo(
        '.reveal-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' }
      );

      gsap.fromTo(
        buttonsRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.5)' }
      );

      // Scroll trigger style entry for features
      gsap.fromTo(
        '.feature-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          }
        }
      );

      // Model Node flowchart entry
      gsap.fromTo(
        '.model-node',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: explainerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen font-display text-gray-100 selection:bg-emerald-500 selection:text-black">

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-emerald-500/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Edu<span className="text-emerald-400">Predict</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#metrics" className="hover:text-emerald-400 transition-colors">Student Metrics</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:text-emerald-400 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        {/* FYP Badge */}
        <div className="reveal-text inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Final Year Project (FYP) Submission</span>
        </div>

        <h1 ref={heroTextRef} className="reveal-text text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-white leading-tight">
          Predict Student Performance <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-500">
            Before Outcomes Are Set
          </span>
        </h1>

        <p className="reveal-text text-lg md:text-xl text-gray-400 max-w-2xl mt-8 font-light leading-relaxed">
          An advanced machine learning portal that evaluates behavioral indicators, academic tracking, and parent engagement to predict final performance. Empowering educators with early intervention.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full max-w-md">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-black hover:from-emerald-400 hover:to-green-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
          >
            Create Instructor Account
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-center"
          >
            Access Dashboard
          </Link>
        </div>

        {/* Dashboard Preview Banner (Geometric abstract glowing screen mock) */}
        <div className="reveal-text relative w-full max-w-5xl mt-24 aspect-[16/9] rounded-2xl border border-emerald-500/10 bg-black/40 backdrop-blur-md overflow-hidden p-3 shadow-2xl shadow-emerald-950/20">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
          <div className="w-full h-full rounded-xl bg-[#090b0e] border border-white/5 overflow-hidden flex flex-col">
            {/* Inner dummy bar */}
            <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-black/20">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/40" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <div className="text-[10px] text-gray-500 tracking-wider uppercase">edupredict_dashboard.exe</div>
              <div className="w-14" />
            </div>
            {/* Dummy Content */}
            <div className="flex-1 p-6 grid grid-cols-3 gap-6 text-left">
              <div className="col-span-2 space-y-4">
                <div className="h-6 w-48 rounded bg-emerald-500/10 border border-emerald-500/20 animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-28 rounded bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                    <span className="text-[10px] text-gray-400">CLASS PREDICTIONS</span>
                    <span className="text-2xl font-bold text-emerald-400">RandomForest v1.2</span>
                  </div>
                  <div className="h-28 rounded bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                    <span className="text-[10px] text-gray-400">ACCURACY</span>
                    <span className="text-2xl font-bold text-emerald-400">89.4% F1-Score</span>
                  </div>
                </div>
                <div className="h-32 rounded bg-white/5 border border-white/5 p-4 space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded" />
                  <div className="h-3 w-5/6 bg-white/5 rounded" />
                  <div className="h-3 w-4/6 bg-white/5 rounded" />
                </div>
              </div>
              <div className="col-span-1 bg-emerald-950/20 border border-emerald-500/15 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3">
                <Activity className="w-10 h-10 text-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-300">Live ML Pipeline Connected</span>
                <span className="text-[10px] text-gray-500">Ready for Single or CSV Bulk Evaluation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="w-full pt-32 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">System Capabilities</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Comprehensive Performance Evaluation</h2>
            </div>
            <p className="text-gray-400 max-w-md mt-4 md:mt-0 font-light">
              Designed to support teachers with immediate grading classification, utilizing bulk uploading, templates, and full historical logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="feature-card glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Single Student Assessment</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed flex-1">
                Enter details for a single student on 16 variables (raised hands, absence, parents satisfaction) and immediately get their predicted grade bracket.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bulk CSV Processing</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed flex-1">
                Upload spreadsheets containing hundreds of student logs. Process them simultaneously and download complete formatted predictions in seconds.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Audit Logs & History</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed flex-1">
                Both teachers and students have persistent dashboard records to view past predictions, filtered roles, and trace academic milestones.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" ref={explainerRef} className="w-full pt-32 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Machine Learning</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mt-3 mb-6">Random Forest Classification</h2>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                The prediction engine is trained on standard pedagogical records, assessing academic progress via a classification tree voting mechanism. It evaluates three key categories to assign a student to a class:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">L (Low Achievement Risk):</strong>
                    <span className="text-gray-400 text-sm font-light">Significant indicator of required support, usually showing low classroom interaction.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">M (Medium Performance):</strong>
                    <span className="text-gray-400 text-sm font-light">Moderate involvement, standard attendance, satisfying standard curriculum.</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-white block font-medium">H (High Achievement Bracket):</strong>
                    <span className="text-gray-400 text-sm font-light">Active class participation, high resources visited, low absenteeism.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* flowchart map */}
            <div className="relative glass-panel rounded-3xl p-8 bg-black/40 border border-emerald-500/10 overflow-hidden flex flex-col space-y-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center justify-between border-b border-white/5 pb-4">
                <span>Model Pipeline Logic</span>
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Node 1 */}
              <div className="model-node bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Student Inputs</div>
                    <div className="text-[10px] text-gray-400">16 Behavioral & Demographic variables</div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full flex items-center justify-center border border-emerald-500/20">
                  Step 01
                </div>
              </div>

              {/* Arrow */}
              <div className="h-6 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-400/20 mx-auto" />

              {/* Node 2 */}
              <div className="model-node bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-emerald-500/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400 text-black flex items-center justify-center">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Random Forest Classifier</div>
                    <div className="text-[10px] text-gray-300">Decision tree ensemble aggregation</div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-emerald-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  Step 02
                </div>
              </div>

              {/* Arrow */}
              <div className="h-6 w-0.5 bg-gradient-to-b from-emerald-400/20 to-transparent mx-auto" />

              {/* Node 3 */}
              <div className="model-node bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Predicted Grade Bracket</div>
                    <div className="text-[10px] text-gray-400">Classification output (H, M, L)</div>
                  </div>
                </div>
                <div className="h-6 w-16 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full flex items-center justify-center border border-emerald-500/20">
                  Result
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Overview Section */}
        <section id="metrics" className="w-full pt-32 text-left">
          <div className="glass-panel rounded-3xl p-8 md:p-12 bg-gradient-to-br from-emerald-950/20 to-[#07080a] border border-emerald-500/15">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">Model Evaluation Variables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="text-emerald-400 font-bold mb-2">Classroom Interactions</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Tracks active engagement variables like <strong>Raised Hands</strong>, visiting resources, and participating in forum discussions.
                </p>
              </div>
              <div>
                <h4 className="text-emerald-400 font-bold mb-2">Demographic Profile</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Controls for background factors including <strong>Nationality</strong>, Birth Place, and stage-specific learning brackets.
                </p>
              </div>
              <div>
                <h4 className="text-emerald-400 font-bold mb-2">Absenteeism Records</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  High weighting variable evaluating if student absence lies <strong>under 7 days</strong> or <strong>above 7 days</strong>.
                </p>
              </div>
              <div>
                <h4 className="text-emerald-400 font-bold mb-2">Parent Involvement</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Integrates response metrics on school satisfaction and school survey participation indicators.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-500/10 bg-black/40 py-12 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
              <Brain className="w-4 h-4 text-black" />
            </div>
            <span className="font-semibold text-white">EduPredict</span>
          </div>
          <p>© {new Date().getFullYear()} EduPredict ML Analytics. Designed to Awwwards nominee standards.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
