/* What We Do · Who We Serve · Our Work -------------------------------------- */

const SERVICE_DETAILS = [
  {
    id: 'ai-integration',
    n: '01',
    title: 'AI Integration & Automation',
    image: 'assets/ai-integration-automation.jpg',
    what: "We connect your organization's core operations to the power of artificial intelligence. From AI customer support bots to intelligent reporting systems, we automate the work that slows you down and put smart tools in the hands of your team.",
    get: [
      'AI-powered WhatsApp bots for customer communication',
      'Automated reporting and data dashboards',
      'CRM automation and intelligent follow-up systems',
      'AI scheduling, booking, and workflow automation',
      'AI analytics — real-time insights on your operations',
    ],
    best: 'Businesses, NGOs, hospitals, and schools that want to reduce manual work and respond to people faster and smarter.',
  },
  {
    id: 'infra',
    n: '02',
    title: 'Digital Infrastructure',
    image: 'assets/digital-infrastructure.jpg',
    what: 'We build the digital foundation your organization needs to operate at scale. From websites and portals to full internal operating systems, we create the infrastructure that runs your organization intelligently.',
    get: [
      'Professional websites — fast, mobile-first, conversion-optimized',
      'Portals and dashboards — internal management systems',
      'LMS platforms — learning management systems for schools and training organizations',
      'NGO & church management systems',
      'HR, finance, and operations platforms',
      'Mobile applications',
    ],
    best: 'Any organization that needs a strong digital presence and internal systems to manage their operations professionally.',
  },
  {
    id: 'training',
    n: '03',
    title: 'AI Training & Education',
    image: 'assets/ai-training-education.jpg',
    what: 'We equip your team, leadership, and organization to understand, adopt, and leverage AI effectively. This is not generic tech training — it is practical, hands-on AI education designed for African professionals and institutions.',
    get: [
      'Executive AI Seminars — strategic understanding for leadership',
      'Staff AI Workshops — hands-on tools and productivity training',
      'AI for Schools programs — curriculum and teacher training',
      'AI Literacy Bootcamps — from beginner to competent in 2 days',
      'Custom AI onboarding for newly deployed systems',
    ],
    best: 'Organizations rolling out new AI systems, schools building AI literacy programs, and leadership teams preparing for digital transformation.',
  },
  {
    id: 'media',
    n: '04',
    title: 'Creative AI Media',
    image: 'assets/creative-ai-media.jpg',
    what: 'We help organizations tell their stories more powerfully using AI-assisted content systems, media production, and digital campaigns. We combine strategic storytelling with AI production tools to create content that moves people.',
    get: [
      'AI-powered content strategy and calendar systems',
      'AI-assisted video production and editing workflows',
      'Brand identity and messaging systems',
      'Social media content automation',
      'Campaign generation and digital storytelling',
    ],
    best: 'NGOs, churches, schools, and brands that want to amplify their communication and tell their stories more effectively.',
  },
  {
    id: 'consulting',
    n: '05',
    title: 'Smart Operations Consulting',
    image: 'assets/smart-operations-consulting.jpg',
    what: "We map, analyze, and redesign your organization's operations for intelligence, speed, and efficiency. We don't just observe — we build. Every consultation ends with a clear transformation roadmap and the systems to execute it.",
    get: [
      'Organizational intelligence audit — where are you losing time and money?',
      'AI workflow mapping — which processes should be automated?',
      'Digital transition planning — how do you move from manual to intelligent?',
      'Systems optimization — restructure operations for peak performance',
      'Ongoing advisory — NEXT as your permanent strategic technology partner',
    ],
    best: 'Organizations undergoing change, scaling up, or preparing for digital transformation who need expert strategic guidance.',
  },
];

