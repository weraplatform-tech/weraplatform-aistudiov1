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
  ChevronRight
} from 'lucide-react';
import { Button, Card, Input, cn } from './components/ui';
import { supabase, type Profile, type Job } from './lib/supabase';

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
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg">
              <img 
                src="/logo.png" 
                alt="Wera Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 wera-gradient items-center justify-center text-white font-bold text-xl">
                W
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:wera-text-gradient transition-all">WÈRA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-sm font-medium hover:text-wera-cyan transition-colors">Find Work</Link>
            <Link to="/hire" className="text-sm font-medium hover:text-wera-cyan transition-colors">Hire Talent</Link>
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
                Kenya's Premier <span className="wera-text-gradient">Labour Platform</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Connecting skilled and semi-skilled workers with formal job opportunities. 
                Empowering the informal sector through technology, vetting, and fair labor practices.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">
                  I want to Work
                </Button>
                <Button variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg">
                  I want to Hire
                </Button>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Workers', value: '50K+' },
              { label: 'Jobs Completed', value: '120K+' },
              { label: 'Trust Rating', value: '4.9/5' },
              { label: 'Counties Covered', value: '47' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-wera-black mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Wera?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building more than just a marketplace. We're building a sustainable ecosystem for the future of work in Kenya.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stringent Vetting',
                desc: 'Every worker undergoes a rigorous verification process to ensure quality and safety.',
                icon: Shield,
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
                Join thousands of workers and employers already using Wera to build a better future.
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      // In a real app, fetch from Supabase
      // Mocking for now
      const mockJobs: Job[] = [
        { id: '1', title: 'Professional Plumber Needed', description: 'Fix leaking tap in Westlands', category: 'Construction', budget: 2500, status: 'open', location: 'Nairobi, Westlands', client_id: 'c1', created_at: new Date().toISOString() },
        { id: '2', title: 'Experienced Nanny for Toddler', description: 'Full time nanny needed for 2 year old', category: 'Domestic', budget: 15000, status: 'open', location: 'Mombasa, Nyali', client_id: 'c2', created_at: new Date().toISOString() },
        { id: '3', title: 'Graphic Designer for Logo', description: 'Create a modern logo for a new startup', category: 'Creative', budget: 5000, status: 'open', location: 'Remote', client_id: 'c3', created_at: new Date().toISOString() },
      ];
      setJobs(mockJobs);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Available Opportunities</h1>
          <p className="text-gray-600">Find the perfect job that matches your skills.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Input placeholder="Search jobs..." className="max-w-xs" />
          <Button variant="primary"><Search className="w-4 h-4 mr-2" /> Search</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1 space-y-8">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              {['Construction', 'Domestic', 'Creative', 'IT & Tech', 'Skilled Trades'].map((cat) => (
                <label key={cat} className="flex items-center space-x-2 cursor-pointer hover:text-wera-cyan transition-colors">
                  <input type="checkbox" className="rounded border-gray-300 text-wera-cyan focus:ring-wera-cyan" />
                  <span className="text-sm font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-bold mb-4">Budget Range</h3>
            <div className="space-y-4">
              <input type="range" className="w-full accent-wera-cyan" />
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>KES 500</span>
                <span>KES 50,000+</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="md:col-span-2 space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wera-cyan"></div>
            </div>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="p-6 hover:border-wera-cyan transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded mb-2">
                      {job.category}
                    </span>
                    <h3 className="text-xl font-bold group-hover:text-wera-cyan transition-colors">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-wera-green">KES {job.budget.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Fixed Price</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {job.description || "Looking for a qualified professional to assist with this project. Requirements include reliability and attention to detail."}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {job.location}</span>
                    <span className="flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> 5 Proposals</span>
                  </div>
                  <Button variant="outline" size="sm">View Details <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/');
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
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<WorkerProfilePage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <footer className="bg-wera-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg bg-white/10 p-1">
                    <img 
                      src="/logo.png" 
                      alt="Wera Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 wera-gradient items-center justify-center text-white font-bold text-xl">
                      W
                    </div>
                  </div>
                  <span className="text-xl font-bold tracking-tight">WÈRA</span>
                </div>
                <p className="text-gray-400 max-w-sm mb-6">
                  Unlocking potential across Kenya by connecting skilled workers with meaningful opportunities. 
                  Building a trusted ecosystem for the future of work.
                </p>
                <div className="flex space-x-4">
                  {/* Social icons would go here */}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6">Platform</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><Link to="/jobs" className="hover:text-white transition-colors">Find Work</Link></li>
                  <li><Link to="/hire" className="hover:text-white transition-colors">Hire Talent</Link></li>
                  <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                  <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
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
