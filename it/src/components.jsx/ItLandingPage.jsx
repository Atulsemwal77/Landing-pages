import React, {useRef, useState } from 'react';
import { Code2, TrendingUp, Award, Zap, X, CheckCircle2, ArrowRight, Mail, Phone, Globe, Users, Clock, Building2, MapPin, Download, Star, Target, Rocket, Send, Facebook, Instagram } from 'lucide-react';
import axios from 'axios';

const initialFormData = {
  name: "",
  num: "",
  email: "",
  skill: "",
  bio: "",
  
};

export default function ItLandingPage() {
  
    
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState("");
  const formSectionRef = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


   const fileUrl = "/weeky_report_formet.docx";
   
   const validate = () => {
    const name = (formData.name || "").trim();
    const num = (formData.num || "").trim();
    const email = (formData.email || "").trim();

    if (!name) return "Name is required";
    if (!num) return "Phone number is required";
    if (!email) return "Email is required";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) return "Email is invalid";

    const inPhoneWithPrefix = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!inPhoneWithPrefix.test(num)) return "Phone number is invalid";

    return null;
  };

  const submitStudent = async (source) => {
    setError("");
    setSuccessMsg("");

    const v = validate();
    if (v) {
      setError(v);
      return false;
    }

    try {
      setLoading(true);
      const payload = { ...formData, source }; // 👈 same API, different source
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/itstudent`,
        payload
      );
      setSuccessMsg("Saved successfully");
      setStudents((prev) => [res.data.data, ...prev]);
      setTimeout(() => setSuccessMsg(""), 3000);
      setShowThankYou(true);
      return true;
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to save";
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }; 

    const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "weekly_report_format.docx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submitStudent("job_alert_form");
    if (ok) {
      setFormData(initialFormData);
    }
  };

  const handleSubmitpdf = async (e) => {
    e.preventDefault();
    const ok = await submitStudent("pdf_download_popup");
    if (ok) {
      triggerDownload();
      setIsOpen(false);
      setFormData(initialFormData);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    const formSection = document.getElementById("lead-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const testimonials = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      description:
        "Thanks to daily job alerts, I never missed an application deadline. This site became my go-to for all UPSC updates",
      name: "Priya Sharma",
      role: "SSC CGL Selected",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      description:
        "I used to check multiple websites for SSC news. Now, I get every alert on time — admit cards, results, everything!",
      name: "Rahul Kumar",
      role: "Railway Recruitment",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
      description:
        "This platform saved me hours of scrolling. I get instant railway job alerts directly on my phone.",
      name: "Anjali Verma",
      role: "UPSC Aspirant",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      description:
        "This website keeps everything so simple. I got my SSC updates faster than any other source online.",
      name: "Aryan Singh",
      role: "Banking Sector",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      description:
        "This website keeps everything so simple. I got my SSC updates faster than any other source online.",
      name: "Aryan Singh",
      role: "Banking Sector",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      description:
        "This website keeps everything so simple. I got my SSC updates faster than any other source online.",
      name: "Aryan Singh",
      role: "Banking Sector",
    },
  ];

  const TestimonialCard = ({ card }) => (
    <div className=" p-4 rounded-xl inline-block mx-4 shrink-0 rounded-2xl border border-slate-800 bg-slate-900/60  hover:bg-slate-900 hover:border-sky-500/50 transition-all ">
      <div className="max-w-[20rem] text-white">
        {/* <div className="border border-gray-200 pb-6 rounded-lg bg-white shadow-sm relative"> */}
          <p className=" px-6 text-center pt-8 text-sm leading-relaxed">
            "{card.description}"
          </p>
          <h3 className="text-sm font-semibold  pt-3 text-center">
            {card.name}
          </h3>
          <p className=" text-xs text-slate-400 text-center">{card.role}</p>
        </div>
      </div>
    
  );


  return (
    <>
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Enhanced Navbar */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center text-slate-950 text-xl font-bold shadow-lg shadow-sky-500/30">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg block">ITJobs Portal</span>
              <span className="text-xs text-slate-400">Your Tech Career Starts Here</span>
            </div>
          </div>
          <button
            onClick={scrollToForm}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-500/50 px-5 py-2.5 text-sm font-medium text-sky-100 hover:bg-sky-500 hover:text-slate-950 hover:scale-105 transition-all shadow-lg shadow-sky-500/20"
          >
            <Rocket className="w-4 h-4" />
            Get Job Alerts
          </button>
        </header>

        {/* HERO + FORM */}
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
          {/* Enhanced Hero text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500/20 to-emerald-400/20 px-4 py-2 text-xs font-semibold text-sky-300 border border-sky-500/40 mb-6 animate-pulse shadow-lg shadow-sky-500/10">
              <Zap className="w-3.5 h-3.5" />
              <span>50,000+ Students Trust Us</span>
              <span className="text-emerald-300">• Live Jobs</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-50 mb-6 leading-tight">
              Find Your First{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">IT Job or Internship</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              Join <span className="font-bold text-sky-400">50,000+</span> IT students & professionals getting verified tech jobs, internships, and placement alerts — all in one place.
            </p>

            {/* Enhanced Visual Dashboard */}
            <div className="relative mb-10">
              <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-2xl shadow-sky-500/10 hover:shadow-sky-500/20 transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-slate-300">Live Dashboard</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Companies
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700/50 p-4 hover:border-sky-500/50 transition-all group">
                    <Building2 className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-xs mb-1">Open Roles</p>
                    <p className="text-2xl font-bold text-sky-400">320+</p>
                    <p className="text-xs text-slate-500 mt-1">Fresher & Intern</p>
                  </div>
                  
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700/50 p-4 hover:border-emerald-500/50 transition-all group">
                    <Clock className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-xs mb-1">Avg. Response</p>
                    <p className="text-2xl font-bold text-emerald-400">7 days</p>
                    <p className="text-xs text-slate-500 mt-1">From companies</p>
                  </div>
                  
                  <div className="rounded-2xl bg-slate-950/70 border border-slate-700/50 p-4 hover:border-amber-500/50 transition-all group">
                    <MapPin className="w-5 h-5 text-amber-300 mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-slate-400 text-xs mb-1">Locations</p>
                    <p className="text-2xl font-bold text-amber-300">25+</p>
                    <p className="text-xs text-slate-500 mt-1">Cities + Remote</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-sky-500/50 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                Get Job Alerts Now
              </button>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free • No Spam</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Trusted by students from 500+ colleges across India
            </p>
          </div>

          {/* Enhanced Lead capture form */}
          <div
            id="lead-form"
            className="rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl shadow-sky-500/20 p-6 sm:p-8 backdrop-blur-xl hover:border-sky-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Start Your IT Career!</h2>
                <p className="text-xs text-sky-400">Join thousands of successful job seekers</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Get daily verified IT job & internship openings directly to your email and WhatsApp. No fake postings, just real opportunities.
            </p>

            {submitted && (
              <div className="mb-6 rounded-xl bg-emerald-500/20 border border-emerald-500/50 p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-300 font-semibold text-sm">Success! Welcome aboard! 🎉</p>
                  <p className="text-emerald-400/80 text-xs mt-1">Check your email for your first job opportunities.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-200 font-medium mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-4 py-3 outline-none text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-4 py-3 outline-none text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-2" htmlFor="whatsapp">
                  WhatsApp Number
                </label>
                <input
                  id="whatsapp"
                  name="num"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.num}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-4 py-3 outline-none text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all"
                  required
                />
              </div>

              

              <div>
                <label className="block text-slate-200 font-medium mb-2" htmlFor="name">
                  Skill
                </label>
                <input
                  id="skill"
                  name="skill"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.skill}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-4 py-3 outline-none text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-2" htmlFor="whatsapp">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  type="textarea"
                  placeholder="Enter Your Short Description"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-4 py-3 outline-none text-sm text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/50 transition-all"
                  required
                />
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              {successMsg && (
                <div className="text-green-600 text-sm">{successMsg}</div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 px-4 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/50 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                Submit
              </button>

              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No fake openings — only verified IT companies
              </p>
            </form>
          </div>
        </section> 

        {showThankYou && (
          <div className="fixed inset-0 bg-black/40 flex items-center  justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Thank You! 
              </h2>
              <p className="text-gray-600 text-sm mb-4 text-center">
                You&apos;re now subscribed to get verified Sarkari job alerts.
              </p>

              <p className="text-gray-700 text-sm mb-6 text-center">
                Join our WhatsApp group to get{" "}
                <span className="font-semibold">
                  faster updates, tips, and important notifications.
                </span>
              </p>

              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://chat.whatsapp.com/GZsFmFjaCXr1h7yMU7EZVJ?mode=hqrt1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  <Phone className="w-5 h-5" />
                  Join WhatsApp Group
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/nnhire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  <Send className="w-5 h-5" />
                  Join Telegram Group
                </a>
              </div>

              <button
                onClick={() => setShowThankYou(false)}
                className="mt-4 w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Maybe Later
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose Us</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              We focus only on genuine IT & tech roles so you don't waste time chasing fake or closed openings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: CheckCircle2, text: 'Verified Companies Only', color: 'emerald' },
              { icon: Building2, text: 'Internship + Full-Time Opportunities', color: 'blue' },
              { icon: Award, text: 'Resume Optimization Tips', color: 'purple' },
              { icon: Zap, text: 'Daily Job Updates via WhatsApp', color: 'yellow' },
              { icon: Globe, text: 'Remote & Office Roles Available', color: 'cyan' },
              { icon: Users, text: 'Fresher-Friendly & Entry-Level Roles', color: 'pink' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:bg-slate-900 hover:border-sky-500/50 transition-all group"
              >
                <item.icon className={`w-6 h-6 text-${item.color}-400 mb-3 group-hover:scale-110 transition-transform`} />
                <p className="text-slate-100 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced How it works */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-slate-400 text-sm">Simple 4-step process to land your dream job</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'Sign Up Free', desc: 'Share basic details in under 1 minute — no charges, no hidden fees.', icon: Users },
              { num: '02', title: 'Get Curated Job List', desc: 'Receive handpicked IT job & internship openings matching your profile.', icon: Target },
              { num: '03', title: 'Apply & Track', desc: 'Apply directly and keep track of what youve applied for in one place.', icon: TrendingUp },
              { num: '04', title: 'Get Hired Faster', desc: 'With better matching, resume tips & interview prep, you land roles faster.', icon: Award },
            ].map((step, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:bg-slate-900 hover:border-sky-500/50 transition-all relative group">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-sm shadow-lg">
                  {step.num}
                </div>
                <step.icon className="w-8 h-8 text-sky-400 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-slate-100 mb-2 text-lg">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-8 py-3.5 text-sm font-bold text-slate-950 hover:bg-white hover:scale-105 transition-all shadow-lg cursor-pointer"
            >
              Get Started — It's Free!
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        {/* Testimonials */}
        <section className="relative md:py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-4">
                Success Stories from{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Real Freelancers
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                See what our community has achieved
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/* <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-blue-50 to-transparent"></div> */}
              <div className="flex animate-marquee p-5">
                {[...testimonials, ...testimonials].map((card, index) => (
                  <TestimonialCard key={`${card.id}-${index}`} card={card} />
                ))}
              </div>
              {/* <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div> */}
            </div>
          </div>
        </section>

        {/* Enhanced Bonus Resource */}
        <section className="mb-16">
          <div className="rounded-3xl border border-sky-500/40 bg-gradient-to-br from-sky-500/20 to-emerald-400/20 p-8 sm:p-10 shadow-2xl shadow-sky-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-10 h-10 text-sky-400" />
              <h2 className="text-3xl sm:text-4xl font-bold">Bonus Free Resources</h2>
            </div>
            
            <p className="text-slate-200 text-base mb-6 max-w-2xl leading-relaxed">
              Get exclusive guides designed for freshers & IT job seekers. Boost your chances with the right companies and better preparation.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-100 font-semibold mb-1">Top 20 IT Companies Guide</p>
                  <p className="text-slate-400 text-sm">Companies hiring freshers in 2025</p>
                </div>
              </div>
              
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-100 font-semibold mb-1">Interview Prep Guide</p>
                  <p className="text-slate-400 text-sm">Tech + HR preparation material</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-sky-500/50 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Unlock My Free Guides
            </button>
          </div>
        </section>

         {isOpen && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        Get Your Free PDF
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        Please fill your details to download the resource.
                      </p>

                      <form onSubmit={handleSubmitpdf} className="space-y-4 text-black">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact No.
                          </label>
                          <input
                            type="tel"
                            name="num"
                            value={formData.num}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your contact number"
                          />
                        </div>

                        {error && (
                          <div className="text-red-600 text-sm">{error}</div>
                        )}
                        {successMsg && (
                          <div className="text-green-600 text-sm">
                            {successMsg}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full border border-slate-800 bg-slate-900/60 hover:bg-slate-600 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60 cursor-pointer"
                        >
                          {loading ? "Submitting..." : "Submit & Download"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

        {/* Enhanced Contact Footer */}
        {/* Footer */}
        <footer className="relative bg-slate-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8">
              {/* Brand */}
              <div className="text-center md:text-left md:max-w-xs">
                <h3 className="text-xl font-bold mb-4">Sarkari Parikha</h3>
                <p className="text-gray-300 text-sm">
                  Your trusted partner for government job notifications across
                  India.
                </p>
              </div>

              {/* Contact */}
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    <span>support@sarkariparikha.com</span>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+91 99765 42210</span>
                  </li>
                </ul>
              </div>

              {/* Social + Subscribe */}
              <div className="text-center md:text-left">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex justify-center md:justify-start gap-4">
                  <Instagram className="w-6 h-6 hover:text-orange-400 cursor-pointer transition" />
                  <Facebook className="w-6 h-6 hover:text-orange-400 cursor-pointer transition" />
                  <Send className="w-6 h-6 hover:text-orange-400 cursor-pointer transition" />
                </div>
                {/* <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center md:justify-start gap-2 transition mx-auto md:mx-0">
                <Mail className="w-4 h-4" /> Subscribe
              </button> */}
              </div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
              <p>© 2025 Sarkari Parikha. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
          display: flex;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* 🔥 Mobile View — Speed Up Animation */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 10s; /* Change speed for mobile */
          }
        }
      `}</style>
      </div>
    
   </> 
  );
}