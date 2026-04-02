import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  Zap,
  TrendingUp,
  LogOut,
  ChevronRight,
  CheckCircle,
  Brain,
  Sparkles,
  Send,
  Lock
} from 'lucide-react';
import { Button, Card, Input, cn } from './components/ui';
import { supabase, type Profile, type Job } from './lib/supabase';

import { Logo } from './components/Logo';

// --- Components ---

const Navbar = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center group">
            <Logo className="w-12 h-12" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-sm font-medium hover:text-wera-cyan transition-colors">Find Wera Work</Link>
            <Link to="/hire" className="text-sm font-medium hover:text-wera-cyan transition-colors">Hire Wera Workers</Link>
            <Link to="/companies" className="text-sm font-bold text-wera-cyan hover:opacity-80 transition-opacity">For Companies</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon"><Bell className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon"><MessageSquare className="w-5 h-5" /></Button>
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                  <img src={user.user_metadata.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" />
                </div>
                <Button variant="outline" onClick={handleLogout} className="text-xs">Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login"><Button variant="ghost">Login</Button></Link>
                <Link to="/signup"><Button variant="secondary">Join Wera</Button></Link>
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
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/jobs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">Find Work</Link>
              <Link to="/hire" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50">Hire Talent</Link>
              {!user && (
                <div className="pt-4 flex flex-col space-y-2">
                  <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                  <Link to="/signup"><Button variant="secondary" className="w-full">Join Wera</Button></Link>
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

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Trust & Escrow Banner */}
      <div className="bg-wera-black text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="flex items-center text-xs font-bold tracking-wide">
            <Shield className="w-4 h-4 mr-2 text-wera-green" /> 100% SECURE PAYMENTS VIA M-PESA ESCROW
          </span>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <span className="text-[10px] opacity-70 uppercase tracking-widest">Money is only released when you approve the work</span>
        </div>
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
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase wera-gradient text-white rounded-full">
                Unlocking Potential
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
                Uko <span className="wera-text-gradient">wera</span> ama Uko <span className="wera-text-gradient">where?</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Connecting skilled and semi-skilled Wera Workers with formal job opportunities. 
                Empowering the informal sector through technology, vetting, and fair labor practices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">
                  I am a Wera Worker
                </Button>
                <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg">
                  I want to Hire
                </Button>
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

      {/* Stats Section */}
      <section className="py-16 bg-wera-green/10 border-y border-wera-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Wera Workers', value: '50K+' },
              { label: 'Jobs Completed', value: '120K+' },
              { label: 'Trust Rating', value: '4.9/5' },
              { label: 'Counties Covered', value: '47' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-wera-black mb-1">{stat.value}</div>
                <div className="text-xs text-black font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Wera Workers?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
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
              <Card key={i} className="p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 wera-gradient rounded-xl flex items-center justify-center mb-6 text-white">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="wera-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Unlock Your Potential?</h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of Wera Workers and employers already using Wera to build a better future.
              </p>
              <Button className="bg-white text-wera-black hover:bg-gray-100 px-10 py-4 text-lg font-bold">
                Get Started Now
              </Button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(20);
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get user location for proximity matching
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location access denied. Proximity matching disabled.")
      );
    }

    const fetchJobs = async () => {
      // Mocking enhanced data for demo
      const mockJobs: (Job & { rating: number, experience: number, distance: number })[] = [
        { id: '1', title: 'Professional Plumber Needed', description: 'Fix leaking tap in Westlands. Must have own tools.', category: 'Construction', budget: 2500, status: 'open', location: 'Nairobi, Westlands', client_id: 'c1', created_at: new Date().toISOString(), rating: 4.8, experience: 5, distance: 2.5, requires_ai_certification: false },
        { id: '2', title: 'Experienced Nanny for Toddler', description: 'Full time nanny needed for 2 year old. CPR certified preferred.', category: 'Domestic', budget: 15000, status: 'open', location: 'Mombasa, Nyali', client_id: 'c2', created_at: new Date().toISOString(), rating: 4.5, experience: 3, distance: 12.0, requires_ai_certification: false },
        { id: '3', title: 'Graphic Designer for Logo', description: 'Create a modern logo for a new startup. Quick turnaround.', category: 'Creative', budget: 5000, status: 'open', location: 'Remote', client_id: 'c3', created_at: new Date().toISOString(), rating: 4.9, experience: 7, distance: 0, requires_ai_certification: false },
        { id: '4', title: 'Electrical Wiring Expert', description: 'House rewiring project in Kilimani.', category: 'Skilled Trades', budget: 35000, status: 'open', location: 'Nairobi, Kilimani', client_id: 'c4', created_at: new Date().toISOString(), rating: 4.2, experience: 10, distance: 4.8, requires_ai_certification: true },
        { id: '5', title: 'House Cleaning Service', description: 'Weekly cleaning for a 3-bedroom apartment.', category: 'Domestic', budget: 1200, status: 'open', location: 'Nairobi, South B', client_id: 'c5', created_at: new Date().toISOString(), rating: 3.8, experience: 2, distance: 8.2, requires_ai_certification: false },
        { id: '6', title: 'Corporate Event Coordinator', description: 'Manage a large corporate launch event. High professionalism required.', category: 'Creative', budget: 50000, status: 'open', location: 'Nairobi, CBD', client_id: 'c6', created_at: new Date().toISOString(), rating: 5.0, experience: 8, distance: 1.2, requires_ai_certification: true },
      ];
      setJobs(mockJobs as any);
      setFilteredJobs(mockJobs as any);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = jobs.map(j => j as any);
    
    if (distance > 0) {
      result = result.filter(j => j.location === 'Remote' || j.distance <= distance);
    }
    
    if (minRating > 0) {
      result = result.filter(j => j.rating >= minRating);
    }

    if (minExperience > 0) {
      result = result.filter(j => j.experience >= minExperience);
    }

    setFilteredJobs(result);
  }, [distance, minRating, minExperience, jobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">WÈRA <span className="wera-text-gradient">Marketplace</span></h1>
          <p className="text-gray-600">Find vetted opportunities in your immediate proximity.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Button variant="outline" className="border-wera-cyan text-wera-cyan hover:bg-wera-cyan/5">
            <Zap className="w-4 h-4 mr-2" /> AI Job Matcher
          </Button>
          <Input placeholder="Search skills (e.g. Plumber)..." className="max-w-xs" />
          <Button variant="secondary"><Search className="w-4 h-4 mr-2" /> Search</Button>
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

          <Card className="p-6 border-wera-cyan/10">
            <h3 className="font-bold mb-4 flex items-center"><Star className="w-4 h-4 mr-2 text-yellow-400" /> Min. Rating</h3>
            <div className="flex gap-2">
              {[3, 4, 4.5].map((r) => (
                <button 
                  key={r}
                  onClick={() => setMinRating(minRating === r ? 0 : r)}
                  className={cn(
                    "flex-1 py-2 text-xs font-bold rounded-lg border transition-all",
                    minRating === r ? "bg-wera-cyan text-white border-wera-cyan" : "bg-white text-gray-600 border-gray-100 hover:border-wera-cyan"
                  )}
                >
                  {r}+ ★
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-wera-cyan/10">
            <h3 className="font-bold mb-4 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-wera-green" /> Experience</h3>
            <select 
              className="w-full p-2 text-sm rounded-lg border-gray-100 focus:ring-wera-cyan"
              onChange={(e) => setMinExperience(parseInt(e.target.value))}
            >
              <option value="0">Any Experience</option>
              <option value="2">2+ Years</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
            </select>
          </Card>
          
          <Card className="p-6 border-wera-cyan/10">
            <h3 className="font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              {['Construction', 'Domestic', 'Creative', 'Skilled Trades'].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-wera-cyan focus:ring-wera-cyan" />
                  <span className="text-sm font-medium group-hover:text-wera-cyan transition-colors">{cat}</span>
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
                "p-6 transition-all group cursor-pointer relative overflow-hidden",
                job.requires_ai_certification ? "border-wera-cyan/20 bg-wera-cyan/5" : "hover:border-wera-cyan/30"
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
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">
                        {job.category}
                      </span>
                      <span className="flex items-center text-yellow-500 text-xs font-bold">
                        <Star className="w-3 h-3 mr-1 fill-yellow-500" /> {job.rating}
                      </span>
                      {job.requires_ai_certification && (
                        <span className="flex items-center text-wera-cyan text-[10px] font-bold uppercase">
                          <Brain className="w-3 h-3 mr-1" /> Soft Skills Req.
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-wera-cyan transition-colors">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-wera-green">KES {job.budget.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Fixed Budget</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center text-xs text-gray-500 space-x-6">
                    <span className="flex items-center font-medium"><MapPin className="w-3.5 h-3.5 mr-1.5 text-wera-cyan" /> {job.location} ({job.distance}km)</span>
                    <span className="flex items-center font-medium"><Briefcase className="w-3.5 h-3.5 mr-1.5 text-wera-cyan" /> {job.experience}y Exp.</span>
                  </div>
                  {job.requires_ai_certification ? (
                    <Link to="/academy">
                      <Button variant="outline" size="sm" className="border-wera-cyan text-wera-cyan hover:bg-wera-cyan hover:text-white transition-all">
                        Get AI Certified <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="sm" className="group-hover:bg-wera-cyan group-hover:text-white transition-all">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your filters or proximity range.</p>
            </div>
          )}
        </div>
      </div>
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 wera-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Log in to your Wera account</p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto space-y-2 border-gray-200 hover:border-wera-cyan hover:bg-wera-cyan/5"
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
            className="flex flex-col items-center py-6 h-auto space-y-2 border-gray-200 hover:border-wera-cyan hover:bg-wera-cyan/5"
            onClick={() => handleSocialLogin('apple')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.14 0-1.55-.67-2.85-.67-1.32 0-1.78.65-2.85.65-1.11 0-2.15-.62-3.19-1.59-2.12-1.97-3.23-5.61-3.23-8.46 0-4.47 2.85-6.84 5.59-6.84 1.44 0 2.53.52 3.33.52.76 0 2.11-.64 3.75-.64 1.61 0 3.06.77 4.06 2.11-3.32 1.94-2.78 6.13.56 7.49-.69 1.74-1.51 3.46-2.46 4.38zm-3.12-15.3c-.04-1.93 1.59-3.57 3.46-3.61.04 1.93-1.6 3.58-3.46 3.61z"/>
            </svg>
            <span className="text-[10px] font-bold uppercase">Apple</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 h-auto space-y-2 border-gray-200 hover:border-wera-cyan hover:bg-wera-cyan/5"
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
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or continue with email</span></div>
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

const WorkerProfilePage = () => {
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const handleGetSuggestions = async () => {
    setLoadingAi(true);
    // Mock data for demo
    const skills = ['Plumbing', 'Electrical', 'Masonry'];
    const jobs = [
      'Fix leaking tap in Westlands',
      'Full house rewiring in Kilimani',
      'Build a garden wall in Langata'
    ];
    const suggestions = await aiService.getJobSuggestions(skills, jobs);
    setAiSuggestions(suggestions);
    setLoadingAi(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card className="p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden border-4 border-wera-cyan/20">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=worker1" alt="Profile" />
            </div>
            <h2 className="text-xl font-bold">John Kamau</h2>
            <p className="text-sm text-gray-500 mb-4">Professional Plumber</p>
            <div className="flex justify-center space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            
            {/* Vetting Status */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center text-[10px] font-bold text-wera-green bg-wera-green/10 py-1.5 rounded-full">
                <Shield className="w-3 h-3 mr-1.5" /> POLICE CLEARED (GOOD CONDUCT)
              </div>
              <div className="flex items-center justify-center text-[10px] font-bold text-wera-cyan bg-wera-cyan/10 py-1.5 rounded-full">
                <Zap className="w-3 h-3 mr-1.5" /> SOFT SKILLS CERTIFIED
              </div>
            </div>

            <Button variant="outline" className="w-full mb-2">Edit Profile</Button>
            <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">Logout</Button>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          <Card className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">AI Job Matcher</h3>
              <Button 
                variant="secondary" 
                onClick={handleGetSuggestions}
                disabled={loadingAi}
              >
                {loadingAi ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                Find Best Matches
              </Button>
            </div>
            {aiSuggestions ? (
              <div className="prose prose-sm max-w-none bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2 mb-4 text-wera-cyan">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-xs">AI Recommendations</span>
                </div>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {aiSuggestions}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Click the button above to let AI find the best jobs for your skills.</p>
              </div>
            )}
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-bold mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Plumbing', 'Pipe Fitting', 'Emergency Repairs', 'Leak Detection'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-wera-cyan/10 text-wera-cyan text-xs font-bold rounded-full">
                    {skill}
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-400 text-xs font-bold rounded-full hover:border-wera-cyan hover:text-wera-cyan transition-colors">
                  + Add Skill
                </button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-4">Earnings Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-500">This Month</span>
                  <span className="text-2xl font-bold text-wera-green">KES 42,500</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-wera-green h-full w-[70%]" />
                </div>
                <p className="text-[10px] text-gray-400">70% of your monthly goal reached.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const HireTalentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    location: ''
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

      <Card className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex justify-between mb-8">
              {[1, 2].map((s) => (
                <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'wera-gradient' : 'bg-gray-100'}`} />
              ))}
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">What do you need help with?</label>
              <Input 
                placeholder="e.g. Need a Plumber for kitchen renovation" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">Category</label>
              <select className="w-full p-2 border border-gray-200 rounded-lg focus:ring-wera-cyan">
                <option>Construction & Trades</option>
                <option>Domestic & Home Care</option>
                <option>Creative & Digital</option>
                <option>IT & Technical</option>
                <option>Contract & Temp Staffing</option>
              </select>
            </div>
            <Button onClick={() => setStep(2)} className="w-full py-6 text-lg font-bold" variant="secondary">
              Next: Details & Budget
            </Button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handlePostJob} className="space-y-6">
            <div className="flex justify-between mb-8">
              {[1, 2].map((s) => (
                <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'wera-gradient' : 'bg-gray-100'}`} />
              ))}
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold">Describe the job</label>
              <textarea 
                className="w-full p-4 border border-gray-200 rounded-xl min-h-[150px] focus:ring-wera-cyan"
                placeholder="Provide details about the work, requirements, and timeline..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold">Budget (KES)</label>
                <Input type="number" placeholder="2500" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold">Location</label>
                <Input placeholder="e.g. Westlands, Nairobi" />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button type="submit" variant="secondary" className="flex-1 font-bold">Post Opportunity</Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-wera-green/10 text-wera-green rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold">Opportunity Posted!</h2>
            <p className="text-gray-600">Your job is now live on the marketplace. Would you like to secure the payment now via M-Pesa?</p>
            <div className="pt-6 space-y-3">
              <Button variant="secondary" className="w-full py-4 font-bold">Pay with M-Pesa</Button>
              <Link to="/jobs" className="block text-sm text-wera-cyan font-bold hover:underline">View in Marketplace</Link>
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
          <Card className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Company Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Company Name</label>
                    <Input placeholder="e.g. Wera Solutions Ltd" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Industry</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg focus:ring-wera-cyan">
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
                  <Input placeholder="PVT-XXXXXX" />
                </div>
                <Button onClick={() => setStep(2)} className="w-full py-4 font-bold" variant="secondary">Next Step</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Recruitment Needs</h2>
                <div className="space-y-4">
                  <label className="block text-sm font-bold">What type of workers are you looking for?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Temp Staff', 'Contractors', 'Day Laborers', 'Specialized Pros'].map((type) => (
                      <label key={type} className="flex items-center p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input type="checkbox" className="mr-3 text-wera-cyan" />
                        <span className="text-sm font-medium">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Estimated Monthly Hires</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg focus:ring-wera-cyan">
                    <option>1-5 workers</option>
                    <option>5-20 workers</option>
                    <option>20-50 workers</option>
                    <option>50+ workers</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={() => setStep(3)} variant="secondary" className="flex-1 font-bold">Complete Setup</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-wera-green/10 text-wera-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold">Application Received!</h2>
                <p className="text-gray-600">Our B2B team will review your company details and verify your registration within 24 hours.</p>
                <Button onClick={() => navigate('/')} className="w-full py-4 font-bold" variant="secondary">Go to Dashboard</Button>
              </div>
            )}
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 bg-wera-cyan/5 border-wera-cyan/20">
            <h3 className="font-bold mb-4">Why Wera for Business?</h3>
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
    <Card className="p-8 border-wera-cyan/30 bg-wera-cyan/5">
      {step === 'intro' && (
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-wera-cyan/10 text-wera-cyan rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">AI Soft Skills Certification</h2>
          <p className="text-gray-600 max-w-md mx-auto">
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

const TrainingPage = () => {
  const [modules, setModules] = useState([
    { id: 1, title: 'Professionalism & Ethics', completed: true, icon: Shield },
    { id: 2, title: 'Customer Service Excellence', completed: false, icon: MessageSquare },
    { id: 3, title: 'Financial Literacy & Savings', completed: false, icon: TrendingUp },
    { id: 4, title: 'Health & Safety at Work', completed: false, icon: Zap },
  ]);
  const [aiCertified, setAiCertified] = useState(false);

  const progress = ((modules.filter(m => m.completed).length + (aiCertified ? 1 : 0)) / (modules.length + 1)) * 100;

  const toggleModule = (id: number) => {
    setModules(modules.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">WÈRA <span className="wera-text-gradient">Academy</span></h1>
        <p className="text-gray-600">Complete all modules and AI certification to become a Certified Wera Worker.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-wera-cyan" /> AI Certification
            </h2>
            <AISoftSkillsAssessment onComplete={() => setAiCertified(true)} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Standard Modules</h2>
            <div className="space-y-4">
              {modules.map((mod) => (
                <Card key={mod.id} className={cn(
                  "p-6 flex items-center justify-between transition-all",
                  mod.completed ? "border-wera-green/30 bg-wera-green/5" : "border-gray-100"
                )}>
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      mod.completed ? "bg-wera-green text-white" : "bg-gray-100 text-gray-400"
                    )}>
                      <mod.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{mod.title}</h3>
                      <p className="text-xs text-gray-500">{mod.completed ? 'Completed' : '45 mins • Video & Quiz'}</p>
                    </div>
                  </div>
                  <Button 
                    variant={mod.completed ? "ghost" : "secondary"} 
                    size="sm"
                    onClick={() => toggleModule(mod.id)}
                  >
                    {mod.completed ? <CheckCircle className="w-5 h-5 text-wera-green" /> : 'Start Module'}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="p-6 sticky top-24 border-wera-cyan/20">
            <h3 className="font-bold mb-6">Certification Progress</h3>
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-wera-cyan" strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text x="18" y="20.35" className="text-[8px] font-bold fill-wera-black" textAnchor="middle">{Math.round(progress)}%</text>
              </svg>
            </div>
            
            {progress === 100 ? (
              <div className="text-center space-y-4">
                <div className="bg-wera-green/10 text-wera-green p-3 rounded-lg text-xs font-bold">
                  🎉 CONGRATULATIONS! YOU ARE FULLY CERTIFIED
                </div>
                <Button className="w-full bg-wera-black text-white font-bold">Download Certificate</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-gray-500 text-center">
                  Complete all modules and the AI assessment to unlock your WÈRA Certified Badge.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>AI CERTIFICATION</span>
                    <span className={aiCertified ? "text-wera-green" : "text-gray-400"}>{aiCertified ? 'DONE' : 'PENDING'}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>MODULES</span>
                    <span>{modules.filter(m => m.completed).length}/{modules.length}</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

import { aiService } from './lib/ai';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/hire" element={<HireTalentPage />} />
            <Route path="/academy" element={<TrainingPage />} />
            <Route path="/companies" element={<CompanyOnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<WorkerProfilePage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <footer className="bg-wera-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <Logo className="w-12 h-12" isDark={true} />
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
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
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
