/* Global chrome: nav, footer, floating WhatsApp, NEXT AI Chatbot ------------ */
const { useState, useEffect, useRef } = React;

// Pretty URLs — .htaccess rewrites these to the real .html files server-side.
// Home is '/' since Apache DirectoryIndex auto-serves index.html.
const PAGE_MAP = {
  home: '/',
  what: '/what-we-do',
  who: '/who-we-serve',
  work: '/our-work',
  training: '/training',
  insights: '/insights',
  about: '/about',
  start: '/start'
};

const NAV = [
{ id: 'what', label: 'What We Do' },
{ id: 'who', label: 'Who We Serve' },
{ id: 'work', label: 'Our Work' },
{ id: 'training', label: 'Training' },
{ id: 'insights', label: 'Insights' },
{ id: 'about', label: 'About' }];


function Logo({ onClick, variant = 'white', height = 32 }) {
  const src = 'assets/next-logo-color-transparent.png';
  return (
    <a href="index.html" onClick={(e) => {e.preventDefault();onClick && onClick();}} aria-label="NEXT — home"
    style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img loading="lazy" decoding="async" src={src} alt="NEXT" style={{ display: 'block', width: '220px', height: '50px', objectFit: 'cover', objectPosition: 'center' }} />
    </a>);

}

function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
  }, [open]);

  const goNav = (id) => {setOpen(false);go(id);};

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,0,32,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--purple-line)' : '1px solid transparent',
      transition: 'all .2s ease'
    }}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 72
      }}>
        <Logo onClick={() => goNav('home')} />

        <nav style={{ display: 'none', gap: 28, alignItems: 'center' }} className="nav-desk">
          {NAV.map((n) =>
          <a key={n.id} href={PAGE_MAP[n.id]}
          onClick={(e) => {e.preventDefault();goNav(n.id);}}
          style={{
            fontSize: 14, fontWeight: 500,
            color: page === n.id ? 'var(--mint)' : 'rgba(255,255,255,0.78)',
            letterSpacing: '-0.005em'
          }}>
              {n.label}
            </a>
          )}
        </nav>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn-primary btn-sm" onClick={() => goNav('start')}>
            Start <span className="arr">→</span>
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu"
          className="nav-burger"
          style={{
            width: 44, height: 44, borderRadius: 10,
            border: '1px solid var(--purple-line)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ height: 2, background: 'white', transition: 'all .2s', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
              <span style={{ height: 2, background: 'white', opacity: open ? 0 : 1 }} />
              <span style={{ height: 2, background: 'white', transition: 'all .2s', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open &&
      <div style={{
        position: 'fixed', inset: '72px 0 0 0', zIndex: 49,
        background: 'var(--purple-deep)',
        padding: '32px 24px',
        overflow: 'auto'
      }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[{ id: 'home', label: 'Home' }, ...NAV, { id: 'start', label: 'Start' }].map((n) =>
          <a key={n.id} href={PAGE_MAP[n.id]}
          onClick={(e) => {e.preventDefault();goNav(n.id);}}
          style={{
            padding: '20px 0',
            fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em',
            color: page === n.id ? 'var(--mint)' : 'white',
            borderBottom: '1px solid var(--purple-line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
                <span>{n.label}</span>
                <span style={{ color: 'var(--mint)', fontSize: 20 }}>→</span>
              </a>
          )}
          </nav>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="btn btn-primary" onClick={() => goNav('start')}>
              Take the Free Assessment <span className="arr">→</span>
            </button>
            <a href="https://wa.me/256706028899" className="btn btn-ghost">
              <WhatsAppGlyph /> WhatsApp
            </a>
          </div>
        </div>
      }

      <style>{`
        @media (min-width: 980px) {
          .nav-desk { display: flex !important; }
          .nav-burger { display: none !important; }
        }
      `}</style>
    </header>);

}

function Footer({ go }) {
  return (
    <footer className="section deep" style={{ padding: '80px 0 40px', borderTop: '1px solid var(--purple-line)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid', gap: 48,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
        }}>
          <div>
            <Logo onClick={() => go('home')} />
            <p style={{ marginTop: 20, color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.55, maxWidth: 280 }}>
              Helping African organizations transition from manual systems into intelligent ones.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              {[
                ['LinkedIn', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'],
                ['Instagram', 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'],
                ['YouTube', 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'],
                ['X', 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z']
              ].map(([label, path]) =>
              <a key={label} href="#" aria-label={label} style={{
                width: 40, height: 40, borderRadius: 999,
                border: '1px solid var(--purple-line)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)', transition: 'border-color .2s, color .2s'
              }}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg></a>
              )}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Services</div>
            <FooterLinks items={[
            ['AI Integration & Automation', 'what'],
            ['Digital Infrastructure', 'what'],
            ['AI Training & Education', 'training'],
            ['Creative AI Media', 'what'],
            ['Smart Operations Consulting', 'what']]
            } go={go} />
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Company</div>
            <FooterLinks items={[
            ['About', 'about'],
            ['Our Work', 'work'],
            ['Training', 'training'],
            ['Insights', 'insights'],
            ['Start', 'start']]
            } go={go} />
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Contact</div>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              hello@nextafrica.ai<br />
              +256 706 028 899<br />
              Kampala · Uganda
            </p>
            <a href="https://wa.me/256706028899" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
              <WhatsAppGlyph dark /> WhatsApp Us
            </a>
          </div>
        </div>

        <div style={{
          marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--purple-line)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          fontSize: 13, color: 'rgba(255,255,255,0.55)'
        }}>
          <div>© 2026 NEXT · Africa's Intelligent Future Starts Here.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>);

}

function FooterLinks({ items, go }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(([label, id]) =>
      <li key={label}>
          <a href={PAGE_MAP[id]} onClick={(e) => {e.preventDefault();go(id);}}
        style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)' }}>{label}</a>
        </li>
      )}
    </ul>);

}

function WhatsAppGlyph({ dark = false, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M17.6 14.3c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"
      fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-2.9-1.3-4.5 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.6 8.4-8 8.4z"
      fill="currentColor" />
    </svg>);

}

function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/256706028899"
    aria-label="Chat with NEXT on WhatsApp"
    style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 60,
      width: 60, height: 60, borderRadius: 999,
      background: '#25D366', color: 'white',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 12px 40px -8px rgba(37,211,102,0.55), 0 0 0 4px rgba(37,211,102,0.18)'
    }}>
      <WhatsAppGlyph size={28} />
    </a>);

}

