/* Main App — file-based router for static export --------------------------- */
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const currentPage = document.documentElement.dataset.page || 'home';
  const [page] = useStateApp(currentPage);

  const go = (id) => {
    window.location.href = PAGE_MAP[id] || 'index.html';
  };

  return (
    <>
      <Nav page={page} go={go} />
      <main>
        {page === 'home'     && <Home go={go} />}
        {page === 'what'     && <WhatWeDo go={go} />}
        {page === 'who'      && <WhoWeServe go={go} />}
        {page === 'work'     && <OurWork go={go} />}
        {page === 'training' && <Training go={go} />}
        {page === 'insights' && <Insights go={go} />}
        {page === 'about'    && <About go={go} />}
        {page === 'start'    && <Start go={go} />}
      </main>
      <Footer go={go} />
      <ChatBot go={go} />
      <FloatingWhatsApp />
      <style>{`
        @keyframes dotBlink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @media (max-width: 860px) {
          .grid-stack { grid-template-columns: 1fr !important; gap: 32px !important; }
          .step-arr { display: none !important; }
        }
      `}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
