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
  Heart
} from 'lucide-react';
import { Button, Card, Input, cn } from './components/ui';
import { supabase, type Profile, type Job } from './lib/supabase';
import { aiService } from './lib/ai';

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
    <nav className="sticky top-0 z-50 bg-yellow-50/80 backdrop-blur-md border-b border-yellow-300/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center group">
            <Logo iconSize="w-12 h-12" />
            <div className="ml-8 hidden lg:flex flex-col border-l-2 border-wera-green/30 pl-4">
              <div className="flex items-center mb-0.5">
                <div className="w-2 h-2 bg-wera-green rounded-full animate-pulse mr-2" />
                <span className="text-[10px] font-black text-wera-green uppercase tracking-tighter">Platform Live</span>
              </div>
              <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest leading-none">weraplatform.dedyn.io</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-sm font-medium hover:underline transition-all text-black">Find Wera Work</Link>
            <Link to="/hire" className="text-sm font-medium hover:underline transition-all text-black">Hire Wera Workers</Link>
            <Link to="/academy" className="text-sm font-medium hover:underline transition-all text-black">Academy</Link>
            <Link to="/verify" className="text-sm font-medium hover:underline transition-all text-black">Verify</Link>
            <a href="#about" className="text-sm font-medium hover:underline transition-all text-black">About Us</a>
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
            className="md:hidden bg-yellow-50 border-b border-black/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/jobs" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Find Work</Link>
              <Link to="/hire" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Hire Talent</Link>
              <Link to="/academy" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/10 text-black">Academy</Link>
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

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Trust & Escrow Banner */}
      <div className="bg-wera-black text-white py-3 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center relative z-10">
          <span className="flex items-center text-xs font-bold tracking-wide">
            <Shield className="w-4 h-4 mr-2 text-wera-green" /> 100% SECURE PAYMENTS VIA M-PESA ESCROW
          </span>
          <div className="hidden sm:block w-px h-4 bg-yellow-50/20" />
          <span className="text-[10px] opacity-70 uppercase tracking-widest">Money is only released when you approve the work</span>
          <div className="hidden lg:flex items-center ml-8 px-3 py-1 bg-wera-green/20 rounded-full border border-wera-green/30">
            <div className="w-2 h-2 bg-wera-green rounded-full animate-pulse mr-2" />
            <span className="text-[10px] font-black text-wera-green uppercase tracking-tighter">Live: weraplatform.dedyn.io</span>
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
                <Link to="/jobs">
                  <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                    I am a Wera Worker
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
                  <div className="w-full bg-yellow-50/10 h-2 rounded-full overflow-hidden">
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
        { id: '1', title: 'Professional Plumber Needed', description: 'Fix leaking tap in Westlands. Must have own tools.', category: 'Construction', budget: 2500, status: 'open', location: 'Nairobi, Westlands', client_id: 'c1', created_at: new Date().toISOString(), rating: 4.8, experience: 5, distance: 2.5, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
        { id: '2', title: 'Experienced Nanny for Toddler', description: 'Full time nanny needed for 2 year old. CPR certified preferred.', category: 'Domestic', budget: 15000, status: 'open', location: 'Mombasa, Nyali', client_id: 'c2', created_at: new Date().toISOString(), rating: 4.5, experience: 3, distance: 12.0, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
        { id: '3', title: 'Graphic Designer for Logo', description: 'Create a modern logo for a new startup. Quick turnaround.', category: 'Creative', budget: 5000, status: 'open', location: 'Remote', client_id: 'c3', created_at: new Date().toISOString(), rating: 4.9, experience: 7, distance: 0, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
        { id: '4', title: 'Electrical Wiring Expert', description: 'House rewiring project in Kilimani.', category: 'Skilled Trades', budget: 35000, status: 'open', location: 'Nairobi, Kilimani', client_id: 'c4', created_at: new Date().toISOString(), rating: 4.2, experience: 10, distance: 4.8, requires_ai_certification: true, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
        { id: '5', title: 'House Cleaning Service', description: 'Weekly cleaning for a 3-bedroom apartment.', category: 'Domestic', budget: 1200, status: 'open', location: 'Nairobi, South B', client_id: 'c5', created_at: new Date().toISOString(), rating: 3.8, experience: 2, distance: 8.2, requires_ai_certification: false, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
        { id: '6', title: 'Corporate Event Coordinator', description: 'Manage a large corporate launch event. High professionalism required.', category: 'Creative', budget: 50000, status: 'open', location: 'Nairobi, CBD', client_id: 'c6', created_at: new Date().toISOString(), rating: 5.0, experience: 8, distance: 1.2, requires_ai_certification: true, scheduled_at: null, is_for_others: false, recipient_name: null, recipient_phone: null, arrival_status: 'none' },
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
            <div className="text-center py-20 bg-yellow-50/20 rounded-2xl border-2 border-dashed border-yellow-300/30">
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
          <Card className="p-6 text-center border-black">
            <div className="w-24 h-24 rounded-full bg-black/10 mx-auto mb-4 overflow-hidden border-4 border-black/20">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=worker1" alt="Profile" />
            </div>
            <h2 className="text-xl font-bold text-black">John Kamau</h2>
            <p className="text-sm text-black/60 mb-4">Professional Plumber</p>
            <div className="flex justify-center space-x-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-black text-black" />)}
            </div>
            
            {/* Vetting Status */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center text-[10px] font-bold text-black bg-black/10 py-1.5 rounded-full">
                <Shield className="w-3 h-3 mr-1.5" /> POLICE CLEARED (GOOD CONDUCT)
              </div>
              <div className="flex items-center justify-center text-[10px] font-bold text-black bg-black/10 py-1.5 rounded-full">
                <Zap className="w-3 h-3 mr-1.5" /> SOFT SKILLS CERTIFIED
              </div>
            </div>

            <Button variant="outline" className="w-full mb-2">Edit Profile</Button>
            <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">Logout</Button>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          <Card className="p-8 border-black">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black">AI Job Matcher</h3>
              <Button 
                variant="primary" 
                onClick={handleGetSuggestions}
                disabled={loadingAi}
              >
                {loadingAi ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                Find Best Matches
              </Button>
            </div>
            {aiSuggestions ? (
              <div className="prose prose-sm max-w-none bg-black/10 p-6 rounded-xl border border-black/20">
                <div className="flex items-center space-x-2 mb-4 text-black">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-xs">AI Recommendations</span>
                </div>
                <div className="whitespace-pre-wrap text-black/80 leading-relaxed">
                  {aiSuggestions}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-black/20 rounded-xl">
                <Briefcase className="w-12 h-12 text-black/30 mx-auto mb-4" />
                <p className="text-black/60">Click the button above to let AI find the best jobs for your skills.</p>
              </div>
            )}
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-black">
              <h3 className="font-bold mb-4 text-black">My Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Plumbing', 'Pipe Fitting', 'Emergency Repairs', 'Leak Detection'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-black/10 text-black text-xs font-bold rounded-full">
                    {skill}
                  </span>
                ))}
                <button className="px-3 py-1 border border-dashed border-black/30 text-black/40 text-xs font-bold rounded-full hover:border-black hover:text-black transition-colors">
                  + Add Skill
                </button>
              </div>
            </Card>
            <Card className="p-6 border-black">
              <h3 className="font-bold mb-4 text-black">Earnings Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-black/60">This Month</span>
                  <span className="text-2xl font-bold text-black">KES 42,500</span>
                </div>
                <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-black h-full w-[70%]" />
                </div>
                <p className="text-[10px] text-black/60">70% of your monthly goal reached.</p>
              </div>
            </Card>
          </div>

          {/* Scheduler & Proximity Alert */}
          <div className="grid md:grid-cols-1 gap-8">
            <Card className="p-8 border-black">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-black rounded-lg text-wera-green">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Job Scheduler</h3>
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-black/10 text-black text-[10px] font-bold rounded-full uppercase">Upcoming</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { id: 1, title: 'Kitchen Sink Repair', time: 'Today, 2:00 PM', location: 'Westlands', status: 'on_way' },
                  { id: 2, title: 'Bathroom Installation', time: 'Tomorrow, 9:00 AM', location: 'Kilimani', status: 'none' },
                ].map((job) => (
                  <div key={job.id} className="p-4 border border-black/10 rounded-xl hover:bg-black/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center text-black">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-black">{job.title}</h4>
                          <div className="flex items-center space-x-3 text-xs text-black/60">
                            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {job.time}</span>
                            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {job.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {job.status === 'on_way' ? (
                          <Button variant="primary" size="sm" className="bg-wera-green text-black hover:bg-yellow-50 border-black">
                            <BellRing className="w-4 h-4 mr-2" /> Mark as Arrived
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="border-black text-black">
                            Start Journey
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {job.status === 'on_way' && (
                      <div className="mt-4 p-3 bg-wera-green/10 border border-wera-green/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center text-xs font-bold text-black">
                          <Zap className="w-4 h-4 mr-2 animate-pulse" /> PROXIMITY ALERT: Client has been notified you are nearby.
                        </div>
                        <span className="text-[10px] text-black/60">2.5km away</span>
                      </div>
                    )}
                  </div>
                ))}
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
    category: 'Construction & Trades',
    description: '',
    budget: '',
    location: '',
    scheduled_at: '',
    is_for_others: false,
    recipient_name: '',
    recipient_phone: ''
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
                  <span className="text-sm font-bold text-wera-cyan">Bulk Hiring?</span>
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
              <textarea 
                className="w-full p-4 border border-black/20 rounded-xl min-h-[150px] focus:ring-black bg-yellow-50/50"
                placeholder="Provide details about the work, requirements, and timeline..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold">Budget (KES)</label>
                <Input type="number" placeholder="2500" className="bg-yellow-50/50 border-black/20" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold">Location</label>
                <Input placeholder="e.g. Westlands, Nairobi" className="bg-yellow-50/50 border-black/20" />
              </div>
            </div>
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

  const quizQuestions = [
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
                  {[
                    { title: 'Introduction to the Topic', duration: '2:30' },
                    { title: 'Key Principles & Frameworks', duration: '5:45' },
                    { title: 'Real-world Case Studies', duration: '4:15' },
                    { title: 'Summary & Key Takeaways', duration: '1:15' },
                  ].map((lesson, i) => (
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
    { id: 1, title: 'Professionalism & Ethics', completed: true, icon: Shield, desc: 'Master the core values of integrity and professional conduct in the workplace.' },
    { id: 2, title: 'Customer Service Excellence', completed: false, icon: MessageSquare, desc: 'Learn how to exceed client expectations and build lasting professional relationships.' },
    { id: 3, title: 'Financial Literacy & Savings', completed: false, icon: TrendingUp, desc: 'Smart money management strategies for independent workers and entrepreneurs.' },
    { id: 4, title: 'Health & Safety at Work', completed: false, icon: Zap, desc: 'Essential protocols to ensure your safety and the safety of your clients.' },
    { id: 5, title: 'Digital Literacy for Workers', completed: false, icon: Sparkles, desc: 'Using technology to manage your bookings, payments, and professional profile.' },
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
            <Route path="/verify" element={<CertificateVerificationPage />} />
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
