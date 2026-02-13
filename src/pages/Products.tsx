import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Zap, 
  Shield, 
  BarChart3,
  Globe,
  Smartphone,
  Cloud,
  HeadphonesIcon
} from 'lucide-react';

// Example product data
const products = [
  {
    id: '1',
    name: 'Qubit Analytics',
    description: 'AI-powered analytics platform that transforms raw data into actionable insights. Features real-time dashboards, predictive analytics, and custom reporting.',
    category: 'Analytics',
    icon: <BarChart3 className="w-8 h-8" />,
    features: ['Real-time Dashboards', 'Predictive Analytics', 'Custom Reports', 'Data Visualization'],
    price: 'Custom',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Qubit Cloud',
    description: 'Enterprise-grade cloud infrastructure with auto-scaling, CDN integration, and 99.99% uptime guarantee. Built for mission-critical applications.',
    category: 'Cloud Services',
    icon: <Cloud className="w-8 h-8" />,
    features: ['Auto Scaling', 'Global CDN', '99.99% Uptime', '24/7 Support'],
    price: 'From $299/mo',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Qubit Mobile',
    description: 'Cross-platform mobile app development framework with native performance. Build once, deploy to iOS and Android simultaneously.',
    category: 'Mobile Apps',
    icon: <Smartphone className="w-8 h-8" />,
    features: ['iOS & Android', 'Native Performance', 'Offline Mode', 'Push Notifications'],
    price: 'From $499/mo',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Qubit Secure',
    description: 'Comprehensive cybersecurity solution with AI threat detection, encryption, and compliance management. Protect your business from evolving threats.',
    category: 'Security',
    icon: <Shield className="w-8 h-8" />,
    features: ['AI Threat Detection', 'End-to-End Encryption', 'Compliance Management', '24/7 Monitoring'],
    price: 'Custom',
    rating: 5.0,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Qubit Web',
    description: 'Modern web application framework built on React and Node.js. Fast, scalable, and SEO-optimized out of the box.',
    category: 'Web Development',
    icon: <Globe className="w-8 h-8" />,
    features: ['React & Node.js', 'SEO Optimized', 'SSR Support', 'PWA Ready'],
    price: 'From $199/mo',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Qubit API',
    description: 'Robust API gateway with rate limiting, authentication, and real-time analytics. Connect your services with confidence.',
    category: 'Developer Tools',
    icon: <Zap className="w-8 h-8" />,
    features: ['Rate Limiting', 'OAuth 2.0', 'Real-time Analytics', 'SDK Support'],
    price: 'From $99/mo',
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
  }
];

const categories = ['All', 'Analytics', 'Cloud Services', 'Mobile Apps', 'Security', 'Web Development', 'Developer Tools'];

export default function Products() {
  const { ref } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  void hoveredProduct;

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Our Products
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Powerful Solutions for <span className="text-gradient">Your Business</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our suite of cutting-edge products designed to accelerate your digital transformation
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-300 text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-white/80">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[var(--accent)]/10 rounded-lg text-[var(--accent)]">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="text-2xl font-bold text-[var(--accent)]">
                        {product.price}
                      </span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Why Choose <span className="text-gradient">Qubit?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap className="w-8 h-8" />, title: 'Lightning Fast', desc: 'Optimized performance for seamless user experiences' },
              { icon: <Shield className="w-8 h-8" />, title: 'Enterprise Security', desc: 'Bank-grade security to protect your data' },
              { icon: <Cloud className="w-8 h-8" />, title: '99.99% Uptime', desc: 'Reliable infrastructure you can count on' },
              { icon: <HeadphonesIcon className="w-8 h-8" />, title: '24/7 Support', desc: 'Round-the-clock assistance from our experts' }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--accent)]/10 rounded-full text-[var(--accent)] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-[var(--accent)] to-[var(--cyan)] rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl">
              We build tailor-made products to meet your unique business requirements. Let's discuss your project.
            </p>
            <button className="px-8 py-3 bg-white text-[var(--accent)] rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Get a Custom Quote
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
