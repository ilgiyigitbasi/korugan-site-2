import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Globe, Microscope, Menu, X, MapPin, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import logo from './logo.png';
import akisSemasi from './akis-semasi.png';
import kullanımAlanlari from './kullanim-alanlari.png';
import HeroNew from './HeroNew';
import './HeroNew.css';
import './App.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Hakkımızda', 'Çözümler', 'Teknoloji', 'Pazarlar', 'İletişim'];
  return (
    <motion.nav className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <img src={logo} alt="Korugan Composites" />
        </a>
        <div className="nav-links desktop">
          {links.map((l, i) => (
            <motion.a key={l} href={`#${l.toLowerCase().replace('ı','i').replace('ç','c').replace('ü','u').replace('ş','s').replace('ğ','g').replace('ö','o')}`}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3 }}>
              {l}
            </motion.a>
          ))}
          <motion.a href="#iletisim" className="nav-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Teklif Al
          </motion.a>
        </div>
        <button className="nav-burger" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="nav-mobile" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0; const step = to / 60;
        const t = setInterval(() => { start += step; if (start >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(start)); }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function About() {
  const items = [
    { label: 'Misyon', icon: '🎯', tr: 'Atık kaynakları değerlendirerek medikal, savunma, nükleer enerji ve endüstriyel uygulamalarda kullanılabilecek hafif, toksik olmayan ve 3D yazıcı ile üretilebilir radyasyon koruyucu kompozit malzemeler geliştirmek.', en: 'To develop lightweight, non-toxic, and 3D-printable composite materials for radiation shielding by utilizing recycled waste resources for medical, defense, nuclear energy, and industrial applications.' },
    { label: 'Vizyon', icon: '🔭', tr: 'Radyasyon zırhlama ve ileri kompozit malzeme teknolojilerinde, sürdürülebilir ve yerli üretim temelli çözümlerle global ölçekte referans gösterilen yenilikçi bir marka olmak.', en: 'To become an innovative global brand recognized for sustainable and domestically driven solutions in radiation shielding and advanced composite material technologies.' },
  ];
  const values = ['Sürdürülebilirlik ve döngüsel ekonomi', 'Bilimsel ve veri temelli Ar-Ge', 'Yerli üretim ve teknolojik bağımsızlık', 'Uluslararası güvenlik standartları', 'Yenilikçilik ve sürekli gelişim'];
  return (
    <section id="hakkimizda" className="section about-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label"> HAKKIMIZDA</p>
          <h2 className="section-title">Savunma Endüstrisi Kalitesinde<br /><span>Kompozit Malzeme</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="about-grid">
          {items.map((item, i) => (
            <motion.div key={item.label} className="about-card" initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="card-icon">{item.icon}</div>
              <h3>{item.label}</h3>
              <p className="card-tr">{item.tr}</p>
              <p className="card-en">{item.en}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="values-block" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <p className="section-label"> DEĞERLERİMİZ</p>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div key={v} className="value-item" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }}>
                <span className="value-dot" /><span>{v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { num: 4, suffix: '+', label: 'Hedef Sektör' },
    { num: 100, suffix: '%', label: 'Yerli Ar-Ge' },
    { num: 50, suffix: '%', label: 'Maliyet Avantajı' },
    { num: 0, suffix: '', label: 'Toksisite' },
  ];
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div key={s.label} className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
              <div className="stat-num"><Counter to={s.num} suffix={s.suffix} /></div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: <Shield size={28} />, title: 'Radyasyon Filament', desc: 'Gama, X ışını ve nötron zayıflatıcı 3D yazıcı filament geliştirme. Hibrit seramik + B₄C koruma.' },
    { icon: <Zap size={28} />, title: 'İleri Malzeme Tasarımı', desc: 'İnorganik atık bazlı ileri malzeme tasarımı. Çevresel sürdürülebilirlik ile yüksek performans.' },
    { icon: <Globe size={28} />, title: 'Özel Koruyucu Ekipman', desc: 'Medikal ve endüstriyel koruyucu ekipmanlar için özelleştirilebilir çözümler. IEC/ISO uyumlu.' },
    { icon: <Shield size={28} />, title: 'Savunma & Uzay', desc: 'Hafif kompozit malzeme: İHA, uydu, elektronik harp uygulamaları. Karmaşık geometriler.' },
    { icon: <Microscope size={28} />, title: 'Nükleer Uygulamalar', desc: 'Nükleer enerji tesisleri ve NDT hizmeti için taşınabilir, on-site üretilebilir çözümler.' },
    { icon: <Zap size={28} />, title: 'Prototipleme & Üretim', desc: 'Uygulamaya özel prototipleme ve seri üretim desteği. 90–110 USD/kg fiyat avantajı.' },
  ];
  return (
    <section id="cozumler" className="section services-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label">ÇÖZÜMLERİMİZ</p>
          <h2 className="section-title">Uygulama Alanı Odaklı<br /><span>Hizmetlerimiz</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div key={s.title} className="service-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}
              whileHover={{ y: -6, borderColor: 'rgba(201,149,42,0.6)' }}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="card-corner tl" /><div className="card-corner tr" /><div className="card-corner bl" /><div className="card-corner br" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Infographics() {
  return (
    <section className="section infographic-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label"> SÜREÇ & PAZAR</p>
          <h2 className="section-title">Atık Seramikten <span>İleri Teknoloji</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="infographic-grid">
          <motion.div className="infographic-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="infographic-label">
              <span className="section-label" style={{marginBottom:0}}> AKIŞ ŞEMASI</span>
              <p>Atık seramikten 3D filament üretim süreci, pazar avantajları ve rekabet konumu</p>
            </div>
            <div className="infographic-img-wrap">
              <img src={akisSemasi} alt="Akış Şeması" />
              <div className="infographic-overlay" />
            </div>
          </motion.div>
          <motion.div className="infographic-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="infographic-label">
              <span className="section-label" style={{marginBottom:0}}>HEDEF MÜŞTERİ</span>
              <p>Dört ana müşteri segmenti: Medikal, Savunma, Nükleer Enerji ve Akademik Ar-Ge</p>
            </div>
            <div className="infographic-img-wrap">
              <img src={kullanımAlanlari} alt="Kullanım Alanları" />
              <div className="infographic-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="teknoloji" className="section tech-section">
      <div className="tech-bg-lines" />
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label">TEKNOLOJİMİZ</p>
          <h2 className="section-title">Eklemeli İmalatta<br /><span>Fonksiyonel Malzemelerin Evrimi</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="tech-layout">
          <motion.div className="tech-text" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <p>Eklemeli imalat (AM), geleneksel enerji yoğun üretim yöntemlerinin aksine karmaşık geometrilerin <strong>"near-net shape"</strong> kapasitesiyle üretilmesine olanak tanıyan devrimsel bir teknolojidir.</p>
            <p>Atık seramiklerin polimer matrislerle birleştirilerek fonksiyonel filamentlere dönüştürülmesi, <strong>çevresel sürdürülebilirlik</strong> ile <strong>radyasyon zayıflatma potansiyeli</strong> arasında stratejik bir korelasyon kurar.</p>
            <p>Atık seramik katkılı filamentler, biyobozunur <strong>PLA</strong> ile birleştiğinde geleneksel kurşun bazlı koruyuculara karşı çevre dostu ve maliyet-etkin bir alternatif sunar.</p>
            <div className="tech-tags">
              {['Bor Karbür (B₄C)', 'PLA Matris', 'Nötron Radyasyonu', '3D Filament', 'Atık Seramik', 'Mekanokimyasal'].map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div className="tech-diagram" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="diagram-node main"><span>KCT</span><small>Filament</small></div>
            {['Gama Koruması', 'X-Işını', 'Nötron', 'Hafif', 'Sürdürülebilir'].map((n, i) => (
              <motion.div key={n} className="diagram-node satellite"
                style={{ '--angle': `${i * 72}deg` }}
                animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}>
                {n}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { kriter: 'Hammadde Maliyeti', kurşun: 'Orta', tungsten: '~1.264 USD/kg', kct: '40–60 USD/kg', kctWin: true },
    { kriter: 'Ağırlık', kurşun: 'Çok Yüksek', tungsten: 'Orta', kct: 'Düşük — hafif', kctWin: true },
    { kriter: 'Toksisite (RoHS)', kurşun: 'Yüksek (Pb)', tungsten: 'Yok', kct: 'Yok — kurşunsuz', kctWin: true, kurşunLoss: true },
    { kriter: 'Tasarım Esnekliği', kurşun: 'Yok', tungsten: 'Var', kct: 'Var — mekanokimyasal', kctWin: true, kurşunLoss: true },
    { kriter: 'Sürdürülebilirlik', kurşun: 'Yok', tungsten: 'Yok', kct: 'Var — atık seramik', kctWin: true, kurşunLoss: true },
    { kriter: 'Tedarik (TR)', kurşun: 'İthal', tungsten: '8-16 hafta', kct: 'Yerli — günler', kctWin: true },
  ];
  return (
    <section className="section compare-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label">KARŞILAŞTIRMA</p>
          <h2 className="section-title">KCT vs <span>Geleneksel Malzemeler</span></h2>
          <span className="gold-line" />
        </motion.div>
        <motion.div className="compare-table-wrap" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <table className="compare-table">
            <thead>
              <tr><th>Kriter</th><th>Kurşun (Pb)</th><th>Tungsten Filament</th><th className="kct-col">KCT — Korugan</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr key={r.kriter} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.07 * i }}>
                  <td className="kriter-cell">{r.kriter}</td>
                  <td className={r.kurşunLoss ? 'loss' : ''}>{r.kurşunLoss ? <><XCircle size={14} /> {r.kurşun}</> : r.kurşun}</td>
                  <td>{r.tungsten}</td>
                  <td className="kct-col win"><CheckCircle size={14} /> {r.kct}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function Markets() {
  const markets = [
    { title: 'Medikal & Nükleer Tıp', sub: '1. Segment', desc: 'Radyoloji, nükleer tıp ve diş hekimliği. IEC, ISO uyumlu yerli malzeme. Paravan, maske, koruyucu aparat.', emoji: '🏥' },
    { title: 'Savunma & Uzay', sub: '2. Segment', desc: 'İHA, uydu ve elektronik harp. Aviyonik kart koruması, hafif gövde içi zırh, payload kalkanları.', emoji: '🛡️' },
    { title: 'Nükleer Enerji & NDT', sub: '3. Segment', desc: 'Nükleer santral, radyoaktif depolama, NDT firmaları. On-site 3D baskı ile saha çözümleri.', emoji: '⚛️' },
    { title: 'Akademik Ar-Ge', sub: '4. Segment', desc: 'Üniversiteler ve araştırma merkezleri. Malzeme bilimi, nükleer fizik ve ileri üretim teknolojileri.', emoji: '🔬' },
  ];
  return (
    <section id="pazarlar" className="section markets-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label">UYGULAMA ALANLARI</p>
          <h2 className="section-title">Hedef <span>Pazarlarımız</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="markets-grid">
          {markets.map((m, i) => (
            <motion.div key={m.title} className="market-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
              <div className="market-emoji">{m.emoji}</div>
              <div className="market-sub">{m.sub}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  const phases = [
    { faz: 'Faz 1', sure: '0–9 Ay', title: 'Ar-Ge & Doğrulama', items: ['Mekanokimyasal proses optimizasyonu', 'SEM/XRD/TGA karakterizasyon', 'Pilot ölçek filament üretimi', 'Akredite radyasyon testi'] },
    { faz: 'Faz 2', sure: '9–18 Ay', title: 'Pilot Müşteri', items: ['Savunma sanayii pilot uygulama', 'İHA bileşeni demo & saha testi', 'İlk referans sözleşmesi', 'Patent & marka tescili'] },
    { faz: 'Faz 3', sure: '18–30 Ay', title: 'Seri Üretim & Sertifikasyon', items: ['ISO 9001/13485 kurulumu', 'CE / IEC 61331 belgelendirme', 'Ölçek üretim hattı yatırımı', 'İlk 3 savunma referansı'] },
    { faz: 'Faz 4', sure: '30–48 Ay', title: 'Ölçeklendirme', items: ['Tıbbi & nükleer segmente genişleme', 'İhracat — AB ve MENA', 'Nihai ürün portföyü', 'Kurumsal yatırım turu'] },
  ];
  return (
    <section className="section roadmap-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label">TİCARİLEŞME YOL HARİTASI</p>
          <h2 className="section-title">Ar-Ge'den <span>Global Ölçeğe</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="roadmap-timeline">
          {phases.map((p, i) => (
            <motion.div key={p.faz} className="roadmap-item" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}>
              <div className="rm-header">
                <span className="rm-faz">{p.faz}</span>
                <span className="rm-sure">{p.sure}</span>
              </div>
              <h3>{p.title}</h3>
              <ul>{p.items.map(item => <li key={item}><span className="value-dot" style={{display:'inline-block',marginRight:8}} />{item}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="iletisim" className="section contact-section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-label"> İLETİŞİM</p>
          <h2 className="section-title">Birlikte <span>Yerli Zırhı Üretelim</span></h2>
          <span className="gold-line" />
        </motion.div>
        <div className="contact-layout">
          <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="contact-item">
              <MapPin size={20} color="var(--gold)" />
              <div>
                <strong>Adres</strong>
                <p>Teknopark Ankara<br />İvedik OSB, 2224. Cadde No:1<br />Yenimahalle / Ankara, Türkiye</p>
              </div>
            </div>
            <div className="contact-item">
              <Globe size={20} color="var(--gold)" />
              <div>
                <strong>Web & E-posta</strong>
                <p>korugancomposites.com.tr<br />info@karcomposites.com.tr</p>
              </div>
            </div>
            <div className="contact-logo-wrap">
              <img src={logo} alt="Korugan" />
            </div>
          </motion.div>
          <motion.form className="contact-form" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            onSubmit={e => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group"><label>Ad Soyad</label><input type="text" placeholder="Adınız" /></div>
              <div className="form-group"><label>E-posta</label><input type="email" placeholder="mail@domain.com" /></div>
            </div>
            <div className="form-group"><label>Kurum / Şirket</label><input type="text" placeholder="Kurumunuz" /></div>
            <div className="form-group">
              <label>Konu</label>
              <select>
                <option>Pilot Müşteri Daveti</option>
                <option>Ürün Bilgisi</option>
                <option>Ar-Ge Ortaklığı</option>
                <option>Teklif Talebi</option>
                <option>Yatırım</option>
              </select>
            </div>
            <div className="form-group"><label>Mesajınız</label><textarea rows={4} placeholder="Mesajınızı yazın..." /></div>
            <button type="submit" className="btn-primary full">Gönder <ArrowRight size={16} /></button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={logo} alt="Korugan" />
            <p>Radyasyon zırhlama teknolojisinde<br />yerli ve sürdürülebilir çözümler.</p>
            <p style={{marginTop:8,fontSize:12,color:'var(--gold-dim)'}}>TUSAŞ HANGAR · Teknopark Ankara</p>
          </div>
          <div className="footer-links">
            <h4>Bağlantılar</h4>
            <a href="#hakkimizda">Hakkımızda</a>
            <a href="#cozumler">Çözümler</a>
            <a href="#teknoloji">Teknoloji</a>
            <a href="#pazarlar">Pazarlar</a>
          </div>
          <div className="footer-location">
            <h4>Konum</h4>
            <p>Teknopark Ankara<br />İvedik OSB<br />Yenimahalle / Ankara</p>
            <p style={{marginTop:12,fontSize:12}}>info@karcomposites.com.tr</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-mono">© 2026 KORUGAN COMPOSITES TECHNOLOGIES</span>
          <span className="footer-mono">ALL RIGHTS RESERVED — CONFIDENTIAL</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <HeroNew />
      <About />
      <Stats />
      <Services />
      <Infographics />
      <Technology />
      <ComparisonTable />
      <Markets />
      <Roadmap />
      <Contact />
      <Footer />
    </>
  );
}