/* NEXT AI Chatbot ----------------------------------------------------------- */
function ChatBot({ go }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
  { from: 'bot', text: "Hi — I'm NEXT AI. I help organizations across East Africa figure out their next move with AI. What kind of organization are you with?" }]
  );
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy, showLeadCapture]);

  const chips = [
  { label: "I'm an NGO", send: "I'm with an NGO — what can NEXT do for us?" },
  { label: "I run a school", send: "I run a school in East Africa." },
  { label: "Show me case studies", send: "Can you show me case studies?", action: () => go('work') },
  { label: "Book a discovery call", send: "I'd like to book a discovery call.", action: () => {go('start');setOpen(false);} }];


  const send = async (msg) => {
    if (!msg.trim()) return;
    const userMsg = { from: 'user', text: msg };
    setMessages((m) => [...m, userMsg]);
    setText('');
    setBusy(true);

    // Scripted fallback reply (no Claude API in static export)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: "Tell me a bit more — what's the biggest operational headache in your organization right now? I can point you to the right place on this site." }]);
      setBusy(false);
      if (messages.length > 4) setShowLeadCapture(true);
    }, 1200);
  };

  return (
    <>
      {/* Launcher */}
      <button onClick={() => setOpen(!open)}
      style={{
        position: 'fixed', bottom: 96, right: 24, zIndex: 60,
        background: 'var(--mint)', color: 'var(--purple)',
        padding: '14px 18px', borderRadius: 999,
        fontWeight: 600, fontSize: 14,
        display: 'inline-flex', alignItems: 'center', gap: 10,
        boxShadow: '0 12px 40px -8px rgba(0,252,143,0.5), 0 0 0 1px rgba(0,252,143,0.6)'
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--purple)' }} />
        {open ? 'Close NEXT AI' : 'Chat with NEXT AI'}
      </button>

      {open &&
      <div style={{
        position: 'fixed',
        right: 24, bottom: 168,
        width: 'min(380px, calc(100vw - 48px))',
        height: 'min(620px, calc(100vh - 200px))',
        background: 'var(--purple-deep)',
        border: '1px solid var(--purple-line)',
        borderRadius: 20,
        zIndex: 60,
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,252,143,0.18)'
      }}>
          <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--purple-line)',
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'linear-gradient(180deg, rgba(0,252,143,0.08), transparent)'
        }}>
            <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--mint)', color: 'var(--purple)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, letterSpacing: '-0.04em'
          }}>N</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>NEXT AI</div>
              <div style={{ fontSize: 11, color: 'var(--mint)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--mint)' }} />
                ONLINE · LIVE PRODUCT DEMO
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22, padding: 4 }}>×</button>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) =>
          <div key={i} style={{
            alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            padding: '12px 14px',
            borderRadius: 14,
            fontSize: 14, lineHeight: 1.5,
            background: m.from === 'user' ? 'var(--mint)' : 'var(--purple-mid)',
            color: m.from === 'user' ? 'var(--purple)' : 'white',
            border: m.from === 'user' ? 'none' : '1px solid var(--purple-line)'
          }}>{m.text}</div>
          )}
            {busy &&
          <div style={{ alignSelf: 'flex-start', padding: '12px 14px', borderRadius: 14, background: 'var(--purple-mid)', display: 'inline-flex', gap: 4 }}>
                <Dot delay={0} /><Dot delay={150} /><Dot delay={300} />
              </div>
          }
            {showLeadCapture &&
          <div style={{
            marginTop: 8, padding: 16,
            background: 'rgba(255,180,0,0.08)',
            border: '1px solid rgba(255,180,0,0.3)',
            borderRadius: 14
          }}>
                <div className="eyebrow gold" style={{ marginBottom: 8 }}>NEXT STEP</div>
                <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 12 }}>
                  Want a real plan? Book a free 30-minute discovery call.
                </div>
                <button className="btn btn-gold btn-sm" onClick={() => {go('start');setOpen(false);}}>
                  Book a call <span className="arr">→</span>
                </button>
              </div>
          }
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--purple-line)' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {chips.map((c) =>
            <button key={c.label} onClick={() => {c.action && c.action();send(c.send);}}
            style={{
              fontSize: 12, padding: '6px 10px',
              borderRadius: 999,
              background: 'transparent',
              border: '1px solid var(--purple-line)',
              color: 'rgba(255,255,255,0.85)'
            }}>{c.label}</button>
            )}
            </div>
            <form onSubmit={(e) => {e.preventDefault();send(text);}} style={{ display: 'flex', gap: 8 }}>
              <input value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Ask NEXT AI anything…"
            style={{
              flex: 1, background: 'var(--purple)', border: '1px solid var(--purple-line)',
              color: 'white', padding: '12px 14px', borderRadius: 12, outline: 'none'
            }} />
              <button type="submit" className="btn btn-primary btn-sm" disabled={!text.trim() || busy}
            style={{ padding: '0 16px' }}>
                <span className="arr">→</span>
              </button>
            </form>
          </div>
        </div>
      }
    </>);

}

