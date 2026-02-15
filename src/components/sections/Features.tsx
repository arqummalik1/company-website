import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight, Layers3, Gauge, Rocket, ShieldCheck, Zap, Bot, Cloud, Code2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  icon: React.ReactNode;
}

interface FeaturesProps {
  features?: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    title: 'AI-First Development',
    description: 'Leverage the power of artificial intelligence to build intelligent applications. From chatbots to automation pipelines, we integrate AI seamlessly into your products.',
    gradient: 'from-blue-500 to-cyan-500',
    icon: <Bot className="w-8 h-8" />,
    benefits: [
      'Intelligent chatbot integration',
      'Automation pipelines',
      'Machine learning models',
      'Natural language processing',
    ],
  },
  {
    title: 'Scalable Architecture',
    description: 'Built for growth from day one. Our solutions scale seamlessly as your business expands, handling increased traffic and data without compromising performance.',
    gradient: 'from-purple-500 to-pink-500',
    icon: <Layers3 className="w-8 h-8" />,
    benefits: [
      'Microservices-ready infrastructure',
      'Auto-scaling cloud deployment',
      'Load-balanced architecture',
      'Distributed systems design',
    ],
  },
  {
    title: 'Performance First',
    description: 'Lightning-fast response times ensure exceptional user experiences. Every millisecond matters, and we optimize for speed at every level of your application.',
    gradient: 'from-orange-500 to-red-500',
    icon: <Gauge className="w-8 h-8" />,
    benefits: [
      'Lighthouse 95+ scores',
      'Code-splitting & lazy loading',
      'Edge computing deployment',
      'CDN integration',
    ],
  },
  {
    title: 'Fast Delivery',
    description: 'Get to market faster with our modern development stack and streamlined processes. We minimize iteration cycles while maximizing quality.',
    gradient: 'from-green-500 to-emerald-500',
    icon: <Rocket className="w-8 h-8" />,
    benefits: [
      'Agile development methodology',
      'CI/CD pipelines',
      'Rapid prototyping',
      'Iterative delivery',
    ],
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade security protocols protect your data. We implement industry-leading encryption, compliance frameworks, and access controls.',
    gradient: 'from-cyan-500 to-blue-500',
    icon: <ShieldCheck className="w-8 h-8" />,
    benefits: [
      'End-to-end encryption',
      'SOC 2 compliant processes',
      'Multi-factor authentication',
      'Security audits',
    ],
  },
  {
    title: 'SaaS Ready',
    description: 'Everything you need to build a successful SaaS product. From authentication to payments, we provide the foundation for subscription-based businesses.',
    gradient: 'from-indigo-500 to-purple-500',
    icon: <Cloud className="w-8 h-8" />,
    benefits: [
      'Authentication systems',
      'Payment integration',
      'Multi-tenancy support',
      'Usage analytics',
    ],
  },
  {
    title: 'Data-Driven Insights',
    description: 'Transform raw data into actionable intelligence. Our analytics integration provides real-time visibility into your business metrics.',
    gradient: 'from-violet-500 to-purple-500',
    icon: <Zap className="w-8 h-8" />,
    benefits: [
      'Real-time dashboards',
      'Custom reporting',
      'Predictive analytics',
      'Data visualization',
    ],
  },
  {
    title: 'Clean Code Standards',
    description: 'Maintainable, well-documented code that stands the test of time. We follow SOLID principles and industry best practices.',
    gradient: 'from-teal-500 to-cyan-500',
    icon: <Code2 className="w-8 h-8" />,
    benefits: [
      'Comprehensive documentation',
      'Unit test coverage',
      'Code reviews',
      'Best practice adherence',
    ],
  },
];

/**
 * FeatureIllustration - Custom SVG illustration for each feature
 */
