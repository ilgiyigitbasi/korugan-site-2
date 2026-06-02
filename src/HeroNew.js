import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Zap, Globe } from 'lucide-react';

// ── SVG Logo ────────────────────────────────────────────────────────
export function KoruganLogo({ size = 120, animate = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8b84b"/>
          <stop offset="50%" stopColor="#c9952a"/>
          <stop offset="100%" stopColor="#8a6318"/>
        </linearGradient>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d0d8e4"/>
          <stop offset="50%" stopColor="#9aa4b0"/>
          <stop offset="100%" stopColor="#5a6470"/>
        </linearGradient>
        <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8b84b" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#c9952a" stopOpacity="0.4"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Hexagon shield outline */}
      <polygon points="100,14 168,52 168,128 100,166 32,128 32,52"
        fill="none" stroke="url(#silverGrad)" strokeWidth="3.5" opacity="0.85"/>
      {/* Inner hex */}
      <polygon points="100,28 154,58 154,118 100,148 46,118 46,58"
        fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.4"/>
      {/* K letter - vertical bar */}
      <rect x="70" y="68" width="10" height="64" fill="url(#silverGrad)" rx="1"/>
      {/* K letter - top diagonal */}
      <polygon points="80,100 80,68 112,68 95,100" fill="url(#goldGrad)" opacity="0.95"/>
      {/* K letter - bottom diagonal */}
      <polygon points="80,100 80,132 112,132 95,100" fill="url(#silverGrad)" opacity="0.9"/>
      {/* Spartan helmet crest - spike */}
      <polygon points="100,4 104,30 96,30" fill="url(#goldGrad)" filter="url(#glow)"/>
      {/* Helmet visor */}
      <path d="M88 44 L100 30 L112 44 L110 56 L100 60 L90 56 Z"
        fill="none" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.8"/>
      {/* Eye slit */}
      <line x1="90" y1="50" x2="110" y2="50" stroke="url(#goldGrad)" strokeWidth="2.5" opacity="0.9"/>
      {/* Corner cuts on hex */}
      <line x1="32" y1="70" x2="46" y2="70" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.6"/>
      <line x1="154" y1="70" x2="168" y2="70" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.6"/>
    </svg>
  );
}

