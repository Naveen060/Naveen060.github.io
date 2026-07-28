"use client";

import { useEffect, useMemo, useState } from "react";
import portfolio from "./data/portfolio.json";

const filters = ["All", "AI / CV", "Tools"] as const;

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSkill, setActiveSkill] = useState(portfolio.skillGroups[0].id);
  const [activeTechnology, setActiveTechnology] = useState(portfolio.skillGroups[0].items[0].name);
  const [skillQuery, setSkillQuery] = useState("");
  const [skillAutoPlay, setSkillAutoPlay] = useState(true);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % portfolio.roles.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const selectedSkill = useMemo(
    () => portfolio.skillGroups.find((group) => group.id === activeSkill) ?? portfolio.skillGroups[0],
    [activeSkill]
  );

  const selectedTechnology = useMemo(
    () => selectedSkill.items.find((item) => item.name === activeTechnology) ?? selectedSkill.items[0],
    [activeTechnology, selectedSkill]
  );

  const skillDirectory = useMemo(
    () => portfolio.skillGroups.flatMap((group) =>
      group.items.map((item) => ({ ...item, groupId: group.id, groupLabel: group.label }))
    ),
    []
  );

  const skillMatches = useMemo(() => {
    const query = skillQuery.trim().toLowerCase();
    if (!query) return [];
    return skillDirectory.filter((item) =>
      `${item.name} ${item.type} ${item.groupLabel} ${item.proof}`.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [skillDirectory, skillQuery]);

  useEffect(() => {
    if (!skillAutoPlay || skillQuery) return;
    const timer = window.setInterval(() => {
      setActiveTechnology((current) => {
        const currentIndex = selectedSkill.items.findIndex((item) => item.name === current);
        return selectedSkill.items[(currentIndex + 1) % selectedSkill.items.length].name;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [selectedSkill, skillAutoPlay, skillQuery]);

  const visibleProjects = useMemo(
    () => portfolio.projects.filter((project) => filter === "All" || project.category === filter),
    [filter]
  );

  return (
    <main className={`portfolio theme-${theme}`}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Venkata Naveen - home">
          VN<span>/</span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Stack</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          </button>
          <a className="header-link" href="https://github.com/Naveen060" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="hero-content" data-reveal>
          <div className="availability"><i /> Available for thoughtful conversations</div>
          <p className="eyebrow">Software engineer · United States</p>
          <h1>
            I turn intelligent ideas into products
            <span> people can actually use.</span>
          </h1>
          <div className="role-switcher" aria-live="polite">
            <span>Currently exploring</span>
            <strong>{portfolio.roles[roleIndex]}</strong>
          </div>
          <p className="hero-summary">
            I build AI-enabled products, backend platforms, computer-vision workflows, and
            developer tools with a focus on real product behavior—not just technical demos.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">Explore selected work <span>↓</span></a>
            <a className="text-button" href="https://www.linkedin.com/in/venkata-naveen-84a190388" target="_blank" rel="noreferrer">
              Connect on LinkedIn <span>↗</span>
            </a>
          </div>
          <div className="role-dots" aria-label="Choose portfolio focus">
            {portfolio.roles.map((role, index) => (
              <button
                type="button"
                className={index === roleIndex ? "is-active" : ""}
                onClick={() => setRoleIndex(index)}
                aria-label={`Show ${role}`}
                key={role}
              />
            ))}
          </div>
        </div>

        <div
          className="hero-media"
          data-reveal
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            setTilt({
              x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 8,
              y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -8,
            });
          }}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div className="portrait-stage">
            <span className="portrait-ring ring-one" aria-hidden="true" />
            <span className="portrait-ring ring-two" aria-hidden="true" />
            <span className="portrait-signal signal-one" aria-hidden="true" />
            <span className="portrait-signal signal-two" aria-hidden="true" />
            <div
              className="photo-card"
              style={{ transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
            >
              <img src="naveen-profile-blurred.png" alt="Venkata Naveen by the Chicago River" />
              <div className="photo-identity">
                <strong>Venkata Naveen Chava</strong>
                <span>Software Engineer <i aria-hidden="true" /> AI &amp; ML</span>
              </div>
            </div>
          </div>
          <div className="hero-media-meta">
            <div className="live-card">
              <span><i /> live profile</span>
              <strong>Building useful systems</strong>
            </div>
            <div className="json-card">
              <div><span /> <span /> <span /></div>
              <code>
                {`{\n  "focus": "${portfolio.roles[roleIndex]}",\n  "mode": "shipping"\n}`}
              </code>
            </div>
          </div>
        </div>

        <div className="hero-stats" data-reveal>
          {portfolio.stats.map((stat) => (
            <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
          ))}
          <p>Scroll to explore <span aria-hidden="true">↓</span></p>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-intro" data-reveal>
          <p className="section-label">01 · Live skills explorer</p>
          <h2>Explore the stack.<br />See the evidence.</h2>
          <p>Search or select a resume-backed skill to see where it was applied and the production outcome behind it.</p>
        </div>

        <div className="skill-explorer" data-reveal>
          <div className="skill-tabs" role="tablist" aria-label="Technology categories">
            {portfolio.skillGroups.map((group) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeSkill === group.id}
                className={activeSkill === group.id ? "is-active" : ""}
                onClick={() => {
                  setActiveSkill(group.id);
                  setActiveTechnology(group.items[0].name);
                  setSkillQuery("");
                }}
                key={group.id}
              >
                <span>{String(portfolio.skillGroups.indexOf(group) + 1).padStart(2, "0")}</span>
                <span className="skill-tab-copy"><strong>{group.label}</strong><small>{group.items.length} skills</small></span>
              </button>
            ))}
          </div>
          <div className="skill-output" role="tabpanel" key={selectedSkill.id}>
            <div className="output-head">
              <div><i /><i /><i /></div>
              <span>resume/skills/{selectedSkill.id}.json</span>
            </div>

            <div className="skill-console-tools">
              <label className="skill-search" htmlFor="skill-search-input">
                <span aria-hidden="true">⌕</span>
                <input
                  id="skill-search-input"
                  type="search"
                  value={skillQuery}
                  onChange={(event) => setSkillQuery(event.target.value)}
                  placeholder="Search 40+ skills"
                  autoComplete="off"
                />
                <small>{skillQuery ? `${skillMatches.length} found` : `${skillDirectory.length} total`}</small>
              </label>
              <button
                className={skillAutoPlay ? "skill-autoplay is-running" : "skill-autoplay"}
                type="button"
                aria-pressed={skillAutoPlay}
                onClick={() => setSkillAutoPlay((value) => !value)}
              >
                <i aria-hidden="true" /> {skillAutoPlay ? "Auto spotlight" : "Resume spotlight"}
              </button>
            </div>

            {skillQuery && (
              <div className="skill-search-results" aria-live="polite">
                {skillMatches.length > 0 ? skillMatches.map((match) => (
                  <button
                    type="button"
                    key={`${match.groupId}-${match.name}`}
                    onClick={() => {
                      setActiveSkill(match.groupId);
                      setActiveTechnology(match.name);
                      setSkillQuery("");
                      setSkillAutoPlay(false);
                    }}
                  >
                    <strong>{match.name}</strong>
                    <span>{match.groupLabel}</span>
                  </button>
                )) : <p>No matching skill yet. Try “Kafka”, “AWS”, or “LLM”.</p>}
              </div>
            )}

            <p className="skill-summary">{selectedSkill.summary}</p>
            <div className="skill-browser">
              <div className="skill-cloud" role="listbox" aria-label={`${selectedSkill.label} skills`}>
                {selectedSkill.items.map((item, index) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedTechnology.name === item.name}
                    className={selectedTechnology.name === item.name ? "is-active" : ""}
                    onClick={() => {
                      setActiveTechnology(item.name);
                      setSkillAutoPlay(false);
                    }}
                    key={item.name}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.name}
                  </button>
                ))}
              </div>

              <article className="skill-proof" key={selectedTechnology.name}>
                <div className="proof-kicker"><i aria-hidden="true" /> Resume evidence</div>
                <p>{selectedTechnology.type}</p>
                <h3>{selectedTechnology.name}</h3>
                <blockquote>{selectedTechnology.proof}</blockquote>
                <div className="proof-tags">
                  <span>Applied in</span>
                  {selectedTechnology.usedIn.map((context) => <small key={context}>{context}</small>)}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-intro horizontal" data-reveal>
          <div>
            <p className="section-label">02 · Selected work</p>
            <h2>Built to be used.</h2>
          </div>
          <p>Filter the work, then open any project to see the problem, approach, and result—not just a repository title.</p>
        </div>

        <div className="project-toolbar" data-reveal>
          <div role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                type="button"
                className={filter === item ? "is-active" : ""}
                onClick={() => {
                  setFilter(item);
                  setOpenProject(null);
                }}
                key={item}
              >
                {item}
                <span>{item === "All" ? portfolio.projects.length : portfolio.projects.filter((project) => project.category === item).length}</span>
              </button>
            ))}
          </div>
          <span>{visibleProjects.length} projects shown</span>
        </div>

        <div className="project-list">
          {visibleProjects.map((project) => {
            const expanded = openProject === project.id;
            return (
              <article className={`project-row accent-${project.accent} ${expanded ? "is-open" : ""}`} key={project.id} data-reveal>
                <button
                  className="project-summary"
                  type="button"
                  onClick={() => setOpenProject(expanded ? null : project.id)}
                  aria-expanded={expanded}
                >
                  <span className="project-index">{project.index}</span>
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <span className="expand-mark" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </button>
                {expanded && (
                  <div className="project-details">
                    <div><span>Challenge</span><p>{project.challenge}</p></div>
                    <div><span>Approach</span><p>{project.solution}</p></div>
                    <div><span>Result</span><p>{project.outcome}</p></div>
                    <a href={project.href} target="_blank" rel="noreferrer">View source on GitHub <span>↗</span></a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section about-section">
        <div className="about-grid">
          <div data-reveal>
            <p className="section-label">03 · How I think</p>
            <h2>Technical depth.<br />Product awareness.</h2>
          </div>
          <div className="about-copy" data-reveal>
            <p>I care about the complete experience around a system: how it is structured, tested, explained, and ultimately used by another person.</p>
            <p>That means treating a model, API, or script as the beginning of a product—not the finish line.</p>
          </div>
        </div>
        <div className="principle-grid">
          {[
            ["01", "Start with behavior", "Define what a useful outcome feels like before choosing the technology."],
            ["02", "Make it legible", "Clear architecture and documentation let a good idea survive beyond its author."],
            ["03", "Close the loop", "Measure, test, and refine the full workflow instead of polishing one isolated component."],
          ].map(([number, title, text]) => (
            <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-intro horizontal" data-reveal>
          <div><p className="section-label">04 · Journey</p><h2>Learning while building.</h2></div>
          <p>A short view of the environments shaping my work today, supported by current cloud and AI credentials.</p>
        </div>
        <div className="journey-layout">
          <div className="timeline">
            {portfolio.journey.map((item) => (
              <article key={item.place} data-reveal>
                <div className="timeline-dot" />
                <div className="timeline-meta"><span>{item.type}</span><strong>{item.period}</strong></div>
                <div><h3>{item.place}</h3><strong>{item.role}</strong><p>{item.description}</p></div>
              </article>
            ))}
          </div>
          <div className="credential-stack" data-reveal>
            <span className="credential-label">Validated learning</span>
            {portfolio.certifications.map((cert) => (
              <article key={cert.title}><span>{cert.mark}</span><div><h3>{cert.title}</h3><p>{cert.issuer}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-content" data-reveal>
          <p className="section-label">05 · Start a conversation</p>
          <h2>Have a useful problem<br />worth building?</h2>
          <p>I’m interested in applied AI, backend engineering, computer vision, and conversations that lead to better software.</p>
          <div>
            <a className="primary-button" href="https://www.linkedin.com/in/venkata-naveen-84a190388" target="_blank" rel="noreferrer">Connect on LinkedIn <span>↗</span></a>
            <a className="text-button" href="https://github.com/Naveen060" target="_blank" rel="noreferrer">Explore GitHub <span>↗</span></a>
          </div>
        </div>
        <div className="contact-visual" aria-hidden="true"><span>VN</span><i /><i /><i /></div>
      </section>

      <footer>
        <a className="brand" href="#top">VN<span>/</span></a>
        <p>© 2026 Venkata Naveen Chava</p>
        <p>Designed for interaction, built with intent.</p>
      </footer>
    </main>
  );
}
