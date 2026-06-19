
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Play,
  Zap,
  Users,
  TrendingUp,
  Palette,
  Target,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Volume2,
  VolumeX,
  Star,
  Menu,
  X,
  Send,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  BarChart3,
  Film,
  Megaphone,
  Lightbulb,
  User,
  Check,
  Scissors,
  Camera,
  Rocket,
  Crown,
} from 'lucide-react';

/* ─────────────────── Mouse Glow ─────────────────── */
function MouseGlow({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="pointer-events-none fixed w-[500px] h-[500px] rounded-full opacity-20 blur-3xl z-0"
      style={{
        background: 'radial-gradient(circle, #00E5FF 0%, #7C3AED 50%, transparent 70%)',
        transform: `translate(${x - 800}px, ${y - 400}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
}

/* ─────────────────── Particles ─────────────────── */
function Particles() {
  const pts = useRef(
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 1.5 + Math.random() * 3.5,
      delay: Math.random() * 10,
      dur: 12 + Math.random() * 14,
    }))
  ).current;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-5%',
            background: p.id % 3 === 0 ? 'rgba(0,229,255,0.6)' : p.id % 3 === 1 ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.3)',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────── Animated Logo ─────────────────── */
function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const letters = ['H', 'I', 'L', 'L', 'S'];
  const sizeClasses = { sm: 'text-2xl', md: 'text-3xl', lg: 'text-5xl' };
  return (
    <motion.div
      className={`font-black tracking-tighter flex items-center ${sizeClasses[size]}`}
      initial="hidden"
      animate="visible"
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{
            background: `linear-gradient(135deg, #00E5FF ${i * 20}%, #7C3AED ${50 + i * 10}%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: -20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: i * 0.07, duration: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{
            scale: 1.3,
            rotateY: 15,
            transition: { duration: 0.2 },
          }}
        >
          {l}
        </motion.span>
      ))}
      <motion.span
        className="ml-1 w-1.5 h-1.5 rounded-full bg-[#00E5FF] inline-block mb-1 self-end"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [1, 0.5, 1],
          boxShadow: ['0 0 0px #00E5FF', '0 0 12px #00E5FF', '0 0 0px #00E5FF'],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ─────────────────── Nav ─────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Services', 'Portfolio', 'Pricing', 'Process', 'FAQ', 'Contact'];
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong py-3' : 'py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#">
          <Logo size="md" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
            >
              {l}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-full text-sm font-semibold text-white glow-blue"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >Book Call</motion.a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mx-4 mt-3 rounded-2xl overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-4">
              {links.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-gray-300 hover:text-white py-1" onClick={() => setOpen(false)}>{l}</a>
              ))}
              <a href="#contact" className="py-3 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-full text-sm font-semibold text-white text-center mt-1">Book Call</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────── Hero ─────────────────── */