function FeatureIllustration({ 
  type, 
  gradient 
}: { 
  type: string;
  gradient: string;
}) {
  const illustrations: Record<string, React.ReactNode> = {
    'AI-First Development': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Brain/Neural Network - Simplified */}
        <circle cx="200" cy="150" r="60" fill="url(#ai-grad)" stroke="#3b82f6" strokeWidth="2" />
        
        {/* Neural nodes - static */}
        <circle cx="160" cy="120" r="8" fill="#3b82f6" opacity="0.8" />
        <circle cx="240" cy="120" r="8" fill="#06b6d4" opacity="0.8" />
        <circle cx="180" cy="170" r="8" fill="#3b82f6" opacity="0.8" />
        <circle cx="220" cy="170" r="8" fill="#06b6d4" opacity="0.8" />
        <circle cx="200" cy="145" r="12" fill="#3b82f6" />
        
        {/* Connection lines */}
        <line x1="160" y1="120" x2="200" y2="145" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
        <line x1="240" y1="120" x2="200" y2="145" stroke="#06b6d4" strokeWidth="2" opacity="0.5" />
        
        {/* AI Chip */}
        <rect x="160" y="230" width="80" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="200" y="250" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">AI</text>
      </svg>
    ),
    'Scalable Architecture': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="scale-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Server stack */}
        <rect x="60" y="100" width="100" height="50" rx="8" fill="url(#scale-grad)" stroke="#8b5cf6" strokeWidth="2" />
        <rect x="65" y="110" width="90" height="8" rx="2" fill="#8b5cf6" opacity="0.5" />
        <rect x="65" y="125" width="90" height="8" rx="2" fill="#8b5cf6" opacity="0.3" />
        <rect x="65" y="140" width="40" height="4" rx="2" fill="#22c55e" />
        
        {/* Server 2 */}
        <rect x="180" y="80" width="100" height="50" rx="8" fill="url(#scale-grad)" stroke="#8b5cf6" strokeWidth="2" />
        <rect x="185" y="90" width="90" height="8" rx="2" fill="#8b5cf6" opacity="0.5" />
        <rect x="185" y="105" width="90" height="8" rx="2" fill="#8b5cf6" opacity="0.3" />
        <rect x="185" y="120" width="40" height="4" rx="2" fill="#22c55e" />
        
        {/* Server 3 */}
        <rect x="300" y="60" width="80" height="40" rx="6" fill="url(#scale-grad)" stroke="#ec4899" strokeWidth="2" />
        <rect x="305" y="70" width="70" height="6" rx="2" fill="#ec4899" opacity="0.5" />
        <rect x="305" y="82" width="70" height="6" rx="2" fill="#ec4899" opacity="0.3" />
        
        {/* Connection lines */}
        <path d="M160 100 L180 105" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4" opacity="0.6" />
        <path d="M280 80 L300 80" stroke="#ec4899" strokeWidth="2" strokeDasharray="4" opacity="0.6" />
        
        {/* Upward arrows */}
        <path d="M110 70 L110 90" stroke="#8b5cf6" strokeWidth="3" />
        <path d="M105 75 L110 70 L115 75" stroke="#8b5cf6" strokeWidth="3" fill="none" />
        
        <path d="M230 50 L230 70" stroke="#8b5cf6" strokeWidth="3" />
        <path d="M225 55 L230 50 L235 55" stroke="#8b5cf6" strokeWidth="3" fill="none" />
        
        {/* Cloud */}
        <ellipse cx="340" cy="180" rx="35" ry="20" fill="#8b5cf6" opacity="0.1" />
        <ellipse cx="325" cy="170" rx="20" ry="15" fill="#8b5cf6" opacity="0.15" />
        <ellipse cx="355" cy="170" rx="20" ry="15" fill="#8b5cf6" opacity="0.15" />
        
        {/* Scale icon */}
        <rect x="50" y="200" width="60" height="30" rx="4" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M60 215 L75 205 L90 215" stroke="#8b5cf6" strokeWidth="2" fill="none" />
        
        {/* Growth chart */}
        <polyline points="180,250 220,235 260,240 300,210 340,190 380,170" fill="none" stroke="#ec4899" strokeWidth="3" />
        <circle cx="380" cy="170" r="5" fill="#ec4899" />
        
        {/* Load balancer */}
        <circle cx="340" cy="240" r="20" fill="none" stroke="#22c55e" strokeWidth="2" />
        <path d="M335 240 L340 235 L340 245" stroke="#22c55e" strokeWidth="2" fill="none" />
      </svg>
    ),
    'Performance First': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="perf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Lightning bolt */}
        <path d="M230 30 L190 110 L210 110 L200 240 L280 100 L250 100 Z" fill="url(#perf-grad)" stroke="#f97316" strokeWidth="2" />
        
        {/* Speed lines */}
        <path d="M40 100 L140 100" stroke="#f97316" strokeWidth="2" opacity="0.5" />
        <path d="M20 120 L110 120" stroke="#f97316" strokeWidth="2" opacity="0.3" />
        <path d="M50 140 L130 140" stroke="#f97316" strokeWidth="2" opacity="0.4" />
        
        {/* Gauge */}
        <path d="M70 240 A90 90 0 0 1 250 240" fill="none" stroke="#f97316" strokeWidth="10" strokeLinecap="round" opacity="0.2" />
        <path d="M70 240 A90 90 0 0 1 230 170" fill="none" stroke="#f97316" strokeWidth="10" strokeLinecap="round" />
        
        {/* Gauge needle */}
        <line x1="160" y1="240" x2="210" y2="180" stroke="#ef4444" strokeWidth="3" />
        <circle cx="160" cy="240" r="10" fill="#ef4444" />
        
        {/* Timer elements */}
        <circle cx="320" cy="70" r="35" fill="none" stroke="#f97316" strokeWidth="3" opacity="0.5" />
        <path d="M320 42 L320 70 L345 70" stroke="#f97316" strokeWidth="2" fill="none" />
        
        {/* Checkered flag */}
        <rect x="290" y="180" width="6" height="45" fill="#f97316" opacity="0.5" />
        <rect x="296" y="180" width="6" height="35" fill="#f97316" />
        <rect x="302" y="180" width="6" height="40" fill="#f97316" opacity="0.5" />
        <rect x="308" y="180" width="6" height="30" fill="#f97316" />
        <rect x="314" y="180" width="6" height="35" fill="#f97316" opacity="0.5" />
        
        {/* Performance metrics */}
        <rect x="50" y="260" width="60" height="20" rx="4" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
        <text x="80" y="274" textAnchor="middle" fill="#22c55e" fontSize="10">99.9%</text>
        
        <rect x="130" y="260" width="60" height="20" rx="4" fill="#1e293b" stroke="#f97316" strokeWidth="1" />
        <text x="160" y="274" textAnchor="middle" fill="#f97316" fontSize="10">50ms</text>
        
        <rect x="210" y="260" width="60" height="20" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
        <text x="240" y="274" textAnchor="middle" fill="#3b82f6" fontSize="10">95+</text>
      </svg>
    ),
    'Fast Delivery': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="fast-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#14b8a6', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Rocket */}
        <ellipse cx="200" cy="180" rx="30" ry="60" fill="url(#fast-grad)" stroke="#22c55e" strokeWidth="2" />
        <ellipse cx="200" cy="150" rx="25" ry="35" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
        
        {/* Window */}
        <circle cx="200" cy="140" r="12" fill="#22c55e" opacity="0.3" stroke="#22c55e" strokeWidth="2" />
        
        {/* Flame */}
        <path d="M180 230 Q200 270 220 230" fill="#f97316" opacity="0.8">
          <animate attributeName="d" values="M180 230 Q200 270 220 230;M180 230 Q200 280 220 230;M180 230 Q200 270 220 230" dur="0.5s" repeatCount="indefinite" />
        </path>
        <path d="M190 230 Q200 260 210 230" fill="#fbbf24" opacity="0.9">
          <animate attributeName="d" values="M190 230 Q200 260 210 230;M190 230 Q200 265 210 230;M190 230 Q200 260 210 230" dur="0.5s" repeatCount="indefinite" />
        </path>
        
        {/* Speed trails */}
        <path d="M100 180 Q150 170 180 180" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.5" />
        <path d="M80 200 Q130 190 170 200" fill="none" stroke="#14b8a6" strokeWidth="2" opacity="0.4" />
        
        {/* Clouds passing */}
        <ellipse cx="320" cy="80" rx="30" ry="15" fill="#22c55e" opacity="0.2" />
        <ellipse cx="350" cy="100" rx="25" ry="12" fill="#22c55e" opacity="0.15" />
        
        {/* Progress indicator */}
        <rect x="50" y="250" width="300" height="20" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
        <rect x="55" y="253" width="200" height="14" rx="7" fill="#22c55e">
          <animate attributeName="width" values="100;280;100" dur="3s" repeatCount="indefinite" />
        </rect>
        
        {/* Checkpoints */}
        <circle cx="80" cy="230" r="8" fill="#22c55e" opacity="0.8" />
        <circle cx="200" cy="230" r="8" fill="#22c55e" opacity="0.6" />
        <circle cx="320" cy="230" r="8" fill="#22c55e" opacity="0.4">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    ),
    'Enterprise Security': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="sec-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Shield */}
        <path d="M200 30 L300 70 L300 160 Q300 230 200 270 Q100 230 100 160 L100 70 Z" fill="url(#sec-grad)" stroke="#06b6d4" strokeWidth="3" />
        
        {/* Lock */}
        <rect x="170" y="130" width="60" height="55" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
        <rect x="175" y="118" width="50" height="20" rx="10" fill="none" stroke="#06b6d4" strokeWidth="3" />
        <circle cx="200" cy="157" r="10" fill="#06b6d4" />
        <rect x="198" y="157" width="4" height="8" fill="#1e293b" />
        
        {/* Checkmarks */}
        <path d="M50 90 L75 115 L120 70" stroke="#22c55e" strokeWidth="4" fill="none" />
        <path d="M50 150 L75 175 L120 130" stroke="#22c55e" strokeWidth="4" fill="none" />
        <path d="M50 210 L75 235 L120 190" stroke="#22c55e" strokeWidth="4" fill="none" />
        
        {/* Key */}
        <circle cx="330" cy="200" r="30" fill="none" stroke="#06b6d4" strokeWidth="2" />
        <rect x="355" y="195" width="50" height="12" fill="#06b6d4" opacity="0.5" />
        <rect x="385" y="195" width="8" height="20" fill="#06b6d4" opacity="0.5" />
        
        {/* Security nodes */}
        <circle cx="340" cy="80" r="10" fill="#06b6d4" opacity="0.3">
          <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="370" cy="120" r="8" fill="#3b82f6" opacity="0.2">
          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="350" cy="150" r="6" fill="#06b6d4" opacity="0.25">
          <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
        
        {/* Lock status */}
        <rect x="160" y="250" width="80" height="25" rx="4" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
        <text x="200" y="267" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">SECURE</text>
      </svg>
    ),
    'SaaS Ready': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="saas-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Cloud */}
        <ellipse cx="200" cy="100" rx="80" ry="40" fill="url(#saas-grad)" stroke="#6366f1" strokeWidth="2" />
        <ellipse cx="150" cy="90" rx="40" ry="30" fill="url(#saas-grad)" stroke="#6366f1" strokeWidth="2" />
        <ellipse cx="250" cy="90" rx="40" ry="30" fill="url(#saas-grad)" stroke="#6366f1" strokeWidth="2" />
        
        {/* SaaS Dashboard */}
        <rect x="60" y="150" width="280" height="120" rx="10" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
        
        {/* Sidebar */}
        <rect x="60" y="150" width="60" height="120" rx="10" fill="#6366f1" opacity="0.2" />
        <rect x="70" y="165" width="40" height="6" rx="2" fill="#6366f1" opacity="0.5" />
        <rect x="70" y="180" width="30" height="6" rx="2" fill="#6366f1" opacity="0.3" />
        <rect x="70" y="195" width="35" height="6" rx="2" fill="#6366f1" opacity="0.3" />
        <rect x="70" y="210" width="25" height="6" rx="2" fill="#6366f1" opacity="0.3" />
        
        {/* Charts */}
        <rect x="140" y="165" width="80" height="40" rx="4" fill="#6366f1" opacity="0.3" />
        <rect x="145" y="195" width="15" height="10" rx="2" fill="#a855f7" />
        <rect x="165" y="185" width="15" height="20" rx="2" fill="#a855f7" />
        <rect x="185" y="175" width="15" height="30" rx="2" fill="#a855f7" />
        <rect x="205" y="180" width="15" height="25" rx="2" fill="#a855f7" />
        
        {/* Analytics */}
        <rect x="235" y="165" width="90" height="40" rx="4" fill="#6366f1" opacity="0.2" />
        <polyline points="245,195 265,185 285,190 315,170" fill="none" stroke="#a855f7" strokeWidth="2" />
        
        {/* User avatars */}
        <circle cx="155" cy="245" r="12" fill="#6366f1" opacity="0.5" />
        <circle cx="180" cy="245" r="12" fill="#a855f7" opacity="0.5" />
        <circle cx="205" cy="245" r="12" fill="#6366f1" opacity="0.3" />
        <rect x="225" y="238" width="35" height="14" rx="7" fill="#6366f1" opacity="0.3" />
        
        {/* Subscription badge */}
        <rect x="270" y="230" width="55" height="20" rx="10" fill="#22c55e" opacity="0.3" />
        <text x="297" y="244" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">PREMIUM</text>
      </svg>
    ),
    'Data-Driven Insights': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="data-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#d946ef', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Bar chart */}
        <rect x="40" y="180" width="35" height="60" rx="4" fill="#8b5cf6" opacity="0.4" />
        <rect x="85" y="140" width="35" height="100" rx="4" fill="#8b5cf6" opacity="0.6" />
        <rect x="130" y="100" width="35" height="140" rx="4" fill="#8b5cf6" opacity="0.8" />
        <rect x="175" y="160" width="35" height="80" rx="4" fill="#d946ef" opacity="0.4" />
        <rect x="220" y="70" width="35" height="170" rx="4" fill="#d946ef" opacity="0.6" />
        <rect x="265" y="120" width="35" height="120" rx="4" fill="#d946ef" opacity="0.8" />
        
        {/* Line chart overlay */}
        <polyline points="57,180 102,140 147,100 192,160 237,70 282,120" fill="none" stroke="#8b5cf6" strokeWidth="3" />
        
        {/* Pie chart */}
        <circle cx="340" cy="80" r="40" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M340 80 L340 40 A40 40 0 0 1 380 80 Z" fill="#8b5cf6" opacity="0.7" />
        <path d="M340 80 L380 80 A40 40 0 0 1 340 120 Z" fill="#d946ef" opacity="0.7" />
        <path d="M340 80 L340 120 A40 40 0 0 1 300 80 Z" fill="#8b5cf6" opacity="0.4" />
        
        {/* Analytics icon */}
        <circle cx="340" cy="180" r="25" fill="none" stroke="#d946ef" strokeWidth="2" opacity="0.5" />
        <path d="M335 180 L340 185 L350 175" stroke="#d946ef" strokeWidth="2" fill="none" />
        
        {/* Trend indicators */}
        <path d="M50 260 L100 250 L150 255" stroke="#22c55e" strokeWidth="2" fill="none" />
        <path d="M200 260 L250 240 L300 245" stroke="#22c55e" strokeWidth="2" fill="none" />
        
        {/* Data points */}
        <circle cx="57" cy="180" r="4" fill="#8b5cf6" />
        <circle cx="147" cy="100" r="4" fill="#8b5cf6" />
        <circle cx="237" cy="70" r="4" fill="#d946ef" />
      </svg>
    ),
    'Clean Code Standards': (
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="code-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Code brackets */}
        <text x="60" y="140" fontSize="100" fill="#14b8a6" opacity="0.2">&lt;</text>
        <text x="280" y="140" fontSize="100" fill="#14b8a6" opacity="0.2">&gt;</text>
        
        {/* Code lines */}
        <rect x="90" y="70" width="220" height="8" rx="2" fill="#14b8a6" opacity="0.7" />
        <rect x="90" y="95" width="180" height="8" rx="2" fill="#06b6d4" opacity="0.6" />
        <rect x="90" y="120" width="200" height="8" rx="2" fill="#14b8a6" opacity="0.5" />
        <rect x="90" y="145" width="160" height="8" rx="2" fill="#06b6d4" opacity="0.7" />
        <rect x="90" y="170" width="220" height="8" rx="2" fill="#14b8a6" opacity="0.6" />
        <rect x="90" y="195" width="190" height="8" rx="2" fill="#06b6d4" opacity="0.5" />
        <rect x="90" y="220" width="210" height="8" rx="2" fill="#14b8a6" opacity="0.4" />
        
        {/* Bug icon */}
        <ellipse cx="340" cy="80" r="25" fill="none" stroke="#ef4444" strokeWidth="2" />
        <circle cx="328" cy="68" r="6" fill="#ef4444" opacity="0.6" />
        <circle cx="352" cy="68" r="6" fill="#ef4444" opacity="0.6" />
        <path d="M322 92 L310 105" stroke="#ef4444" strokeWidth="2" />
        <path d="M358 92 L370 105" stroke="#ef4444" strokeWidth="2" />
        
        {/* Test checkmark */}
        <circle cx="340" cy="180" r="30" fill="#22c55e" opacity="0.2" />
        <path d="M320 180 L335 195 L360 165" stroke="#22c55e" strokeWidth="4" fill="none" />
        
        {/* Quality badge */}
        <rect x="50" y="250" width="70" height="25" rx="4" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
        <text x="85" y="267" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">100%</text>
        
        <rect x="140" y="250" width="70" height="25" rx="4" fill="#1e293b" stroke="#14b8a6" strokeWidth="1" />
        <text x="175" y="267" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">PASS</text>
        
        <rect x="230" y="250" width="70" height="25" rx="4" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" />
        <text x="265" y="267" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">DOCS</text>
      </svg>
    ),
  };

  return (
    <div className={cn(
      'w-full h-full p-4',
      'bg-gradient-to-br',
      gradient,
      'opacity-90'
    )}>
      {illustrations[type] || illustrations['Scalable Architecture']}
    </div>
  );
}

