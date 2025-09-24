"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Modern%20minimalist%20office%20space%2C%20clean%20white%20walls%2C%20natural%20lighting%20streaming%20through%20large%20windows%2C%20elegant%20desk%20setup%20with%20plants%2C%20professional%20and%20welcoming%20atmosphere%20for%20customer%20service%20and%20business%20communication&width=1200&height=400&seq=contact-hero&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-serif mb-4">Contact Us</h1>
            <p className="text-xl text-stone-200">
              We&apos;d love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif text-stone-800 mb-6">
                  Get in Touch
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed">
                  Have questions about our products or need skincare advice? Our
                  team of experts is here to help you achieve your best skin.
                  Reach out to us through any of the channels below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-map-pin-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">
                      Visit Our Store
                    </h3>
                    <p className="text-stone-600">
                      123 Beauty Avenue
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-phone-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">Call Us</h3>
                    <p className="text-stone-600">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-mail-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">
                      Email Us
                    </h3>
                    <p className="text-stone-600">
                      hello@beautybrand.com
                      <br />
                      support@beautybrand.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-stone-100 rounded-full">
                    <i className="ri-time-line text-xl text-stone-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-800 mb-1">
                      Store Hours
                    </h3>
                    <p className="text-stone-600">
                      Monday - Friday: 10AM - 8PM
                      <br />
                      Saturday - Sunday: 10AM - 6PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-medium text-stone-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <button className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors cursor-pointer">
                    <i className="ri-instagram-line"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors cursor-pointer">
                    <i className="ri-facebook-fill"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors cursor-pointer">
                    <i className="ri-twitter-fill"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors cursor-pointer">
                    <i className="ri-youtube-fill"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-stone-50 p-8 rounded-lg">
              <h2 className="text-2xl font-serif text-stone-800 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-stone-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-colors text-sm resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  <p className="text-xs text-stone-500 mt-1">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
