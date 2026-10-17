import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'
import { experience } from '../portfolio-data'
import RoleResponsibilities from './RoleResponsibilities'
import CompanyMilestones from './CompanyMilestones'
import './company-explorer.css'

const companies = [
  { id: 'ivs', name: 'Individual Systems Joint Stock Company', shortName: 'Individual Systems Joint Stock Company', subtitle: 'Individual Systems', logo: 'ivs.png', roles: [0], summary: 'My work at Individual Systems Joint Stock Company focuses on computer vision, robotics, and perception systems for real-world navigation.' },
  { id: 'bsec', name: 'Best Start English Center', shortName: 'Best Start English Center', subtitle: 'English education', logo: 'bsec_ielts.jpg', roles: [1, 2], summary: 'At Best Start English Center, I contributed to educational web tools and automation alongside IELTS teaching support.' },
  { id: 'sde', name: 'SDE Digital Technology Company Limited', shortName: 'SDE Digital Technology Company Limited', subtitle: 'Digital technology', logo: 'logo-sde-tech.webp', roles: [3], summary: 'At SDE Digital Technology Company Limited, I worked on low-code application development and automation for practical business workflows.' },
  { id: 'odylytics', name: 'Odylytics', shortName: 'Odylytics', subtitle: 'Technology leadership & computer vision', logo: 'odylytics-light.png', roles: [4], summary: 'I’m a co-founder of Odylytics, the team behind AquaGuard, and work as Chief Technology Officer and Computer Vision Engineer.' },
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
  const company = companies.find(item => item.id === selected)
  function close() { const id = selected; setSelected(null); document.getElementById(`company-button-${id}`)?.focus() }
  return <section id="company" className="company-explorer section-pad" aria-labelledby="company-title">
    <p className="section-kicker mono">COMPANIES & COLLABORATORS</p>
    <div className="company-explorer-heading"><h2 id="company-title">The teams I’ve worked with.</h2><p>Select a company to explore my role and contributions.</p></div>
    <div className="company-selector" aria-label="Choose a company">
      {companies.map(item => <button key={item.id} id={`company-button-${item.id}`} type="button" className="company-logo-button" aria-label={`Explore ${item.name}`} aria-expanded={selected === item.id} aria-controls="company-detail-panel" onClick={() => setSelected(selected === item.id ? null : item.id)}>
        <span className="company-logo-stage"><img src={`/images/company-logos/${item.logo}`} alt="" width="200" height="140" loading="lazy" /></span>
        <span className="company-selector-name">{item.shortName}<ChevronDown size={16} /></span>
        <span className="company-selector-description">{item.name}</span>
      </button>)}
    </div>
    <div id="company-detail-panel" role={company ? 'region' : undefined} aria-labelledby={company ? `company-button-${company.id}` : undefined} hidden={!company}>
      {company && <div className="company-detail-content" key={company.id}>
        <div className="company-detail-heading"><div><span className="section-kicker mono">{company.subtitle}</span><h3>{company.name}</h3><p>{company.summary}</p></div><button type="button" className="company-detail-close" onClick={close} aria-label="Close company details"><X size={19} /></button></div>
        <div className="company-role-list">{company.roles.map(index => {
          const role = experience[index]
          return <article key={role.title}><div className="company-role-heading"><h4>{role.title}</h4><span className="mono">{role.period}</span></div><p className="company-role-location">{role.organization}</p>{role.location && <p className="company-role-location">{role.location}</p>}
            <RoleResponsibilities items={role.responsibilities} /><CompanyMilestones items={role.milestones} anchor={role.milestones ? "ivs-pothole-milestone" : undefined} /><div className="tag-list">{role.stack.split(' · ').map(tool => <span className="tag mono" key={tool}>{tool}</span>)}</div>
          </article>
        })}</div>
      </div>}
    </div>
  </section>
}
