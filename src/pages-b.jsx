/* Training · Insights · About · Start --------------------------------------- */
const { useState: useStateB } = React;

const PROGRAMS = [
{
  n: '01', title: 'AI Executive Seminar', length: 'Half Day · 4 hours',
  audience: 'CEOs, Directors, Board Members, Senior Leaders',
  format: 'In-person or Virtual',
  image: 'assets/next-logo-executive-seminar.png',
  learn: 'What AI is, what it can do for their organization, how to lead an AI transition, what questions to ask technology partners.',
  outcome: 'Leadership alignment on AI strategy and readiness.',
  accent: 'var(--mint)'
},
{
  n: '02', title: 'AI Staff Workshop', length: 'Full Day · 8 hours',
  audience: 'Operations teams, admin staff, department heads',
  format: 'In-person',
  image: 'assets/ai-staff-workshop-network.webp',
  learn: 'Hands-on AI tools for productivity, automation basics, prompt engineering for daily work.',
  outcome: 'Team members who can use AI tools immediately after the training.',
  accent: 'var(--mint)'
},
{
  n: '03', title: 'AI for Schools', length: '2-Day Program',
  audience: 'Teachers, school administrators, and senior students',
  format: 'In-person',
  image: 'assets/ai-schools-robot-teaching.jpg',
  learn: 'AI literacy, AI in education, responsible AI use, AI tools for teachers.',
  outcome: 'An AI-literate school culture ready for the future.',
  accent: 'var(--gold)'
},
{
  n: '04', title: 'AI Transformation Bootcamp', length: '3-Day Intensive',
  audience: 'Organizations beginning a full digital transformation',
  format: 'Intensive in-person',
  image: 'assets/ai-bootcamp-kampala.png',
  learn: 'Full AI strategy, tool adoption, system design, change management.',
  outcome: 'An organization with a working AI transition plan and initial tools deployed.',
  accent: 'var(--gold)'
}];