// ── Animated counter ─────────────────────────────────────────────────
function Counter({ to, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = to / 50;
        const t = setInterval(() => {
          start += step;
          if (start >= to) { setVal(to); clearInterval(t); }
          else setVal(Math.floor(start));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ── Glitch text ───────────────────────────────────────────────────────
function GlitchText({ children, className }) {
  return (
    <span className={`glitch-wrap ${className || ''}`} data-text={children}>
      {children}
    </span>
  );
}

// ── Rotating ring ─────────────────────────────────────────────────────
function OrbitRing({ radius, speed, items }) {
  return (
    <motion.div className="orbit-ring" style={{ width: radius*2, height: radius*2 }}
      animate={{ rotate: 360 }} transition={{ duration: speed, ease: 'linear', repeat: Infinity }}>
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const x = radius + Math.cos(rad) * radius - 36;
        const y = radius + Math.sin(rad) * radius - 18;
        return (
          <motion.div key={item.label} className="orbit-item"
            style={{ left: x, top: y }}
            animate={{ rotate: -360 }} transition={{ duration: speed, ease: 'linear', repeat: Infinity }}>
            <span className="orbit-icon">{item.icon}</span>
            <span className="orbit-label">{item.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────
export default function HeroNew() {
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 600], [0, 100]);
  const yVisual = useTransform(scrollY, [0, 600], [0, 60]);
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0]);

  const orbitItems = [
    { icon: '🛡️', label: 'Savunma' },
    { icon: '🏥', label: 'Medikal' },
    { icon: '⚛️', label: 'Nükleer' },
    { icon: '🚀', label: 'Uzay' },
    { icon: '🔬', label: 'Ar-Ge' },
    { icon: '🏭', label: 'Endüstri' },
  ];

  const specs = [
    { label: 'Fiyat Avantajı', val: '%40-50', sub: 'tungstene kıyasla' },
    { label: 'Pazar Büyüklüğü', val: '$10B', sub: '2030 hedefi' },
    { label: 'Fiyat Aralığı', val: '90-110', sub: 'USD/kg' },
    { label: 'Rakipsiz', val: '0', sub: 'yerli rakip' },
  ];

  return (
    <section id="hero" className="hero-new">
      {/* Background layers */}
      <div className="hero-bg-base" />
      <div className="hero-bg-grid" />
      <div className="hero-bg-vignette" />
      <div className="hero-scanlines" aria-hidden />

      {/* Floating particles */}
      <div className="hero-particles" aria-hidden>
        {[...Array(24)].map((_, i) => (
          <motion.span key={i} className="particle"
            animate={{ y: [-15, 15, -15], x: [-5, 5, -5], opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 4 + (i % 5) * 1.2, delay: i * 0.25, repeat: Infinity }}
            style={{ left: `${(i * 4.2) % 100}%`, top: `${(i * 7.3) % 100}%` }} />
        ))}
      </div>

      <div className="hero-new-inner">
        {/* ── LEFT COLUMN ── */}
        <motion.div className="hero-left" style={{ y: yContent, opacity: fadeOut }}>

          <motion.div className="hero-badge-row"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <span className="badge-pill">
              <span className="pulse-dot" />
              Teknopark Ankara · 2026
            </span>
            <span className="badge-pill gold">CONFIDENTIAL</span>
          </motion.div>

          <motion.div className="hero-eyebrow"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="eyebrow-line" />
            <span className="eyebrow-text">KORUGAN COMPOSITES TECHNOLOGIES</span>
            <span className="eyebrow-line" />
          </motion.div>

          <motion.h1 className="hero-new-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            <span className="title-line-1">STRATEJİK</span>
            <span className="title-line-2">
              <GlitchText>BAĞIMSIZLIK</GlitchText>
            </span>
            <span className="title-line-3">YERLİ <span className="gold-stroke">ZIRH</span></span>
          </motion.h1>

          <motion.p className="hero-new-sub"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            Atık seramik + B₄C hibrit dolgulu, 3D yazıcı uyumlu kompozit filament.
            <br />Kurşunun zırhını, tungstenin esnekliğini — tek yerli çözümde.
          </motion.p>

          {/* Tech tags */}
          <motion.div className="hero-tags"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            {['Gama/X Koruması', 'Nötron Zırhlama', '3D Yazıcı Uyumlu', 'RoHS/REACH', 'Kurşunsuz'].map((t, i) => (
              <motion.span key={t} className="htag"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.07 }}>
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="hero-actions"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
            <a href="#cozumler" className="btn-primary">
              Çözümlerimizi Keşfet <ArrowRight size={15} />
            </a>
            <a href="#teknoloji" className="btn-ghost">
              Teknoloji Hakkında
            </a>
          </motion.div>

          {/* Spec strip */}
          <motion.div className="spec-strip"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
            {specs.map((s, i) => (
              <div key={s.label} className="spec-item">
                <div className="spec-val">{s.val}</div>
                <div className="spec-label">{s.label}</div>
                <div className="spec-sub">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div className="hero-right" style={{ y: yVisual, opacity: fadeOut }}
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}>

          {/* Central logo with glow */}
          <div className="hero-visual-center">
            {/* Outer glow rings */}
            <motion.div className="glow-ring r1"
              animate={{ rotate: 360 }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }} />
            <motion.div className="glow-ring r2"
              animate={{ rotate: -360 }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }} />
            <motion.div className="glow-ring r3"
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }} />

            {/* SVG Logo center */}
            <motion.div className="logo-center-wrap"
              animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}>
              <div className="logo-hex-bg" />
              <KoruganLogo size={160} />
              <motion.div className="logo-scan-line"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }} />
            </motion.div>

            {/* Orbit */}
            <div className="orbit-wrap">
              <OrbitRing radius={155} speed={25} items={orbitItems} />
            </div>

            {/* Data readouts */}
            {[
              { label: 'WEIGHT', val: '↓5x', pos: { top: '8%', right: '6%' } },
              { label: 'COST', val: '-50%', pos: { bottom: '15%', right: '2%' } },
              { label: 'TOXIC', val: 'ZERO', pos: { bottom: '15%', left: '2%' } },
              { label: 'SOURCE', val: 'TR', pos: { top: '8%', left: '6%' } },
            ].map((d) => (
              <motion.div key={d.label} className="data-readout" style={d.pos}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
                <span className="dr-label">{d.label}</span>
                <span className="dr-val">{d.val}</span>
              </motion.div>
            ))}
          </div>

          {/* Info cards below visual */}
          <motion.div className="hero-info-cards"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            {[
              { icon: <Shield size={16}/>, title: 'Hibrit Koruma', desc: 'Gama, X-ışını ve Nötron' },
              { icon: <Zap size={16}/>, title: '3D Üretilebilir', desc: 'Karmaşık geometriler' },
              { icon: <Globe size={16}/>, title: 'Yerli & Sürdürülebilir', desc: 'Teknopark Ankara' },
            ].map((c) => (
              <div key={c.title} className="hero-info-card">
                <span className="hic-icon">{c.icon}</span>
                <div><strong>{c.title}</strong><span>{c.desc}</span></div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a href="#hakkimizda" className="scroll-cue"
        style={{ opacity: fadeOut }}
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="scroll-cue-text">Keşfet</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  );
}
