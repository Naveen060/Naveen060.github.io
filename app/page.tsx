const projects = [
  {
    number: "01",
    title: "Attendance Intelligence Platform",
    summary:
      "A full attendance workflow with multi-face recognition, liveness checks, configurable confidence thresholds, admin tools, and SQLite reporting.",
    tags: ["Flask", "OpenCV", "SQLite", "Computer Vision"],
    href: "https://github.com/Naveen060/face-recognition-based-attendance-system",
    tone: "lime",
    label: "Featured build",
  },
  {
    number: "02",
    title: "Emotion-Aware Music Recommender",
    summary:
      "A webcam-powered Streamlit experience that reads facial emotion, ranks mood signals, and turns them into an exportable playlist.",
    tags: ["Streamlit", "TensorFlow", "OpenCV", "pandas"],
    href: "https://github.com/Naveen060/Emotion-based-music-recommendation-system",
    tone: "coral",
    label: "Applied AI",
  },
  {
    number: "03",
    title: "Team10 Sprint Board",
    summary:
      "A lightweight command center for sprint planning, ownership, status tracking, backlog analytics, local persistence, and CSV exports.",
    tags: ["Python", "Streamlit", "JSON", "Testing"],
    href: "https://github.com/Naveen060/team10",
    tone: "blue",
    label: "Team tooling",
  },
  {
    number: "04",
    title: "Python Utility Toolkit",
    summary:
      "A dependency-light CLI toolkit for everyday text, JSON, file analysis, URL slugs, and SHA-256 checksum workflows.",
    tags: ["Python", "CLI", "JSON", "Automation"],
    href: "https://github.com/Naveen060/python",
    tone: "violet",
    label: "Developer tool",
  },
];