function WhatWeDo({ go }) {
  return (
    <div className="page">
      <PageHero
        eyebrow="WHAT WE DO"
        h1={<>We Don't Just Implement Technology.<br/><span style={{ color: 'var(--mint)' }}>We Transform Organizations.</span></>}
        sub="Every service NEXT delivers is designed with one goal: to move your organization from where it is today to where it needs to be tomorrow."
      />

      {/* Anchor nav */}
      <section className="section deep tight" style={{ paddingTop: 0, position: 'sticky', top: 72, zIndex: 10, background: 'rgba(10,0,32,0.85)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--purple-line)' }}>
        <div className="wrap" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '20px 24px' }}>
          {SERVICE_DETAILS.map(s => (
            <a key={s.id} href={`#${s.id}`} style={{
              padding: '10px 16px', borderRadius: 999,
              border: '1px solid var(--purple-line)',
              fontSize: 13, whiteSpace: 'nowrap',
              color: 'rgba(255,255,255,0.85)',
            }}>
              <span style={{ color: 'var(--mint)', marginRight: 6 }}>{s.n}</span>{s.title}
            </a>
          ))}
        </div>
      </section>

      {SERVICE_DETAILS.map((s, i) => (
        <section key={s.id} id={s.id} className={`section ${i % 2 === 0 ? 'dark' : 'deep'}`}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.4fr) minmax(0, 1fr)', gap: 64 }} className="grid-stack">
              <div>
                <div className="mono" style={{ color: 'var(--mint)', marginBottom: 12 }}>SERVICE {s.n}</div>
                <h2 className="h-1" style={{ marginBottom: 32 }}>{s.title}</h2>
                {s.image ? (
                  <img loading="lazy" decoding="async" src={s.image} alt={s.title} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 'var(--radius)', display: 'block' }} />
                ) : (
                  <div className="imgph mint" style={{ aspectRatio: '4/5' }}>
                    <span className="lbl">// Image — {s.title}</span>
                  </div>
                )}
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>WHAT IT IS</div>
                <p className="body" style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.88)', marginBottom: 40 }}>{s.what}</p>

                <div className="eyebrow" style={{ marginBottom: 16 }}>WHAT YOU GET</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {s.get.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--mint)', fontWeight: 700, marginTop: 4 }}>—</span>
                      <span className="body" style={{ color: 'rgba(255,255,255,0.88)' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="eyebrow" style={{ marginBottom: 12 }}>BEST FOR</div>
                <p className="body" style={{ marginBottom: 32 }}>{s.best}</p>

                <button className="btn btn-primary" onClick={() => go('start')}>
                  Talk about this for your team <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing philosophy */}
      <section className="section light">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <div className="eyebrow dark" style={{ marginBottom: 16 }}>PRICING PHILOSOPHY</div>
          <h2 className="h-2" style={{ color: 'var(--purple)', marginBottom: 24 }}>How NEXT Prices.</h2>
          <p className="body dark" style={{ fontSize: 18, lineHeight: 1.6 }}>
            NEXT does not publish fixed prices because every organization is different. What we do promise is this: <strong style={{ color: 'var(--purple)' }}>every investment in NEXT is designed to return more than it costs</strong> — in time saved, capacity gained, and impact amplified. Contact us for a custom proposal.
          </p>
          <button className="btn btn-dark" onClick={() => go('start')} style={{ marginTop: 32 }}>
            Request a custom proposal <span className="arr">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* WHO WE SERVE -------------------------------------------------------------- */
const AUDIENCES = [
  {
    id: 'ngo', 
    title: 'NGOs & Development Organizations', 
    accent: 'var(--mint)',
    image: 'assets/ngo-team-data-analysis.jpg',
    challenge: "You're working to change lives — but your internal systems are fragmented, your reporting is manual, your communication is scattered, and your team spends more time managing data than delivering impact.",
    helps: [
      'Automated donor reporting and impact dashboards',
      'Beneficiary management systems',
      'AI communication tools for field teams and partners',
      'Digital grant tracking and compliance systems',
      'Staff AI training to multiply organizational capacity',
    ],
  },
  {
    id: 'schools', 
    title: 'Schools & Universities', 
    accent: 'var(--mint)',
    image: 'assets/school-classroom-teacher.jpg',
    challenge: 'Your institution is preparing students for a world being reshaped by AI — but your systems, curriculum, and staff may not yet be ready for that world. You need to modernize without disrupting what makes you great.',
    helps: [
      'Learning Management Systems (LMS) with AI integration',
      'AI literacy programs for teachers and students',
      'Administrative automation — admissions, attendance, communications',
      'Parent communication portals',
      'Digital content creation systems for educators',
    ],
  },
  {
    id: 'churches', 
    title: 'Churches & Faith Organizations', 
    accent: 'var(--gold)',
    image: 'assets/church-building.jpg',
    challenge: 'Your congregation is spread across multiple locations, your communication is inconsistent, your giving and records systems are manual, and your ability to serve and engage your community is limited by outdated tools.',
    helps: [
      'Church management systems — members, giving, attendance',
      'AI communication tools for pastors and leaders',
      'Digital giving and stewardship platforms',
      'Content creation systems for sermons, events, and campaigns',
      'AI-powered community engagement tools',
    ],
  },
  {
    id: 'corp', 
    title: 'Corporations & Businesses', 
    accent: 'var(--mint)',
    image: 'assets/corporate-collaboration.jpg',
    challenge: "Your competitors are becoming smarter, faster, and more efficient. Customers expect instant responses, seamless experiences, and intelligent service. If your operations haven't evolved, you're already behind.",
    helps: [
      'AI customer service and WhatsApp automation',
      'Operations and workflow automation',
      'CRM and sales intelligence systems',
      'HR and team management platforms',
      'AI analytics and business intelligence dashboards',
    ],
  },
  {
    id: 'gov', 
    title: 'Government & Public Sector', 
    accent: 'var(--gold)',
    image: 'assets/government-meeting.jpg',
    challenge: 'Government institutions face massive service demand with limited resources. Manual systems create bottlenecks, reduce accountability, and slow service delivery to citizens.',
    helps: [
      'Digital service delivery platforms',
      'Citizen communication and information systems',
      'Data management and reporting systems',
      'Staff AI training and digital literacy programs',
      'Smart operations consulting for government agencies',
    ],
  },
  {
    id: 'health', 
    title: 'Hospitals & Healthcare Organizations', 
    accent: 'var(--mint)',
    image: 'assets/healthcare-digital-health.jpg',
    challenge: 'Healthcare organizations manage enormous amounts of sensitive information across complex workflows. Manual systems create errors, slow response times, and compromise patient experience.',
    helps: [
      'Patient management and communication systems',
      'Automated appointment scheduling and reminders',
      'Staff communication and coordination platforms',
      'Health data dashboards and reporting',
      'AI administrative tools to reduce clinical staff burden',
    ],
  },
];

function WhoWeServe({ go }) {
  return (
    <div className="page">
      {/* Full-bleed image hero — NEXT OS impact image as background */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center', padding: '120px 0 80px', background: '#0A001A', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        <img loading="eager" decoding="async" src="assets/next-os-impact.jpg" alt="NEXT OS transforming African medical, schools, governments, homes, companies, NGOs" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.55) saturate(110%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(10,0,32,0.35) 0%, rgba(10,0,32,0.6) 60%, rgba(10,0,32,0.88) 100%)' }} />
        <div className="wrap" style={{ position: 'relative', maxWidth: 1100, zIndex: 2 }}>
          <div className="tag" style={{ marginBottom: 24 }}><span className="dot" /> WHO WE SERVE</div>
          <h1 className="h-display" style={{ marginBottom: 24 }}>We Understand Your World.<br/><span style={{ color: 'var(--mint)' }}>Because We Were Built for It.</span></h1>
          <p className="lede" style={{ maxWidth: 720 }}>When a school principal, NGO director, or church leader lands here, they should immediately feel understood. That feeling is the beginning of trust.</p>
        </div>
      </section>

      <section className="section deep" style={{ paddingTop: 24 }}>
        <div className="wrap" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {AUDIENCES.map(a => (
            <a key={a.id} href={`#${a.id}`} className="tag" style={{ background: 'transparent', borderColor: 'var(--purple-line)', color: 'rgba(255,255,255,0.85)' }}>
              {a.title.split(' & ')[0].toUpperCase()}
            </a>
          ))}
        </div>
      </section>

      {AUDIENCES.map((a, i) => (
        <section key={a.id} id={a.id} className={`section ${i % 2 === 0 ? 'dark' : 'deep'}`}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 64, alignItems: 'flex-start' }} className="grid-stack">
              <div>
                <div className="mono" style={{ color: a.accent, marginBottom: 12 }}>AUDIENCE 0{i + 1}</div>
                <h2 className="h-1" style={{ marginBottom: 32 }}>{a.title}</h2>
                <div className="eyebrow" style={{ color: a.accent, marginBottom: 12 }}>THE CHALLENGE</div>
                <p className="body" style={{ fontSize: 17, lineHeight: 1.6 }}>{a.challenge}</p>
              </div>
              <div>
                {a.image ? (
                  <img loading="lazy" decoding="async" src={a.image} alt={a.title} style={{ width: '100%', aspectRatio: '5/4', objectFit: 'cover', borderRadius: 'var(--radius)', marginBottom: 24, display: 'block' }} />
                ) : (
                  <div className="imgph mint" style={{ aspectRatio: '5/4', marginBottom: 24 }}>
                    <span className="lbl">// Image — {a.title}</span>
                  </div>
                )}
                <div className="eyebrow" style={{ color: a.accent, marginBottom: 16 }}>HOW NEXT HELPS</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {a.helps.map(h => (
                    <li key={h} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: a.accent, fontWeight: 700, marginTop: 4 }}>—</span>
                      <span className="body" style={{ color: 'rgba(255,255,255,0.88)' }}>{h}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary" style={{ marginTop: 32 }} onClick={() => go('start')}>
                  Get a tailored plan <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/* OUR WORK ------------------------------------------------------------------ */

const CASES = [
  {
    title: 'A school of 2,400 students switches to AI-powered reporting and saves 100 admin hours a month',
    industry: 'Schools',
    image: 'assets/school-dashboard-team.jpg',
    imgLabel: 'Image — school staff collaborating with digital dashboards',
    preview: 'A custom learning management system with AI attendance tracking, fee management, and real-time parent communication.',
    results: ['−40% admin time', '+68% parent satisfaction', '12 weeks to live']
  },
  {
    title: 'A 40-school district replaces paper attendance with one dashboard',
    industry: 'Schools',
    image: 'assets/school-district-collaboration.jpg',
    imgLabel: 'Image — secondary school staff using LMS, Mbarara',
    preview: 'A regional school network in Western Uganda automated attendance, parent communication, and admin reporting in 12 weeks.',
    results: ['40 schools', 'Real-time data', '12 weeks']
  },
  {
    title: 'How a national NGO cut donor-report turnaround from 3 weeks to 2 days',
    industry: 'NGOs',
    image: 'assets/ngo-field-officer-tablet.jpg',
    imgLabel: 'Image — programme officer with field tablet',
    preview: 'Beneficiary data, M&E, and donor dashboards unified into one intelligent system across 7 field offices.',
    results: ['3 weeks → 2 days', '7 field offices', 'Live visibility']
  },
  {
    title: 'A church federation moves giving and member care online — without losing the human touch',
    industry: 'Churches',
    image: 'assets/churches-teleconference.jpg',
    imgLabel: 'Image — congregation, multi-campus deployment',
    preview: 'Custom church management platform with AI-assisted pastoral communication for 14 congregations.',
    results: ['14 congregations', '+AI pastoral care', '8 weeks']
  },
  {
    title: 'Hospital triage WhatsApp bot handles 8,000 patient queries a month',
    industry: 'Healthcare',
    image: 'assets/healthcare-brain-scan.jpg',
    imgLabel: 'Image — clinic staff, Kampala teaching hospital',
    preview: 'AI-powered triage system that triaged patients, answered FAQs, and routed emergencies — all via WhatsApp.',
    results: ['8,000 queries/mo', '−60% admin calls', '4 weeks']
  },
  {
    title: 'A regional retailer turns WhatsApp into its highest-converting sales channel',
    industry: 'Corporations',
    image: 'assets/corporations-tablet.jpg',
    imgLabel: 'Image — operations team reviewing CRM dashboards',
    preview: 'AI customer service + sales intelligence layered onto existing WhatsApp Business — orders up 38%.',
    results: ['+38% orders', 'WhatsApp AI', '6 weeks']
  }
];

function OurWork({ go }) {
  const filters = ['All', 'NGOs', 'Schools', 'Churches', 'Corporations', 'Government', 'Healthcare'];
  const [filter, setFilter] = useStateH('All');
  const list = filter === 'All' ? CASES : CASES.filter(c => c.industry === filter);

  return (
    <div className="page">
      <PageHero
        eyebrow="OUR WORK"
        h1={<>Transformation Is Not a Promise.<br/><span style={{ color: 'var(--mint)' }}>It's a Track Record.</span></>}
        sub="Every case study tells a transformation story — not a feature showcase. Filter by your industry to see what's possible for organizations like yours."
      />

      <section className="section dark" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                      style={{
                        padding: '10px 18px', borderRadius: 999,
                        border: '1px solid ' + (filter === f ? 'var(--mint)' : 'var(--purple-line)'),
                        background: filter === f ? 'var(--mint-soft)' : 'transparent',
                        color: filter === f ? 'var(--mint)' : 'rgba(255,255,255,0.85)',
                        fontSize: 13, fontWeight: 500,
                      }}>{f}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {list.map(c => <FullCase key={c.title} c={c} go={go} />)}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>YOURS COULD BE NEXT</div>
          <h2 className="h-1" style={{ marginBottom: 24 }}>Want to be the case study other organizations read?</h2>
          <p className="lede" style={{ margin: '0 auto 32px' }}>
            Our flagship engagements often start with a single honest conversation about what's broken, what's possible, and what comes next.
          </p>
          <button className="btn btn-gold" onClick={() => go('start')}>Start your transformation <span className="arr">→</span></button>
        </div>
      </section>
    </div>
  );
}

function FullCase({ c, go }) {
  return (
    <article className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {c.image ? (
        <img loading="lazy" decoding="async" src={c.image} alt={c.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div className="imgph mint" style={{ aspectRatio: '16/10', borderRadius: 0, border: 0 }}>
          <span className="lbl">// {c.imgLabel}</span>
        </div>
      )}
      <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="mono" style={{ color: 'var(--mint)', marginBottom: 12 }}>{c.industry.toUpperCase()}</div>
        <h3 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2, marginBottom: 16, letterSpacing: '-0.01em' }}>{c.title}</h3>
        <p className="body" style={{ flex: 1 }}>{c.preview}</p>

        <div style={{ marginTop: 20, display: 'flex', gap: 24, flexWrap: 'wrap', borderTop: '1px solid var(--purple-line)', paddingTop: 20 }}>
          {(c.results || ['—40% admin time', '+3× reporting speed', '8 weeks to live']).map(r => (
            <div key={r}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--mint)', letterSpacing: '-0.02em' }}>{r.split(' ')[0]}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{r.split(' ').slice(1).join(' ')}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-ghost btn-sm" style={{ marginTop: 24, alignSelf: 'flex-start' }} onClick={() => go('work')}>
          Read the full story <span className="arr">→</span>
        </button>
      </div>
    </article>
  );
}

/* Shared page hero --------------------------------------------------------- */
function PageHero({ eyebrow, h1, sub }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 80px' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse, rgba(0,252,143,0.14), transparent 60%)',
        filter: 'blur(60px)',
      }} />
      <div className="wrap" style={{ position: 'relative', maxWidth: 1100 }}>
        <div className="tag" style={{ marginBottom: 24 }}><span className="dot" /> {eyebrow}</div>
        <h1 className="h-display" style={{ marginBottom: 24 }}>{h1}</h1>
        <p className="lede" style={{ maxWidth: 720 }}>{sub}</p>
      </div>
    </section>
  );
}

Object.assign(window, { WhatWeDo, WhoWeServe, OurWork, PageHero });
