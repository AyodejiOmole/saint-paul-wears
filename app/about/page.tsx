"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Award, Play, Pause, Volume2, VolumeX, ChevronDown, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeValue, setActiveValue] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef(null);

  const values = [
    {
      icon: Heart,
      title: "AUTHENTICITY",
      description: "We create genuine pieces that reflect real stories and authentic experiences.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Award,
      title: "QUALITY",
      description: "Premium materials and craftsmanship ensure every piece stands the test of time.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "COMMUNITY",
      description: "Building connections through shared values and meaningful conversations.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "IMPACT",
      description: "Creating positive change through conscious design and responsible practices.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const brandWords = ["AUTHENTIC", "BOLD", "CREATIVE", "DYNAMIC", "EXPRESSIVE", "FEARLESS"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % brandWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Floating Cursor Effect */}
      <div 
        // className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        // style={{
        //   left: `${mousePosition.x - 12}px`,
        //   top: `${mousePosition.y - 12}px`,
        // }}
      />

      {/* Hero Section - INSANE */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-black" />
          
          {/* Moving geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" 
             style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * -0.2}px)` }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-bounce" 
             style={{ transform: `translate(${scrollY * -0.2}px, ${scrollY * 0.1}px)` }} />
          </div>
          
          {/* Floating text elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl font-black text-red-500 transform -rotate-12 select-none animate-pulse">
          SAINT
        </div>
        <div className="absolute bottom-10 right-10 text-9xl font-black text-white transform rotate-12 select-none animate-pulse">
          PAUL
        </div>
        <div className="absolute top-1/2 left-0 text-6xl font-black text-red-500/30 transform -rotate-90 select-none">
          STREETWEAR
        </div>
        <div className="absolute top-1/2 right-0 text-6xl font-black text-white/30 transform rotate-90 select-none">
          FASHION
        </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
        {/* <Badge className="bg-red-600 text-white text-xl px-6 py-3 font-black tracking-widest animate-bounce">
          OUR STORY
        </Badge> */}
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none">
        <span className="block text-white mb-4">ABOUT</span>
        <span className="block text-red-500 mb-4 animate-pulse">SAINT</span>
        <span className="block text-white">PAUL</span>
          </h1>
          
          {/* Rotating Brand Words */}
          <div className="h-20 flex items-center justify-center mb-12">
        <div className="text-4xl md:text-6xl font-black text-red-400 transition-all duration-1000 transform">
          {brandWords[currentWordIndex]}
        </div>
          </div>
          
          <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
        Where fashion becomes a canvas for <span className="text-red-500 font-bold">meaningful expression</span>, 
        and every piece tells a story worth wearing.
          </p>

          <div className="animate-bounce">
        <ChevronDown className="w-12 h-12 mx-auto text-red-500" />
          </div>
        </div>
      </section>

      {/* Video Section - Interactive */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white">
              THE <span className="text-red-500">VISION</span>
            </h2>
          </div>
          
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <video 
              ref={videoRef}
              className="w-full h-96 md:h-[600px] object-cover"
              poster="/saint-model5.jpeg"
              muted={isMuted}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src="/behind-the-scenes.mp4" type="video/mp4" />
            </video>
            
            {/* Video Controls */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="flex space-x-6">
              <Button
                onClick={toggleVideo}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full w-20 h-20 transform hover:scale-110 transition-all duration-300 shadow-2xl"
              >
                {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
              
              <Button
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full w-16 h-16 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-8 left-8 bg-red-600 text-white px-4 py-2 font-black text-lg rounded-sm animate-pulse">
              BEHIND THE SCENES
            </div>
            </div>
        </div>
      </section>

      {/* Mission Section - Parallax & Interactive */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-gradient-to-br from-red-900/20 via-black to-purple-900/20"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="mb-8">
                <div className="text-red-500 text-xl font-black tracking-widest mb-4">MISSION STATEMENT</div>
                <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none">
                  <span className="block text-white">OUR</span>
                  <span className="block text-red-500">MISSION</span>
                </h2>
              </div>
              
              <div className="space-y-8 text-xl text-gray-300 leading-relaxed">
                <p className="transform hover:translate-x-4 transition-transform duration-300 hover:text-white">
                  At Saint Paul, we believe that clothing is more than fabric and thread—it's a 
                  <span className="text-red-500 font-bold"> medium for self-expression</span>, 
                  a statement of values, and a bridge between the wearer and the world.
                </p>
                
                <p className="transform hover:translate-x-4 transition-transform duration-300 hover:text-white">
                  Founded on the principle that <span className="text-yellow-500 font-bold">"the product is always the message,"</span> 
                  we create premium streetwear that speaks to the soul, challenges conventions, and empowers individuals 
                  to wear their truth boldly.
                </p>
              </div>
              
              <div className="mt-12">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-black tracking-wider transform hover:scale-110 transition-all duration-300 shadow-2xl">
                  <Link href="/shop">EXPLORE COLLECTION</Link>
                </Button>
              </div>
            </div>
            
            {/* Interactive 3D-style cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-black p-0 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Image
                      src="/saint-merch1.jpeg"
                      alt="Saint Merch 1"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-black p-0 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Image
                      src="/saint-merch2.jpeg"
                      alt="Saint Merch 2"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-black p-0 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Image
                      src="/saint-merch3.jpeg"
                      alt="Saint Merch 3"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-black p-0 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Image
                      src="/saint-model8.jpeg"
                      alt="Saint Merch 4"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Crazy Interactive */}
      {/* <section className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-black mb-8">
              <span className="text-white">OUR</span> <span className="text-red-500">VALUES</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Every decision we make is guided by these core principles that define who we are.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isActive = activeValue === index;
              
              return (
                <div
                  key={index}
                  className={`relative p-12 rounded-3xl border-2 transition-all duration-500 cursor-pointer transform ${
                    isActive 
                      ? `border-red-500 scale-105 bg-gradient-to-br ${value.color} shadow-2xl` 
                      : 'border-gray-800 bg-black hover:border-gray-600 hover:scale-102'
                  }`}
                  onClick={() => setActiveValue(index)}
                  onMouseEnter={() => setActiveValue(index)}
                >
                  <div className="relative z-10">
                    <Icon className={`h-16 w-16 mb-6 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-red-500'
                    }`} />
                    
                    <h3 className={`text-3xl font-black mb-4 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white'
                    }`}>
                      {value.title}
                    </h3>
                    
                    <p className={`text-lg leading-relaxed transition-all duration-300 ${
                      isActive ? 'text-white/90' : 'text-gray-400'
                    }`}>
                      {value.description}
                    </p>
                  </div>
                  
                  <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                    isActive ? 'opacity-20' : 'opacity-0'
                  } bg-gradient-to-br ${value.color}`} />
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Founder Section - Magazine Style */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 text-9xl font-black text-red-500 transform -rotate-45 select-none">
            FOUNDER
          </div>
          <div className="absolute bottom-0 right-0 text-9xl font-black text-white transform rotate-45 select-none">
            VISION
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden relative group">
                <Image
                  src="/saint-founder&model.jpeg"
                  alt="Saint Paul Founder"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-red-600 text-white px-4 py-2 font-black text-lg mb-4 inline-block">
                    FOUNDER & CREATIVE DIRECTOR
                  </div>
                </div> */}
              </div>
              
              {/* Floating elements */}
              {/* <div className="absolute -top-8 -right-8 bg-yellow-500 w-24 h-24 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-purple-600 w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xl">💎</span>
              </div> */}
            </div>
            
            <div>
              <Badge className="bg-red-600 text-white text-xl px-6 py-3 font-black tracking-widest mb-8">
                FOUNDER'S NOTE
              </Badge>
              
              <h2 className="text-5xl md:text-7xl font-black mb-12 leading-none">
                <span className="block text-white">A MESSAGE</span>
                <span className="block text-red-500">FROM OUR</span>
                <span className="block text-white">FOUNDER</span>
              </h2>
              
              <blockquote className="text-2xl text-gray-300 leading-relaxed mb-12 italic relative">
                <div className="text-6xl text-red-500 absolute -top-6 -left-6 font-black">"</div>
                Fashion has always been my language of choice. Through Saint Paul, I wanted to create more than just
                clothing—I wanted to build a platform where <span className="text-red-500 font-bold">style meets substance</span>, 
                where every thread carries intention, and where wearing our pieces means joining a 
                <span className="text-yellow-500 font-bold">movement of conscious expression</span>.
                <div className="text-6xl text-red-500 absolute -bottom-12 -right-6 font-black">"</div>
              </blockquote>
              
              <div className="bg-gradient-to-r from-red-600 to-purple-600 p-8 rounded-2xl">
                <p className="font-black text-2xl text-white">Ighedo Paul</p>
                <p className="text-white/80 text-lg">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - EXPLOSIVE */}
      <section className="py-32 bg-gradient-to-br from-red-600 via-purple-700 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-bounce" 
               style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white rounded-full animate-pulse" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-5 h-5 bg-red-300 rounded-full animate-bounce" 
               style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-black mb-12 leading-none text-white">
            <span className="block animate-pulse">JOIN THE</span>
            <span className="block text-yellow-500">MOVEMENT</span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-16 leading-relaxed max-w-4xl mx-auto">
            Ready to wear your message? Discover pieces that speak to your soul and connect with a community that
            values authenticity, quality, and meaningful expression.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Button className="bg-white text-black hover:bg-gray-200 px-16 py-8 text-2xl font-black tracking-wider transform hover:scale-110 transition-all duration-300 shadow-2xl">
              <Link href="/shop">SHOP COLLECTION</Link>
            </Button>
            
            <Button className="border-4 border-white text-white hover:bg-white hover:text-black px-16 py-8 text-2xl font-black tracking-wider transform hover:scale-110 transition-all duration-300 bg-transparent">
              <Link href="/contact">GET IN TOUCH</Link>
            </Button>
          </div>
          
          {/* Floating social proof */}
          <div className="mt-20 flex justify-center items-center space-x-12 text-white/80">
            {/* <div className="text-center">
              <div className="text-4xl font-black">10K+</div>
              <div className="text-lg">Happy Customers</div>
            </div> */}
            <div className="text-center">
              <div className="text-4xl font-black">50+</div>
              <div className="text-lg">Unique Pieces</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black">100%</div>
              <div className="text-lg">Premium Quality</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;