function Dot({ delay = 0 }) {
  return <span style={{
    width: 6, height: 6, borderRadius: 999, background: 'var(--mint)',
    animation: 'dotBlink 1s infinite', animationDelay: `${delay}ms`
  }} />;
}

/* Hero neural-net (geometric, decorative — not figurative) ------------------ */
function NeuralBg() {
  const nodes = [];
  const cols = 9,rows = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const jitterX = (c * 37 + r * 13) % 17 - 8;
      const jitterY = (c * 11 + r * 29) % 13 - 6;
      nodes.push({ x: c * 12 + 4 + jitterX * 0.4, y: r * 18 + 8 + jitterY * 0.3, r: r % 2 === 0 ? 0.6 : 0.4 });
    }
  }
  const edges = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      if (c < cols - 1) edges.push([i, i + 1]);
      if (r < rows - 1) edges.push([i, i + cols]);
    }
  }
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#00FC8F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00FC8F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#glow)" />
      {edges.map(([a, b], i) => {
        const A = nodes[a],B = nodes[b];
        return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
        stroke="#00FC8F" strokeOpacity={i % 17 / 80 + 0.05} strokeWidth="0.08" />;
      })}
      {nodes.map((n, i) =>
      <circle key={i} cx={n.x} cy={n.y} r={n.r}
      fill="#00FC8F"
      opacity={i % 7 / 12 + 0.25}>
          <animate attributeName="opacity" values={`${i % 7 / 12 + 0.2};${i % 7 / 12 + 0.6};${i % 7 / 12 + 0.2}`} dur={`${3 + i % 5}s`} repeatCount="indefinite" />
        </circle>
      )}
    </svg>);

}

Object.assign(window, { Nav, Footer, FloatingWhatsApp, ChatBot, WhatsAppGlyph, NeuralBg, Logo, PAGE_MAP });
