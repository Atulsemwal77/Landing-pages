import React, { useState, useRef } from "react";
import {
  Rocket,
  Lock,
  CheckCircle,
  Calendar,
  Phone,
  Star,
  Mail,
  Instagram,
  Facebook,
  Send,
  ArrowRight,
  Users,
  FileText,
  Bell,
  X,
} from "lucide-react";
import banner from "../assets/banner1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const initialFormData = {
  name: "",
  num: "",
  email: "",
  education: "",
  location: "",
  interest: "",
};

const GovtLandingPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const formSectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  // 👉 URL of your file (public folder or Google Docs export)
  const fileUrl = "/weeky_report_formet.docx";
  // const fileUrl = "https://docs.google.com/document/d/1EW9S14bTu6zY871uDsaf-HxjrA2p-dl7YUcLsVMQvG4/export?format=docx";

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
        `${import.meta.env.VITE_BACKEND}/api/students`,
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
    <div className="bg-blue-50 p-4 rounded-xl inline-block mx-4 shrink-0 hover:shadow-lg transition-shadow">
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

  const Step = ({ number, title }) => (
    <div className="flex-1 min-w-[120px] flex flex-col items-center text-center">
      <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg hover:shadow-xl transition-shadow">
        <span className="text-3xl font-bold text-white">{number}</span>
      </div>
      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-800">{title}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="relative w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-white space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Rocket className="w-4 h-4" />
              100% Free Job Alerts
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Get Daily Sarkari Job Alerts Before Anyone Else
            </h1>

            <p className="text-lg md:text-xl text-gray-200">
              Stay updated with the latest government job notifications &
              interviews –
              <span className="text-orange-400 font-bold"> 11,000+ </span>
              candidates helped across India.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  formSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail className="w-5 h-5" /> Get Free Job Alerts Now
              </button>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <Lock className="text-green-400 w-5 h-5" />
                <span className="text-green-300 font-medium">100% Secure</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">1L+</div>
                <div className="text-sm text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">500+</div>
                <div className="text-sm text-gray-300">Job Notifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form and Features Section */}
      <div
        ref={formSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Start Getting Verified Job Alerts Daily
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 transition"
                />
                <input
                  type="text"
                  name="education"
                  placeholder="Qualification / Education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 transition"
                />
                <input
                  type="tel"
                  name="num"
                  placeholder="Phone / WhatsApp Number"
                  value={formData.num}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 transition"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="location"
                  placeholder="Location (City / State)"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 transition"
                />
                <textarea
                  type="text"
                  name="interest"
                  placeholder="Message"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Sending..." : "Submit"}
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                <Lock className="text-green-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>
                  No spam. Only official job updates — freshly delivered to your
                  inbox daily.
                </p>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              {successMsg && (
                <div className="text-green-600 text-sm">{successMsg}</div>
              )}
            </form>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Why 1 Lakh+ Students Trust Us
              </h2>
              <p className="text-gray-600">
                Join thousands of successful candidates who got their dream
                government jobs
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow border border-green-200">
                <div className="p-3 bg-green-500 rounded-lg">
                  <CheckCircle className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">
                    Verified Sarkari Job Updates
                  </h3>
                  <p className="text-sm text-gray-600">
                    Direct from official government websites - 100% authentic
                    notifications
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow border border-blue-200">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Calendar className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">
                    Admit Card, Result & Cutoff
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get instant notifications for important dates and results
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow border border-green-200">
                <div className="p-3 bg-green-500 rounded-lg">
                  <Phone className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">
                    WhatsApp + Email Alerts
                  </h3>
                  <p className="text-sm text-gray-600">
                    Never miss an update with dual notification system
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow border border-yellow-200">
                <div className="p-3 bg-yellow-500 rounded-lg">
                  <Star className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">
                    100% Free & Easy to Use
                  </h3>
                  <p className="text-sm text-gray-600">
                    Free resume builder and preparation resources included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Testimonials Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Success Stories from Our Aspirants
            </h2>
            <p className="text-gray-600 text-lg">
              Real students, real results, real success
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-blue-50 to-transparent"></div>
            <div className="flex animate-marquee pt-10 pb-5">
              {[...testimonials, ...testimonials].map((card, index) => (
                <TestimonialCard key={`${card.id}-${index}`} card={card} />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Students Get Results — You Can Too!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Users className="w-4 h-4" />
                Join Our Community
              </div>
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                1,00,000+
              </div>
              <p className="text-xl md:text-2xl font-semibold text-gray-800">
                Students Successfully Placed
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Free PDF Preparation Planner
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Weekly Schedule Templates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Study Material & Tips</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur-2xl opacity-30"></div>

                <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                  <FileText className="w-20 h-20 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                    Free Resources
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    Get access to premium study materials
                  </p>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full block bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-center transition cursor-pointer"
                  >
                    Download Now
                  </button>
                </div>

                {/* Modal / Popup */}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Start receiving job alerts in just three simple steps
            </p>
          </div>

          <div className="relative mb-12">
            <div className="hidden md:block absolute left-1/4 right-1/4 top-10 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-full"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
              <Step number="1" title="Sign up for Free" />
              <Step number="2" title="Choose Your Exam" />
              <Step number="3" title="Get Daily Alerts" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* <button className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Send className="w-5 h-5" />
              Send Me Alerts
            </button> */}
            <button
              onClick={() => {
                formSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
            >
              <Send className="w-5 h-5" />
              Send Me Alerts
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4 text-green-500" />
              <span>100% Secure & Spam-free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-12">
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
              <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center md:justify-start gap-2 transition mx-auto md:mx-0">
                <Mail className="w-4 h-4" /> Subscribe
              </button>
            </div>
          </div>

          {/* Bottom line */}
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Sarkari Parikha. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
  );
};

export default GovtLandingPage;
