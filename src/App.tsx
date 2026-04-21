import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import { UserRole, UserSession } from './types';
import { validateCandidate, ValidationResult } from './services/validationService';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  Briefcase, 
  User, 
  Search, 
  MessageSquare, 
  Bell, 
  Menu, 
  X, 
  Plus, 
  MapPin, 
  Star,
  Shield,
  ShieldCheck,
  Zap,
  TrendingUp,
  LogOut,
  ChevronRight,
  CheckCircle,
  Brain,
  Sparkles,
  Send,
  Lock,
  Loader2,
  Calendar,
  Clock,
  BellRing,
  Award,
  Trophy,
  Medal,
  Users,
  ExternalLink,
  Download,
  Quote,
  ArrowRight,
  Target,
  Eye,
  Heart,
  UserPlus,
  Camera,
  FileText,
  Smartphone,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Info,
  Languages,
  Car,
  Shovel,
  Coffee,
  Laptop,
  Truck,
  Building2,
  HardHat,
  Wallet,
  CreditCard,
  History,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { Button, Card, Input, cn } from './components/ui';
import { type Profile, type Job } from './lib/supabase';
import { aiService } from './lib/ai';

import { Logo } from './components/Logo';

// --- Components ---

const SOSButton = ({ side }: { side: 'worker' | 'employer' }) => {
  const [showProtocol, setShowProtocol] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        className="border-red-500 text-red-500 hover:bg-red-50 font-black animate-pulse"
        onClick={() => setShowProtocol(true)}
      >
        <AlertTriangle className="w-4 h-4 mr-2" /> SOS
      </Button>

      <AnimatePresence>
        {showProtocol && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] border-4 border-black p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center space-x-4 mb-6 text-red-600">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Emergency Protocol</h3>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm font-bold text-black/60">You are about to trigger a WÈRA Emergency Response. Please follow these steps:</p>
                <div className="space-y-3">
                  {[
                    'Ensure your immediate physical safety first.',
                    'Our 24/7 safety team will be notified instantly.',
                    'A platform-wide freeze will be placed on this job.',
                    'Misuse of this button results in immediate permanent ban.'
                  ].map((step, i) => (
                    <div key={i} className="flex items-start space-x-3 text-sm">
                      <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</div>
                      <p className="font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-red-700 py-6 text-lg">
                  Confirm Emergency
                </Button>
                <Button variant="ghost" onClick={() => setShowProtocol(false)} className="text-black font-bold">
                  Cancel (False Alarm)
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const DualRatingSystem = ({ targetName, type }: { targetName: string, type: 'worker' | 'employer' }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  return (
    <Card className="p-8 border-black shadow-xl bg-slate-100/30">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black">Rate {type === 'worker' ? 'Worker' : 'Employer'}</h3>
          <p className="text-sm text-black/60">Your feedback ensures a fair WÈRA ecosystem.</p>
        </div>
        <div className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">
          {isAnonymous ? 'Anonymous' : 'Public'}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center space-x-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-125"
            >
              <Star 
                className={cn(
                  "w-12 h-12 transition-colors",
                  (hover || rating) >= star ? "fill-wera-cyan text-wera-cyan" : "text-black/10"
                )} 
              />
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold block">Detailed Feedback (Internal Only)</label>
          <textarea 
            className="w-full p-4 border-2 border-black rounded-2xl bg-white focus:ring-2 focus:ring-wera-cyan outline-none min-h-[120px]"
            placeholder={`How was your experience with ${targetName}?`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {rating === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start space-x-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs text-red-800 font-bold leading-tight">
              FAIR PLAY ALERT: 1-star ratings trigger a platform review. {type === 'employer' ? 'Employers' : 'Workers'} with persistent low ratings are matched with each other as a penalty.
            </p>
          </motion.div>
        )}

        <Button variant="primary" className="w-full py-6 text-lg font-bold" disabled={rating === 0}>
          Submit Feedback
        </Button>
      </div>
    </Card>
  );
};

const Navbar = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-100/80 backdrop-blur-md border-b border-slate-300/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center group">
            <Logo iconSize="w-12 h-12" />
            <div className="ml-8 hidden lg:flex flex-col border-l-2 border-wera-green/30 pl-4">
              <div className="flex items-center mb-0.5">
                <div className="w-2 h-2 bg-wera-green rounded-full animate-pulse mr-2" />
                <span className="text-[10px] font-black text-wera-green tracking-tighter">Twende Wera, tuko live!</span>
              </div>
              <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest leading-none">weraplatform.dedyn.io</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-sm font-medium hover:underline transition-all text-black">Find Wera Work</Link>
            <Link to="/hire" className="text-sm font-medium hover:underline transition-all text-black">Hire Wera Workers</Link>
            <Link to="/wallet" className="text-sm font-medium hover:underline transition-all text-black">Wallet</Link>
            <Link to="/academy" className="text-sm font-medium hover:underline transition-all text-black">Academy</Link>
            <Link to="/verify" className="text-sm font-medium hover:underline transition-all text-black">Verify</Link>
            <Link to="/about" className="text-sm font-medium hover:underline transition-all text-black">About Us</Link>
            <Link to="/companies" className="text-sm font-bold text-black hover:opacity-80 transition-opacity">For Companies</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-black"><Bell className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="text-black"><MessageSquare className="w-5 h-5" /></Button>
                <div className="h-8 w-8 rounded-full bg-black/10 overflow-hidden border border-black/10">
                  <img src={user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" />
                </div>
                <Button variant="outline" onClick={handleLogout} className="text-xs border-black text-black">Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login"><Button variant="ghost" className="text-black">Login</Button></Link>
                <Link to="/signup"><Button variant="primary">Join Wera</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-100 border-b border-black/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/jobs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Find Work</Link>
              <Link to="/wallet" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Wallet</Link>
              <Link to="/hire" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Hire Talent</Link>
              <Link to="/academy" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Academy</Link>
              <Link to="/verify" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Verify</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">About Us</Link>
              <Link to="/companies" className="block px-3 py-2 rounded-md text-base font-bold hover:bg-black/10 text-black">For Companies</Link>
              {!user && (
                <div className="pt-4 flex flex-col space-y-2">
                  <Link to="/login"><Button variant="outline" className="w-full border-black text-black">Login</Button></Link>
                  <Link to="/signup"><Button variant="primary" className="w-full">Join Wera</Button></Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const WorkerOnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    category: 'Construction',
    skills: [] as string[],
    idNumber: '',
    experience: '0-2'
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [testPassed, setTestPassed] = useState(false);
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  const [referencesUploaded, setReferencesUploaded] = useState(false);
  const [ministryCertUploaded, setMinistryCertUploaded] = useState(false);

  const roleRequirements: { [role: string]: string[] } = {
    'Software Engineers': ['test', 'certificate'],
    'Data Scientists and Analysts': ['test', 'certificate'],
    'Cybersecurity Specialists': ['test', 'certificate'],
    'Mobile App Developers': ['test', 'certificate'],
    'UI/UX Designers': ['test', 'certificate'],
    'Network Engineers': ['test', 'certificate'],
    'DevOps Engineers': ['test', 'certificate'],
    'AI and Machine Learning Specialists': ['test', 'certificate'],
    'Cloud Architects': ['test', 'certificate'],
    'IT Project Managers': ['test', 'certificate'],
    'Architects': ['test', 'certificate'],
    'Healthcare Workers': ['test', 'certificate'],
    'Tutors': ['test', 'certificate'],
    'Tour Guides': ['test', 'certificate'],
    'Sleep Trainers': ['test', 'certificate'],
    'Graphic Designers': ['test', 'certificate'],
    'Nannies': ['test', 'references'],
    'Cleaners': ['test', 'references'],
    'Gardeners/Landscapers': ['test', 'references'],
    'Delivery Drivers/Riders': ['test', 'references'],
    'Pet Sitters/Dog Walkers': ['test', 'references'],
    'Home Cooks/Caterers': ['test', 'references'],
    'Seamstresses/Dressmakers': ['test', 'references'],
    'Domestic Worker Agency': ['ministry_cert']
  };

  const currentRequirements = formData.role ? (roleRequirements[formData.role] || ['test']) : [];
  const allRequirementsMet = 
    (!currentRequirements.includes('test') || testPassed) &&
    (!currentRequirements.includes('certificate') || certificateUploaded) &&
    (!currentRequirements.includes('references') || referencesUploaded) &&
    (!currentRequirements.includes('ministry_cert') || ministryCertUploaded);
  const categoryMap: { [key: string]: string[] } = {
    'Skilled Trades': ['Mechanics', 'Tire Repairs', 'Cobblers', 'Tailors'],
    'Construction': ['Masons', 'Carpenters', 'Electricians', 'Plumbers', 'Painters', 'Interior Decorators'],
    'Domestic Services': ['Nannies', 'Cleaners', 'Gardeners/Landscapers', 'Delivery Drivers/Riders', 'Pet Sitters/Dog Walkers', 'Home Cooks/Caterers', 'Seamstresses/Dressmakers', 'Domestic Worker Agency'],
    'Personal Services': ['Personal Shoppers', 'Fitness Instructors', 'Translators and Interpreters', 'Makeup Artists', 'Hair Stylists/Barbers', 'Event Planners'],
    'Professional Services': ['Architects', 'Healthcare Workers', 'Tutors', 'Tour Guides', 'Sleep Trainers'],
    'Creative Services': ['Graphic Designers', 'Musicians/Entertainers/DJs', 'Photographers/Videographers'],
    'Hospitality Services': ['Waiters', 'Mixologist', 'Street Vendors', 'Handymen/Handywomen', 'House Keeping personnel'],
    'IT and Technology': ['Software Engineers', 'Data Scientists and Analysts', 'Cybersecurity Specialists', 'Mobile App Developers', 'UI/UX Designers', 'Network Engineers', 'DevOps Engineers', 'AI and Machine Learning Specialists', 'Cloud Architects', 'IT Project Managers']
  };
  const categories = Object.keys(categoryMap);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Join the <span className="wera-text-gradient">Wera Workforce</span></h1>
        <p className="text-gray-600 text-lg">Your journey to professional growth and verified opportunities starts here.</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center max-w-xs mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all",
                step >= s ? "bg-black text-white border-black" : "bg-white text-black/20 border-black/10"
              )}>
                {step > s ? <CheckCircle className="w-6 h-6" /> : s}
              </div>
              {s < 3 && <div className={cn("w-12 h-1 mx-2 rounded-full", step > s ? "bg-black" : "bg-black/10")} />}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-8 border-black shadow-xl">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-black flex items-center">
              <User className="w-6 h-6 mr-2" /> Personal Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Full Name (As per ID)</label>
                <Input 
                  placeholder="e.g. John Kamau" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="bg-slate-100/50 border-black/20" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                  <Input 
                    placeholder="07XX XXX XXX" 
                    className="pl-10 bg-slate-100/50 border-black/20" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Primary Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <Input 
                  placeholder="e.g. Westlands, Nairobi" 
                  className="pl-10 bg-yellow-50/50 border-black/20" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleNext} className="w-full py-6 text-lg font-bold" variant="primary">
              Next: Skills & Category
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-black flex items-center">
              <Briefcase className="w-6 h-6 mr-2" /> Skills & Experience
            </h2>
            <div className="space-y-4">
              <label className="text-sm font-bold">
                {formData.category ? `Select ${formData.category} Role` : 'What is your primary trade?'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {!formData.category ? (
                  categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFormData({...formData, category: cat})}
                      className={cn(
                        "p-4 text-left rounded-xl border-2 transition-all text-sm font-bold",
                        formData.category === cat ? "border-black bg-black text-white" : "border-black/5 bg-yellow-50/50 hover:border-black/20"
                      )}
                    >
                      {cat}
                    </button>
                  ))
                ) : (
                  categoryMap[formData.category].map((role) => (
                    <button
                      key={role}
                      onClick={() => setFormData({...formData, role})}
                      className={cn(
                        "p-4 text-left rounded-xl border-2 transition-all text-sm font-bold",
                        formData.role === role ? "border-wera-cyan bg-wera-cyan/10 text-wera-cyan" : "border-black/5 bg-yellow-50/50 hover:border-black/20"
                      )}
                    >
                      {role}
                    </button>
                  ))
                )}
              </div>
              {formData.category && (
                <button 
                  onClick={() => setFormData({...formData, category: '', role: ''})}
                  className="text-xs font-bold text-black/40 hover:text-black"
                >
                  ← Back to Categories
                </button>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Years of Experience</label>
              <select 
                className="w-full p-3 border border-black/20 rounded-xl focus:ring-black bg-yellow-50/50 font-bold"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="0-2">0-2 Years (Junior)</option>
                <option value="2-5">2-5 Years (Intermediate)</option>
                <option value="5-10">5-10 Years (Senior)</option>
                <option value="10+">10+ Years (Expert)</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold">Specialized Skills (Optional)</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'french', label: 'French Fluency', icon: Languages },
                  { id: 'driving', label: 'Advanced Driving', icon: Car },
                  { id: 'security', label: 'Security Trained', icon: ShieldCheck },
                  { id: 'multilingual', label: 'Multilingual (Other)', icon: Sparkles }
                ].map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => {
                      const newSkills = formData.skills.includes(skill.id)
                        ? formData.skills.filter(s => s !== skill.id)
                        : [...formData.skills, skill.id];
                      setFormData({...formData, skills: newSkills});
                    }}
                    className={cn(
                      "p-4 text-left rounded-xl border-2 transition-all text-sm font-bold flex items-center space-x-3",
                      formData.skills.includes(skill.id) ? "border-wera-cyan bg-wera-cyan/10 text-wera-cyan" : "border-black/5 bg-yellow-50/50 hover:border-black/20"
                    )}
                  >
                    <skill.icon className="w-4 h-4" />
                    <span>{skill.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 py-6 border-black text-black">Back</Button>
              <Button onClick={handleNext} className="flex-1 py-6 text-lg font-bold" variant="primary">Next: Verification</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-wera-green/10 text-wera-green rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold">Identity Verification</h2>
              <p className="text-black/60">We use official government services to verify your identity instantly.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">National ID Number</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="XXXXXXXX" 
                    className="bg-yellow-50/50 border-black/20" 
                    value={formData.idNumber}
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                    disabled={isVerified}
                  />
                  {!isVerified && (
                    <Button 
                      onClick={async () => {
                        if (!formData.idNumber) return;
                        setIsVerifying(true);
                        await new Promise(r => setTimeout(r, 2000));
                        setIsVerifying(false);
                        setIsVerified(true);
                      }} 
                      disabled={isVerifying || !formData.idNumber}
                      variant="secondary"
                      className="shrink-0"
                    >
                      {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify ID'}
                    </Button>
                  )}
                </div>
              </div>
              
              {isVerified ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-wera-green/10 border-2 border-wera-green rounded-2xl flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-wera-green text-white rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-wera-green">Government Verified</h4>
                    <p className="text-xs text-wera-green/80">Identity confirmed via IPRS/eCitizen database.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                  <div className="p-6 border-2 border-dashed border-black/10 rounded-2xl text-center space-y-2">
                    <Camera className="w-6 h-6 mx-auto text-black/40" />
                    <span className="text-[10px] font-bold uppercase block">Front of ID</span>
                  </div>
                  <div className="p-6 border-2 border-dashed border-black/10 rounded-2xl text-center space-y-2">
                    <UserPlus className="w-6 h-6 mx-auto text-black/40" />
                    <span className="text-[10px] font-bold uppercase block">Selfie with ID</span>
                  </div>
                </div>
              )}

              {currentRequirements.length > 0 && (
                <div className="space-y-6 p-6 bg-wera-cyan/5 border-2 border-wera-cyan rounded-2xl">
                  <h3 className="text-lg font-bold flex items-center">
                    <Award className="w-5 h-5 mr-2 text-wera-cyan" /> Role Requirements
                  </h3>
                  <div className="space-y-4">
                    {currentRequirements.includes('test') && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-black/10">
                        <span className="font-bold text-sm">Minimum Competency Test</span>
                        <Button 
                          variant={testPassed ? "secondary" : "outline"}
                          onClick={() => setTestPassed(true)}
                          className={testPassed ? "bg-wera-green text-white" : ""}
                        >
                          {testPassed ? 'Passed' : 'Take Test'}
                        </Button>
                      </div>
                    )}
                    {currentRequirements.includes('certificate') && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-black/10">
                        <span className="font-bold text-sm">Upload Certificate</span>
                        <Button 
                          variant={certificateUploaded ? "secondary" : "outline"}
                          onClick={() => setCertificateUploaded(true)}
                          className={certificateUploaded ? "bg-wera-green text-white" : ""}
                        >
                          {certificateUploaded ? 'Uploaded' : 'Upload'}
                        </Button>
                      </div>
                    )}
                    {currentRequirements.includes('references') && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-black/10">
                        <span className="font-bold text-sm">Upload References</span>
                        <Button 
                          variant={referencesUploaded ? "secondary" : "outline"}
                          onClick={() => setReferencesUploaded(true)}
                          className={referencesUploaded ? "bg-wera-green text-white" : ""}
                        >
                          {referencesUploaded ? 'Uploaded' : 'Upload'}
                        </Button>
                      </div>
                    )}
                    {currentRequirements.includes('ministry_cert') && (
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-black/10">
                        <span className="font-bold text-sm">Ministry of Labour Cert</span>
                        <Button 
                          variant={ministryCertUploaded ? "secondary" : "outline"}
                          onClick={() => setMinistryCertUploaded(true)}
                          className={ministryCertUploaded ? "bg-wera-green text-white" : ""}
                        >
                          {ministryCertUploaded ? 'Uploaded' : 'Upload'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 p-4 rounded-xl border border-slate-200 flex items-start space-x-3">
                <Lock className="w-4 h-4 text-slate-600 mt-0.5" />
                <p className="text-[10px] text-slate-800 font-medium">
                  Official verification ensures you get the "Government Verified" badge on your profile, increasing client trust by 85%.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={handleBack} className="flex-1 py-6 border-black text-black">Back</Button>
              <Button 
                onClick={handleNext} 
                disabled={!isVerified || !allRequirementsMet} 
                className="flex-1 py-6 text-lg font-bold" 
                variant="primary"
              >
                Complete Onboarding
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-8">
            <div className="w-24 h-24 bg-wera-green text-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <Trophy className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black">Karibu WÈRA!</h2>
              <p className="text-black/60">Your profile is being reviewed. In the meantime, let's boost your visibility.</p>
            </div>

            <div className="bg-black/5 p-8 rounded-[2.5rem] border border-black/10 space-y-6">
              <div className="flex items-center space-x-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-wera-cyan/20 flex items-center justify-center text-wera-cyan shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-black">AI Soft Skills Badge</h4>
                  <p className="text-xs text-black/60">Workers with this badge are 3x more likely to be hired.</p>
                </div>
              </div>
              <Link to="/academy">
                <Button variant="primary" className="w-full py-4 font-bold mt-4">
                  Take AI Assessment Now
                </Button>
              </Link>
            </div>

            <div className="pt-4">
              <Link to="/profile" className="text-sm font-bold text-black hover:underline flex items-center justify-center">
                Go to My Profile <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-wera-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                Empowering Kenya's <span className="wera-text-gradient">Informal Sector</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed mb-10">
                WÈRA is more than just a platform; it's a movement to formalize, protect, and empower the millions of skilled workers who drive Kenya's economy every day.
              </p>
            </motion.div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-wera-cyan rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-40 w-80 h-80 bg-wera-green rounded-full blur-[100px] animate-pulse delay-700" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-wera-cyan/10 text-wera-cyan rounded-full">
                Our Mission
              </div>
              <h2 className="text-4xl font-black text-black">Bridging the Gap Between Talent and Opportunity</h2>
              <p className="text-lg text-black/60 leading-relaxed">
                We believe that every worker deserves a fair wage, a safe environment, and the opportunity to grow. WÈRA provides the digital infrastructure to make this a reality for Kenya's informal workforce.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Vetting & Trust', desc: 'Every worker is background checked and skill-verified.', icon: Shield },
                  { title: 'Fair Labor', desc: 'We advocate for fair pricing and timely payments via M-PESA escrow.', icon: Award },
                  { title: 'Skill Development', desc: 'Continuous learning through the WÈRA Academy.', icon: Brain },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl border border-black/5 hover:bg-black/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{item.title}</h4>
                      <p className="text-sm text-black/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-black shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
                  alt="Wera Workers Collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl border-4 border-black shadow-2xl max-w-[200px]">
                <div className="text-4xl font-black text-wera-cyan mb-1">10k+</div>
                <div className="text-xs font-bold uppercase tracking-widest text-black/40">Verified Workers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black/5 border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-16">Our Core <span className="text-wera-cyan">Values</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Integrity', desc: 'We build trust through transparency and accountability in every transaction.', icon: ShieldCheck },
              { title: 'Innovation', desc: 'Using technology to solve real-world problems for the Kenyan workforce.', icon: Zap },
              { title: 'Community', desc: 'We succeed when our workers and clients succeed together.', icon: Users },
            ].map((value, i) => (
              <Card key={i} className="p-10 border-black hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-black/10 text-black rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-black/60 leading-relaxed">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-wera-cyan/10 p-16 rounded-[3rem] border-4 border-black relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">Want to partner with us?</h2>
              <p className="text-lg text-black/60 mb-10 max-w-2xl mx-auto">
                We are always looking for organizations, NGOs, and government bodies to help expand our impact across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" className="px-10 py-4 text-lg">Contact Our Team</Button>
                <Button variant="outline" className="px-10 py-4 text-lg border-black text-black">Email Us</Button>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-wera-cyan/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-wera-green/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

const LandingPage = () => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = async () => {
    if (!chatMessage.trim()) return;
    const userMsg = { role: 'user', content: chatMessage };
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');
    setIsTyping(true);
    
    const response = await aiService.chatWithOpenRouter(chatMessage);
    setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col">
      {/* Trust & Escrow Banner */}
      <div className="bg-wera-black text-white py-3 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center relative z-10">
          <span className="flex items-center text-xs font-bold tracking-wide">
            <Shield className="w-4 h-4 mr-2 text-wera-green" /> 100% SECURE PAYMENTS VIA M-PESA ESCROW
          </span>
          <div className="hidden sm:block w-px h-4 bg-slate-100/20" />
          <span className="text-[10px] opacity-70 uppercase tracking-widest">Money is only released when you approve the work</span>
          <div className="hidden lg:flex items-center ml-8 px-3 py-1 bg-wera-green/20 rounded-full border border-wera-green/30">
            <div className="w-2 h-2 bg-wera-green rounded-full animate-pulse mr-2" />
            <span className="text-[10px] font-black text-wera-green tracking-tighter">Twende Wera, tuko live!</span>
          </div>
        </div>
        {/* Animated background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-wera-green/5 to-transparent animate-shimmer" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase wera-gradient text-white rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" /> Unlocking Potential
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-black">
                Uko wera ama Uko where?
              </h1>
              <p className="text-xl text-black/60 mb-10 leading-relaxed">
                Connecting skilled and semi-skilled Wera Workers with formal job opportunities. 
                Empowering the informal sector through technology, vetting, and fair labor practices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link to="/hire">
                  <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                    I want to Hire
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                    Join as a Worker
                  </Button>
                </Link>
                <Link to="/academy">
                  <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                    Visit Academy
                  </Button>
                </Link>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center justify-center space-x-6 text-sm font-bold text-black">
                <button className="hover:text-wera-cyan transition-colors">ENGLISH</button>
                <div className="w-px h-4 bg-gray-200" />
                <button className="hover:text-wera-cyan transition-colors">SWAHILI</button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-wera-cyan rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-wera-green rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </section>

      {/* Featured Course Section */}
      <section className="py-24 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-2 text-wera-cyan">
                <Brain className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Wera Academy Featured</span>
              </div>
              <h2 className="text-4xl font-black text-black leading-tight">
                Master Professional <span className="wera-text-gradient">Customer Service</span>
              </h2>
              <p className="text-lg text-black/60 leading-relaxed">
                Our most popular module. Learn the secrets of high-end hospitality and corporate service standards. 
                Certified workers in this module see a **40% increase** in repeat bookings.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-xl border border-black/5">
                  <Clock className="w-4 h-4 text-black/40" />
                  <span className="text-xs font-bold">45 Minutes</span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-xl border border-black/5">
                  <Award className="w-4 h-4 text-wera-green" />
                  <span className="text-xs font-bold">Verified Badge</span>
                </div>
              </div>
              <Link to="/academy" className="inline-block pt-6">
                <Button variant="primary" className="px-8 py-4">Start Learning Now</Button>
              </Link>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border-4 border-black shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1556740734-7f9583451bf2?auto=format&fit=crop&q=80&w=1200" 
                  alt="Customer Service Training" 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-slate-800/90 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/20 shadow-lg group-hover:scale-110 shadow-black/50 transition-transform">
                    <Zap className="w-8 h-8 fill-white font-bold" />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-700 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-400 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Fair Play & Safety Section */}
      <section className="py-24 bg-wera-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-wera-green/20 text-wera-green rounded-full border border-wera-green/30">
                Fair Play Policy
              </div>
              <h2 className="text-4xl lg:text-6xl font-black leading-tight">
                We Protect <span className="text-wera-cyan">Both Sides</span> of the Work.
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                WÈRA is built on mutual respect. Our dual-rating system ensures that bad behavior has consequences, whether you're hiring or working.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { 
                    title: 'Anonymous Boss Rating', 
                    desc: 'Workers rate employers privately. 1-star bosses are flagged for review.',
                    icon: ThumbsUp 
                  },
                  { 
                    title: 'Dual Accountability', 
                    desc: 'Low-rated employers are matched with low-rated workers. Fair is fair.',
                    icon: Users 
                  },
                  { 
                    title: '24/7 SOS Button', 
                    desc: 'Instant emergency response for both parties if things go wrong.',
                    icon: AlertTriangle 
                  },
                  { 
                    title: 'Strict Penalties', 
                    desc: 'Misuse of the platform or SOS button leads to immediate bans.',
                    icon: ShieldCheck 
                  }
                ].map((feature, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <feature.icon className="w-8 h-8 text-wera-cyan mb-4" />
                    <h4 className="font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-md">
                <DualRatingSystem targetName="Client #829" type="employer" />
                <div className="mt-6 flex justify-center">
                  <SOSButton side="worker" />
                </div>
              </div>
              {/* Decorative background glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-wera-cyan/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-wera-green/20 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Target Industries Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest bg-black text-white rounded-full">
              Our Ecosystem
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-black mb-6">
              Industries We <span className="wera-text-gradient">Transform</span>
            </h2>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              From construction sites to corporate offices, WÈRA provides a verified workforce for every sector of Kenya's economy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Construction', icon: HardHat, color: 'bg-orange-500' },
              { name: 'Domestic Care', icon: Heart, color: 'bg-pink-500' },
              { name: 'IT & Digital', icon: Laptop, color: 'bg-blue-500' },
              { name: 'Logistics', icon: Truck, color: 'bg-wera-green' },
              { name: 'Hospitality', icon: Coffee, color: 'bg-yellow-600' },
              { name: 'Agriculture', icon: Shovel, color: 'bg-green-700' },
              { name: 'Corporate', icon: Building2, color: 'bg-wera-cyan' },
              { name: 'Transport', icon: Car, color: 'bg-black' },
            ].map((industry, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] border-2 border-black/5 bg-yellow-50/30 flex flex-col items-center text-center group hover:border-black transition-all"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg", industry.color)}>
                  <industry.icon className="w-8 h-8" />
                </div>
                <h4 className="font-black uppercase tracking-tighter text-lg">{industry.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UN & Expat Concierge Section */}
      <section className="py-24 bg-wera-cyan/5 border-y border-wera-cyan/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-wera-cyan text-white rounded-full shadow-lg">
                UN & Expat Concierge
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-black leading-tight">
                Relocating to <span className="wera-text-gradient">Kenya?</span>
              </h2>
              <p className="text-xl text-black/60 leading-relaxed">
                We specialize in providing high-skill, vetted workers for the international community. From multilingual staff to advanced security drivers.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: 'Multilingual Support', desc: 'Gardeners, housekeepers, and nannies fluent in French, German, and Arabic.', icon: Languages },
                  { title: 'Advanced Security Drivers', desc: 'Defensive driving certified with deep knowledge of Nairobi and its environs.', icon: Car },
                  { title: 'International Standards', desc: 'Workers trained in global hospitality and professional service protocols.', icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 p-6 bg-white rounded-3xl border-2 border-black/5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-wera-cyan/10 text-wera-cyan rounded-2xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-black mb-1">{item.title}</h4>
                      <p className="text-sm text-black/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="px-10 py-6 text-xl font-black shadow-2xl">
                Book Your Concierge Staff
              </Button>
            </div>

            <div className="flex-1 relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden border-8 border-black shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1200" 
                  alt="Professional Service in Kenya" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-wera-cyan rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-wera-green rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/5 border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Wera Workers', value: '50K+' },
              { label: 'Jobs Completed', value: '120K+' },
              { label: 'Trust Rating', value: '4.9/5' },
              { label: 'Counties Covered', value: '47' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-black mb-1">{stat.value}</div>
                <div className="text-xs text-black/60 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-black">Why Choose Wera Workers?</h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              We're building more than just a marketplace. We're building a sustainable ecosystem for the future of work in Kenya.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stringent Vetting',
                desc: 'Every Wera Worker undergoes a rigorous verification process to ensure quality and safety.',
                icon: Shield,
              },
              {
                title: 'Contract & Temp Staffing',
                desc: 'Reliable short-term and contract solutions for companies and SMEs across Kenya.',
                icon: Briefcase,
              },
              {
                title: 'M-Pesa Integrated',
                desc: 'Seamless, secure payments powered by Kenya\'s most trusted mobile money platform.',
                icon: Zap,
              },
              {
                title: 'Geolocation Matching',
                desc: 'Find the best talent right in your neighborhood with our advanced matching algorithms.',
                icon: MapPin,
              },
            ].map((feature, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-shadow border-black">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 text-wera-green">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                <p className="text-black/80 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="about" className="py-24 bg-yellow-50 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black text-wera-green text-xs font-bold uppercase tracking-widest">
                <Target className="w-3 h-3" />
                <span>Our Purpose</span>
              </div>
              <h2 className="text-4xl font-black leading-tight text-black">
                A <span className="wera-text-gradient">Revolution</span> in Labour
              </h2>
              <div className="space-y-6">
                <div className="p-8 green-gradient rounded-3xl border-2 animate-border-glow text-white shadow-xl">
                  <h3 className="font-bold text-xl mb-3 flex items-center">
                    <Eye className="w-6 h-6 mr-2 text-wera-green" /> Our Vision
                  </h3>
                  <p className="text-white/90 italic leading-relaxed text-lg">
                    "Redefining the future of work, we create a seamless ecosystem where skilled workers and businesses connect to drive growth, reduce unemployment, and inspire and transform Kenya's workforce."
                  </p>
                </div>
                <div className="p-8 green-gradient rounded-3xl border-2 animate-border-glow text-white shadow-xl">
                  <h3 className="font-bold text-xl mb-3 flex items-center">
                    <Heart className="w-6 h-6 mr-2 text-wera-green" /> Our Mission
                  </h3>
                  <p className="text-white/90 italic leading-relaxed text-lg">
                    "Bridging the gap between dreams and opportunities, we empower individuals to rise and businesses to thrive. By connecting talent with possibility, we spark innovation and transform lives across Kenya."
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Empowerment', icon: Shield, color: 'bg-wera-cyan' },
                { label: 'Innovation', icon: Zap, color: 'bg-wera-green' },
                { label: 'Trust', icon: Lock, color: 'bg-black' },
                { label: 'Growth', icon: TrendingUp, color: 'bg-wera-cyan' },
              ].map((val, i) => (
                <div key={i} className="p-10 bg-yellow-50 rounded-[2.5rem] border-2 border-black/10 flex flex-col items-center text-center group hover:bg-black hover:text-white transition-all duration-500 hover:scale-105 shadow-sm">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg", val.color)}>
                    <val.icon className="w-7 h-7" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-xs">{val.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audience Segmentation Section */}
      <section className="py-24 bg-yellow-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Who is WÈRA For?</h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              Tailored solutions for every type of worker and business in the Kenyan ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Workers */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center px-4">
                <User className="w-5 h-5 mr-2 text-wera-cyan" /> For Workers
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'The Go-Getters', desc: 'Ambitious, tech-savvy pros looking to "secure the bag" through high-quality gigs.', icon: Zap },
                  { title: 'The Mavericks', desc: 'Independent thinkers seeking flexibility and unconventional niche opportunities.', icon: Sparkles },
                  { title: 'The Traditionalists', desc: 'Reliable workers who value stability and trust-based community referrals.', icon: Shield },
                ].map((item, i) => (
                  <Card key={i} className="p-6 border-black/10 bg-yellow-50 hover:border-wera-cyan transition-all group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:bg-wera-cyan group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* For Businesses */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center px-4">
                <Briefcase className="w-5 h-5 mr-2 text-wera-green" /> For Businesses
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Growth SMEs', desc: 'Ambitious businesses needing scalable, cost-effective labour to expand operations.', icon: TrendingUp },
                  { title: 'Established Corporates', desc: 'Enterprises focused on compliance, quality, and long-term workforce reliability.', icon: Shield },
                  { title: 'NGOs & Nonprofits', desc: 'Purpose-driven organizations seeking ethical hiring and fair labour practices.', icon: Heart },
                ].map((item, i) => (
                  <Card key={i} className="p-6 border-black/10 bg-yellow-50 hover:border-wera-green transition-all group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:bg-wera-green group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Center Section */}
      <section id="trust" className="py-24 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8">Built on <span className="text-wera-cyan">Trust</span>, Powered by <span className="text-wera-green">Innovation</span></h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                We've built a multi-layered security ecosystem to ensure every interaction on WÈRA is safe, transparent, and professional.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'M-Pesa Escrow Payments', desc: 'Funds are held securely and only released when you approve the completed work.', icon: Zap },
                  { title: 'Rigorous Vetting', desc: 'Background checks, skill verification, and identity audits for all workers.', icon: Shield },
                  { title: 'Dispute Resolution', desc: 'Dedicated 24/7 support team to mediate and resolve any project issues.', icon: MessageSquare },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl bg-yellow-50/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-wera-cyan/20 flex items-center justify-center text-wera-cyan">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-wera-green/20 rounded-full blur-[100px]" />
              <Card className="p-8 bg-yellow-50/5 backdrop-blur-xl border-white/10 relative z-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-wera-green rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold">WÈRA Verified Badge</h3>
                  <p className="text-white/60 text-sm">The gold standard for labour in Kenya</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50/5 border border-white/10">
                    <span className="text-xs font-bold">Identity Verified</span>
                    <CheckCircle className="w-4 h-4 text-wera-green" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50/5 border border-white/10">
                    <span className="text-xs font-bold">Background Check Passed</span>
                    <CheckCircle className="w-4 h-4 text-wera-green" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50/5 border border-white/10">
                    <span className="text-xs font-bold">Soft Skills Certified</span>
                    <CheckCircle className="w-4 h-4 text-wera-green" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50/5 border border-white/10">
                    <span className="text-xs font-bold">Insurance Covered</span>
                    <CheckCircle className="w-4 h-4 text-wera-green" />
                  </div>
                </div>
                <Button className="w-full mt-8 bg-wera-green text-black font-black">Learn More About Safety</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4 text-black">Real Stories, Real <span className="wera-text-gradient">Impact</span></h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              See how WÈRA is transforming lives and businesses across Kenya.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'John K.',
                role: 'Construction Specialist',
                story: 'Wera Academy helped me transition from casual day labour to stable corporate contracts. My income has doubled.',
                img: 'worker5',
                tag: 'Maverick'
              },
              {
                name: 'Sarah M.',
                role: 'Hospitality Lead',
                story: 'As a Go-Getter, I value speed. Wera connects me with high-quality gigs in Westlands within minutes.',
                img: 'worker2',
                tag: 'Go-Getter'
              },
              {
                name: 'TechNova Ltd',
                role: 'Startup Client',
                story: 'We needed 10 vetted technicians for a week-long project. Wera’s bulk hiring tool made it seamless.',
                img: 'initials/svg?seed=TN',
                tag: 'B2B Success'
              },
            ].map((story, i) => (
              <Card key={i} className="p-8 border-black hover:shadow-xl transition-all group">
                <Quote className="w-10 h-10 text-wera-cyan/20 mb-6 group-hover:text-wera-cyan transition-colors" />
                <p className="text-black/80 italic mb-8 leading-relaxed">"{story.story}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-black/10 overflow-hidden border border-black/10">
                    <img src={`https://api.dicebear.com/7.x/${story.img}`} alt={story.name} />
                  </div>
                  <div>
                    <div className="font-bold text-black">{story.name}</div>
                    <div className="text-[10px] font-bold text-wera-cyan uppercase tracking-widest">{story.tag}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase bg-wera-green/20 text-wera-green rounded-full">
                Wera Academy
              </span>
              <h2 className="text-4xl font-black mb-6">Become a <span className="text-wera-green">Certified</span> Wera Worker</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Join the Wera Academy to unlock premium job opportunities. Our AI-driven certification 
                validates your soft skills, professionalism, and reliability, making you the top choice for employers.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'AI-Powered Soft Skills Assessment',
                  'Professionalism & Ethics Training',
                  'Customer Service Excellence',
                  'Health & Safety Certification'
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-wera-green mr-3" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/academy">
                <Button className="bg-wera-green text-black hover:bg-yellow-50 px-8 py-4 text-lg font-bold">
                  Start Training Now
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Card className="p-8 border-wera-green/30 bg-yellow-50/5 backdrop-blur-sm relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-wera-green rounded-full flex items-center justify-center text-black">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">AI Certification</h3>
                    <p className="text-white/60 text-sm">Powered by Gemini AI</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-yellow-50/5 rounded-xl border border-white/10">
                    <p className="text-sm italic text-white/80">"How would you handle a situation where a client is unhappy with the progress of a job?"</p>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                    <span className="text-white/40">Assessment Progress</span>
                    <span className="text-wera-green">85% Complete</span>
                  </div>
                  <div className="w-full bg-slate-100/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-wera-green h-full w-[85%]" />
                  </div>
                </div>
              </Card>
              {/* Decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-wera-green/20 rounded-full blur-[120px] -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Unlock Your Potential?</h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of Wera Workers and employers already using Wera to build a better future.
              </p>
              <Button className="bg-wera-green text-black hover:bg-yellow-50 px-10 py-4 text-lg font-bold">
                Get Started Now
              </Button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-wera-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-50/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* OpenRouter AI Assistant Floating Bubble */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {showAIChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-24 right-0 w-80 bg-white border-4 border-black rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-black p-4 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-wera-cyan" />
                  <span className="font-black uppercase tracking-tight text-sm">WÈRA AI Assistant</span>
                </div>
                <button onClick={() => setShowAIChat(false)}><X className="w-4 h-4" /></button>
              </div>
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-yellow-50/30">
                {chatHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Sparkles className="w-8 h-8 text-black/20 mx-auto mb-2" />
                    <p className="text-xs font-bold text-black/40">Ask me anything about WÈRA!</p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-xs font-medium",
                    msg.role === 'user' 
                      ? "ml-auto bg-wera-cyan text-black rounded-tr-none" 
                      : "mr-auto bg-black text-white rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="mr-auto bg-black/10 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                    <div className="w-1 h-1 bg-black/40 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-black/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-black/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
              <div className="p-4 border-t-2 border-black/5 flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  className="flex-1 bg-black/5 border-none rounded-full px-4 py-2 text-xs focus:ring-2 focus:ring-wera-cyan outline-none"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                />
                <Button 
                  variant="primary" 
                  className="p-2 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={handleSendChat}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setShowAIChat(!showAIChat)}
          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-white"
        >
          {showAIChat ? <X className="w-8 h-8" /> : <Brain className="w-8 h-8 text-wera-cyan" />}
        </button>
      </div>
    </div>
  );
};

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [distance, setDistance] = useState(20);
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortBy, setSortBy] = useState('Date Posted');
  const [companySizeFilter, setCompanySizeFilter] = useState('');
  const [applications, setApplications] = useState<{[key: string]: 'Pending' | 'Accepted' | 'Rejected'}>({});
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [applicationSummary, setApplicationSummary] = useState('');
  const [validationResults, setValidationResults] = useState<{[key: string]: ValidationResult}>({});
  const [validatingJobIds, setValidatingJobIds] = useState<Set<string>>(new Set());

  const handleValidate = async (jobId: string) => {
    setValidatingJobIds(prev => new Set(prev).add(jobId));
    try {
      const result = await validateCandidate(jobId);
      setValidationResults(prev => ({ ...prev, [jobId]: result }));
    } catch (e) {
      console.error("Validation failed", e);
    } finally {
      setValidatingJobIds(prev => {
        const next = new Set(prev);
        next.delete(jobId);
        return next;
      });
    }
  };

  // Enhanced handleApply for Quick Apply vs standard
  const handleApply = (jobId: string, quick: boolean = false) => {
    if (quick) {
      setApplications(prev => ({ ...prev, [jobId]: 'Pending' }));
    } else {
      setApplyingJobId(jobId);
    }
  };

  const confirmApplication = () => {
    if (applyingJobId) {
      setApplications(prev => ({ ...prev, [applyingJobId]: 'Pending' }));
      setApplyingJobId(null);
      setApplicationSummary('');
    }
  };

  const getAiCandidateSuggestion = (jobId: string) => {
    // Mock AI suggestion logic
    const mockCandidates = ['Jane Doe (Rating: 4.8)', 'John Smith (Rating: 4.7)', 'Alice Johnson (Rating: 4.9)'];
    return mockCandidates[Math.floor(Math.random() * mockCandidates.length)];
  };

  useEffect(() => {
    // Get user location for proximity matching
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location access denied. Proximity matching disabled.")
      );
    }

    const fetchJobs = async () => {
      setLoading(true);
      if (supabase) {
        const { data, error } = await supabase.from('jobs').select('*');
        if (data) {
          setJobs(data as any);
          setFilteredJobs(data as any);
        } else {
          console.error('Error fetching jobs:', error);
        }
      } else {
        // Mocking enhanced data for demo if Supabase not configured
        const mockJobs: (Job & { rating: number, experience: number, distance: number })[] = [
          { id: '1', title: 'Professional Plumber Needed', description: 'Fix leaking tap in Westlands. Must have own tools.', category: 'Construction', budget: 2500, status: 'open', location: 'Nairobi, Westlands', client_id: 'c1', created_at: new Date().toISOString(), rating: 4.8, experience: 5, distance: 2.5, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
          { id: '2', title: 'Experienced Nanny for Toddler', description: 'Full time nanny needed for 2 year old. CPR certified preferred.', category: 'Domestic', budget: 15000, status: 'open', location: 'Mombasa, Nyali', client_id: 'c2', created_at: new Date().toISOString(), rating: 4.5, experience: 3, distance: 12.0, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
          { id: '3', title: 'Graphic Designer for Logo', description: 'Create a modern logo for a new startup. Quick turnaround.', category: 'Creative', budget: 5000, status: 'open', location: 'Remote', client_id: 'c3', created_at: new Date().toISOString(), rating: 4.9, experience: 7, distance: 0, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
          { id: '4', title: 'Electrical Wiring Expert', description: 'House rewiring project in Kilimani.', category: 'Skilled Trades', budget: 35000, status: 'open', location: 'Nairobi, Kilimani', client_id: 'c4', created_at: new Date().toISOString(), rating: 4.2, experience: 10, distance: 4.8, requires_ai_certification: true, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
          { id: '5', title: 'House Cleaning Service', description: 'Weekly cleaning for a 3-bedroom apartment.', category: 'Domestic', budget: 1200, status: 'open', location: 'Nairobi, South B', client_id: 'c5', created_at: new Date().toISOString(), rating: 3.8, experience: 2, distance: 8.2, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
          { id: '6', title: 'Corporate Event Coordinator', description: 'Manage a large corporate launch event. High professionalism required.', category: 'Creative', budget: 50000, status: 'open', location: 'Nairobi, CBD', client_id: 'c6', created_at: new Date().toISOString(), rating: 5.0, experience: 8, distance: 1.2, requires_ai_certification: true, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
        ];
        setJobs(mockJobs as any);
        setFilteredJobs(mockJobs as any);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = jobs.map(j => j as any);
    
    if (search) {
      result = result.filter(j => 
        j.title.toLowerCase().includes(search.toLowerCase()) || 
        j.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (locationFilter) {
      result = result.filter(j => j.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (categoryFilter) {
      result = result.filter(j => j.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (distance > 0) {
      result = result.filter(j => j.location === 'Remote' || j.distance <= distance);
    }
    
    if (minRating > 0) {
      result = result.filter(j => j.rating >= minRating);
    }

    if (companySizeFilter) {
      result = result.filter(j => (j as any).companySize === companySizeFilter);
    }
    
    // Sort logic
    if (sortBy === 'Date Posted') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'Budget (High to Low)') {
      result.sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'Proximity') {
      result.sort((a, b) => a.distance - b.distance);
    }

    setFilteredJobs(result);
  }, [search, locationFilter, categoryFilter, distance, minRating, minExperience, sortBy, companySizeFilter, jobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">WÈRA <span className="wera-text-gradient">Marketplace</span></h1>
          <p className="text-gray-600">Find vetted opportunities in your immediate proximity.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input placeholder="Search keywords..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full md:w-48" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border border-slate-300 rounded-lg bg-white w-full md:w-32 text-sm">
            <option>Date Posted</option>
            <option>Budget (High to Low)</option>
            <option>Proximity</option>
          </select>
          <select value={companySizeFilter} onChange={(e) => setCompanySizeFilter(e.target.value)} className="p-2 border border-slate-300 rounded-lg bg-white w-full md:w-40 text-sm">
            <option value="">All Sizes</option>
            <option value="Startup">Startup</option>
            <option value="SME">SME</option>
            <option value="Corporate">Corporate</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border border-slate-300 rounded-lg bg-white w-full md:w-40 text-sm">
            <option value="">All Categories</option>
            <option value="Construction">Construction</option>
            <option value="Domestic">Domestic</option>
            <option value="Creative">Creative</option>
            <option value="Skilled Trades">Skilled Trades</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Advanced Filters Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 border-wera-cyan/10">
            <h3 className="font-bold mb-4 flex items-center"><MapPin className="w-4 h-4 mr-2 text-wera-cyan" /> County</h3>
            <select className="w-full p-2 text-sm rounded-lg border-gray-100 focus:ring-wera-cyan">
              <option>All Counties</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
              <option>Kiambu</option>
              <option>Kisumu</option>
              <option>Nakuru</option>
            </select>
          </Card>

          <Card className="p-6 border-wera-cyan/10">
            <h3 className="font-bold mb-4 flex items-center"><MapPin className="w-4 h-4 mr-2 text-wera-cyan" /> Proximity (km)</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={distance} 
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full accent-wera-cyan" 
              />
              <div className="flex justify-between text-xs font-bold text-wera-cyan">
                <span>1km</span>
                <span>{distance}km</span>
                <span>100km+</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-black">
            <h3 className="font-bold mb-4 flex items-center"><Star className="w-4 h-4 mr-2 text-black" /> Min. Rating</h3>
            <div className="flex gap-2">
              {[3, 4, 4.5].map((r) => (
                <button 
                  key={r}
                  onClick={() => setMinRating(minRating === r ? 0 : r)}
                  className={cn(
                    "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                    minRating === r ? "bg-black text-white border-black" : "bg-black/10 text-black border-black/10 hover:border-black"
                  )}
                >
                  {r}+ ★
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-black">
            <h3 className="font-bold mb-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-black" /> Experience</h3>
            <select 
              className="w-full p-2 text-sm rounded-lg border-black/20 focus:ring-black bg-yellow-50/50"
              onChange={(e) => setMinExperience(parseInt(e.target.value))}
            >
              <option value="0">Any Experience</option>
              <option value="2">2+ Years</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
            </select>
          </Card>
          
          <Card className="p-6 border-black">
            <h3 className="font-bold mb-4 text-black">Categories</h3>
            <div className="space-y-2">
              {['Construction', 'Domestic', 'Creative', 'Skilled Trades'].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-black/30 text-black focus:ring-black" />
                  <span className="text-sm font-medium group-hover:underline transition-all text-black">{cat}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="md:col-span-3 space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wera-cyan"></div>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job: any) => (
              <Card key={job.id} className={cn(
                "p-6 transition-all group cursor-pointer relative overflow-hidden border-black",
                job.requires_ai_certification ? "ring-2 ring-wera-cyan" : "hover:shadow-md"
              )}>
                {job.requires_ai_certification && (
                  <div className="absolute top-0 right-0 bg-wera-cyan text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> AI CERTIFIED ONLY
                  </div>
                )}
                {job.distance <= 5 && job.location !== 'Remote' && !job.requires_ai_certification && (
                  <div className="absolute top-0 right-0 bg-wera-green text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                    NEARBY
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-0.5 bg-black/10 text-black text-[10px] font-bold uppercase rounded">
                        {job.category}
                      </span>
                      <span className="flex items-center text-black text-xs font-bold">
                        <Star className="w-3 h-3 mr-1 fill-black" /> {job.rating}
                      </span>
                      {job.requires_ai_certification && (
                        <span className="flex items-center text-black text-[10px] font-bold uppercase">
                          <Brain className="w-3 h-3 mr-1" /> Soft Skills Req.
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold group-hover:underline transition-all">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-black">KES {job.budget.toLocaleString()}</div>
                    <div className="text-[10px] text-black/60 font-bold uppercase tracking-wider">Fixed Budget</div>
                  </div>
                </div>
                <p className="text-black/80 text-sm mb-6 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center text-xs text-gray-500 space-x-6">
                    <span className="flex items-center font-medium"><MapPin className="w-3.5 h-3.5 mr-1.5 text-wera-cyan" /> {job.location} ({job.distance}km)</span>
                    <span className="flex items-center font-medium"><Briefcase className="w-3.5 h-3.5 mr-1.5 text-wera-cyan" /> {job.experience}y Exp.</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Link to="/profile/1">
                        <Button variant="outline" size="sm" className="group-hover:bg-blue-700 group-hover:text-white transition-all">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                      {applications[job.id] ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full">{applications[job.id]}</span>
                      ) : (
                        <div className="flex gap-2">
                          {!job.requires_ai_certification && (
                            <Button onClick={() => handleApply(job.id)} variant="primary" size="sm">Apply</Button>
                          )}
                          <Button onClick={() => handleApply(job.id, true)} variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">Quick Apply</Button>
                        </div>
                      )}
                    </div>
                    {/* AI Suggestion */}
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-800">
                      <strong>AI Suggestion:</strong> Recommended candidate: {getAiCandidateSuggestion(job.id)}
                      <Button 
                        variant="link" 
                        size="sm" 
                        className={`ml-2 h-auto p-0 underline ${validatingJobIds.has(job.id) ? 'text-gray-400' : 'text-blue-600'}`}
                        onClick={() => handleValidate(job.id)}
                        disabled={validatingJobIds.has(job.id)}
                      >
                        {validatingJobIds.has(job.id) ? 'Validating...' : 'Validate Candidate'}
                      </Button>
                      {validationResults[job.id] && (
                        <div className={`mt-1 text-[10px] ${validationResults[job.id].isValid ? 'text-green-600' : 'text-red-600'}`}>
                          {validationResults[job.id].isValid ? '✓ Validated' : '✗ Validation Failed'} (Score: {validationResults[job.id].score})
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-yellow-50/20 rounded-2xl border-2 border-dashed border-yellow-300/30">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters or proximity range.</p>
            </div>
          )}
        </div>
      </div>

      {applyingJobId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="p-6 max-w-lg w-full bg-white">
            <h3 className="font-bold text-lg mb-4">Apply for Job</h3>
            <p className="text-sm text-slate-600 mb-4">Submit your application with your profile summary or custom cover letter.</p>
            <textarea 
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 text-sm"
              placeholder="Enter your profile summary or message to the employer..."
              rows={5}
              value={applicationSummary}
              onChange={(e) => setApplicationSummary(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setApplyingJobId(null)}>Cancel</Button>
              <Button variant="primary" onClick={confirmApplication}>Confirm Application</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/');
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'phone') => {
    // In a real app, trigger supabase.auth.signInWithOAuth
    console.log(`Logging in with ${provider}`);
    alert(`Social Login with ${provider.toUpperCase()} is ready for integration!`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-yellow-50">
      <Card className="w-full max-w-md p-8 border-black">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-wera-green font-bold text-2xl">W</span>
          </div>
          <h2 className="text-2xl font-bold text-black">Welcome Back</h2>
          <p className="text-black/60 text-sm">Log in to your Wera account</p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto space-y-2 border-black/20 hover:border-black hover:bg-black/5 text-black"
            onClick={() => handleSocialLogin('google')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-[10px] font-bold uppercase">Google</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto space-y-2 border-black/20 hover:border-black hover:bg-black/5 text-black"
            onClick={() => handleSocialLogin('apple')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.55-.67-2.85-.67-1.32 0-1.78.65-2.85.65-1.11 0-2.15-.62-3.19-1.59-2.12-1.97-3.23-5.61-3.23-8.46 0-4.47 2.85-6.84 5.59-6.84 1.44 0 2.53.52 3.33.52.76 0 2.11-.64 3.75-.64 1.61 0 3.06.77 4.06 2.11-3.32 1.94-2.78 6.13.56 7.49-.69 1.74-1.51 3.46-2.46 4.38zm-3.12-15.3c-.04-1.93 1.59-3.57 3.46-3.61.04 1.93-1.6 3.58-3.46 3.61z"/>
            </svg>
            <span className="text-[10px] font-bold uppercase">Apple</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto space-y-2 border-black/20 hover:border-black hover:bg-black/5 text-black"
            onClick={() => handleSocialLogin('phone')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
            <span className="text-[10px] font-bold uppercase">Phone</span>
          </Button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-yellow-50 px-2 text-gray-500">Or continue with email</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-xs text-wera-cyan hover:underline">Forgot password?</a>
            </div>
            <Input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
            />
            <label className="flex items-center space-x-2 cursor-pointer pt-1">
              <input 
                type="checkbox" 
                checked={showPassword} 
                onChange={() => setShowPassword(!showPassword)}
                className="rounded border-gray-300 text-wera-cyan focus:ring-wera-cyan"
              />
              <span className="text-xs text-gray-500 font-medium">Show Password</span>
            </label>
          </div>
          <Button type="submit" variant="secondary" className="w-full py-3 font-bold">Log In</Button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="text-wera-cyan font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

const WalletPage = () => {
  const [balance, setBalance] = useState(12500);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('M-Pesa');
  const [targetCurrency, setTargetCurrency] = useState('KES');
  const [transactions] = useState([
    { id: 1, type: 'deposit', amount: 5000, date: '2026-04-21T07:00:00Z', status: 'completed', method: 'M-Pesa' },
    { id: 2, type: 'withdrawal', amount: 2000, date: '2026-04-21T06:30:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 3, type: 'payment', amount: 1500, date: '2026-04-04T07:00:00Z', status: 'completed', method: 'Job #829' },
  ]);

  const exchangeRates: { [key: string]: number } = { KES: 1, USD: 0.0076, EUR: 0.0070, GBP: 0.0060 };
  const rate = exchangeRates[targetCurrency] || 1;
  const convertedBalance = balance * rate;

  const handleDownloadPdf = (period: string) => {
    const doc = new jsPDF();
    const now = new Date();
    
    const filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      if (period === 'all') return true;
      if (period === 'hour') return (now.getTime() - txDate.getTime()) < 3600000;
      return true;
    });

    doc.text(`WÈRA Wallet Statement (${targetCurrency}) - Period: ${period}`, 10, 10);
    
    const tableData = filteredTransactions.map(tx => [
      new Date(tx.date).toLocaleString(),
      tx.type,
      (tx.amount * rate).toFixed(2),
      tx.status
    ]);

    (doc as any).autoTable({
      head: [['Date', 'Type', `Amount (${targetCurrency})`, 'Status']],
      body: tableData,
    });
    
    doc.save(`statement_${period}.pdf`);
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || (selectedMethod === 'M-Pesa' && !phone)) return;
    setLoading(true);
    // Simulate API call based on selectedMethod
    await new Promise(r => setTimeout(r, 2000));
    setBalance(prev => prev + parseInt(amount));
    setLoading(false);
    setAmount('');
    setPhone('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-black mb-2 text-slate-900">WÈRA <span className="text-blue-700">Wallet</span></h1>
        <p className="text-slate-600">Securely manage your professional balance and transactions.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Balance Card */}
          <Card className="p-8 bg-slate-800 text-white border-slate-700 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Available Balance</p>
                <h2 className="text-3xl sm:text-4xl font-black mb-1 text-slate-100">{targetCurrency} {convertedBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
              </div>
              <select 
                className="bg-slate-700 text-white text-xs p-1 rounded border-none"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div className="mt-8 flex space-x-4">
              <Button onClick={() => handleDownloadPdf('all')} variant="outline" className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600 flex-1 text-xs">PDF (All Time)</Button>
              <Button onClick={() => handleDownloadPdf('hour')} variant="outline" className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600 flex-1 text-xs">PDF (Last Hour)</Button>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-slate-600 rounded-full blur-[80px]" />
          </Card>

          {/* Transaction History */}
          <Card className="p-6 border-slate-200 shadow-sm bg-white">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center">
              <History className="w-5 h-5 mr-2 text-blue-700" /> Recent Transactions
            </h3>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      tx.type === 'deposit' ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800 capitalize">{tx.type} via {tx.method}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{new Date(tx.date).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-black text-sm",
                      tx.type === 'deposit' ? "text-blue-700" : "text-slate-800"
                    )}>
                      {tx.type === 'deposit' ? '+' : '-'} {targetCurrency} {(tx.amount * rate).toLocaleString()}
                    </p>
                    <span className="text-[8px] font-black uppercase tracking-tighter bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-8">
          {/* Deposit Form */}
          <Card className="p-6 border-slate-200 shadow-sm bg-slate-50">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-700" /> Load Funds
            </h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment Method</label>
                <select 
                  className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                >
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Airtel Money">Airtel Money</option>
                  <option value="Telkom T-Kash">Telkom T-Kash</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Amount (KES)</label>
                <Input 
                  type="number" 
                  placeholder="e.g. 1000" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-slate-200 bg-white"
                />
              </div>
              {['M-Pesa', 'Airtel Money', 'Telkom T-Kash'].includes(selectedMethod) && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{selectedMethod} Number</label>
                  <Input 
                    placeholder="e.g. 07XXXXXXXX" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-slate-200 bg-white"
                  />
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full py-6 font-black bg-blue-700 text-white hover:bg-blue-800"
                disabled={loading || !amount || (['M-Pesa', 'Airtel Money', 'Telkom T-Kash'].includes(selectedMethod) && !phone)}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
                ) : (
                  `Deposit via ${selectedMethod}`
                )}
              </Button>
              <p className="text-[10px] text-center text-slate-400 leading-relaxed">
                An STK Push will be sent to your phone. Enter your M-Pesa PIN/Details to complete the transaction.
              </p>
            </form>
          </Card>

          {/* Security Note */}
          <Card className="p-6 border-slate-300 bg-white shadow-sm">
            <div className="flex items-center space-x-3 mb-4 text-blue-800">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-bold text-sm">Escrow & Commission</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              All payments are held in WÈRA Escrow until the job is marked as complete.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              A 10% platform commission applies to all transactions (5% from worker, 5% from client).
            </p>
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-[10px] text-red-700 font-bold">
                ⚠️ Off-platform payments are strictly prohibited.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const WorkerProfilePage = () => {
  const { workerId } = useParams<{ workerId: string }>();
  // Mock Worker Data
  const worker = {
    name: workerId === '1' ? 'John Kamau' : 'Jane Doe',
    title: 'Professional Plumber',
    rating: 4.8,
    reviews: 124,
    skills: ['Plumbing', 'Pipe Installation', 'Water Heating Systems', 'Leak Repairs'],
    certifications: ['Certified Plumber Level 3', 'Safety & PPE Compliance', 'Advanced HVAC Training'],
    completedJobs: [
      { id: 1, title: 'Fix leaking tap in Westlands', date: '2026-04-15' },
      { id: 2, title: 'Full house rewiring in Kilimani', date: '2026-04-10' },
      { id: 3, title: 'Build a garden wall in Langata', date: '2026-04-05' },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-8">
          <Card className="p-6 text-center border-slate-200 bg-white">
            <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-4 overflow-hidden border-2 border-slate-200">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=worker1" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{worker.name}</h2>
            <p className="text-sm text-slate-600 mb-4">{worker.title}</p>
            <div className="flex justify-center items-center space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-blue-700 text-blue-700" />)}
              <span className="text-xs font-semibold text-slate-500 ml-2">({worker.rating} • {worker.reviews} reviews)</span>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center text-[10px] font-bold text-slate-700 bg-slate-100 py-1.5 rounded-full px-3">
                <Shield className="w-3 h-3 mr-1.5 text-blue-700" /> POLICE CLEARED
              </div>
            </div>
            <Button variant="primary" className="w-full">Hire Worker</Button>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Skills */}
          <Card className="p-6 border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Completed Jobs */}
          <Card className="p-6 border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 mb-4">Completed Jobs History</h3>
            <div className="space-y-4">
              {worker.completedJobs.map(job => (
                <div key={job.id} className="flex justify-between items-center p-3 border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{job.title}</p>
                    <p className="text-xs text-slate-500">Completed on {new Date(job.date).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">5/5 Rating</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Certifications */}
          <Card className="p-6 border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 mb-4">Verifiable Certifications</h3>
            <ul className="space-y-3">
              {worker.certifications.map(cert => (
                <li key={cert} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                  <div className='flex items-center'>
                    <CheckCircle className="w-4 h-4 text-blue-700 mr-2" /> 
                    <span className='font-medium text-slate-700'>{cert}</span>
                  </div>
                  <span className="text-xs text-slate-400">Issued: 2026-01-10</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

const workerCategories = [
  { name: 'Construction', icon: '🏗️', description: 'Masonry, steel work, and site prep.' },
  { name: 'Plumbing', icon: '🚰', description: 'Installation and maintenance of systems.' },
  { name: 'Electrical', icon: '⚡', description: 'Wiring, lighting, and power solutions.' },
  { name: 'Cleaning', icon: '🧹', description: 'Residential and commercial sanitation.' },
  { name: 'Landscaping', icon: '🌳', description: 'Garden design and maintenance.' },
];

const HireTalentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Construction & Trades',
    description: '',
    budget: '',
    location: '',
    scheduled_at: '',
    is_for_others: false,
    recipient_name: '',
    recipient_phone: '',
    is_direct_hire: false,
    urgency: 'Flexible',
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Move to payment/success
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Hire <span className="wera-text-gradient">Wera Workers</span></h1>
        <p className="text-gray-600">Connect with Kenya's most skilled and vetted talent.</p>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {workerCategories.map(c => (
             <Card key={c.name} className="p-4 flex items-center gap-3 bg-white">
                <div className="text-2xl">{c.icon}</div>
                <div>
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-[10px] opacity-60">{c.description}</p>
                </div>
             </Card>
          ))}
        </div>
        <Button variant="ghost" className="mt-4 text-xs font-bold underline">View All Categories</Button>
      </div>

      <Card className="p-8 border-black">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex justify-between mb-8">
              {[1, 2].map((s) => (
                <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'bg-black' : 'bg-black/10'}`} />
              ))}
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">What do you need help with?</label>
              <Input 
                placeholder="e.g. Need a Plumber for kitchen renovation" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-yellow-50/50 border-black/20"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">Category</label>
              <select 
                className="w-full p-2 border border-black/20 rounded-lg focus:ring-black bg-yellow-50/50"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Construction & Trades</option>
                <option>Domestic & Home Care</option>
                <option>Creative & Digital</option>
                <option>IT & Technical</option>
                <option>Contract & Temp Staffing</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">Schedule Date & Time</label>
              <Input 
                type="datetime-local" 
                value={formData.scheduled_at}
                onChange={(e) => setFormData({...formData, scheduled_at: e.target.value})}
                className="bg-yellow-50/50 border-black/20"
              />
            </div>
            <div className="space-y-4 p-4 bg-black/5 rounded-xl border border-black/10">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.is_for_others}
                    onChange={(e) => setFormData({...formData, is_for_others: e.target.checked})}
                    className="w-4 h-4 rounded border-black/20 text-black focus:ring-black"
                  />
                  <span className="text-sm font-bold">Hire for someone else?</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-black/20 text-black focus:ring-black"
                  />
                  <span className="text-sm font-bold text-black">Bulk Hiring?</span>
                </label>
              </div>
              
              {formData.is_for_others && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-black/60">Recipient Name</label>
                    <Input 
                      placeholder="e.g. Mary Wanjiku" 
                      value={formData.recipient_name}
                      onChange={(e) => setFormData({...formData, recipient_name: e.target.value})}
                      className="bg-yellow-50/50 border-black/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-black/60">Recipient Phone</label>
                    <Input 
                      placeholder="e.g. 0712 345 678" 
                      value={formData.recipient_phone}
                      onChange={(e) => setFormData({...formData, recipient_phone: e.target.value})}
                      className="bg-yellow-50/50 border-black/20"
                    />
                  </div>
                </motion.div>
              )}
            </div>
            <Button onClick={() => setStep(2)} className="w-full py-6 text-lg font-bold" variant="primary">
              Next: Details & Budget
            </Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handlePostJob} className="space-y-6">
            <div className="flex justify-between mb-8">
              {[1, 2].map((s) => (
                <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'bg-black' : 'bg-black/10'}`} />
              ))}
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">Describe the job</label>
              <div className="flex gap-2 mb-2 p-1 border border-black/10 rounded-lg bg-black/5">
                <Button variant="ghost" size="sm" type="button" onClick={() => setFormData({...formData, description: formData.description + '**Bold**'})} className="px-2 py-1 h-8 text-xs font-bold">B</Button>
                <Button variant="ghost" size="sm" type="button" onClick={() => setFormData({...formData, description: formData.description + '*Italic*'})} className="px-2 py-1 h-8 text-xs font-bold italic">I</Button>
                <Button variant="ghost" size="sm" type="button" onClick={() => setFormData({...formData, description: formData.description + '\n- List item'})} className="px-2 py-1 h-8 text-xs font-bold">List</Button>
              </div>
              <textarea 
                className="w-full p-4 border border-black/20 rounded-xl min-h-[150px] focus:ring-black bg-yellow-50/50"
                placeholder="Provide details about the work, requirements, and timeline..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <label className="flex items-center gap-2 font-bold my-4">
              <input type="checkbox" checked={formData.is_direct_hire} onChange={(e) => setFormData({...formData, is_direct_hire: e.target.checked})} />
              Direct Hire (Bypass Marketplace)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold">Urgency</label>
                <select value={formData.urgency} onChange={(e) => setFormData({...formData, urgency: e.target.value})} className="w-full p-2 border border-black/20 rounded-lg focus:ring-black bg-yellow-50/50">
                  <option>Immediate</option>
                  <option>Within 3 days</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold">Budget (KES)</label>
                <Input type="number" placeholder="2500" className="bg-yellow-50/50 border-black/20" />
              </div>
            </div>
            
            <div className="space-y-2">
                <label className="block text-sm font-bold">Location</label>
                <Input placeholder="e.g. Westlands, Nairobi" className="bg-yellow-50/50 border-black/20" />
            </div>
            
            {formData.is_direct_hire && (
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl space-y-2">
                 <label className="text-sm font-bold text-blue-800">Select Worker ID</label>
                 <Input placeholder="Enter Worker ID (e.g. 1)" className="bg-white" />
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <Button variant="primary" onClick={() => setStep(1)} className="flex-1 font-bold">Back</Button>
              <Button type="submit" variant="primary" className="flex-1 font-bold">Post Opportunity</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-wera-green/10 text-wera-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-black">Opportunity Posted!</h2>
            
            <div className="bg-black/5 p-6 rounded-2xl border border-black/10 text-left space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-black/40 uppercase">Scheduled For</span>
                <span className="text-sm font-bold text-black">{formData.scheduled_at ? new Date(formData.scheduled_at).toLocaleString() : 'As soon as possible'}</span>
              </div>
              {formData.is_for_others && (
                <div className="pt-4 border-t border-black/10">
                  <div className="flex items-center text-wera-green text-xs font-bold mb-2">
                    <User className="w-3 h-3 mr-1" /> Hired for Someone Else
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-black/40 uppercase">Recipient</span>
                    <span className="text-sm font-bold text-black">{formData.recipient_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-black/40 uppercase">Phone</span>
                    <span className="text-sm font-bold text-black">{formData.recipient_phone}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-black/60 max-w-md mx-auto">
              Your job is now live. We'll send a **reminder** to you {formData.is_for_others ? 'and the recipient' : ''} 1 hour before the scheduled time.
            </p>

            <div className="pt-6 space-y-3">
              <Button variant="primary" className="w-full py-4 font-bold">Pay KES {formData.budget || '0'} with M-Pesa</Button>
              <Link to="/jobs" className="block text-sm text-black font-bold hover:underline">View in Marketplace</Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

const CompanyOnboardingPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Wera <span className="wera-text-gradient">for Business</span></h1>
        <p className="text-gray-600 text-lg">Onboard your company to access reliable contract and temp Wera Workers.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="p-8 border-black">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-black">Company Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Company Name</label>
                    <Input placeholder="e.g. Wera Solutions Ltd" className="bg-yellow-50/50 border-black/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Industry</label>
                    <select className="w-full p-2 border border-black/20 rounded-lg focus:ring-black bg-yellow-50/50">
                      <option>Logistics</option>
                      <option>Retail</option>
                      <option>Construction</option>
                      <option>Hospitality</option>
                      <option>Tech</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Business Registration Number</label>
                  <Input placeholder="PVT-XXXXXX" className="bg-yellow-50/50 border-black/20" />
                </div>
                <Button onClick={() => setStep(2)} className="w-full py-4 font-bold" variant="primary">Next Step</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-black">Recruitment Needs</h2>
                <div className="space-y-4">
                  <label className="block text-sm font-bold">What type of workers are you looking for?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Temp Staff', 'Contractors', 'Day Laborers', 'Specialized Pros'].map((type) => (
                      <label key={type} className="flex items-center p-3 border border-black/10 rounded-xl cursor-pointer hover:bg-black/5">
                        <input type="checkbox" className="mr-3 text-black" />
                        <span className="text-sm font-medium text-black">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Estimated Monthly Hires</label>
                  <select className="w-full p-2 border border-black/20 rounded-lg focus:ring-black bg-yellow-50/50">
                    <option>1-5 workers</option>
                    <option>5-20 workers</option>
                    <option>20-50 workers</option>
                    <option>50+ workers</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-black text-black">Back</Button>
                  <Button onClick={() => setStep(3)} variant="primary" className="flex-1 font-bold">Complete Setup</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-black/10 text-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-black">Application Received!</h2>
                <p className="text-black/60">Our B2B team will review your company details and verify your registration within 24 hours.</p>
                <Button onClick={() => navigate('/')} className="w-full py-4 font-bold" variant="primary">Go to Dashboard</Button>
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 bg-black/5 border-black/20">
            <h3 className="font-bold mb-4 text-black">Why Wera for Business?</h3>
            <ul className="space-y-4">
              {[
                'Vetted & Background Checked',
                'Automated Payroll & Tax',
                'Dedicated Account Manager',
                'Bulk Hiring Tools'
              ].map((item) => (
                <li key={item} className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-wera-cyan mr-2 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 border-wera-green/30 bg-wera-green/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-black/60">System Status</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-wera-green rounded-full animate-pulse mr-2" />
                <span className="text-[10px] font-black text-wera-green uppercase">Operational</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-black/40">Domain Status</span>
                <span className="text-wera-green flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" /> Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-black/40">SSL/TLS</span>
                <span className="text-wera-green flex items-center">
                  <Lock className="w-3 h-3 mr-1" /> Active
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-black/40">Custom Domain</span>
                <span className="text-black font-mono">weraplatform.dedyn.io</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AISoftSkillsAssessment = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [evaluation, setEvaluation] = useState<{ score: number, feedback: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);

  const startAssessment = async () => {
    setLoading(true);
    const q = await aiService.generateSoftSkillsQuestion([]);
    setQuestion(q);
    setPreviousQuestions([q]);
    setStep('question');
    setLoading(false);
  };

  const submitResponse = async () => {
    setLoading(true);
    const result = await aiService.evaluateSoftSkillsResponse(question, response);
    setEvaluation(result);
    setStep('result');
    setLoading(false);
    if (result.score >= 70) {
      onComplete();
    }
  };

  return (
    <Card className="p-8 border-black">
      {step === 'intro' && (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-black/10 text-black rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">AI Soft Skills Certification</h2>
          <p className="text-black/80 max-w-md mx-auto">
            Our AI will assess your communication, problem-solving, and professionalism through a real-world scenario.
          </p>
          <Button onClick={startAssessment} disabled={loading} className="w-full sm:w-auto px-10 py-6 text-lg font-bold" variant="secondary">
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Start AI Assessment'}
          </Button>
        </div>
      )}

      {step === 'question' && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-wera-cyan mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">AI Scenario</span>
          </div>
          <p className="text-lg font-medium leading-relaxed italic">"{question}"</p>
          <div className="space-y-4">
            <label className="block text-sm font-bold">Your Response</label>
            <textarea 
              className="w-full p-4 border border-gray-200 rounded-xl min-h-[150px] focus:ring-wera-cyan"
              placeholder="Type your answer here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </div>
          <Button onClick={submitResponse} disabled={loading || !response.trim()} className="w-full py-4 font-bold" variant="secondary">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit for AI Evaluation'}
          </Button>
        </div>
      )}

      {step === 'result' && evaluation && (
        <div className="text-center space-y-6">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
            evaluation.score >= 70 ? "bg-wera-green/10 text-wera-green" : "bg-red-50 text-red-500"
          )}>
            <span className="text-2xl font-black">{evaluation.score}%</span>
          </div>
          <h3 className="text-xl font-bold">
            {evaluation.score >= 70 ? 'Certification Earned!' : 'Needs Improvement'}
          </h3>
          <p className="text-gray-600 italic">"{evaluation.feedback}"</p>
          
          {evaluation.score >= 70 ? (
            <div className="bg-wera-green/10 text-wera-green p-4 rounded-xl text-sm font-bold flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" /> AI SOFT SKILLS CERTIFIED
            </div>
          ) : (
            <Button onClick={() => setStep('intro')} variant="outline" className="w-full">Try Again</Button>
          )}
        </div>
      )}
    </Card>
  );
};

const ModuleContent = ({ module, onComplete, onBack }: { module: any, onComplete: () => void, onBack: () => void }) => {
  const [step, setStep] = useState<'video' | 'quiz' | 'result'>('video');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number, passed: boolean } | null>(null);

  const quizQuestions = module.quiz || [
    {
      q: `In ${module.title}, what is the most important first step?`,
      options: ['Assess the situation', 'Start working immediately', 'Call for help', 'Wait for instructions'],
      correct: 0
    },
    {
      q: 'How do you ensure quality in your work?',
      options: ['Work as fast as possible', 'Follow the standard operating procedures', 'Only do what the client sees', 'Ignore minor details'],
      correct: 1
    }
  ];

  const curriculum = module.lessons || [
    { title: 'Introduction to the Topic', duration: '2:30' },
    { title: 'Key Principles & Frameworks', duration: '5:45' },
    { title: 'Real-world Case Studies', duration: '4:15' },
    { title: 'Summary & Key Takeaways', duration: '1:15' },
  ];

  const handleQuizSubmit = () => {
    const correctCount = quizAnswers.filter((ans, i) => ans === quizQuestions[i].correct).length;
    const score = (correctCount / quizQuestions.length) * 100;
    const passed = score >= 70;
    setQuizResult({ score, passed });
    setStep('result');
    if (passed) onComplete();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-black">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Academy
        </Button>
        <div className="flex items-center space-x-2 text-wera-cyan">
          <module.icon className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest">{module.title}</span>
        </div>
      </div>

      {step === 'video' && (
        <div className="space-y-8">
          <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden relative group border-4 border-black shadow-2xl">
            <video 
              className="w-full h-full object-cover"
              controls
              poster={`https://picsum.photos/seed/${module.id}/1280/720`}
            >
              <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-6 left-6 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] font-black text-wera-green uppercase tracking-widest">Module {module.id} • Training Content</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-10">
              <section>
                <h2 className="text-3xl font-black mb-6">Learning Objectives</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  This module covers the essential skills required for {module.title.toLowerCase()}. 
                  By the end of this lesson, you will be able to demonstrate professional competence 
                  and adhere to WÈRA's high standards of service delivery.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Industry Standards', 'Best Practices', 'Safety Protocols', 'Client Communication'].map((item, i) => (
                    <div key={i} className="flex items-center p-4 bg-yellow-50 rounded-2xl border border-black/5">
                      <CheckCircle className="w-5 h-5 mr-3 text-wera-green" />
                      <span className="font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-6">Course Curriculum</h3>
                <div className="space-y-3">
                  {curriculum.map((lesson: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-black/5 hover:bg-black/5 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <span className="text-xs font-bold text-black/40">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="space-y-6">
              <Card className="p-6 border-black bg-yellow-50">
                <h3 className="font-bold mb-4 uppercase text-xs tracking-widest opacity-50">Resources</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-black/10 text-black">
                    <Download className="w-4 h-4 mr-2" /> Study Guide (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-black/10 text-black">
                    <ExternalLink className="w-4 h-4 mr-2" /> Reference Material
                  </Button>
                </div>
              </Card>
              <Button onClick={() => setStep('quiz')} className="w-full py-6 text-lg font-bold" variant="primary">
                Take Module Quiz
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2">Module Quiz</h2>
            <p className="text-gray-600">Answer the following questions to earn your badge.</p>
          </div>
          <div className="space-y-10">
            {quizQuestions.map((q, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-lg font-bold flex items-start">
                  <span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center mr-4 shrink-0">{i + 1}</span>
                  {q.q}
                </h3>
                <div className="grid gap-3 ml-12">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        const newAns = [...quizAnswers];
                        newAns[i] = optIdx;
                        setQuizAnswers(newAns);
                      }}
                      className={cn(
                        "p-4 text-left rounded-xl border-2 transition-all font-medium",
                        quizAnswers[i] === optIdx 
                          ? "border-black bg-black text-white" 
                          : "border-black/5 bg-yellow-50 hover:border-black/20"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button 
            onClick={handleQuizSubmit} 
            disabled={quizAnswers.length < quizQuestions.length}
            className="w-full py-6 text-lg font-bold mt-12"
          >
            Submit Quiz
          </Button>
        </div>
      )}

      {step === 'result' && quizResult && (
        <div className="max-w-md mx-auto text-center space-y-8 py-20">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl",
            quizResult.passed ? "bg-wera-green text-black" : "bg-red-500 text-white"
          )}>
            {quizResult.passed ? <Trophy className="w-12 h-12" /> : <X className="w-12 h-12" />}
          </div>
          <div>
            <h2 className="text-4xl font-black mb-2">{quizResult.passed ? 'Congratulations!' : 'Try Again'}</h2>
            <p className="text-gray-600">You scored {quizResult.score}% on the {module.title} quiz.</p>
          </div>
          {quizResult.passed ? (
            <div className="space-y-4">
              <div className="p-6 bg-wera-green/10 rounded-2xl border border-wera-green/20">
                <p className="text-sm font-bold text-wera-green uppercase tracking-widest mb-2">New Badge Unlocked</p>
                <div className="flex items-center justify-center space-x-3">
                  <module.icon className="w-8 h-8 text-wera-green" />
                  <span className="text-xl font-black text-black">{module.title}</span>
                </div>
              </div>
              <Button onClick={onBack} className="w-full py-4 font-bold" variant="primary">
                Return to Academy
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-red-500 font-bold">You need at least 70% to pass.</p>
              <Button onClick={() => { setStep('quiz'); setQuizAnswers([]); }} className="w-full py-4 font-bold" variant="primary">
                Retake Quiz
              </Button>
              <Button onClick={onBack} variant="ghost" className="w-full text-black">
                Back to Lessons
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CertificateVerificationPage = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const verifyCert = () => {
    setLoading(true);
    // Mock verification logic
    setTimeout(() => {
      if (certId.toUpperCase().startsWith('WERA-')) {
        setResult({
          valid: true,
          name: 'WERA WORKER #4412',
          date: 'April 5, 2026',
          modules: ['Professionalism', 'Customer Service', 'Financial Literacy', 'Health & Safety', 'Digital Literacy']
        });
      } else {
        setResult({ valid: false });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-wera-green/10 text-wera-green rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">Verify <span className="wera-text-gradient">Credentials</span></h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Enter a WÈRA Certificate ID to verify the professional standing and completed training of a worker.
        </p>
      </div>

      <Card className="p-8 border-black max-w-md mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest opacity-50">Certificate ID</label>
            <Input 
              placeholder="e.g. WERA-2026-XXXX" 
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              className="border-black font-mono"
            />
          </div>
          <Button onClick={verifyCert} disabled={loading || !certId} className="w-full py-6 font-black" variant="primary">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify Certificate'}
          </Button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-black/5"
            >
              {result.valid ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-wera-green">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold uppercase tracking-widest text-xs">Verified Credential</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black">{result.name}</h3>
                    <p className="text-sm text-gray-500">Issued on {result.date}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl space-y-2">
                    <p className="text-[10px] font-black uppercase opacity-40">Completed Curriculum</p>
                    <div className="flex flex-wrap gap-2">
                      {result.modules.map((m: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-black/5 rounded-md text-[10px] font-bold">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-red-500">
                  <X className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-xs">Invalid Certificate ID</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

const TrainingPage = () => {
  const [modules, setModules] = useState([
    { 
      id: 1, 
      title: 'Professionalism & Ethics', 
      completed: true, 
      icon: Shield, 
      desc: 'Master the core values of integrity and professional conduct in the workplace.',
      lessons: [
        { title: 'The WÈRA Code of Conduct', duration: '3:15' },
        { title: 'Integrity in Service Delivery', duration: '4:30' },
        { title: 'Handling Client Property', duration: '5:00' },
        { title: 'Conflict Resolution', duration: '3:45' }
      ],
      quiz: [
        { q: 'What is the primary value of a Wera Worker?', options: ['Speed', 'Integrity', 'Low Cost', 'Anonymity'], correct: 1 },
        { q: 'How should you handle a mistake on the job?', options: ['Hide it', 'Blame the client', 'Report it immediately and offer a fix', 'Ignore it'], correct: 2 }
      ]
    },
    { 
      id: 2, 
      title: 'French for Service Professionals', 
      completed: false, 
      icon: Languages, 
      desc: 'Master basic French communication for gardening, housekeeping, and hospitality roles.',
      lessons: [
        { title: 'Greetings & Introductions', duration: '4:00' },
        { title: 'Service Vocabulary (Garden & Home)', duration: '6:30' },
        { title: 'Understanding Instructions', duration: '5:15' },
        { title: 'Polite Phrases & Etiquette', duration: '3:30' }
      ],
      quiz: [
        { q: 'How do you say "Good morning" in French?', options: ['Bonjour', 'Merci', 'S\'il vous plaît', 'Au revoir'], correct: 0 },
        { q: 'What is the French word for "Garden"?', options: ['Maison', 'Cuisine', 'Jardin', 'Salon'], correct: 2 }
      ]
    },
    { 
      id: 3, 
      title: 'Advanced Defensive Driving', 
      completed: false, 
      icon: Car, 
      desc: 'High-level driving skills including security awareness and emergency maneuvers.',
      lessons: [
        { title: 'Security Awareness & Route Planning', duration: '7:00' },
        { title: 'Emergency Evasive Maneuvers', duration: '8:45' },
        { title: 'Vehicle Maintenance & Safety Checks', duration: '5:30' },
        { title: 'Professional Chauffeur Etiquette', duration: '4:15' }
      ],
      quiz: [
        { q: 'What is the "3-second rule" in driving?', options: ['Time to change lanes', 'Safe following distance', 'Time to react to a call', 'Time to park'], correct: 1 },
        { q: 'Why is route variation important for security?', options: ['To see new places', 'To save fuel', 'To avoid being a predictable target', 'To find better roads'], correct: 2 }
      ]
    },
    { id: 4, title: 'Customer Service Excellence', completed: false, icon: MessageSquare, desc: 'Learn how to exceed client expectations and build lasting professional relationships.' },
    { id: 5, title: 'Financial Literacy & Savings', completed: false, icon: TrendingUp, desc: 'Smart money management strategies for independent workers and entrepreneurs.' },
    { id: 6, title: 'Health & Safety at Work', completed: false, icon: Zap, desc: 'Essential protocols to ensure your safety and the safety of your clients.' },
    { id: 7, title: 'Digital Literacy for Workers', completed: false, icon: Sparkles, desc: 'Using technology to manage your bookings, payments, and professional profile.' },
  ]);
  const [aiCertified, setAiCertified] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const progress = ((modules.filter(m => m.completed).length + (aiCertified ? 1 : 0)) / (modules.length + 1)) * 100;

  const completeModule = (id: number) => {
    setModules(modules.map(m => m.id === id ? { ...m, completed: true } : m));
  };

  if (selectedModule) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ModuleContent 
          module={selectedModule} 
          onBack={() => setSelectedModule(null)}
          onComplete={() => completeModule(selectedModule.id)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center space-x-2 text-wera-cyan mb-2">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Wera Professional Development</span>
          </div>
          <h1 className="text-4xl font-black mb-2">WÈRA <span className="wera-text-gradient">Academy</span></h1>
          <p className="text-gray-600 max-w-xl">
            The Academy is your bridge to formal employment. Certified workers earn **35% more** on average and are **3x more likely** to be hired by corporate clients.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link to="/profile">
            <Button variant="outline" className="border-black text-black">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {/* AI Certification Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-wera-cyan" /> AI Soft Skills Certification
              </h2>
              {aiCertified && (
                <span className="px-3 py-1 bg-wera-green/20 text-wera-green text-[10px] font-bold rounded-full uppercase">Verified</span>
              )}
            </div>
            <AISoftSkillsAssessment onComplete={() => setAiCertified(true)} />
          </section>

          {/* Standard Modules Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Core Professional Modules</h2>
            <div className="grid sm:grid-cols-1 gap-4">
              {modules.map((mod) => (
                <Card key={mod.id} className={cn(
                  "p-6 flex items-center justify-between transition-all border-black group",
                  mod.completed ? "bg-black/5" : "bg-yellow-50"
                )}>
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                      mod.completed ? "bg-wera-green text-black" : "bg-black/5 text-black/40"
                    )}>
                      <mod.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{mod.title}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider">
                          {mod.completed ? 'Completed' : '45 mins • Video & Quiz'}
                        </span>
                        {mod.completed && (
                          <span className="flex items-center text-[10px] font-bold text-wera-green uppercase">
                            <CheckCircle className="w-3 h-3 mr-1" /> Badge Earned
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={mod.completed ? "ghost" : "primary"} 
                    size="sm"
                    onClick={() => setSelectedModule(mod)}
                    className={mod.completed ? "text-wera-green" : ""}
                  >
                    {mod.completed ? <CheckCircle className="w-6 h-6" /> : 'Start Module'}
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Progress & Certificate */}
          <Card className="p-8 border-black bg-black text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-8 text-center text-lg uppercase tracking-widest">Your Progress</h3>
              <div className="relative w-40 h-40 mx-auto mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/10" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${progress} 100`} strokeLinecap="round" className="text-wera-green transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">{Math.round(progress)}%</span>
                  <span className="text-[10px] font-bold opacity-50 uppercase">Complete</span>
                </div>
              </div>
              
              {progress === 100 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="bg-wera-green text-black p-4 rounded-xl text-xs font-black uppercase tracking-tighter">
                    🏆 WERA CERTIFIED PROFESSIONAL
                  </div>
                  <div className="p-8 border-4 border-double border-wera-green/30 rounded-2xl bg-white text-black relative">
                    <div className="absolute top-4 right-4 opacity-10">
                      <Logo iconSize="w-20 h-20" />
                    </div>
                    <div className="text-center space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-wera-green">Certificate of Completion</h4>
                      <div className="space-y-1">
                        <p className="text-[8px] uppercase font-bold opacity-40">This is to certify that</p>
                        <p className="text-lg font-black tracking-tight">WERA WORKER #4412</p>
                      </div>
                      <p className="text-[8px] leading-relaxed max-w-[200px] mx-auto opacity-60">
                        Has successfully completed the full WÈRA Academy Professional Development curriculum and is now a Certified Wera Professional.
                      </p>
                      <div className="pt-4 flex justify-between items-end">
                        <div className="text-left">
                          <div className="w-16 h-px bg-black/20 mb-1" />
                          <p className="text-[6px] font-bold uppercase">Director of Academy</p>
                        </div>
                        <div className="w-10 h-10 border-2 border-wera-green rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-wera-green" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-wera-green text-black font-black py-4 hover:bg-wera-green/90 transition-all shadow-lg">
                    <Download className="w-4 h-4 mr-2" /> Download Official Certificate
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={cn(
                        "aspect-square rounded-lg flex items-center justify-center border",
                        modules[i-1]?.completed ? "bg-wera-green/20 border-wera-green text-wera-green" : "bg-yellow-50/5 border-white/10 text-white/20"
                      )}>
                        <Award className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/40 text-center leading-relaxed">
                    Complete all modules and the AI assessment to unlock your **WÈRA Certified Badge** and appear in the **Top Graduates** list.
                  </p>
                </div>
              )}
            </div>
            {/* Background glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-wera-cyan/20 rounded-full blur-[80px]" />
          </Card>

          {/* Top Graduates Leaderboard */}
          <Card className="p-6 border-black">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-yellow-500" /> Top Graduates
              </h3>
              <span className="text-[10px] font-bold text-black/40 uppercase">This Month</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Sarah M.', role: 'Hospitality', score: 98, img: 'worker2', badge: 'Elite' },
                { name: 'David O.', role: 'Construction', score: 96, img: 'worker3', badge: 'Pro' },
                { name: 'Grace W.', role: 'Domestic', score: 95, img: 'worker4', badge: 'Pro' },
              ].map((grad, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-all border border-transparent hover:border-black/5 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden border border-black/5 group-hover:scale-110 transition-transform">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${grad.img}`} alt={grad.name} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{grad.name}</p>
                      <p className="text-[10px] text-black/40 font-medium">{grad.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-wera-green">{grad.score}%</p>
                    <span className="text-[8px] font-black uppercase tracking-tighter bg-black text-white px-1.5 py-0.5 rounded">
                      {grad.badge}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs font-bold text-black/60 hover:text-black">
                View All Graduates <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </Card>

          {/* Learning Paths */}
          <Card className="p-6 border-black bg-wera-cyan/5">
            <h3 className="font-bold mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2 text-wera-cyan" /> Learning Paths
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Corporate Ready', modules: 8, icon: Briefcase },
                { title: 'Entrepreneurship', modules: 6, icon: TrendingUp },
                { title: 'Technical Specialist', modules: 12, icon: Zap },
              ].map((path, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white border border-black/5 rounded-xl hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-wera-cyan/10 flex items-center justify-center text-wera-cyan">
                      <path.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">{path.title}</span>
                  </div>
                  <span className="text-[10px] font-bold text-black/40">{path.modules} Modules</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Employer Endorsements */}
          <Card className="p-6 border-black bg-wera-cyan/5">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-4 h-4 text-wera-cyan" />
              <h3 className="font-bold text-sm">Employer Endorsed</h3>
            </div>
            <p className="text-[10px] text-black/60 mb-4 leading-relaxed">
              Companies like **Safaricom**, **KCB**, and **Equity** prioritize Wera Academy graduates for their contract staffing needs.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-yellow-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=C${i}`} alt="Company" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-black text-white text-[8px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                +12
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserSession({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata?.role as UserRole || UserRole.WORKER,
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUserSession({
          id: session.user.id,
          email: session.user.email!,
          role: session.user.user_metadata?.role as UserRole || UserRole.WORKER,
        });
      } else {
        setUserSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: UserRole[] }) => {
    if (!userSession) return <Navigate to="/login" />;
    if (!allowedRoles.includes(userSession.role)) return <Navigate to="/" />;
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={userSession} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/hire" element={<HireTalentPage />} />
            <Route path="/signup" element={<WorkerOnboardingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academy" element={<TrainingPage />} />
            <Route path="/verify" element={<CertificateVerificationPage />} />
            <Route path="/companies" element={<CompanyOnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={[UserRole.WORKER, UserRole.EMPLOYER]}>
                <WorkerProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute allowedRoles={[UserRole.WORKER]}>
                <WalletPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <footer className="bg-wera-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <Logo iconSize="w-12 h-12" isDark={true} />
                </div>
                <p className="text-gray-400 max-w-sm mb-6">
                  Unlocking potential across Kenya by connecting skilled Wera Workers with meaningful opportunities. 
                  Building a trusted ecosystem for the future of work.
                </p>
                <div className="flex space-x-4">
                  {/* Social icons would go here */}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6">Platform</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><Link to="/jobs" className="hover:text-white transition-colors">Find Wera Work</Link></li>
                  <li><Link to="/hire" className="hover:text-white transition-colors">Hire Wera Workers</Link></li>
                  <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><Link to="/companies" className="hover:text-white transition-colors">Wera for Business</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>© 2026 Wera Platform. All rights reserved.</p>
              <p>Built for Kenya, Powered by Innovation.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
