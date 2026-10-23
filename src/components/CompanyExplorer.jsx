import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import { experience } from '../portfolio-data'
import CompanyMilestones from './CompanyMilestones'
import './company-explorer.css'

// Each panel tells the story of my time at the company; the role-by-role tasks live in the timeline above.
const companies = [
  { id: 'ivs', name: 'Individual Systems Joint Stock Company', subtitle: 'Computer vision & robotics', logo: 'ivs.png', roles: [0],
    summary: 'A research internship in computer vision and robotics, building perception for machines that navigate the real world.',
    story: 'I joined Individual Systems in April 2026 as a computer vision research assistant. The work is about perception where conditions are hard: helping a UAV locate itself without satellite positioning, and helping ground robots plan their way through places they can barely see. Testing pothole detection on a LiDAR-equipped JetTank grew into the pothole surface reconstruction research I presented at Current Topics in Mathematics and Industrial Applications 2026.' },
  { id: 'bsec', name: 'Best Start English Center', subtitle: 'English education', logo: 'bsec_ielts.jpg', roles: [1, 2],
    summary: 'An English center where I went from coaching IELTS students to building the tools they learn with.',
    story: 'I started at Best Start English Center in June 2025 as a teaching assistant, coaching IELTS Writing and Speaking in small classes. A few months later I took on the center’s web work as well, helping build its online IELTS assessment platform and automating content uploads. Building for the same center where I taught meant I could see how my tools were actually used.' },
  { id: 'sde', name: 'SDE Digital Technology Company Limited', subtitle: 'Digital technology', logo: 'logo-sde-tech.webp', roles: [3],
    summary: 'A summer internship in low-code development and automation for practical business workflows.',
    story: 'My earliest role was a summer internship at SDE in 2024, before I started university. Working with Mendix and Python, I built a time-tracking web app and supported automation for footwear quality inspection — my first look at how software fits into a real factory and office workflow.' },
  { id: 'odylytics', name: 'Odylytics', subtitle: 'Technology leadership & computer vision', logo: 'odylytics-light.png', roles: [4],
    summary: 'The company I co-founded — the team behind AquaGuard.',
    story: 'Odylytics is the team behind AquaGuard, the flood-response platform I co-founded. Since July 2026 I have led its technology as Chief Technology Officer while still building hands-on as a Computer Vision Engineer.' },
]
export default function CompanyExplorer() {
  const { hash } = useLocation()
  const [selected, setSelected] = useState(() => hash === '#ivs-pothole-milestone' ? 'ivs' : null)
  useEffect(() => {
    if (hash === '#ivs-pothole-milestone') setSelected('ivs')
  }, [hash])
  useEffect(() => {
    if (selected === 'ivs' && hash === '#ivs-pothole-milestone') {
      document.getElementById('ivs-pothole-milestone')?.scrollIntoView()
    }
  }, [selected, hash])
  // Opening a company glides its panel into view, since it sits below the logo grid.
  function choose(id) {
    const next = selected === id ? null : id
    setSelected(next)
    if (!next) return
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => document.getElementById('company-detail-panel')?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }))
  }
  const company = companies.find(item => item.id === selected)
  function close() { const id = selected; setSelected(null); document.getElementById(`company-button-${id}`)?.focus() }
  return <section id="company" className="company-explorer section-pad" aria-labelledby="company-title">
    <p className="section-kicker mono">02 / COMPANIES & COLLABORATORS</p>
    <div className="company-explorer-heading"><h2 id="company-title">The teams I’ve worked with.</h2><p>Select a company to explore my role and contributions.</p></div>
    <div className="company-selector" aria-label="Choose a company">
      {companies.map(item => <button key={item.id} id={`company-button-${item.id}`} type="button" className="company-logo-button" aria-label={`Explore ${item.name}`} aria-expanded={selected === item.id} aria-controls="company-detail-panel" onClick={() => choose(item.id)}>
        <span className="company-logo-stage"><img src={`/images/company-logos/${item.logo}`} alt="" width="200" height="140" loading="lazy" /></span>
        <span className="company-selector-name">{item.name}<ChevronDown size={16} /></span>
        <span className="company-selector-description">{item.subtitle}</span>
      </button>)}
    </div>
    <div id="company-detail-panel" role={company ? 'region' : undefined} aria-labelledby={company ? `company-button-${company.id}` : undefined} hidden={!company}>
      {company && <div className="company-detail-content" key={company.id}>
        <div className="company-detail-heading"><div><span className="section-kicker mono">{company.subtitle}</span><h3>{company.name}</h3><p>{company.summary}</p></div><button type="button" className="company-detail-close" onClick={close} aria-label="Close company details"><X size={19} /></button></div>
        <p className="company-story">{company.story}</p>
        <div className="company-role-list">{company.roles.map(index => {
          const role = experience[index]
          return <article key={role.title}><div className="company-role-heading"><h4>{role.title}</h4><span className="mono">{role.period}</span></div><p className="company-role-location">{role.organization}</p>
            <CompanyMilestones items={role.milestones} anchor={role.milestones ? 'ivs-pothole-milestone' : undefined} />
          </article>
        })}</div>
      </div>}
    </div>
  </section>
}
