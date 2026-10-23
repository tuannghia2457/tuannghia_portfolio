import { Blocks, Bot, Box, Cloud, Cpu, Drama, FileSearch, Hand, Radar } from 'lucide-react'
import { RevealItem } from './Reveal'
import { skillAreas, technicalSkills } from '../portfolio-data'
import './skills-bento.css'

const logos = Object.fromEntries(technicalSkills.map(skill => [skill.name, skill.logo]))
// Tools without a devicon logo use a monochrome generic icon instead.
const genericIcons = { LiDAR: Radar, Gazebo: Box, JetTank: Bot, MediaPipe: Hand, Playwright: Drama, Mendix: Blocks, 'On-device AI': Cpu, RAG: FileSearch, 'Azure AI': Cloud }

// Gray and brand-color layers are stacked; hover only fades the color layer in (opacity).
function ToolChip({ name }) {
  const logo = logos[name], Icon = genericIcons[name]
  return <li className="tool-chip">
    <span className="tool-chip-icon" aria-hidden="true">
      {logo ? <><img className="is-muted" src={logo} alt="" width="16" height="16" loading="lazy" /><img className="is-brand" src={logo} alt="" width="16" height="16" loading="lazy" /></>
        : Icon && <><Icon className="is-muted" size={16} /><Icon className="is-brand" size={16} /></>}
    </span>
    <span className="mono">{name}</span>
  </li>
}

export default function SkillsBento() {
  return <section className="skills-section skills-bento-section section-pad" aria-labelledby="skills-title">
    <p className="section-kicker mono">03 / Toolkit</p>
    <h2 id="skills-title">Tools I’ve put <em>to work.</em></h2>
    <div className="skills-bento">
      {skillAreas.map((area, index) => <RevealItem key={area.id} className={`bento-cell bento-pos-${index + 1}`}>
        <article className="bento-block" tabIndex={-1} aria-labelledby={`skill-${area.id}`}>
          <span className="bento-corners" aria-hidden="true"><i /><i /><i /><i /></span>
          <p className="bento-label mono">{area.label}</p>
          <h3 id={`skill-${area.id}`}>{area.title}</h3>
          <ul className="tool-chips" aria-label={`${area.title} tools`}>{area.tools.map(tool => <ToolChip key={tool} name={tool} />)}</ul>
        </article>
      </RevealItem>)}
    </div>
  </section>
}
