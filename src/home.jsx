/* HOME ---------------------------------------------------------------------- */
const { useState: useStateH } = React;

function Home({ go }) {
  return (
    <div className="page">
      {/* Fixed neural clusters — portaled to body so they're not trapped by .page's transform */}
      <NeuralScrollClusters />

      {/* Hero */}
      <section className="neural-hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <NeuralBg />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(0,252,143,0.12), transparent 60%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />
        <div className="wrap" style={{ position: 'relative', padding: '120px 24px 80px', textAlign: 'center', zIndex: 2 }}>
          <div className="tag neural-fade-in" style={{ marginBottom: 28, animationDelay: '0.1s' }}>
            <span className="dot" /> AI & DIGITAL TRANSFORMATION · EAST AFRICA
          </div>
          <div className="neural-text-container">
            <h1 className="h-display" style={{ marginBottom: 24, color: '#fff' }}>
              <span className="typewriter-text">africa's intelligent future starts here</span>
            </h1>
          </div>
          <div className="neural-subtitle-container">
            <p className="lede neural-subtitle-text" style={{ margin: '0 auto 40px', maxWidth: 640 }}>
              We help <span className="highlight">African organizations</span> transform their operations through <span className="highlight">AI, automation, and intelligent digital systems</span> — so they can <span className="highlight">lead, not just survive</span>.
            </p>
          </div>
          <div className="row cta-stack neural-fade-in" style={{ justifyContent: 'center', animationDelay: '0.8s' }}>
            <button className="btn btn-primary" onClick={() => go('start')}>
              Start Your Transformation <span className="arr">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => go('work')}>See Our Work</button>
          </div>

          <div className="neural-fade-in" style={{
            marginTop: 64, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32,
            color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase',
            animationDelay: '1s'
          }}>
            <span>Trusted across</span>
            <span>Uganda</span><span>Kenya</span><span>Rwanda</span><span>Tanzania</span><span>Ethiopia</span>
          </div>

          {/* Partner / client logos placeholder strip */}
          <div className="neural-fade-in" style={{
            marginTop: 32, display: 'grid', gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto',
            animationDelay: '1.2s'
          }}>
            {[1,2,3,4,5].map(n => (
              <div key={n} className="imgph" style={{ aspectRatio: '5/2', borderRadius: 8 }}>
                <span className="lbl">// Logo {n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section dark" style={{ borderTop: '1px solid var(--purple-line)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 64, alignItems: 'flex-end' }} className="grid-stack">
            <h2 className="h-1">Most African organizations are running <span style={{ color: 'var(--mint)' }}>2005 systems</span> in a 2026 world.</h2>
            <p className="body" style={{ maxWidth: 480 }}>
              Manual processes. Disconnected teams. Missed opportunities. NEXT exists to close that gap — permanently.
            </p>
          </div>

          <div style={{
            marginTop: 64,
            display: 'grid', gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
          }}>
            {[
            { stat: '78%', body: 'of African organizations still rely on manual processes for core operations.' },
            { stat: '3×', body: 'more efficient — and 2× more competitive — for organizations that go intelligent.' },
            { stat: '60%', body: 'reduction in operational waste delivered by NEXT engagements.' }].
            map((s) =>
            <div key={s.stat} className="card">
                <div style={{ fontSize: 'clamp(56px, 6vw, 84px)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--mint)', lineHeight: 1 }}>
                  {s.stat}
                </div>
                <p className="body" style={{ marginTop: 16, marginBottom: 0 }}>{s.body}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section light">
        <div className="wrap">
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <div className="eyebrow dark" style={{ marginBottom: 16 }}>OUR SERVICES</div>
            <h2 className="h-1" style={{ color: 'var(--purple)' }}>
              Everything Your Organization Needs to Transition Into the Intelligent Era.
            </h2>
          </div>
          <div style={{
            display: 'grid', gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
          }}>
            {SERVICES.map((s, i) =>
            <button key={s.id} onClick={() => go('what')} className="card-light" style={{ textAlign: 'left', cursor: 'pointer' }}>
                <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--purple)', color: 'var(--mint)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14, marginBottom: 20
              }}>0{i + 1}</div>
                <h3 className="h-3" style={{ color: 'var(--purple)', marginBottom: 12 }}>{s.title}</h3>
                <p className="body dark" style={{ margin: 0 }}>{s.lede}</p>
                <div style={{ marginTop: 24, color: 'var(--purple)', fontWeight: 600, fontSize: 14 }}>
                  Learn more <span style={{ color: 'var(--mint)' }}>→</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>HOW NEXT WORKS</div>
          <h2 className="h-1" style={{ marginBottom: 56, maxWidth: 800 }}>From Where You Are. To Where You Need to Be.</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {PROCESS.map((p, i) =>
            <div key={p.title} style={{ position: 'relative' }}>
                <div style={{
                fontSize: 13,
                color: 'var(--mint)', fontFamily: 'JetBrains Mono, monospace',
                marginBottom: 16, lineHeight: "2", letterSpacing: "2.6px", padding: "0px", textAlign: "left"
              }}>STEP 0{i + 1}</div>
                <div style={{
                fontWeight: 700,
                letterSpacing: '-0.06em', lineHeight: 1, color: 'white',
                marginBottom: 12, height: "84px", width: "258px", fontSize: "66px"
              }}>{p.title}</div>
                <p className="body" style={{ marginTop: 0 }}>{p.body}</p>
                {i < PROCESS.length - 1 &&
              <div className="step-arr" style={{
                position: 'absolute', top: 32, right: -8,
                color: 'var(--mint)', opacity: 0.4, textAlign: "right", letterSpacing: "29.5px", fontSize: "25px", lineHeight: "3.25"
              }}>→</div>
              }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="section white">
        <div className="wrap">
          <div className="eyebrow dark" style={{ marginBottom: 16 }}>IMPACT IN NUMBERS</div>
          <div style={{
            marginTop: 32,
            display: 'grid', gap: 32,
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))'
          }}>
            {[
            ['50+', 'Organizations Transformed'],
            ['500+', 'Team Members Trained in AI'],
            ['100+', 'Systems Built & Deployed'],
            ['5', 'Countries Served']].
            map(([n, l]) =>
            <div key={l} style={{ borderTop: '1px solid rgba(20,0,53,0.15)', paddingTop: 24 }}>
                <div style={{ fontSize: 'clamp(64px, 7vw, 104px)', fontWeight: 700, color: 'var(--purple)', letterSpacing: '-0.04em', lineHeight: 1 }}>{n}</div>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 500, color: 'var(--muted-on-light)' }}>{l}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="section dark">
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>FEATURED WORK</div>
              <h2 className="h-1" style={{ maxWidth: 600 }}>Proof, not promises.</h2>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => go('work')}>See all case studies <span className="arr">→</span></button>
          </div>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {CASES.slice(0, 3).map((c) => <CaseCard key={c.title} c={c} go={go} />)}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section light">
        <div className="wrap">
          <div className="eyebrow dark" style={{ marginBottom: 16 }}>WHO WE SERVE</div>
          <h2 className="h-1" style={{ color: 'var(--purple)', marginBottom: 40, maxWidth: 700 }}>
            Built for the organizations rebuilding Africa.
          </h2>
          <div style={{
            display: 'grid', gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
          }}>
            {INDUSTRIES.map((i) =>
            <button key={i.title} onClick={() => go('who')} className="card-light"
            style={{ textAlign: 'left', padding: 0, cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {i.image ? (
                  <img loading="lazy" decoding="async" src={i.image} alt={i.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="imgph light" style={{ aspectRatio: '4/3', borderRadius: 0, border: 0 }}>
                    <span className="lbl">// Image — {i.title}</span>
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--purple)', letterSpacing: '-0.02em' }}>{i.title}</div>
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--muted-on-light)' }}>{i.short}</div>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Training Spotlight */}
      <section className="section dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,180,0,0.18), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <div className="tag gold" style={{ marginBottom: 20 }}><span className="dot" /> NEXT AI TRAINING</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 48, alignItems: 'center' }} className="grid-stack">
            <h2 className="h-1">Is Your Team Ready for the Age of AI? <span style={{ color: 'var(--gold)' }}>We'll Get Them There.</span></h2>
            <div>
              <p className="body" style={{ marginTop: 0 }}>
                Practical, hands-on AI education designed for African professionals — from executive seminars to 3-day transformation bootcamps.
              </p>
              <button className="btn btn-gold" style={{ marginTop: 16 }} onClick={() => go('training')}>
                See upcoming sessions <span className="arr">→</span>
              </button>
            </div>
          </div>
          <div style={{
            marginTop: 48, display: 'grid', gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
          }}>
            {UPCOMING_TRAINING.slice(0, 3).map((t) =>
            <div key={t.title} className="card" style={{ borderColor: 'rgba(255,180,0,0.25)', padding: 0, overflow: 'hidden' }}>
                {t.image ? (
                  <img loading="lazy" decoding="async" src={t.image} alt={t.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="imgph" style={{ aspectRatio: '16/9', borderRadius: 0, border: 0 }}>
                    <span className="lbl">// Image — {t.title}</span>
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <div className="mono" style={{ color: 'var(--gold)', marginBottom: 12 }}>{t.date.toUpperCase()} · {t.format.toUpperCase()}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{t.title}</div>
                  <button className="btn btn-ghost btn-sm" onClick={() => go('training')}>Register <span className="arr">→</span></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'var(--purple)', padding: '120px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(255,180,0,0.12), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <h2 className="h-display" style={{ maxWidth: 1000, margin: '0 auto 24px' }}>
            Your Organization's Transformation Starts with <span style={{ color: 'var(--gold)' }}>One Conversation.</span>
          </h2>
          <p className="lede" style={{ margin: '0 auto 40px', maxWidth: 640 }}>
            Take the free AI Readiness Assessment and discover exactly where your organization stands — and what comes next.
          </p>
          <button className="btn btn-gold" onClick={() => go('start')}>
            Take the Free Assessment <span className="arr">→</span>
          </button>
        </div>
      </section>
    </div>);

}

function CaseCard({ c, go }) {
  return (
    <button onClick={() => go('work')} className="card" style={{ textAlign: 'left', cursor: 'pointer', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {c.image ? (
        <img loading="lazy" decoding="async" src={c.image} alt={c.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div className="imgph mint" style={{ aspectRatio: '4/3', borderRadius: 0, border: 0 }}>
          <span className="lbl">// {c.imgLabel}</span>
        </div>
      )}
      <div style={{ padding: 24 }}>
        <div className="mono" style={{ color: 'var(--mint)', marginBottom: 8 }}>{c.industry.toUpperCase()}</div>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, letterSpacing: '-0.01em' }}>{c.title}</div>
        <p className="body" style={{ margin: 0 }}>{c.preview}</p>
        <div style={{ marginTop: 20, fontSize: 14, fontWeight: 600, color: 'var(--mint)' }}>Read the story →</div>
      </div>
    </button>);

}

const SERVICES = [
{ id: 'ai-integration', title: 'AI Integration & Automation', lede: 'Connect your operations to AI. Automate the work that slows you down.', image: 'assets/ai-integration-automation.jpg' },
{ id: 'infra', title: 'Digital Infrastructure', lede: 'Build the digital foundation your organization needs to operate at scale.' },
{ id: 'training', title: 'AI Training & Education', lede: 'Equip your team to think, work, and lead in the age of AI.' },
{ id: 'media', title: 'Creative AI Media', lede: 'Tell your story with AI-powered content, campaigns, and digital storytelling.' },
{ id: 'consulting', title: 'Smart Operations Consulting', lede: 'Redesign your operations for intelligence, speed, and efficiency.' }];

const PROCESS = [
{ title: 'ASSESS', body: 'We start by understanding your organization — your systems, your gaps, and your goals.' },
{ title: 'DESIGN', body: 'We build a custom transformation roadmap that fits your reality and your ambition.' },
{ title: 'BUILD', body: 'We implement AI systems, digital tools, and intelligent workflows tailored to your needs.' },
{ title: 'TRANSFORM', body: 'Your organization emerges more efficient, more capable, and more future-ready.' }];

const INDUSTRIES = [
{ title: 'NGOs & Development', short: 'Donor reporting, impact, field teams.', image: 'assets/ngo-team-data-analysis.jpg' },
{ title: 'Schools & Universities', short: 'LMS, AI literacy, admin automation.', image: 'assets/school-classroom-teacher.jpg' },
{ title: 'Churches & Faith', short: 'Members, giving, communication.', image: 'assets/church-building.jpg' },
{ title: 'Corporations', short: 'CRM, AI service, ops automation.', image: 'assets/corporate-collaboration.jpg' },
{ title: 'Government', short: 'Service delivery, citizen comms.', image: 'assets/government-meeting.jpg' },
{ title: 'Healthcare', short: 'Patient flow, comms, dashboards.', image: 'assets/healthcare-digital-health.jpg' }];

const CASES = [
{ title: 'A school of 2,400 students switches to AI-powered reporting and saves 100 admin hours a month',
  industry: 'Schools', imgLabel: 'Image — school staff collaborating with digital dashboards',
  image: 'assets/school-dashboard-team.jpg',
  preview: 'A custom learning management system with AI attendance tracking, fee management, and real-time parent communication.' },
{ title: 'A 40-school district replaces paper attendance with one dashboard',
  industry: 'Schools', imgLabel: 'Image — secondary school staff using LMS, Mbarara',
  image: 'assets/school-district-collaboration.jpg',
  preview: 'A regional school network in Western Uganda automated attendance, parent communication, and admin reporting in 12 weeks.' },
{ title: 'How a national NGO cut donor-report turnaround from 3 weeks to 2 days',
  industry: 'NGOs', imgLabel: 'Image — programme officer with field tablet',
  image: 'assets/ngo-field-officer-tablet.jpg',
  preview: 'Beneficiary data, M&E, and donor dashboards unified into one intelligent system across 7 field offices.' },
{ title: 'A church federation moves giving and member care online — without losing the human touch',
  industry: 'Churches', imgLabel: 'Image — congregation, multi-campus deployment',
  preview: 'Custom church management platform with AI-assisted pastoral communication for 14 congregations.' },
{ title: 'Hospital triage WhatsApp bot handles 8,000 patient queries a month',
  industry: 'Healthcare', imgLabel: 'Image — clinic staff, Kampala teaching hospital',
  preview: 'A bilingual WhatsApp triage assistant deflects routine queries and books appointments — freeing nurses for patients.' },
{ title: 'A government agency goes paperless on citizen service requests',
  industry: 'Government', imgLabel: 'Image — public service desk modernization',
  preview: 'Digital service delivery and citizen communication platform deployed across 4 regional offices.' },
{ title: 'A regional retailer turns WhatsApp into its highest-converting sales channel',
  industry: 'Corporations', imgLabel: 'Image — operations team reviewing CRM dashboards',
  preview: 'AI customer service + sales intelligence layered onto existing WhatsApp Business — orders up 38%.' }];

const UPCOMING_TRAINING = [
{ title: 'AI Executive Seminar', date: 'Jun 14, 2026', format: 'Kampala · In-person', image: 'assets/next-logo-executive-seminar.png' },
{ title: 'AI for Schools (2 Days)', date: 'Jun 22, 2026', format: 'Nairobi · In-person', image: 'assets/ai-schools-robot-teaching.jpg' },
{ title: 'AI Transformation Bootcamp', date: 'Jul 08, 2026', format: 'Kigali · 3 days', image: 'assets/ai-bootcamp-kampala.png' },
{ title: 'AI Staff Workshop', date: 'Jul 19, 2026', format: 'Online · Live' }];

/* NeuralCluster — small animated neural net for hero corners ---------------- */
function NeuralScrollClusters() {
  const [container] = React.useState(() => {
    let el = document.getElementById('neural-scroll-portal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'neural-scroll-portal';
      el.className = 'neural-scroll-clusters';
      document.body.appendChild(el);
    }
    return el;
  });
  React.useEffect(() => {
    return () => {
      // Keep the node mounted; just don't clean up so it persists across re-renders
    };
  }, []);
  return ReactDOM.createPortal(
    <React.Fragment>
      <div className="neural-network-cluster left-top"><NeuralCluster seed={1} /></div>
      <div className="neural-network-cluster left-bottom"><NeuralCluster seed={2} /></div>
      <div className="neural-network-cluster right-top"><NeuralCluster seed={3} /></div>
      <div className="neural-network-cluster right-bottom"><NeuralCluster seed={4} /></div>
    </React.Fragment>,
    container
  );
}

function NeuralCluster({ seed = 1 }) {
  // Deterministic pseudo-random based on seed
  const rand = (i) => {
    const x = Math.sin(seed * 100 + i) * 10000;
    return x - Math.floor(x);
  };
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: 10 + rand(i) * 80,
    y: 10 + rand(i + 100) * 80,
    r: 1.5 + rand(i + 200) * 2,
    delay: rand(i + 300) * 4
  }));
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 35) edges.push([i, j, dist]);
    }
  }
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
      {edges.map(([a, b, d], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#00FC8F" strokeOpacity={Math.max(0.05, 0.3 - d / 100)} strokeWidth="0.25">
          <animate attributeName="stroke-opacity"
            values={`${Math.max(0.05, 0.15 - d / 200)};${Math.max(0.1, 0.4 - d / 100)};${Math.max(0.05, 0.15 - d / 200)}`}
            dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
        </line>
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="#00FC8F">
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3)}s`}
            begin={`${n.delay}s`} repeatCount="indefinite" />
          <animate attributeName="r" values={`${n.r};${n.r * 1.5};${n.r}`} dur={`${2 + (i % 3)}s`}
            begin={`${n.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

Object.assign(window, { Home, CaseCard, NeuralCluster, NeuralScrollClusters, SERVICES, PROCESS, INDUSTRIES, CASES, UPCOMING_TRAINING });