/**
 * FeatureItem - Single feature with illustration and benefits list
 */
function FeatureItem({ 
  feature, 
  index, 
  isInView 
}: { 
  feature: Feature; 
  index: number; 
  isInView: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={cn(
        'flex flex-col',
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse',
        'gap-8 lg:gap-16 items-center'
      )}
    >
      {/* Visual/Image Side - Large Illustration */}
      <div className="flex-1 w-full">
        <GlassCard 
          className="aspect-[4/3] overflow-hidden"
          hover
        >
          <FeatureIllustration 
            type={feature.title} 
            gradient={feature.gradient}
          />
        </GlassCard>
      </div>

      {/* Content Side */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            'bg-gradient-to-br',
            feature.gradient,
            'text-white shadow-lg'
          )}>
            {feature.icon}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
            {feature.title}
          </h3>
        </div>
        <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
          {feature.description}
        </p>
        
        {/* Benefits List */}
        <ul className="space-y-3">
          {feature.benefits.map((benefit, benefitIndex) => (
            <motion.li
              key={benefitIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: (index * 0.1) + (benefitIndex * 0.1) + 0.2 
              }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-[var(--accent)]" />
              </div>
              <span className="text-[var(--text-secondary)]">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/**
 * Features - Alternating layout section with large illustrations
 */
export function Features({ features = defaultFeatures, className }: FeaturesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className={cn(
        'py-16 md:py-24',
        'bg-[var(--bg-primary)]',
        className
      )}
    >
      <Container size="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Why Choose <span className="gradient-text">Qubit</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We don't just build software. We craft solutions that drive business growth, 
            enhance security, and deliver exceptional user experiences.
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-16 lg:space-y-24">
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button 
            variant="primary" 
            icon={<ArrowRight />}
            iconPosition="right"
          >
            Explore Our Services
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default Features;
