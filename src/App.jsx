import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import {
  Activity,
  Award,
  Boxes,
  BriefcaseBusiness,
  ChevronRight,
  Cloud,
  Code2,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Network,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  UserRound,
  X,
  LayoutDashboard,
  Cpu,
  CheckCircle2,
  MapPin,
  CalendarDays,
} from "lucide-react";
const C = {
  crust: "#11111b",
  mantle: "#181825",
  base: "#1e1e2e",
  surface0: "#313244",
  surface1: "#45475a",
  surface2: "#585b70",
  overlay0: "#6c7086",
  text: "#cdd6f4",
  subtext: "#bac2de",
  blue: "#89b4fa",
  sky: "#89dceb",
  teal: "#94e2d5",
  green: "#a6e3a1",
  mauve: "#cba6f7",
  peach: "#fab387",
};
const nav = [
  ["Overview", LayoutDashboard, "overview"],
  ["Experience", BriefcaseBusiness, "experience"],
  ["Projects", Boxes, "projects"],
  ["Skills", Code2, "skills"],
  ["Credentials", Award, "credentials"],
  ["Contact", Mail, "contact"],
];
const roles = [
  {
    date: "Sep 2026 – Present",
    role: "Desktop Support",
    org: "University of Arkansas",
    color: C.blue,
    bullets: [
      "Troubleshoot hardware, software, account, and printing issues across a large university environment.",
      "Deploy and support Windows and macOS endpoints through imaging, configuration, and Microsoft Intune.",
    ],
  },
  {
    date: "Jul 2026 – Aug 2026",
    role: "IT Deployment Technician",
    org: "TMG Global",
    color: C.teal,
    bullets: [
      "Supported a healthcare technology deployment across 4 hospitals, 2 emergency departments, and 21 clinics.",
      "Performed asset inventory, infrastructure documentation, and endpoint and wireless deployment planning.",
    ],
  },
  {
    date: "Jul 2024 – Dec 2024",
    role: "Junior Web Developer",
    org: "NWA Apps",
    color: C.mauve,
    bullets: [
      "Developed and maintained client applications with Next.js, Tailwind CSS, Git, and modern JavaScript.",
    ],
  },
  {
    date: "Jan 2024 – May 2026",
    role: "Resident Assistant",
    org: "University of Arkansas Housing",
    color: C.peach,
    bullets: [
      "Developed leadership, communication, and conflict-resolution skills while supporting residents.",
    ],
  },
  {
    date: "Aug 2023 – Jan 2024",
    role: "Application Tester",
    org: "Upflyte",
    color: C.green,
    bullets: [
      "Automated testing with Playwright and collaborated through Jira to identify and resolve defects.",
    ],
  },
];
const projects = [
  {
    name: "Project WAYPNT",
    type: "Autonomous Systems",
    status: "In progress",
    icon: Network,
    color: C.blue,
    desc: "Senior capstone coordinating multiple aquatic vessels with React Native, LoRa communication, and swarm-coordination algorithms.",
    tags: ["React Native", "LoRa", "Swarm Algorithms"],
  },
  {
    name: "Personal Homelab",
    type: "Infrastructure",
    status: "Online",
    icon: Server,
    color: C.green,
    desc: "HP ProLiant DL360p G8 running Proxmox, Tailscale, NGINX, Docker/Portainer, Immich, game servers, ad blocking, and uptime monitoring.",
    tags: ["Proxmox", "Linux", "Docker", "NGINX"],
  },
  {
    name: "TheOrderOfThePuzzle",
    type: "Web",
    status: "Repository",
    icon: Code2,
    color: C.mauve,
    desc: "Independent web project developed, deployed, and maintained from start to finish.",
    tags: ["Web", "Git", "Deployment"],
    url: "https://github.com/jaxbkr/puzzle",
  },
  {
    name: "Jolt Analytics",
    type: "Web",
    status: "Repository",
    icon: Activity,
    color: C.sky,
    desc: "Independent analytics-focused web project with full lifecycle ownership.",
    tags: ["Analytics", "Web", "Operations"],
    url: "https://github.com/jaxbkr/Jolt",
  },
];
const skills = {
  "Endpoint & Support": [
    "Windows",
    "macOS",
    "Microsoft Intune",
    "Device Imaging",
    "Hardware Troubleshooting",
    "Asset Management",
    "PaperCut",
  ],
  "Systems & Virtualization": [
    "Proxmox",
    "Linux",
    "Docker",
    "Portainer",
    "NGINX",
    "Tailscale",
    "OS Installation",
  ],
  Programming: [
    "Python",
    "Bash",
    "JavaScript",
    "Java",
    "C++",
    "SQL",
    "HTML/CSS",
    "Next.js",
    "Tailwind CSS",
  ],
  Tools: ["Git", "Jira", "Cloudflare", "Supabase", "OracleDB", "Playwright"],
};
function Panel({ children, className = "", accent }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`panel ${className}`}
      style={{ borderColor: accent ? `${accent}55` : C.surface0 }}
    >
      {children}
    </motion.section>
  );
}
function Head({ icon: Icon, title, kicker }) {
  return (
    <div className="panel-head">
      <Icon size={17} style={{ color: C.blue }} />
      <div>
        <b>{title}</b>
        {kicker && <small>{kicker}</small>}
      </div>
    </div>
  );
}
function Stat({ icon: Icon, label, value, color, sub }) {
  return (
    <Panel className="stat">
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <small>{sub}</small>
      </div>
      <i style={{ background: `${color}18`, color }}>
        <Icon size={20} />
      </i>
    </Panel>
  );
}
export default function App() {
  const reduced = useReducedMotion();
  const [side, setSide] = useState(true),
    [mobile, setMobile] = useState(false),
    [query, setQuery] = useState(""),
    [active, setActive] = useState("overview"),
    [filter, setFilter] = useState("All"),
    [command, setCommand] = useState(false),
    [searchTerm, setSearchTerm] = useState(""),
    [focus, setFocus] = useState("Endpoint & Support"),
    [copied, setCopied] = useState(""),
    [tour, setTour] = useState(false);
  const searchTrigger = useRef(null);
  const results = useMemo(
    () =>
      [
        ...nav.map(([name, icon, id]) => ({ name, icon, id, kind: "Section" })),
        ...projects.map((p) => ({
          name: p.name,
          icon: p.icon,
          id: "projects",
          kind: "Project",
          terms: p.tags.join(" "),
        })),
        ...Object.entries(skills).flatMap(([group, items]) =>
          items.map((name) => ({
            name,
            icon: Code2,
            id: "skills",
            kind: group,
          })),
        ),
      ].filter((item) =>
        `${item.name} ${item.kind} ${item.terms || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );
  useEffect(() => {
    if (!command) return;
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, [command]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    nav.forEach(([, , id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("jackson.baker7562@gmail.com");
      setCopied("Email copied");
    } catch {
      setCopied("Copy unavailable. Use the email link.");
    }
  };
  useEffect(() => {
    const f = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommand((v) => !v);
      }
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);
  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === "All" || p.type === filter) &&
          `${p.name} ${p.desc} ${p.tags}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );
  const go = (id) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    setMobile(false);
  };
  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a className="skip-link" href="#overview">
          Skip to content
        </a>
        <div className="backdrop" />
        <header>
          <button
            aria-label="Toggle navigation"
            aria-expanded={mobile || side}
            onClick={() =>
              innerWidth < 768 ? setMobile(true) : setSide((v) => !v)
            }
          >
            <Menu />
          </button>
          <div className="brand">
            <Cloud />
            <span>Jackson Cloud Portal</span>
          </div>
          <button
            ref={searchTrigger}
            className="search"
            onClick={() => setCommand(true)}
          >
            <Search /> Search resources, skills, and projects <kbd>Ctrl K</kbd>
          </button>
          <a
            href="mailto:jackson.baker7562@gmail.com"
            aria-label="Email Jackson"
          >
            <UserRound />
          </a>
        </header>
        <AnimatePresence>
          {(mobile || side) && (
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className={mobile ? "mobile" : ""}
            >
              <div className="identity">
                <b>Jackson Baker</b>
                <small>Desktop Support • Systems</small>
                <em>● Available for opportunities</em>
              </div>
              <label>Portal navigation</label>
              <nav>
                {nav.map(([n, I, id]) => (
                  <button
                    aria-current={active === id ? "location" : undefined}
                    className={active === id ? "active" : ""}
                    onClick={() => go(id)}
                    key={id}
                  >
                    <I />
                    {n}
                    <ChevronRight />
                  </button>
                ))}
              </nav>
              <div className="status">
                <ShieldCheck />
                <b>Profile status</b>
                <small>Explore projects, tools, and experience.</small>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        {mobile && (
          <button
            className="shade"
            aria-label="Close navigation"
            onClick={() => setMobile(false)}
          />
        )}
        <main className={side ? "shift" : ""}>
          <section id="overview">
            <div className="page-title">
              <div>
                <small>Home / Portfolio overview</small>
                <h1>Jackson Baker</h1>
                <p>
                  Your next dependable teammate. Explore the systems I support
                  and the things I build.
                </p>
              </div>
              <div className="actions">
                <a href="https://github.com/jaxbkr">
                  <Code2 />
                  GitHub
                </a>
                <a
                  className="primary"
                  href="mailto:jackson.baker7562@gmail.com"
                >
                  <Mail />
                  Contact
                </a>
              </div>
            </div>
            <div className="stats">
              <Stat
                icon={BriefcaseBusiness}
                label="Current role"
                value="Desktop Support"
                color={C.blue}
                sub="University of Arkansas"
              />
              <Stat
                icon={Server}
                label="Focus area"
                value="Infrastructure"
                color={C.green}
                sub="Endpoint to homelab"
              />
              <Stat
                icon={GraduationCap}
                label="Graduation"
                value="Dec 2026"
                color={C.mauve}
                sub="B.S. Computer Science"
              />
              <Stat
                icon={Award}
                label="GPA"
                value="3.439"
                color={C.peach}
                sub="Mathematics minor"
              />
            </div>
            <div className="overview-grid">
              <Panel>
                <Head
                  icon={Activity}
                  title="Professional profile"
                  kicker="Resource summary"
                />
                <div className="pad">
                  <h2>
                    Building dependable technology from <span>endpoint</span> to{" "}
                    <span>infrastructure</span>.
                  </h2>
                  <p>
                    Computer Science student with hands-on experience in desktop
                    support, endpoint deployment, IT infrastructure
                    documentation, systems administration, testing, and modern
                    web development.
                  </p>
                  <div className="mini">
                    <div>
                      <Cpu />
                      Endpoint engineering
                    </div>
                    <div>
                      <Network />
                      Systems administration
                    </div>
                    <div>
                      <Terminal />
                      Automation & development
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel className="explorer">
                <Head
                  icon={Terminal}
                  title="Choose your route"
                  kicker="An interactive profile"
                />
                <div className="pad">
                  <p>What brings you here?</p>
                  <div className="route-options">
                    {Object.keys(skills)
                      .slice(0, 3)
                      .map((group) => (
                        <button
                          key={group}
                          aria-pressed={focus === group}
                          className={focus === group ? "selected" : ""}
                          onClick={() => setFocus(group)}
                        >
                          {group}
                          <ChevronRight size={15} />
                        </button>
                      ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="route-detail"
                    >
                      <small>Explore my toolkit</small>
                      <div className="tags">
                        {skills[focus].slice(0, 4).map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                      <button
                        className="text-button"
                        onClick={() => {
                          setFilter(
                            focus === "Systems & Virtualization"
                              ? "Infrastructure"
                              : focus === "Programming"
                                ? "Web"
                                : "All",
                          );
                          go(
                            focus === "Endpoint & Support"
                              ? "experience"
                              : "projects",
                          );
                        }}
                      >
                        See related work <ChevronRight size={15} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Panel>
            </div>
          </section>
          <div className="tour-bar">
            <span>
              <Terminal size={17} /> New to the portal?
            </span>
            <button
              onClick={() => {
                setTour(!tour);
                if (!tour) go("experience");
              }}
            >
              {tour ? "Finish exploring" : "Start a quick tour"} →
            </button>
            {tour && (
              <p>
                01 · Open a role below. 02 · Filter the projects. 03 · Find a
                tool with Ctrl / ⌘ K.
              </p>
            )}
          </div>
          <section id="experience">
            <Title over="Experience resources" text="Deployment history" />
            <div className="list">
              {roles.map((r) => (
                <Panel key={r.role} accent={r.color}>
                  <details>
                    <summary>
                      <span
                        style={{ color: r.color, background: `${r.color}16` }}
                      >
                        {r.date}
                      </span>
                      <div>
                        <b>{r.role}</b>
                        <small>{r.org}</small>
                      </div>
                    </summary>
                    <ul>
                      {r.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </details>
                </Panel>
              ))}
            </div>
          </section>
          <section id="projects">
            <div className="section-row">
              <Title over="Project resources" text="Resource groups" />
              <div className="filters">
                {["All", "Autonomous Systems", "Infrastructure", "Web"].map(
                  (f) => (
                    <button
                      aria-pressed={filter === f}
                      className={filter === f ? "selected" : ""}
                      onClick={() => setFilter(f)}
                      key={f}
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="project-search">
              <label htmlFor="project-search">Find a project</label>
              <input
                id="project-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try Docker, Web, or LoRa…"
              />
              <span role="status">{visible.length} projects</span>
            </div>
            <div className="project-grid">
              {!visible.length && (
                <div className="empty">
                  <Search />
                  <h3>No matching projects</h3>
                  <p>Try another keyword or reset the filters.</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFilter("All");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}
              {visible.map((p) => {
                const Icon = p.icon;
                return (
                  <Panel key={p.name} accent={p.color} className="project">
                    <div className="stripe" style={{ background: p.color }} />
                    <div className="pad">
                      <div className="project-top">
                        <i
                          style={{ color: p.color, background: `${p.color}18` }}
                        >
                          <Icon />
                        </i>
                        <small style={{ color: p.color }}>{p.status}</small>
                      </div>
                      <h3>{p.name}</h3>
                      <label style={{ color: p.color }}>{p.type}</label>
                      <p>{p.desc}</p>
                      <div className="tags">
                        {p.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                      {p.url && (
                        <a href={p.url}>
                          Open repository <ExternalLink />
                        </a>
                      )}
                    </div>
                  </Panel>
                );
              })}
            </div>
          </section>
          <section id="skills">
            <Title over="Skills inventory" text="Technical asset catalog" />
            <div className="skill-grid">
              {Object.entries(skills).map(([g, list], i) => {
                const I = [Cpu, Server, Code2, Terminal][i];
                return (
                  <Panel key={g}>
                    <Head
                      icon={I}
                      title={g}
                      kicker={`${list.length} resources`}
                    />
                    <div className="tags pad">
                      {list.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </Panel>
                );
              })}
            </div>
          </section>
          <section id="credentials">
            <div className="credential-grid">
              <Panel>
                <Head
                  icon={GraduationCap}
                  title="Education"
                  kicker="Academic resource"
                />
                <div className="pad">
                  <h3>B.S. Computer Science</h3>
                  <p className="accent">Mathematics Minor</p>
                  <div className="mini two">
                    <div>
                      <CalendarDays />
                      Expected
                      <br />
                      <b>December 2026</b>
                    </div>
                    <div>
                      <MapPin />
                      Institution
                      <br />
                      <b>University of Arkansas</b>
                    </div>
                  </div>
                </div>
              </Panel>
              <Panel>
                <Head
                  icon={Award}
                  title="Certifications"
                  kicker="Certificates & learning"
                />
                <div className="certs">
                  {[
                    ["Remote Pilot Certificate", "FAA • May 2026"],
                    ["Private Pilot Certificate", "FAA • July 2024"],
                    [
                      "Scientific Computing with Python",
                      "freeCodeCamp • April 2022",
                    ],
                  ].map(([a, b]) => (
                    <div key={a}>
                      <Award />
                      <p>
                        <b>{a}</b>
                        <small>{b}</small>
                      </p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </section>
          <section id="contact">
            <Panel accent={C.blue} className="contact">
              <div className="pad">
                <small>Create support request</small>
                <h2>Let’s build dependable systems.</h2>
                <p>
                  I am pursuing opportunities in IT support, systems
                  administration, and infrastructure engineering.
                </p>
                <div className="actions">
                  <a
                    className="primary"
                    href="mailto:jackson.baker7562@gmail.com"
                  >
                    jackson.baker7562@gmail.com
                  </a>
                  <button className="copy-button" onClick={copyEmail}>
                    Copy email
                  </button>
                  <span className="copy-status" role="status">
                    {copied}
                  </span>
                  <a href="https://linkedin.com/in/jaxbkr">
                    LinkedIn <ExternalLink />
                  </a>
                </div>
              </div>
            </Panel>
            <footer>
              Jackson Baker Cloud Portal • Built with curiosity. Made to
              explore.
            </footer>
          </section>
        </main>
        <AnimatePresence>
          {command && (
            <motion.div
              className="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={() => setCommand(false)}
            >
              <div
                className="command"
                role="dialog"
                aria-modal="true"
                aria-label="Search portfolio"
                onMouseDown={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setCommand(false);
                  if (e.key === "Tab") {
                    const nodes = [
                      ...e.currentTarget.querySelectorAll("input,button"),
                    ];
                    const first = nodes[0],
                      last = nodes[nodes.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                      e.preventDefault();
                      last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                      e.preventDefault();
                      first.focus();
                    }
                  }
                }}
              >
                <div>
                  <Search />
                  <input
                    aria-label="Search sections, projects, and skills"
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search sections, projects, and skills…"
                  />
                  <button
                    aria-label="Close search"
                    onClick={() => setCommand(false)}
                  >
                    <X />
                  </button>
                </div>
                <div className="command-results">
                  {results.map(({ name, icon: I, id, kind }) => (
                    <button
                      key={`${kind}-${name}`}
                      onClick={() => {
                        if (kind === "Project") {
                          setQuery(name);
                          setFilter("All");
                        }
                        go(id);
                        setCommand(false);
                      }}
                    >
                      <I />
                      <div>
                        {name}
                        <small>{kind}</small>
                      </div>
                      <ChevronRight />
                    </button>
                  ))}
                  {!results.length && (
                    <p className="pad" role="status">
                      No results. Try “Docker” or “Experience”.
                    </p>
                  )}
                </div>
                <p className="command-hint">
                  Tab to browse · Enter to open · Esc to close
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
function Title({ over, text }) {
  return (
    <div className="title">
      <small>{over}</small>
      <h2>{text}</h2>
    </div>
  );
}