const skillGroups = [
  {
    title: "Languages",
    index: "A",
    skills: ["Python", "SQL", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend & Data",
    index: "B",
    skills: ["FastAPI", "Flask", "SQLite", "REST APIs"],
  },
  {
    title: "AI & Vision",
    index: "C",
    skills: ["TensorFlow", "scikit-learn", "OpenCV", "pandas", "NumPy"],
  },
  {
    title: "Product & Tools",
    index: "D",
    skills: ["React", "Electron", "Streamlit", "Git", "Vite"],
  },
];

const certifications = [
  { title: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", mark: "AWS" },
  { title: "Azure Fundamentals", issuer: "Microsoft · AZ-900", mark: "AZ" },
  { title: "Power Platform Fundamentals", issuer: "Microsoft · PL-900", mark: "PL" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Venkata Naveen — home">
          VN<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#journey">Journey</a>
        </nav>
        <a className="nav-cta" href="#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" /> Software Engineer · AI & Backend
          </div>
          <p className="hero-intro">Hello, I&apos;m Venkata Naveen.</p>
          <h1>
            I build intelligent software that works <em>beyond the demo.</em>
          </h1>
          <p className="hero-summary">
            From computer vision to backend platforms, I turn ambitious ideas into practical,
            structured products people can actually use.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button-secondary"
              href="https://www.linkedin.com/in/venkata-naveen-84a190388"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-stats" aria-label="Portfolio summary">
            <div>
              <strong>04</strong>
              <span>Selected builds</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Cloud credentials</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Product mindset</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-one" aria-hidden="true" />
          <div className="visual-orbit orbit-two" aria-hidden="true" />
          <div className="portrait-card">
            <div className="portrait-frame">
              <img src="/naveen-profile.jpg" alt="Venkata Naveen" />
            </div>
            <div className="portrait-caption">
              <div>
                <span>Currently</span>
                <strong>Goldman Sachs</strong>
              </div>
              <span className="caption-arrow" aria-hidden="true">↗</span>
            </div>
          </div>
          <div className="floating-tag tag-ai">Applied AI</div>
          <div className="floating-tag tag-python">Python-first</div>
          <div className="availability-card">
            <span className="mini-dot" />
            <div>
              <strong>Building useful systems</strong>
              <span>United States</span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-label="Areas of focus">
        <div>
          <span>Applied AI</span><b>✦</b><span>Backend Systems</span><b>✦</b>
          <span>Computer Vision</span><b>✦</b><span>Product Engineering</span><b>✦</b>
          <span>Applied AI</span><b>✦</b><span>Backend Systems</span><b>✦</b>
          <span>Computer Vision</span><b>✦</b><span>Product Engineering</span>
        </div>
      </div>

      <section className="section work-section" id="work">
        <div className="section-heading split-heading">
          <div>
            <span className="section-kicker">01 / Selected work</span>
            <h2>Projects with a pulse.</h2>
          </div>
          <p>
            Working systems built around real workflows—from recognizing a face to helping a
            team move a sprint forward.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <a
              className={`project-card ${project.tone}`}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.title}
              aria-label={`${project.title} — view on GitHub`}
            >
              <div className="project-card-top">
                <span className="project-number">{project.number}</span>
                <span className="project-label">{project.label}</span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-display" aria-hidden="true">
                <span className="display-corner">{project.number}</span>
                <div className="display-lines">
                  <i />
                  <i />
                  <i />
                </div>
                <strong>{project.title.split(" ").slice(0, 2).join(" ")}</strong>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>

        <a
          className="text-link"
          href="https://github.com/Naveen060"
          target="_blank"
          rel="noreferrer"
        >
          See the full GitHub profile <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading about-title">
          <span className="section-kicker light">02 / About</span>
          <h2>
            Curious by nature.<br />Practical by choice.
          </h2>
        </div>
        <div className="about-layout">
          <div className="about-lead">
            <p>
              I&apos;m a software engineer focused on building <strong>AI-enabled products</strong>,
              dependable <strong>backend platforms</strong>, and tools that make complex workflows
              feel straightforward.
            </p>
            <p>
              I care about the whole product—not only the model or API, but how it is structured,
              tested, explained, and experienced by the person using it.
            </p>
          </div>
          <div className="principles">
            <article>
              <span>01</span>
              <h3>Build for use</h3>
              <p>Every project starts with a workflow and ends with something demonstrable.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Keep it legible</h3>
              <p>Clear architecture and documentation make good ideas easier to grow.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Learn in public</h3>
              <p>Each repository is a visible record of sharper thinking and better craft.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading split-heading">
          <div>
            <span className="section-kicker">03 / Toolkit</span>
            <h2>Tools I reach for.</h2>
          </div>
          <p>
            A focused stack for shipping data-aware products, backend services, and applied
            machine-learning experiences.
          </p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <div className="skill-title">
                <span>{group.index}</span>
                <h3>{group.title}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="journey-header">
          <span className="section-kicker light">04 / Journey</span>
          <h2>Where I&apos;m learning &amp; building.</h2>
        </div>
        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-marker"><span /></div>
            <div className="timeline-meta">
              <span>Experience</span>
              <strong>Present</strong>
            </div>
            <div className="timeline-copy">
              <h3>Goldman Sachs</h3>
              <p className="timeline-role">Software Engineering</p>
              <p>Building toward dependable, AI-enabled products and backend platforms in a high-expectation environment.</p>
            </div>
          </article>
          <article className="timeline-item">
            <div className="timeline-marker"><span /></div>
            <div className="timeline-meta">
              <span>Education</span>
              <strong>2024 — 2025</strong>
            </div>
            <div className="timeline-copy">
              <h3>University of Central Missouri</h3>
              <p className="timeline-role">Computer Science</p>
              <p>A graduate chapter centered on software engineering, practical AI, and stronger systems thinking.</p>
            </div>
          </article>
        </div>

        <div className="certifications">
          <div className="cert-heading">
            <span>Validated learning</span>
            <h3>Certifications</h3>
          </div>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <article key={cert.title}>
                <span className="cert-mark">{cert.mark}</span>
                <div>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <span className="section-kicker light">05 / Contact</span>
        <p className="contact-overline">Have a problem worth building?</p>
        <h2>Let&apos;s make it useful.</h2>
        <p className="contact-copy">
          I&apos;m always interested in thoughtful software, applied AI, backend engineering,
          and conversations that lead to better products.
        </p>
        <div className="contact-actions">
          <a
            className="button contact-primary"
            href="https://www.linkedin.com/in/venkata-naveen-84a190388"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            className="button contact-secondary"
            href="https://github.com/Naveen060"
            target="_blank"
            rel="noreferrer"
          >
            Explore GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">VN<span>.</span></a>
        <p>© 2026 Venkata Naveen Chava</p>
        <p>Designed around curiosity, built with intent.</p>
      </footer>
    </main>
  );
}
