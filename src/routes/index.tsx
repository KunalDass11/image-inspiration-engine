import { createFileRoute, useServerFn } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { submitContact } from '@/lib/contact.functions';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Award, Binary, BrainCircuit, Braces, Code2, Database, Github, GraduationCap, Linkedin, Mail, MapPin, Menu, Phone, Sparkles, Terminal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectVisual } from '@/components/portfolio/ProjectVisual';
import { links, navigation, projects, skillGroups } from '@/lib/portfolio';
import portrait from '@/assets/kunal-profile.jpg.asset.json';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Kunal Kumar Das — Software Development & AI/ML Portfolio' },
    { name: 'description', content: 'Portfolio of Kunal Kumar Das, a Computer Science student at KIIT focused on software development, AI/ML, NLP, data analysis, and practical technology projects.' },
    { property: 'og:title', content: 'Kunal Kumar Das — Software Development & AI/ML Portfolio' },
    { property: 'og:description', content: 'Explore Kunal’s AI, machine learning, data, and web development projects.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});
const skillIcons = { code: Code2, data: Database, ai: BrainCircuit, web: Braces, tools: Terminal, cs: Binary };
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) { return <div className="section-number">{number} / {children}</div>; }
function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) { return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>; }

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const submitContactFn = useServerFn(submitContact);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!selected) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'Tab') {
        const controls = Array.from(document.querySelectorAll<HTMLElement>('.project-modal button, .project-modal a'));
        const first = controls[0]; const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); previousFocus.current?.focus(); };
  }, [selected]);
  return <>
    <header className="site-header"><div className="header-inner">
      <a href="#home" className="logo" aria-label="Kunal Das home">Kunal Das<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} className={`nav-link ${active === item.toLowerCase() ? 'active' : ''}`} aria-current={active === item.toLowerCase() ? 'location' : undefined}>{item}</a>)}</nav>
      <div className="header-actions"><Button asChild variant="ghost" size="icon"><ExternalLink href={links.github}><Github size={18}/><span className="sr-only">GitHub</span></ExternalLink></Button><Button asChild variant="outline" size="sm"><ExternalLink href={links.resume}><ArrowDownToLine/> Resume</ExternalLink></Button><Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button></div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} className={active === item.toLowerCase() ? 'active' : ''} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}
    </div></header>
    <main>
      <section id="home" className="hero"><div className="container hero-grid"><div className="hero-copy">
        <div className="eyebrow"><span className="status-dot"/> OPEN TO LEARNING & COLLABORATION</div>
        <p className="hero-intro">Hey, I’m <span>Kunal Kumar Das</span> <span aria-hidden="true">↗</span></p>
        <h1>Building ideas<br/>into <span>intelligent</span><br/>digital solutions<span>.</span></h1>
        <p className="hero-description">Computer Science student exploring software development, AI/ML, NLP, and data analysis through practical projects. A curious mind. A builder at heart.</p>
        <div className="hero-buttons"><Button asChild><a href="#projects">View Projects <ArrowUpRight/></a></Button><Button asChild variant="outline"><ExternalLink href={links.resume}><ArrowDownToLine/> Download Resume</ExternalLink></Button></div>
        <div className="hero-social"><ExternalLink href={links.github}><Github size={17}/><span className="sr-only">GitHub</span></ExternalLink><ExternalLink href={links.linkedin}><Linkedin size={17}/><span className="sr-only">LinkedIn</span></ExternalLink><a href={links.email} aria-label="Email Kunal"><Mail size={17}/></a><span className="social-divider"/><span className="hero-location"><MapPin size={12}/> Bhubaneswar, India</span></div>
      </div><div className="portrait-composition"><div className="portrait-back"/><div className="portrait-frame"><img src={portrait.url} alt="Kunal Kumar Das wearing a black suit" width="533" height="800" fetchPriority="high"/><div className="portrait-caption"><div><strong>Kunal Kumar Das</strong><small>SOFTWARE · AI · DATA</small></div><Code2 size={25}/></div></div><div className="float-tag"><Sparkles size={14}/> Driven by curiosity.</div><div className="scribble">Code. Build. Grow. <ArrowUpRight size={35}/></div></div></div><div className="container hero-bottom"><a href="#about"><ArrowDown size={14}/> SCROLL TO EXPLORE</a><span>Thoughtful code. Meaningful impact.</span></div></section>
      <div className="expertise-strip"><div className="container expertise-list"><span>Software Development</span><Sparkles/><span>Artificial Intelligence</span><Sparkles/><span>Machine Learning</span><Sparkles/><span>Data Analysis</span><Sparkles/><span>Web Development</span></div></div>
      <section id="about" className="section container reveal"><div className="about-grid"><div className="about-copy"><SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel><h2>Turning learning into<br/><span>real-world projects.</span></h2><p>I’m Kunal, a Computer Science and Engineering student at <strong>KIIT, Bhubaneswar.</strong> I enjoy connecting curiosity with code to build applications that solve meaningful problems.</p><p>From AI-powered health analysis to NLP and web experiences, I’m developing my skills through hands-on work. My foundation in <strong>DSA, OOP, DBMS, Operating Systems, and Computer Networks</strong> shapes the way I approach each project.</p></div><div className="about-stats"><div className="stat"><strong>2027</strong><span>Expected graduation</span></div><div className="stat"><strong>7.27<span>/10</span></strong><span>Current CGPA</span></div><div className="stat stat-wide"><strong>AI + Web + Data</strong><span>Different disciplines. One curious mind.</span></div></div></div></section>
      <section id="education" className="section container reveal"><div className="section-heading"><div><SectionLabel number="02">EDUCATION</SectionLabel><h2>A foundation to build on.</h2></div></div><div className="education-row"><div className="education-icon"><GraduationCap size={28}/></div><div><h3>Kalinga Institute of Industrial Technology</h3><p>B.Tech — Computer Science and Engineering</p><small>KIIT · Bhubaneswar, Odisha</small></div><div className="education-meta"><strong>Expected graduation · 2027</strong><small>CGPA · 7.27 / 10</small></div></div></section>
      <section id="skills" className="section container reveal"><div className="section-heading"><div><SectionLabel number="03">MY TOOLKIT</SectionLabel><h2>The tools behind the ideas.</h2></div><p className="section-subtitle">A growing toolkit across software, intelligent systems, and the web.</p></div><div className="skills-grid">{skillGroups.map(group => { const Icon = skillIcons[group.icon as keyof typeof skillIcons]; return <article className="skill-card" key={group.title}><Icon className="skill-icon" size={24}/><h3>{group.title}</h3><div className="tags">{group.skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div></article>; })}</div></section>
      <section id="projects" className="section container reveal"><div className="section-heading"><div><SectionLabel number="04">SELECTED WORK</SectionLabel><h2>Ideas brought to life<span>.</span></h2></div><Button asChild variant="ghost"><ExternalLink href={links.github}>Explore GitHub <ArrowUpRight/></ExternalLink></Button></div><div className="project-grid">{projects.map(project => <article key={project.id} className="project-card"><ProjectVisual type={project.id}/><div className="project-info"><span className="project-category">{project.category}</span><div className="project-title-row"><h3>{project.name}</h3><Button variant="ghost" size="icon" aria-label={`View ${project.name} details`} onClick={() => setSelected(project)}><ArrowUpRight/></Button></div><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><span className="project-date">{project.date}</span></div></article>)}</div></section>
      <section id="certificates" className="section container reveal"><div className="section-heading"><div><SectionLabel number="05">CERTIFICATIONS</SectionLabel><h2>Always a work in progress.</h2></div><p className="section-subtitle">Continuing to learn, one new skill and one new perspective at a time.</p></div><div className="cert-grid">{[{title:'Python',issuer:'freeCodeCamp'},{title:'Responsive Web Design',issuer:'freeCodeCamp'},{title:'Data Analytics with AI',issuer:'IBM',url:links.certificate}].map(cert => <article key={cert.title} className="certificate"><Award size={26}/><h3>{cert.title}</h3><p>{cert.issuer}</p>{cert.url && <ExternalLink href={cert.url} className="certificate-link">View certificate <ArrowUpRight size={14}/></ExternalLink>}</article>)}</div></section>
      <section id="journey" className="section container reveal"><div className="section-heading"><div><SectionLabel number="06">MY JOURNEY</SectionLabel><h2>Learning. Building. Evolving.</h2></div></div><div className="journey-grid">{[{name:'Computer Science Foundation',text:'Building knowledge in programming, DSA, OOP, DBMS, Operating Systems, and Computer Networks.'},{name:'AI / ML & Data',text:'Developing practical projects involving Machine Learning, NLP, Data Analysis, and AI-powered applications.'},{name:'Software & Web Development',text:'Building practical web applications and learning modern development technologies.'}].map((item,i) => <article className="journey-item" key={item.name}><span>0{i+1}</span><h3>{item.name}</h3><p>{item.text}</p></article>)}</div></section>
      <section id="contact" className="container contact-section reveal"><SectionLabel number="07">LET’S CONNECT</SectionLabel><div className="contact-top"><div><h2>Have an idea?<br/><span>Let’s build it.</span></h2><p>Interested in software development, AI/ML, data-driven applications, or collaborative projects? Let’s connect.</p></div><a href={links.email} className="contact-arrow" aria-label="Start a conversation by email"><ArrowUpRight size={43}/></a></div><form className="contact-form" aria-label="Send Kunal a message" onSubmit={async e => { e.preventDefault(); if (sending) return; setSending(true); try { const result = await submitContactFn({ data: form }); if (result.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }); } else { setStatus('error'); } } catch { setStatus('error'); } finally { setSending(false); } }}>
        <div className="form-grid">
          <div className="form-field"><label htmlFor="contact-name">NAME</label><input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/></div>
          <div className="form-field"><label htmlFor="contact-email">EMAIL</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={255} placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/></div>
        </div>
        <div className="form-field"><label htmlFor="contact-message">MESSAGE</label><textarea id="contact-message" name="message" required maxLength={2000} placeholder="Tell me about your idea or project…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}/></div>
        <div className="form-footer">
          <Button type="submit" disabled={sending}>{sending ? 'Sending…' : <>Send Message <ArrowUpRight/></>}</Button>
          {status === 'sent' && <p className="form-status" role="status">Message sent — thank you for reaching out.</p>}
          {status === 'error' && <p className="form-status" role="alert">{typeof (status as object) === 'object' ? '' : ''}Something went wrong. Please try again or email me directly.</p>}
          <span className="form-note">Questions, ideas, or collaborations — all welcome. Prefer email? Use the address below.</span>
        </div>
      </form><div className="contact-details"><a className="contact-email" href={links.email}>das.kunal0047@gmail.com <ArrowUpRight size={20}/></a><div className="contact-links"><a href="tel:+917482898422"><Phone size={13}/> 7482898422</a><ExternalLink href={links.linkedin}>LinkedIn <ArrowUpRight size={13}/></ExternalLink><ExternalLink href={links.github}>GitHub <ArrowUpRight size={13}/></ExternalLink></div></div><p className="hero-location"><MapPin size={13}/> KIIT, Bhubaneswar, Odisha</p></section>
    </main><footer className="footer"><div className="container footer-inner"><a className="logo" href="#home">Kunal Das<span>.</span></a><span>© 2026 Kunal Kumar Das</span><a href="#home">Back to top ↑</a></div></footer>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={e => e.stopPropagation()}><Button ref={closeRef} className="modal-close" variant="ghost" size="icon" aria-label="Close project details" onClick={() => setSelected(null)}><X/></Button><span className="project-category">{selected.category}</span><h2 id="project-dialog-title">{selected.name}</h2><span className="project-date">{selected.date}</span><p>{selected.details}</p><div className="tags">{selected.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><Button asChild><ExternalLink href={selected.url ?? links.github}>{selected.url ? 'View project' : 'Explore GitHub profile'} <ArrowUpRight/></ExternalLink></Button></div></div>}
  </>;
}
