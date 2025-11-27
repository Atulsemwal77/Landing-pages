import React, { useRef, useState } from "react";
import {
  Palette,
  FileText,
  Video,
  Share2,
  CheckCircle,
  Download,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  Briefcase,
  Shield,
  DollarSign,
  TrendingUp,
  Zap,
  Users,
  Award,
  Star,
  Sparkles,
  Instagram,
  Facebook,
  Send,
  X,
} from "lucide-react";
import axios from "axios";

const initialFormData = {
  name: "",
  num: "",
  email: "",
  skill: "",
  bio: "",
  
};

export default function Freelance() {
  
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
        `${import.meta.env.VITE_BACKEND}/api/freelancerStudent`,
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
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-4 rounded-xl inline-block mx-4 shrink-0 hover:shadow-lg transition-shadow">
      <div className="max-w-[20rem]">
        <div className="border border-gray-200 pb-6 rounded-lg bg-white shadow-sm relative">
          <p className="text-gray-600 px-6 text-center pt-8 text-sm leading-relaxed">
            "{card.description}"
          </p>
          <h3 className="text-sm font-semibold text-gray-800 pt-3 text-center">
            {card.name}
          </h3>
          <p className="text-gray-500 text-xs text-center">{card.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-slate-950 max-w-screen-2xl mx-auto">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-75"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150"></div>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-300">
                    For Creative Professionals
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="text-white">Turn Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Skills into Income
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Join the elite platform connecting{" "}
                  <span className="text-purple-400 font-semibold">
                    verified clients
                  </span>{" "}
                  with talented designers, writers, video editors, and social
                  media experts. Start earning today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span
                      onClick={() =>
                        formSectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                      className="relative flex items-center gap-2"
                    >
                      Start Freelancing Now{" "}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button className="border-2 border-slate-700 text-slate-300 px-8 py-5 rounded-xl font-bold text-lg hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    View Success Stories
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">
                      10K+
                    </div>
                    <div className="text-sm text-slate-400">
                      Active Freelancers
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">
                      ₹5Cr+
                    </div>
                    <div className="text-sm text-slate-400">Paid Out</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">
                      98%
                    </div>
                    <div className="text-sm text-slate-400">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              {/* <div className="relative lg:block hidden"> */}
              <div className="relative ">
                <div className="relative">
                  {/* Glassmorphism Card */}
                  <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Verified Platform
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        {
                          icon: Palette,
                          label: "Design",
                          color: "from-purple-500 to-pink-500",
                        },
                        {
                          icon: FileText,
                          label: "Writing",
                          color: "from-blue-500 to-cyan-500",
                        },
                        {
                          icon: Video,
                          label: "Video Editing",
                          color: "from-red-500 to-orange-500",
                        },
                        {
                          icon: Share2,
                          label: "Social Media",
                          color: "from-green-500 to-emerald-500",
                        },
                      ].map((skill, idx) => (
                        <div
                          key={idx}
                          className="group relative bg-slate-800/50 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300 border border-slate-700 hover:border-slate-600 cursor-pointer"
                        >
                          <div
                            className={`bg-gradient-to-br ${skill.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                          >
                            <skill.icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-white font-semibold">
                            {skill.label}
                          </p>
                          <div className="text-xs text-slate-400 mt-1">
                            500+ projects
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Activity */}
                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-300 text-sm font-semibold">
                          Live Activity
                        </span>
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Online
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-white text-sm">
                          🎨 New project: Brand Identity Design
                        </div>
                        <div className="text-slate-400 text-xs">
                          ₹25,000 • 2 minutes ago
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section className="relative py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 ">
          <div
            ref={formSectionRef}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full mb-6">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">
                  Join 10,000+ Freelancers
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                Get Projects That{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Match Your Skills
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                Fill out the form below and start receiving project
                opportunities within 24 hours
              </p>
            </div>

            <div
              ref={formSectionRef}
              className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl rounded-full"></div>

              <div className="relative space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="num"
                      value={formData.num}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-3">
                      Primary Skill 
                    </label>
                    <input
                      name="skill"
                      value={formData.skill}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    />
                    {/* <option>Design</option>
            <option>Writing</option>
            <option>Video Editing</option>
            <option>Social Media Management</option>
            <option>Other</option> */}
                  </div>
                </div>

                {/* Bio field (optional but in backend) */}
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-3">
                    Short Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Tell us a little about yourself and your experience"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Get Projects Now"}{" "}
                  <Briefcase className="w-5 h-5" />
                </button>

                {error && <div className="text-red-600 text-sm">{error}</div>}
              {successMsg && (
                <div className="text-green-600 text-sm">{successMsg}</div>
              )}

                <p className="text-center text-slate-500 text-sm">
                  🔒 Your information is 100% secure and will never be shared
                </p>
              </div>
            </div>
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
                Thank You! 🎉
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

        {/* Why Choose Us */}
        <section className="relative md:py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                Why{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  10,000+ Freelancers
                </span>{" "}
                Choose Us
              </h2>
              <p className="text-xl text-slate-400">
                Built by freelancers, for freelancers — with features that
                actually matter
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: Shield,
                  title: "Verified Clients Only",
                  desc: "Every client is background-checked and verified for your safety",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: DollarSign,
                  title: "Safe & Timely Payments",
                  desc: "Escrow protection and guaranteed payment within 48 hours",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  icon: Globe,
                  title: "Global + Indian Projects",
                  desc: "Access opportunities from 50+ countries worldwide",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: Palette,
                  title: "Free Portfolio Builder",
                  desc: "Create a stunning portfolio in minutes with AI assistance",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: TrendingUp,
                  title: "Daily Project Updates",
                  desc: "Get instant alerts for projects matching your skills",
                  gradient: "from-indigo-500 to-purple-500",
                },
                {
                  icon: Award,
                  title: "Premium Support",
                  desc: "24/7 dedicated support team to help you succeed",
                  gradient: "from-pink-500 to-rose-500",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:-translate-y-2"
                >
                  <div
                    className={`bg-gradient-to-br ${item.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative text-center">
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Ready to Start Your Freelance Journey?
                </h3>
                <p className="text-xl text-purple-100 mb-8">
                  Join today and get your first project within 24 hours —
                  guaranteed
                </p>
                <button
                  onClick={() => {
                    formSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="bg-white text-purple-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-100 transform hover:scale-105 transition-all shadow-xl"
                >
                  Create Free Account →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative md:py-24 py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                Start Earning in{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  4 Simple Steps
                </span>
              </h2>
              <p className="text-xl text-slate-400">
                From signup to your first payment — all in less than a week
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  num: "01",
                  title: "Register Free",
                  desc: "Create your account in under 2 minutes",
                  icon: Users,
                },
                {
                  num: "02",
                  title: "Build Portfolio",
                  desc: "Showcase your best work with our AI tools",
                  icon: Palette,
                },
                {
                  num: "03",
                  title: "Get Matched",
                  desc: "Receive projects that fit your skills perfectly",
                  icon: Zap,
                },
                {
                  num: "04",
                  title: "Start Earning",
                  desc: "Complete projects and get paid instantly",
                  icon: DollarSign,
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-5xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {step.num}
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-7.5 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-purple-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* Bonus Resources */}
        <section className="relative py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                🎁 Exclusive Free Resources
              </h2>
              <p className="text-xl text-purple-100">
                Premium guides to accelerate your freelance success
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Freelancer Pricing Guide 2025",
                  desc: "Learn proven strategies to price your services competitively and maximize your earnings. Includes industry benchmarks and negotiation tactics.",
                  icon: DollarSign,
                },
                {
                  title: "AI Tools for Freelancers",
                  desc: "Discover 30+ cutting-edge AI tools that can 10x your productivity, automate repetitive tasks, and help you win more clients.",
                  icon: Zap,
                },
              ].map((resource, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <resource.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {resource.title}
                  </h3>
                  <p className="text-purple-100 leading-relaxed mb-6">
                    {resource.desc}
                  </p>
                  <button onClick={() => setIsOpen(true)} className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all flex items-center gap-2 shadow-xl">
                    Download Free <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {isOpen && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        Get Your Free PDF
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        Please fill your details to download the resource.
                      </p>

                      <form onSubmit={handleSubmitpdf} className="space-y-4">
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
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
                        >
                          {loading ? "Submitting..." : "Submit & Download"}
                        </button>
                      </form>
                    </div>
                  </div>
                )}


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
    </>
  );
}