function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const wordVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <MouseGlow x={mouse.x} y={mouse.y} />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'rgba(124,58,237,0.15)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'rgba(0,229,255,0.12)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <Particles />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-[#00E5FF]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm text-gray-300">Premier Content Agency</span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.div
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-7xl lg:text-[90px] font-black tracking-tight leading-none text-white"
          >
            {'We Engineer'.split('').map((c, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block">{c === ' ' ? '\u00A0' : c}</motion.span>
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.div
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.4 }}
            className="text-5xl sm:text-7xl lg:text-[90px] font-black tracking-tight leading-none"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {'Attention'.split('').map((c, i) => (
              <motion.span key={i} variants={charVariants} className="inline-block">{c}</motion.span>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We help brands dominate social media through viral reels,&nbsp;influencer marketing and growth strategies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-full text-lg font-semibold text-white flex items-center justify-center gap-2 glow-blue"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book A Strategy Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 glass rounded-full text-lg font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            View Portfolio
          </motion.a>
        </motion.div>

        {/* Floating tags */}
        <div className="hidden lg:block">
          {[
            { text: '2M+ Views', x: -340, y: -40, delay: 1.5 },
            { text: '20+ Reels', x: 340, y: -40, delay: 1.7 },
            { text: '2x ROI', x: -300, y: 110, delay: 1.9 },
            { text: '5+ Brands', x: 300, y: 110, delay: 2.1 },
          ].map((tag) => (
            <motion.div
              key={tag.text}
              className="absolute glass rounded-full px-4 py-2 text-xs font-semibold text-[#00E5FF] pointer-events-none"
              style={{ left: '50%', top: '50%' }}
              initial={{ opacity: 0, x: tag.x * 0.7, y: tag.y * 0.7 }}
              animate={{
                opacity: 1,
                x: tag.x,
                y: tag.y,
              }}
              transition={{ delay: tag.delay, duration: 0.8, type: 'spring' }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── Stats ─────────────────── */
function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const items = [
    { val: '2M+', label: 'Views Generated', icon: <Play className="w-6 h-6" />, color: '#00E5FF' },
    { val: '20+', label: 'Reels Produced', icon: <Film className="w-6 h-6" />, color: '#7C3AED' },
    { val: '5+', label: 'Brands Managed', icon: <Users className="w-6 h-6" />, color: '#00E5FF' },
    { val: '2x', label: 'Average ROI', icon: <TrendingUp className="w-6 h-6" />, color: '#7C3AED' },
  ];
  return (
    <section ref={ref} className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.12, duration: 0.6, type: 'spring' }}
            className="glass rounded-2xl p-6 text-center group hover:glow-blue transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:scale-110 transition-transform"
              style={{ background: `${s.color}20`, color: s.color }}
            >
              {s.icon}
            </div>
            <motion.div
              className="text-3xl font-black mb-1"
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.3, type: 'spring', stiffness: 200 }}
            >
              {s.val}
            </motion.div>
            <div className="text-sm text-gray-400">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── Services ─────────────────── */
function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cards = [
    { icon: <Film className="w-7 h-7" />, title: 'Reel Editing', desc: 'Scroll-stopping video content with cinematic quality and viral hooks that convert viewers into customers.' },
    { icon: <Users className="w-7 h-7" />, title: 'Social Media Management', desc: 'End-to-end strategy that builds engaged communities and drives consistent, measurable growth.' },
    { icon: <Star className="w-7 h-7" />, title: 'Influencer Marketing', desc: 'Strategic creator partnerships that authentically connect your brand with the right audience.' },
    { icon: <Megaphone className="w-7 h-7" />, title: 'Paid Ads', desc: 'Data-driven ad campaigns maximising ROAS across Meta, TikTok, and YouTube platforms.' },
    { icon: <Lightbulb className="w-7 h-7" />, title: 'Content Strategy', desc: 'Comprehensive content roadmaps aligned with your brand goals and market positioning.' },
    { icon: <User className="w-7 h-7" />, title: 'Personal Branding', desc: 'Build a magnetic personal brand that positions you as the go-to authority in your niche.' },
  ];
  return (
    <section id="services" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Full-stack marketing solutions engineered for exponential growth</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
              className="group relative glass rounded-2xl p-8 hover:glow-purple transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 flex items-center justify-center text-[#00E5FF] mb-6"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {c.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#00E5FF] transition-colors duration-300">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Portfolio ─────────────────── */
function Portfolio() {
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
const projects = [
  {
    title: 'Luxury Hotel Experience',
    cat: 'Hotel & Hospitality',
    metric: 'Hotel Promotion',
    video: '/videos/hotel.mp4'
  },
  {
    title: 'Aesthetic Cafe Reel',
    cat: 'Cafe & Restaurant',
    metric: 'Cafe Marketing',
    video: '/videos/cafe.mp4'
  },
  {
    title: 'Premium Gym Promo',
    cat: 'Fitness',
    metric: 'Gym Transformation',
    video: '/videos/gym.mp4'
  },
  {
    title: 'Luxury Real Estate Reel',
    cat: 'Real Estate',
    metric: 'Property Showcase',
    video: '/videos/real-estate.mp4'
  }
];
  return (
    <section id="portfolio" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Featured Work
            </span>
          </h2>
          <p className="text-gray-400">High-converting reels created for brands</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14, duration: 0.6, type: 'spring' }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-video overflow-hidden relative">
  <video
    src={p.video}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    autoPlay
    muted={activeAudio !== i}
    loop
    playsInline
    preload="metadata"
  />

  <button
    onClick={(e) => {
      e.stopPropagation();
      setActiveAudio(activeAudio === i ? null : i);
    }}
    className="absolute bottom-4 right-4 z-30 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
  >
    {activeAudio === i ? (
      <Volume2 className="w-5 h-5 text-white" />
    ) : (
      <VolumeX className="w-5 h-5 text-white" />
    )}
  </button>
</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 glass rounded-full text-xs font-medium text-[#00E5FF]">{p.cat}</span>
                  <span className="text-xs text-gray-300">{p.metric}</span>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-[#00E5FF] transition-colors duration-300">{p.title}</h3>

              </div>
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 rounded-full glass flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                animate={inView ? { opacity: 0 } : {}}
              >
                <Play className="w-4 h-4 text-[#00E5FF]" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Pricing ─────────────────── */
function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [tab, setTab] = useState<'editing' | 'shooting' | 'campaigns'>('campaigns');

  const editingTiers = [
    { name: 'Basic Reel Editing', price: '₹1,500', per: '/ Reel', desc: 'Clean cuts, basic transitions, captions' },
    { name: 'Premium Reel Editing', price: '₹2,500', per: '/ Reel', desc: 'Advanced effects, colour grading, motion text' },
    { name: 'Cinematic / VFX', price: '₹5,000+', per: '/ Reel', desc: 'Full VFX pipeline, cinematic colour, premium audio' },
  ];

  const shootingTiers = [
    { name: 'Basic Shoot + Edit', price: '₹3,500', per: '/ Reel', desc: 'Location shoot with basic editing' },
    { name: 'Premium Shoot + Edit', price: '₹5,500', per: '/ Reel', desc: 'Professional setup with premium post-production' },
    { name: 'Commercial Shoot + Edit', price: '₹10,000+', per: '/ Reel', desc: 'Full commercial-grade production' },
  ];

  const campaigns = [
{
name: 'Editing Starter',
price: '₹15,000',
per: '/ Month',
icon: <Scissors className="w-6 h-6" />,
features: [
'10 Reels Editing Only',
'1 Feed Post Daily',
'1 Story Daily',
'Professional Video Editing',
'Captions & Subtitles',
'Basic Motion Graphics',
'Trending Transitions',
'Royalty-Free Music',
],
},
{
name: 'Content Starter',
price: '₹35,000',
per: '/ Month',
badge: 'popular',
icon: <Camera className="w-6 h-6" />,
features: [
'10 Reels with Influencer (Shoot + Edit)',
'5 Reels Editing Only',
'1 Feed Post Daily',
'1 Story Daily',
'Content Planning',
'Shot List Assistance',
'Captions & Hashtag Suggestions',
'Trending Audio Research',
'Basic Motion Graphics',
'Monthly Content Consultation',
],
},
{
name: 'Growth Campaign',
price: '₹55,000',
badge: 'recommended',
per: '/ Month',
highlight: false,
icon: <Rocket className="w-6 h-6" />,
features: [
'10 Reels with Influencer (Shoot + Edit)',
'5 Reels Editing Only',
'1 Feed Post Daily',
'1 Story Daily',
'Content Planning',
'Script Assistance',
'Professional Color Grading',
'Captions & Hashtag Strategy',
'Trending Content Research',
'Priority Delivery',
'Monthly Performance Review',
],
},
{
name: 'Scale Campaign',
price: '₹75,000',
per: '/ Month',
icon: <TrendingUp className="w-6 h-6" />,
features: [
'15 Reels with Influencer (Shoot + Edit)',
'5 Reels Editing Only',
'1 Feed Post Daily',
'1 Story Daily',
'Advanced Script Writing',
'Content Planning & Calendar',
'Professional Color Grading',
'Advanced Motion Graphics',
'Brand-Focused Content Strategy',
'Priority Support',
'Fast Turnaround Time',
'Monthly Strategy Call',
],
},
{
name: 'Premium Brand',
price: '₹90,000',
per: '/ Month',
icon: <Crown className="w-6 h-6" />,
features: [
'20 Reels with Influencer (Shoot + Edit)',
'10 Reels Editing Only',
'1 Feed Post Daily',
'1 Story Daily',
'Premium Cinematic Editing',
'Premium Content Shoots',
'Advanced Script Writing',
'Dedicated Content Strategy',
'Content Calendar Management',
'Advanced Motion Graphics',
'Priority Delivery',
'Dedicated Support',
'Monthly Growth Consultation',
'Brand Building Strategy',
],
},
];


  const tabs = [
    { key: 'campaigns', label: 'Monthly Campaigns', icon: <Rocket className="w-4 h-4" /> },
    { key: 'editing', label: 'Reel Editing', icon: <Scissors className="w-4 h-4" /> },
    { key: 'shooting', label: 'Shoot + Edit', icon: <Camera className="w-4 h-4" /> },
  ] as const;

  return (
    <section id="pricing" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Transparent Pricing
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">No hidden fees. No surprises. Just results.</p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="glass rounded-full p-1.5 flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  tab === t.key
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {(tab === 'editing' || tab === 'shooting') && (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {(tab === 'editing' ? editingTiers : shootingTiers).map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 group hover:glow-blue transition-all duration-500 flex flex-col"
                >
                  <div className="text-2xl font-black mb-1">
                    <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {tier.price}
                    </span>
                    <span className="text-gray-500 text-sm font-normal ml-1">{tier.per}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#00E5FF] transition-colors">{tier.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{tier.desc}</p>
                  <motion.a
                    href="#contact"
                    className="mt-5 w-full py-2.5 rounded-xl border border-[#00E5FF]/30 text-[#00E5FF] text-sm font-semibold text-center hover:bg-[#00E5FF]/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 'campaigns' && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((pkg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.93 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                  className={`relative rounded-2xl p-6 flex flex-col transition-all duration-500 ${
                    pkg.badge === 'popular'
                      ? 'bg-gradient-to-br from-[#00E5FF]/15 to-[#7C3AED]/15 border border-[#00E5FF]/40 glow-blue'
                      : pkg.badge === 'recommended'
                      ? 'bg-gradient-to-br from-[#F59E0B]/15 to-[#EF4444]/15 border border-[#F59E0B]/40'
                      : 'glass hover:glow-purple'
                  }`}
                  >
                  {pkg.badge && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        pkg.badge === 'popular'
                          ? 'bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white'
                          : 'bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white'
                      }`}
                    >
                      {pkg.badge === 'popular' ? 'Most Popular' : 'Best Results'}
                    </div>
                  )}

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${pkg.highlight ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 'bg-white/10 text-gray-300'}`}>
                      {pkg.icon}
                    </div>

                    <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-black" style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {pkg.price}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">{pkg.per}</span>
                    </div>

                    <ul className="space-y-2.5 flex-1 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <motion.a
                      href="#contact"
                      className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                      pkg.badge === 'popular'
                        ? 'bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-white'
                        : pkg.badge === 'recommended'
                        ? 'bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white'
                        : 'border border-white/20 text-white hover:bg-white/10'
                    }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Get Started
                    </motion.a>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 glass rounded-2xl p-6 text-center"
              >
                <p className="text-gray-400 text-sm">
                  Need something custom? For larger campaigns and unique requirements,{' '}
                  <a href="#contact" className="text-[#00E5FF] font-semibold hover:underline">
                    a tailored package can be created
                  </a>{' '}
                  based on your goals and content volume.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────── Process ─────────────────── */
function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const steps = [
    { num: '01', title: 'Discover', desc: 'Deep dive into your brand, audience, and market to uncover high-leverage growth opportunities.', icon: <Target className="w-6 h-6" /> },
    { num: '02', title: 'Create', desc: 'Develop scroll-stopping content and strategies tailored to your unique brand voice and goals.', icon: <Palette className="w-6 h-6" /> },
    { num: '03', title: 'Launch', desc: 'Execute campaigns with precision timing and platform-optimised delivery for maximum impact.', icon: <Zap className="w-6 h-6" /> },
    { num: '04', title: 'Scale', desc: 'Analyse, optimise, and amplify what works to compound your results and maximise ROI.', icon: <TrendingUp className="w-6 h-6" /> },
  ];
  return (
    <section id="process" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Process
            </span>
          </h2>
          <p className="text-gray-400">A proven framework for delivering exceptional results</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#00E5FF]/40 via-[#7C3AED]/40 to-[#00E5FF]/40" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring' }}
              className="glass rounded-2xl p-6 relative group hover:glow-blue transition-all duration-500"
            >
              <div className="absolute -top-3.5 left-5 px-3 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-xs font-bold">{s.num}</div>
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7C3AED]/20 flex items-center justify-center text-[#00E5FF] mb-4 mt-3"
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {s.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#00E5FF] transition-colors">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ─────────────────── Why Hills ─────────────────── */
function WhyHills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const cmp = [
    { before: 'Generic content', after: 'Viral-worthy storytelling' },
    { before: 'Random posting', after: 'Data-driven strategy' },
    { before: 'Inconsistent growth', after: 'Predictable scaling' },
    { before: 'Limited reach', after: 'Multi-platform dominance' },
  ];
  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Why HILLS?
            </span>
          </h2>
          <p className="text-gray-400">The difference between good and unforgettable</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {cmp.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
              className="flex items-center gap-4 glass rounded-2xl p-5 group hover:glow-purple transition-all duration-500"
            >
              <div className="flex-1 text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <span className="text-gray-400 line-through text-sm">{c.before}</span>
              </div>
              <motion.div whileHover={{ x: 4 }} className="flex-shrink-0">
                <ArrowRight className="text-[#00E5FF] w-5 h-5" />
              </motion.div>
              <div className="flex-1 text-center p-3 rounded-xl bg-gradient-to-r from-[#00E5FF]/10 to-[#7C3AED]/10 border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/40 transition-colors">
                <span className="font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {c.after}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-8 text-center"
        >
          {[
            { icon: <Zap className="w-10 h-10 text-[#00E5FF]" />, title: 'Fast Turnaround', desc: 'Quick delivery without compromising on quality' },
            { icon: <BarChart3 className="w-10 h-10 text-[#7C3AED]" />, title: 'Proven Results', desc: 'Measurable impact on every single project' },
            { icon: <MessageCircle className="w-10 h-10 text-[#00E5FF]" />, title: '24/7 Support', desc: 'Always here when your brand needs us' },
          ].map((b, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <motion.div
                className="flex justify-center mb-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              >
                {b.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{b.title}</h3>
              <p className="text-gray-400 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */
function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: 'How quickly can we see results?', a: 'Most clients see measurable results within the first 30 days. Sustainable growth typically becomes evident after 90 days of consistent strategy execution. We provide weekly analytics so you can track progress in real-time.' },
    { q: 'What platforms do you specialise in?', a: 'We specialise in Instagram, TikTok, YouTube Shorts, and LinkedIn. Each platform requires a unique approach, and our team is trained in the latest algorithms and trends for each.' },
    { q: 'Do you work with startups or only established brands?', a: 'We work with brands at various stages — from funded startups to enterprises. What matters most is your commitment to growth and willingness to invest in quality content.' },
    { q: 'What does a typical engagement look like?', a: 'We start with a discovery call, followed by a comprehensive strategy presentation. Upon agreement, we begin content creation with weekly deliverables and monthly strategy reviews.' },
    { q: 'How do you measure success?', a: 'We track engagement rate, follower growth, reach, conversion rates, and ROI. We provide detailed monthly reports with actionable insights and forward-looking recommendations.' },
    { q: 'Do you offer custom packages?', a: 'Absolutely! For custom requirements and larger campaigns, a tailored package can be created based on your goals and content volume. Contact us on WhatsApp to discuss your needs.' },
  ];
  return (
    <section id="faq" ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              FAQ
            </span>
          </h2>
          <p className="text-gray-400">Answers to common questions</p>
        </motion.div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors">
                <span className="font-semibold pr-4">{item.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-[#00E5FF] flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed text-sm">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Contact ─────────────────── */
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  return (
    <section id="contact" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Let's Talk
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Ready to elevate your brand? Let's start the conversation.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring' }} className="glass-strong rounded-3xl p-8 flex flex-col gap-5">
            <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>

            <motion.a
              href="https://wa.me/917860508221"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-green-500/10 transition-colors group"
              whileHover={{ scale: 1.02, x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">WhatsApp Us</div>
                <div className="text-sm text-gray-400">+91 78605 08221</div>
              </div>
              <ArrowRight className="w-4 h-4 text-green-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <motion.div
              className="flex items-center gap-4 p-4 glass rounded-xl"
              whileHover={{ scale: 1.01 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold">Location</div>
                <div className="text-sm text-gray-400">Lucknow, Uttar Pradesh, India</div>
              </div>
            </motion.div>

            {/* Social proof strip */}
            <div className="mt-auto glass rounded-2xl p-5 text-center">
              <div className="text-4xl font-black mb-1" style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                24h
              </div>
              <div className="text-sm text-gray-400">Average response time</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: 'spring' }} className="glass-strong rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-5">
              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#00E5FF] outline-none transition-colors placeholder:text-gray-500" />
              <input type="tel" placeholder="Your Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#00E5FF] outline-none transition-colors placeholder:text-gray-500" />
              <textarea placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5} className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#00E5FF] outline-none transition-colors placeholder:text-gray-500 resize-none" />
              <motion.a
                href={`https://wa.me/917860508221?text=Hi! I'm ${form.name || 'interested'}. ${form.message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-xl font-semibold flex items-center justify-center gap-2 hover:glow-blue transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Send via WhatsApp <Send className="w-5 h-5" />
              </motion.a>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
/* ─────────────────── Footer ─────────────────── */
function Footer() {
  return (
    <footer className="py-20 border-t border-white/10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>

        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          We Turn Views Into Customers through viral content,
          strategic growth and high-converting reels.
        </p>

        <p className="text-gray-500 text-sm mt-4">
          Based in Lucknow, India
        </p>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            © 2026 HILLS Agency. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

/* ─────────────────── App ─────────────────── */
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="bg-[#050505] min-h-screen">
      <motion.div className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] origin-left z-[60]" style={{ scaleX }} />
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Pricing />
      <Process />
      
      <WhyHills />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