function Training({ go }) {
  return (
    <div className="page">
      <PageHero
        eyebrow="NEXT AI TRAINING"
        h1={<>The Future Belongs to Organizations <span style={{ color: 'var(--gold)' }}>That Learn.</span></>}
        sub="NEXT AI Training prepares your team for the intelligent era — practically, affordably, and powerfully." />
      

      <section className="section dark">
        <div className="wrap">
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>FOUR PROGRAMS</div>
          <h2 className="h-2" style={{ marginBottom: 40, maxWidth: 720 }}>Pick the program that meets your team where they are.</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {PROGRAMS.map((p) =>
            <article key={p.n} className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: 'rgba(255,180,0,0.18)', padding: 0, overflow: 'hidden' }}>
                {p.image ? (
                  <img loading="lazy" decoding="async" src={p.image} alt={p.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="imgph" style={{ aspectRatio: '16/9', borderRadius: 0, border: 0, background: 'repeating-linear-gradient(45deg, rgba(255,180,0,0.10) 0 8px, transparent 8px 16px), var(--purple-deep)' }}>
                    <span className="lbl" style={{ color: p.accent }}>// Image — {p.title} session</span>
                  </div>
                )}
                <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div className="mono" style={{ color: p.accent, marginBottom: 16 }}>PROGRAM {p.n} · {p.length.toUpperCase()}</div>
                <h3 style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 24 }}>{p.title}</h3>

                <Field k="FOR" v={p.audience} />
                <Field k="FORMAT" v={p.format} />
                <Field k="WHAT THEY LEARN" v={p.learn} />
                <Field k="OUTCOME" v={p.outcome} highlight />

                <button className="btn btn-gold btn-sm" style={{ marginTop: 24, alignSelf: 'flex-start' }} onClick={() => go('start')}>
                  Request this program <span className="arr">→</span>
                </button>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>UPCOMING SESSIONS</div>
              <h2 className="h-2">Live Training Calendar.</h2>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => go('start')}>Request a private session <span className="arr">→</span></button>
          </div>

          <div style={{ border: '1px solid var(--purple-line)', borderRadius: 16, overflow: 'hidden' }}>
            {UPCOMING_TRAINING.map((t, i) =>
            <div key={t.title} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr 1fr auto', gap: 24, alignItems: 'center',
              padding: '24px 28px',
              borderTop: i ? '1px solid var(--purple-line)' : 'none'
            }} className="cal-row">
                <div className="mono" style={{ color: 'var(--mint)' }}>{t.date.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{t.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{t.format}</div>
                <button className="btn btn-primary btn-sm" onClick={() => go('start')}>Register</button>
              </div>
            )}
          </div>
          <style>{`@media (max-width: 720px) { .cal-row { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-20%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(255,180,0,0.18), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <div className="wrap" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow gold" style={{ marginBottom: 16 }}>NEXT AI CERTIFICATION</div>
            <h2 className="h-1" style={{ marginBottom: 20 }}>The recognized AI training credential in East Africa.</h2>
            <p className="body" style={{ fontSize: 17 }}>
              Upon completing any NEXT training program, participants receive a NEXT AI Certification — a digital certificate they can share on LinkedIn and use in their professional profiles.
            </p>
          </div>
          <div style={{
            background: 'linear-gradient(160deg, var(--purple-deep), var(--purple-mid))',
            border: '1px solid rgba(255,180,0,0.3)',
            borderRadius: 24, padding: 32,
            position: 'relative', overflow: 'hidden'
          }}>
            <div className="mono" style={{ color: 'var(--gold)', marginBottom: 24 }}>NEXT AI · CERT-2026-04217</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>This certifies that</div>
            <div style={{ fontSize: 26, fontWeight: 600, margin: '8px 0 16px', letterSpacing: '-0.02em' }}>Hudson Timothy Tumusiime</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>has completed</div>
            <div style={{ fontSize: 18, fontWeight: 600, margin: '4px 0 24px', color: 'var(--gold)' }}>AI Transformation Bootcamp</div>
            <div style={{ borderTop: '1px solid var(--purple-line)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              <span>Issued · May 2026</span>
              <span>nexttransform.africa/cert</span>
            </div>
          </div>
        </div>
      </section>
    </div>);

}
function Field({ k, v, highlight }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="mono" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{k}</div>
      <div style={{ fontSize: 14, lineHeight: 1.55, color: highlight ? 'var(--mint)' : 'rgba(255,255,255,0.88)', fontWeight: highlight ? 500 : 400 }}>{v}</div>
    </div>);

}

/* INSIGHTS ----------------------------------------------------------------- */
const ARTICLES = [
{ t: 'What Is AI — And What Can It Actually Do For My Organization?', cat: 'AI Tools & Guides', read: '8 min', date: 'May 2026', big: true, image: 'assets/article-thumb-1.png' },
{ t: '5 Signs Your Organization Is Ready for AI Transformation', cat: 'Organization Transformation', read: '6 min', date: 'May 2026', image: 'assets/article-thumb-2.png' },
{ t: 'Why African Organizations Cannot Afford to Wait on AI', cat: 'NEXT Perspectives', read: '5 min', date: 'Apr 2026', image: 'assets/article-thumb-3.png' },
{ t: 'The Real Cost of Running a Manual Organization in 2026', cat: 'AI in Africa', read: '7 min', date: 'Apr 2026', image: 'assets/article-thumb-4.png' },
{ t: 'How NEXT Transformed Mbarara Schools Network: A Step-by-Step Story', cat: 'Case Studies', read: '12 min', date: 'Apr 2026', image: 'assets/article-thumb-5.png' }];

const RESOURCES = [
{ t: 'AI Readiness Checklist', title: 'A self-assessment for your organization', size: 'PDF · 2.4 MB', image: 'assets/insight-cover-1.png' },
{ t: 'NEXT Guide to AI for NGOs', title: 'Field-tested playbook for development orgs', size: 'PDF · 4.1 MB', image: 'assets/insight-cover-2.png' },
{ t: 'AI Tools Every Team Should Use in 2026', title: 'A curated stack with use-cases', size: 'PDF · 3.2 MB', image: 'assets/insight-cover-3.png' },
{ t: 'How to Write an AI Proposal for Your Board', title: 'Template + 14-page guide', size: 'PDF · 1.8 MB', image: 'assets/insight-cover-4.png' }];


function Insights({ go }) {
  const [cat, setCat] = useStateB('All');
  const cats = ['All', 'AI in Africa', 'Organization Transformation', 'AI Tools & Guides', 'NEXT Perspectives', 'Case Studies'];
  const list = cat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);
  return (
    <div className="page">
      {/* Full-bleed video hero — Insights */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center', padding: '120px 0 80px', background: '#0A001A', width: '100%' }}>
        <video src="assets/insights-hero.mp4" autoPlay muted loop playsInline preload="auto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.55) saturate(110%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(10,0,32,0.35) 0%, rgba(10,0,32,0.6) 60%, rgba(10,0,32,0.88) 100%)' }} />
        <div className="wrap" style={{ position: 'relative', maxWidth: 1100, zIndex: 2 }}>
          <div className="tag" style={{ marginBottom: 24 }}><span className="dot" /> INSIGHTS</div>
          <h1 className="h-display" style={{ marginBottom: 24 }}>Thinking Ahead, So Africa <span style={{ color: 'var(--mint)' }}>Doesn't Fall Behind.</span></h1>
          <p className="lede" style={{ maxWidth: 720 }}>Articles, guides, reports, and resources that are genuinely useful — not content for content's sake.</p>
        </div>
      </section>
      

      <section className="section dark">
        <div className="wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {cats.map((c) =>
            <button key={c} onClick={() => setCat(c)}
            style={{
              padding: '10px 16px', borderRadius: 999,
              border: '1px solid ' + (cat === c ? 'var(--mint)' : 'var(--purple-line)'),
              background: cat === c ? 'var(--mint-soft)' : 'transparent',
              color: cat === c ? 'var(--mint)' : 'rgba(255,255,255,0.85)',
              fontSize: 13
            }}>{c}</button>
            )}
          </div>

          {list[0] && list[0].big &&
          <article className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
              {list[0].image ? (
                <img loading="lazy" decoding="async" src={list[0].image} alt={list[0].t} style={{ width: '100%', minHeight: 320, objectFit: 'cover', display: 'block' }} />
              ) : (
                <div className="imgph mint" style={{ minHeight: 320, borderRadius: 0, border: 0 }}>
                  <span className="lbl">// Cornerstone article — hero illustration</span>
                </div>
              )}
              <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="mono" style={{ color: 'var(--mint)', marginBottom: 12 }}>CORNERSTONE · {list[0].cat.toUpperCase()}</div>
                <h2 className="h-2" style={{ marginBottom: 16 }}>{list[0].t}</h2>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{list[0].date} · {list[0].read} read</div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 24, alignSelf: 'flex-start' }}>Read article <span className="arr">→</span></button>
              </div>
            </article>
          }

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {list.filter((a) => !a.big).map((a) =>
            <article key={a.t} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {a.image ? (
                  <img loading="lazy" decoding="async" src={a.image} alt={a.t} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="imgph mint" style={{ aspectRatio: '16/10', borderRadius: 0, border: 0 }}>
                    <span className="lbl">// Article thumbnail — {a.t.slice(0, 38)}{a.t.length > 38 ? '…' : ''}</span>
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <div className="mono" style={{ color: 'var(--mint)', marginBottom: 12 }}>{a.cat.toUpperCase()}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 16 }}>{a.t}</h3>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{a.date} · {a.read} read</div>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap">
          <div className="eyebrow gold" style={{ marginBottom: 12 }}>FREE RESOURCES</div>
          <h2 className="h-1" style={{ marginBottom: 24, maxWidth: 700 }}>Take the first step — for free.</h2>

          {/* Admin: drop new PDFs here ------------------------------------ */}
          <label htmlFor="next-pdf-upload" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 10, padding: '32px 24px', marginBottom: 32,
            border: '1.5px dashed rgba(255,180,0,0.45)',
            borderRadius: 16, background: 'rgba(255,180,0,0.05)',
            cursor: 'pointer', textAlign: 'center'
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--gold-soft)', color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22 }}>↑</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold)' }}>Drop PDFs here to publish for download</div>
            <div className="mono" style={{ color: 'rgba(255,255,255,0.55)' }}>// ADMIN · accepts .pdf · max 20 MB each</div>
            <input id="next-pdf-upload" type="file" accept="application/pdf" multiple style={{ display: 'none' }} />
          </label>

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {RESOURCES.map((r) =>
            <div key={r.t} className="card" style={{ borderColor: 'rgba(255,180,0,0.25)', padding: 0, overflow: 'hidden' }}>
                {r.image ? (
                  <img loading="lazy" decoding="async" src={r.image} alt={r.t} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div className="imgph" style={{ aspectRatio: '3/2', borderRadius: 0, border: 0, background: 'repeating-linear-gradient(45deg, rgba(255,180,0,0.10) 0 8px, transparent 8px 16px), var(--purple-deep)' }}>
                    <span className="lbl" style={{ color: 'var(--gold)' }}>// PDF cover — {r.t}</span>
                  </div>
                )}
                <div style={{ padding: 24 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--gold-soft)', color: 'var(--gold)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 16 }}>↓</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{r.t}</h3>
                  <p className="body" style={{ marginTop: 0, marginBottom: 16, fontSize: 14 }}>{r.title}</p>
                  <div className="mono" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{r.size}</div>
                  <button className="btn btn-gold btn-sm">Get the PDF</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>);

}

/* ABOUT -------------------------------------------------------------------- */
const VALUES = [
['Intelligence', 'We bring deep expertise and rigorous thinking to every engagement.'],
['Trust', 'We build relationships before we build systems.'],
['Impact', 'We measure success by the transformation our clients experience.'],
["Africanism", "Built for Africa, by Africans, with Africa's realities at the center."],
['Excellence', 'We deliver work we are proud of, every time.']];

const TEAM = [
["Tumusiime Hudson Timothy", "Founder & CEO", "Builds the systems Africa's most ambitious organizations run on."],
["Yiga Patrick Emmanuel", "Developer", "Designs the AI workflows that quietly remove a week's work from a team's month."],
['Kawalya Jessy', 'Trainer', 'Has trained more than 500 East African professionals on practical AI tools.']];


function About({ go }) {
  return (
    <div className="page">
      <PageHero
        eyebrow="ABOUT NEXT"
        h1={<>We Were Built for <span style={{ color: 'var(--mint)' }}>This Moment.</span></>}
        sub="People don't hire companies — they hire people they trust and believe in. Here are the people, the story, and the beliefs behind NEXT." />
      

      <section className="section dark">
        <div className="wrap">
          {/* Heading at top, full width */}
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>THE NEXT STORY</div>
            <h2 className="h-2" style={{ margin: 0 }}>Why we exist.</h2>
          </div>

          {/* 2-column grid: portrait | bio */}
          <div className="grid-stack" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.4fr) minmax(0, 0.6fr)',
            gap: 56,
            alignItems: 'start'
          }}>
            <div style={{ maxWidth: 440, justifySelf: 'start' }}>
              <img
                loading="lazy"
                decoding="async"
                src="assets/hudson-founder-photo.jpg"
                alt="Hudson Timothy Tumusiime, Founder & CEO"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  borderRadius: 'var(--radius)',
                  display: 'block',
                  aspectRatio: '4/5'
                }}
              />
            </div>
            <div>
              <div className="eyebrow mint" style={{ marginBottom: 12 }}>FOUNDER</div>
              <p className="body" style={{ fontSize: 15, lineHeight: 1.75, marginTop: 0 }}>
                Hudson Timothy Tumusiime has spent his career at the intersection of communication, technology, and mission. As founder and CEO of NEXT, he is building Africa's leading AI and digital transformation company — one that doesn't just consult, but builds real systems that change how organisations operate. He is also the founder and CEO of Charis Creations, a media production and communications company that has worked with some of Uganda's most influential organisations, churches, and brands. Through that work, he saw the same gap everywhere: powerful organisations running on broken systems. NEXT was born from that frustration — and from the belief that African organisations deserve world-class digital infrastructure. Hudson also serves as Communications Director for Fathers Arise under The Remnant Generation, where he applies the same strategic communication principles he brings to all his work: clarity, systems, and storytelling that moves people to action. He is based in Kampala, Uganda — and he is building for the long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap grid-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 32 }} >
          <div className="card" style={{ padding: 40 }}>
            <div className="eyebrow gold" style={{ marginBottom: 16 }}>MISSION</div>
            <p style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
              To help African organizations transition from manual systems into intelligent systems through AI, automation, and digital infrastructure.
            </p>
          </div>
          <div className="card" style={{ padding: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>VISION</div>
            <p style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em', margin: 0 }}>
              To become Africa's most trusted AI transformation company — the bridge between where Africa is and where Africa is going.
            </p>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 16 }}>CORE VALUES</div>
          <h2 className="h-2" style={{ marginBottom: 48, maxWidth: 600 }}>What we hold ourselves to.</h2>
          <div style={{ display: 'grid', gap: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', borderTop: '1px solid var(--purple-line)' }}>
            {VALUES.map(([k, v], i) =>
            <div key={k} style={{
              padding: '32px 0 32px',
              paddingRight: 24,
              borderBottom: '1px solid var(--purple-line)',
              borderRight: i < VALUES.length - 1 ? '1px solid var(--purple-line)' : 'none',
              paddingLeft: i ? 24 : 0
            }}>
                <div className="mono" style={{ color: 'var(--mint)', marginBottom: 16 }}>0{i + 1}</div>
                <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 12 }}>{k}</div>
                <p className="body" style={{ fontSize: 14, margin: 0 }}>{v}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 16 }}>THE TEAM</div>
          <h2 className="h-2" style={{ marginBottom: 48 }}>The faces behind NEXT.</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {TEAM.map(([n, r, b], i) =>
            <div key={n}>
                {i === 0 ? (
                  <img loading="lazy" decoding="async" src="assets/hudson-founder-photo.jpg" alt={n} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: 'var(--radius)', marginBottom: 16, display: 'block' }} />
                ) : i === 1 ? (
                  <img loading="lazy" decoding="async" src="assets/patrick-developer-photo.jpg" alt={n} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: 'var(--radius)', marginBottom: 16, display: 'block' }} />
                ) : i === 2 ? (
                  <img loading="lazy" decoding="async" src="assets/jessy-trainer-photo.jpg" alt={n} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: 'var(--radius)', marginBottom: 16, display: 'block' }} />
                ) : (
                  <div className="imgph mint" style={{ aspectRatio: '4/5', marginBottom: 16 }}>
                    <span className="lbl">// Portrait — {n}, Kampala</span>
                  </div>
                )}
                <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{n}</div>
                <div style={{ fontSize: 13, color: 'var(--mint)', marginTop: 4, marginBottom: 12, letterSpacing: '0.02em' }}>{r}</div>
                <p className="body" style={{ fontSize: 14, margin: 0 }}>{b}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 900, height: 600,
          background: 'radial-gradient(ellipse, rgba(0,252,143,0.16), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <div className="wrap" style={{ position: 'relative', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>WHY AFRICA · WHY NOW</div>
          <h2 className="h-1" style={{ marginBottom: 24 }}>
            Africa is the fastest-growing continent in the world. It has <span style={{ color: 'var(--mint)' }}>the most to gain</span> from intelligent systems — and the most to lose from waiting.
          </h2>
          <button className="btn btn-primary" onClick={() => go('start')} style={{ marginTop: 24 }}>
            Build with us <span className="arr">→</span>
          </button>
        </div>
      </section>
    </div>);

}

/* START — Assessment + Form + Booking ---------------------------------------- */
const QUESTIONS = [
{ id: 'tech', label: 'How would you describe your current use of technology in operations?',
  options: ['1 · Mostly paper and manual', '2 · Some basic tools', '3 · A few digital systems', '4 · Mostly digital', '5 · Highly digital'] },
{ id: 'tools', label: 'Does your team use any digital tools for communication and project management?',
  options: ['No — phone & email only', 'Yes — but inconsistently', 'Yes — across the team'] },
{ id: 'manual', label: 'How much of your reporting and data management is done manually?',
  options: ['Almost all of it', 'About half', 'Some — but mostly automated', 'Almost none'] },
{ id: 'lead', label: 'Has your leadership team discussed AI or digital transformation in the last 12 months?',
  options: ['Not yet', 'Briefly', 'Actively planning', 'Already underway'] },
{ id: 'pain', label: 'What is your biggest operational challenge right now?',
  options: ['Reporting takes forever', 'Communication is scattered', 'Too much manual data entry', "We can't see what's happening across teams", 'Something else'] },
{ id: 'size', label: 'How many people are in your organization?',
  options: ['1–10', '11–50', '51–200', '201–1000', '1000+'] },
{ id: 'type', label: 'What is your organization type?',
  options: ['NGO', 'School / University', 'Church / Faith Org', 'Business', 'Government', 'Healthcare', 'Other'] }];


function Start({ go }) {
  const [tab, setTab] = useStateB('assessment');

  return (
    <div className="page">
      <PageHero
        eyebrow="START"
        h1={<>Your Transformation Starts With <span style={{ color: 'var(--mint)' }}>One Honest Conversation.</span></>}
        sub="Tell us about your organization and where you want to go. We'll tell you exactly how NEXT can get you there." />
      

      <section className="section dark" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', borderBottom: '1px solid var(--purple-line)' }}>
            {[
            ['assessment', 'Free AI Readiness Assessment', 'gold'],
            ['contact', 'Contact Form', 'mint'],
            ['call', 'Book a Discovery Call', 'mint'],
            ['whatsapp', 'WhatsApp Direct', 'mint']].
            map(([id, label, accent]) =>
            <button key={id} onClick={() => setTab(id)}
            style={{
              padding: '16px 4px', marginRight: 24,
              fontSize: 14, fontWeight: 500,
              color: tab === id ? accent === 'gold' ? 'var(--gold)' : 'var(--mint)' : 'rgba(255,255,255,0.6)',
              borderBottom: '2px solid ' + (tab === id ? accent === 'gold' ? 'var(--gold)' : 'var(--mint)' : 'transparent'),
              marginBottom: -1
            }}>{label}</button>
            )}
          </div>

          {tab === 'assessment' && <Assessment go={go} />}
          {tab === 'contact' && <ContactForm go={go} />}
          {tab === 'call' && <BookCall />}
          {tab === 'whatsapp' && <WhatsAppPanel />}
        </div>
      </section>
    </div>);

}

function Assessment({ go }) {
  const [step, setStep] = useStateB(0);
  const [answers, setAnswers] = useStateB({});
  const [done, setDone] = useStateB(false);

  if (done) {
    // Score: rough — pick a tier from technology + manual answers
    const score = (parseInt((answers.tech || '1').split(' ')[0], 10) || 1) + (
    ['No — phone & email only', 'Yes — but inconsistently', 'Yes — across the team'].indexOf(answers.tools || '') + 1) + (
    4 - ['Almost all of it', 'About half', 'Some — but mostly automated', 'Almost none'].indexOf(answers.manual || '')) + (
    ['Not yet', 'Briefly', 'Actively planning', 'Already underway'].indexOf(answers.lead || '') + 1);
    let tier;
    if (score >= 14) tier = { name: 'AI Ready', color: 'var(--mint)', body: "You're already operating digitally — now it's time to layer on intelligence. We'd recommend starting with a focused AI Integration engagement on your highest-leverage workflow." };else
    if (score >= 9) tier = { name: 'AI Curious', color: 'var(--gold)', body: "You're past 'manual', but the system is fragmented. We'd recommend an Intelligence Audit followed by a 90-day transformation roadmap." };else
    tier = { name: 'AI Beginner', color: 'var(--mint)', body: "Most of your organization is still on paper or basic tools — and that's okay. The right next step is the AI Executive Seminar plus a Digital Infrastructure foundation." };
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.6fr)', gap: 32 }} className="grid-stack">
        <div className="card" style={{ padding: 40, borderColor: tier.color }}>
          <div className="mono" style={{ color: tier.color, marginBottom: 16 }}>YOUR RESULT</div>
          <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', color: tier.color, lineHeight: 1, marginBottom: 24 }}>{tier.name}</div>
          <p className="body" style={{ fontSize: 17, lineHeight: 1.6, marginTop: 0 }}>{tier.body}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-gold" onClick={() => {setDone(false);setStep(0);setAnswers({});}}>Retake</button>
            <button className="btn btn-primary">Email me my full report <span className="arr">→</span></button>
          </div>
        </div>
        <div className="card" style={{ padding: 32, background: 'var(--purple)', borderColor: 'var(--gold)' }}>
          <div className="eyebrow gold" style={{ marginBottom: 16 }}>NEXT STEP</div>
          <h3 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.25, marginBottom: 16 }}>Book a free 30-minute discovery call.</h3>
          <p className="body" style={{ marginTop: 0, fontSize: 14 }}>One conversation. We'll tell you exactly where to start.</p>
          <button className="btn btn-gold" style={{ marginTop: 16 }}>Pick a time <span className="arr">→</span></button>
        </div>
      </div>);

  }

  const q = QUESTIONS[step];
  const progress = step / QUESTIONS.length * 100;

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>Question {step + 1} of {QUESTIONS.length}</span>
        <span style={{ color: 'var(--mint)' }}>≈ {Math.max(1, QUESTIONS.length - step)} min left</span>
      </div>
      <div style={{ height: 6, background: 'var(--purple-deep)', borderRadius: 999, overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--mint)', boxShadow: '0 0 16px var(--mint)', transition: 'width .3s ease' }} />
      </div>
      <h2 className="h-2" style={{ marginBottom: 32, lineHeight: 1.2 }}>{q.label}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {q.options.map((opt) => {
          const selected = answers[q.id] === opt;
          return (
            <button key={opt} onClick={() => setAnswers({ ...answers, [q.id]: opt })}
            style={{
              textAlign: 'left', padding: '20px 24px', minHeight: 60,
              borderRadius: 12,
              border: '1px solid ' + (selected ? 'var(--mint)' : 'var(--purple-line)'),
              background: selected ? 'var(--mint-soft)' : 'var(--purple-deep)',
              color: selected ? 'var(--mint)' : 'white',
              fontSize: 16, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 16
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: 999,
                border: '1.5px solid ' + (selected ? 'var(--mint)' : 'rgba(255,255,255,0.3)'),
                background: selected ? 'var(--mint)' : 'transparent'
              }} />
              {opt}
            </button>);

        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
        <button className="btn btn-ghost" disabled={step === 0} onClick={() => setStep(step - 1)} style={{ opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button className="btn btn-primary" disabled={!answers[q.id]}
        onClick={() => step < QUESTIONS.length - 1 ? setStep(step + 1) : setDone(true)}
        style={{ opacity: !answers[q.id] ? 0.4 : 1 }}>
          {step < QUESTIONS.length - 1 ? <>Next <span className="arr">→</span></> : <>Get my result <span className="arr">→</span></>}
        </button>
      </div>
    </div>);

}

function ContactForm() {
  const [submitted, setSubmitted] = useStateB(false);
  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center', padding: 40, border: '1px solid var(--mint)', borderRadius: 20, background: 'var(--mint-soft)' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
        <h2 className="h-2" style={{ marginBottom: 16, color: 'var(--mint)' }}>Got it. Thank you.</h2>
        <p className="body" style={{ fontSize: 17 }}>We'll respond personally within 24 hours. In the meantime, feel free to ping us on WhatsApp — that's where most East African business conversations happen, and we keep it close.</p>
      </div>);

  }
  return (
    <form onSubmit={(e) => {e.preventDefault();setSubmitted(true);}}
    style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '0 24px', maxWidth: 920 }} className="grid-stack">
      <FF label="Full Name" req><input type="text" required /></FF>
      <FF label="Organization Name" req><input type="text" required /></FF>
      <FF label="Organization Type" req>
        <select required defaultValue="">
          <option value="" disabled>Choose one…</option>
          {['NGO', 'School / University', 'Church / Faith Org', 'Business', 'Government', 'Healthcare', 'Other'].map((o) => <option key={o}>{o}</option>)}
        </select>
      </FF>
      <FF label="Email Address" req><input type="email" required /></FF>
      <FF label="Phone Number" req>
        <input type="tel" required placeholder="+256 ..." />
        <label className="check" style={{ marginTop: 8 }}>
          <input type="checkbox" defaultChecked /> This number is on WhatsApp
        </label>
      </FF>
      <FF label="How did you hear about NEXT?">
        <select defaultValue="">
          <option value="">— optional —</option>
          {['Referral', 'LinkedIn', 'Event / Training', 'Search', 'Social Media', 'Other'].map((o) => <option key={o}>{o}</option>)}
        </select>
      </FF>
      <FF label="What are you looking for help with?" full>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['AI Integration & Automation', 'Digital Infrastructure', 'AI Training', 'Creative AI Media', 'Smart Operations Consulting'].map((s) =>
          <label key={s} className="check" style={{ background: 'var(--purple-deep)', border: '1px solid var(--purple-line)', borderRadius: 999, padding: '8px 14px', cursor: 'pointer' }}>
              <input type="checkbox" /> {s}
            </label>
          )}
        </div>
      </FF>
      <FF label="Tell us briefly about your organization and what you want to achieve" full>
        <textarea placeholder="The more we know, the more useful our reply." />
      </FF>
      <div style={{ gridColumn: '1 / -1', marginTop: 8 }}>
        <button type="submit" className="btn btn-primary">Send My Request <span className="arr">→</span></button>
        <p className="body" style={{ marginTop: 16, fontSize: 13 }}>We respond personally within 24 hours.</p>
      </div>
    </form>);

}
function FF({ label, req, full, children }) {
  return (
    <div className="field" style={full ? { gridColumn: '1 / -1' } : {}}>
      <label>{label}{req && <span style={{ color: 'var(--mint)' }}> *</span>}</label>
      {children}
    </div>);

}

function BookCall() {
  const slots = ['09:00', '10:30', '13:00', '14:30', '16:00'];
  const days = ['Mon · May 11', 'Tue · May 12', 'Wed · May 13', 'Thu · May 14', 'Fri · May 15'];
  const [day, setDay] = useStateB(0);
  const [slot, setSlot] = useStateB(null);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.6fr) minmax(0, 1fr)', gap: 32 }} className="grid-stack">
      <div className="card" style={{ padding: 32 }}>
        <div className="eyebrow gold" style={{ marginBottom: 12 }}>FREE · 30 MINUTES</div>
        <h2 className="h-2" style={{ marginBottom: 16 }}>Book a Discovery Call.</h2>
        <p className="body" style={{ fontSize: 16 }}>One honest conversation about where your organization is and what could come next. With Hudson or a member of the strategy team.</p>
        <ul style={{ padding: 0, listStyle: 'none', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['No prep required', 'No pitch deck', 'You leave with a clear next step'].map((x) =>
          <li key={x} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14 }}><span style={{ color: 'var(--mint)' }}>✓</span> {x}</li>
          )}
        </ul>
      </div>
      <div className="card" style={{ padding: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>PICK A DAY</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24 }}>
          {days.map((d, i) =>
          <button key={d} onClick={() => {setDay(i);setSlot(null);}} style={{
            padding: '14px 18px', borderRadius: 12, whiteSpace: 'nowrap',
            border: '1px solid ' + (day === i ? 'var(--mint)' : 'var(--purple-line)'),
            background: day === i ? 'var(--mint-soft)' : 'transparent',
            color: day === i ? 'var(--mint)' : 'white',
            fontSize: 14, fontWeight: 500
          }}>{d}</button>
          )}
        </div>
        <div className="eyebrow" style={{ marginBottom: 16 }}>PICK A TIME · EAT</div>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', marginBottom: 24 }}>
          {slots.map((s) =>
          <button key={s} onClick={() => setSlot(s)} style={{
            padding: 14, borderRadius: 10,
            border: '1px solid ' + (slot === s ? 'var(--mint)' : 'var(--purple-line)'),
            background: slot === s ? 'var(--mint)' : 'transparent',
            color: slot === s ? 'var(--purple)' : 'white',
            fontSize: 14, fontWeight: 600
          }}>{s}</button>
          )}
        </div>
        <button className="btn btn-primary" disabled={!slot} style={{ opacity: slot ? 1 : 0.4 }}>
          {slot ? <>Confirm {days[day]} at {slot} <span className="arr">→</span></> : 'Pick a time'}
        </button>
      </div>
    </div>);

}
function WhatsAppPanel() {
  return (
    <div className="card" style={{ padding: 40, maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderColor: 'rgba(37,211,102,0.4)' }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: '#25D366', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <WhatsAppGlyph size={28} />
      </div>
      <h2 className="h-2" style={{ marginBottom: 16 }}>Prefer to talk? Message us on WhatsApp.</h2>
      <p className="body" style={{ fontSize: 16, marginTop: 0 }}>Most business conversations in East Africa happen on WhatsApp. We keep it open during business hours and reply within minutes.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <a className="btn" style={{ background: '#25D366', color: 'white' }} href="https://wa.me/256706028899">
          <WhatsAppGlyph size={18} /> +256 706 028 899
        </a>
        <span className="mono" style={{ color: 'rgba(255,255,255,0.5)' }}>· MON–FRI · 9:00 – 18:00 EAT</span>
      </div>
    </div>);

}

Object.assign(window, { Training, Insights, About, Start });