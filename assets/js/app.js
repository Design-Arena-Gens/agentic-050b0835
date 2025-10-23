const state = {
  projects: [
    {
      id: 0,
      title: "Project Aurora",
      client: "Northwind",
      year: 2024,
      services: ["Brand Strategy", "Web Design", "Development"],
      cover: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1527427337751-fdca2f08f6a9?q=80&w=1200&auto=format&fit=crop"
      ],
      description:
        "A modular brand system and digital experience for a climate-tech innovator. We built a tactile design language with rich motion to communicate momentum.",
      link: "https://example.com"
    },
    {
      id: 1,
      title: "Echo Commerce",
      client: "Contoso",
      year: 2023,
      services: ["UX Research", "Design System", "Shopfront"],
      cover: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1400&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
      ],
      description:
        "We redesigned the shopping journey end-to-end, lifting conversion and AOV through clarity, performance, and micro-interactions.",
      link: "https://example.com"
    },
    {
      id: 2,
      title: "Atlas Mobility",
      client: "Globex",
      year: 2025,
      services: ["Product Design", "Native App", "Growth"],
      cover: "https://images.unsplash.com/photo-1549921296-3cce39b20d6b?q=80&w=1400&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520975930466-56f61f0f6d9e?q=80&w=1200&auto=format&fit=crop"
      ],
      description:
        "A mobility platform with a map-first interface and precision onboarding. Mapped to jobs-to-be-done for adoption at scale.",
      link: "https://example.com"
    }
  ]
};

const qs = (sel, el = document) => el.querySelector(sel);
const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function setYear() {
  qs('#year').textContent = new Date().getFullYear();
}

function revealInView() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add('revealed');
    }
  }, { threshold: 0.08 });
  qsa('[data-animate]').forEach((el) => io.observe(el));
}

function cursorFlair() {
  const c = qs('#cursor');
  window.addEventListener('pointermove', (e) => {
    c.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const [root, maybeId, extra] = hash.split('/');

  if (!root || root === '') return renderHome();
  if (root === 'work' && maybeId && extra === 'project-info') return renderProject(+maybeId);
  if (root === 'work') return renderWork();
  if (root === 'about') return renderAbout();
  if (root === 'contact') return renderContact();
  return renderHome();
}

function renderHome() {
  qs('#view').innerHTML = `
    <section class="section hero" data-animate="fade-up">
      <div>
        <h1>Design that moves brands forward.</h1>
        <p>We craft digital products and identities for ambitious teams. Strategy, design, and engineering under one roof — executed with clarity and taste.</p>
        <div class="badge">Currently taking projects for Q1 · 2026</div>
      </div>
      <div class="hero-media">
        <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1500&auto=format&fit=crop" alt="Studio montage" />
      </div>
    </section>

    <section class="section" data-animate="fade-up">
      <h2 style="margin:0 0 12px;">Selected work</h2>
      <div class="grid" id="grid"></div>
    </section>
  `;

  const grid = qs('#grid');
  state.projects.forEach((p) => {
    const a = document.createElement('a');
    a.href = `#/work/${p.id}/project-info`;
    a.className = 'card';
    a.innerHTML = `
      <div class="card-media"><img src="${p.cover}" alt="${p.title}" loading="lazy" /></div>
      <div class="card-title">${p.title}</div>
      <div class="card-meta">${p.client} · ${p.year}</div>
    `;
    grid.appendChild(a);
  });

  revealInView();
}

function renderWork() {
  qs('#view').innerHTML = `
    <section class="section" data-animate="fade-up">
      <div class="proj-hero">
        <h1 class="proj-title">All work</h1>
        <p class="proj-meta">A cross-section of recent brand, product, and web engagements.</p>
      </div>
      <div class="grid" id="grid"></div>
    </section>
  `;
  const grid = qs('#grid');
  state.projects.forEach((p) => {
    const a = document.createElement('a');
    a.href = `#/work/${p.id}/project-info`;
    a.className = 'card';
    a.innerHTML = `
      <div class="card-media"><img src="${p.cover}" alt="${p.title}" loading="lazy" /></div>
      <div class="card-title">${p.title}</div>
      <div class="card-meta">${p.client} · ${p.year}</div>
    `;
    grid.appendChild(a);
  });
  revealInView();
}

function renderProject(id) {
  const p = state.projects.find((x) => x.id === id);
  if (!p) return renderWork();

  qs('#view').innerHTML = `
    <section class="section" data-animate="fade-up">
      <div class="proj-hero">
        <h1 class="proj-title">${p.title}</h1>
        <div class="proj-meta">${p.client} · ${p.year} · ${p.services.join(' · ')}</div>
        <div class="proj-cover"><img src="${p.cover}" alt="${p.title} cover" /></div>
      </div>
      <div class="proj-body">
        <div>
          <p>${p.description}</p>
        </div>
        <aside class="proj-spec">
          <div style="display:grid;gap:6px;">
            <strong>Services</strong>
            <span style="color:var(--muted)">${p.services.join(', ')}</span>
            <strong style="margin-top:12px">Visit</strong>
            <a href="${p.link}" target="_blank" rel="noopener" class="underline">${p.link}</a>
          </div>
        </aside>
      </div>
    </section>
    <section class="section proj-gallery" data-animate="fade-up">
      ${p.images.map(src => `<div class="g"><img src="${src}" alt="${p.title} gallery" loading="lazy"/></div>`).join('')}
    </section>
  `;
  revealInView();
}

function renderAbout() {
  qs('#view').innerHTML = `
    <section class="section about" data-animate="fade-up">
      <div class="panel">
        <h2>We are Apex</h2>
        <p>Independent design and engineering studio working at the intersection of brand and product. We partner with leaders to shape vision, ship quality, and raise the bar.</p>
      </div>
      <div class="panel">
        <h3>Capabilities</h3>
        <ul style="margin:0;padding-left:18px;color:var(--muted)">
          <li>Brand strategy and identity</li>
          <li>Design systems and UI engineering</li>
          <li>Websites with rich motion</li>
          <li>Product discovery and growth</li>
        </ul>
      </div>
    </section>
  `;
  revealInView();
}

function renderContact() {
  qs('#view').innerHTML = `
    <section class="section contact" data-animate="fade-up">
      <div class="panel">
        <h2>New project?</h2>
        <p>Tell us about your goals and constraints. We'll respond within one business day.</p>
        <a class="mail" href="mailto:hello@apexstudio.example?subject=Project%20Inquiry">hello@apexstudio.example</a>
      </div>
      <div class="panel">
        <h3>Follow</h3>
        <p class="muted">We occasionally share notes on design and engineering.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="underline" href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
          <a class="underline" href="https://dribbble.com" target="_blank" rel="noopener">Dribbble</a>
          <a class="underline" href="https://x.com" target="_blank" rel="noopener">X</a>
        </div>
      </div>
    </section>
  `;
  revealInView();
}

function mount() {
  setYear();
  cursorFlair();
  window.addEventListener('hashchange', route);
  route();
}

mount();
