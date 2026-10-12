import { ArrowUpRight } from 'lucide-react'
import { education, academicRecognition } from '../portfolio-data'
import './education.css'

export default function Education() { return <section id="education" className="education-section section-pad" aria-labelledby="education-title">
  <div className="education-heading"><p className="section-kicker mono">EDUCATION & ACADEMIC ACHIEVEMENTS</p><h2 id="education-title">Learning, with evidence.</h2><p>My academic background, language skills, and recognition.</p></div>
  <div className="education-layout">
    <div className="education-records">{education.map(item => <article className="education-record" key={item.institution}>
      <span className="mono">{item.period}</span><h3>{item.institution}</h3><p className="education-degree">{item.degree}</p><p className="education-program">{item.program}</p>
      <div className="education-grade"><span className="mono">ACADEMIC GRADE</span><strong>{item.grade}</strong></div>
    </article>)}</div>
    <div className="education-capabilities">
      <article className="language-record"><h3>Languages & communication</h3>
        <div className="academic-language"><strong>English</strong><span>Full professional proficiency</span></div>
        <div className="ielts-record"><span className="mono">IELTS</span><strong>8.0</strong><span>Overall band score</span></div>
        <div className="academic-language"><strong>Japanese</strong><span>Elementary proficiency</span></div>
        <div className="academic-language"><strong>Vietnamese</strong></div>
      </article>
      <article className="academic-recognition"><span className="section-kicker mono">ACADEMIC RECOGNITION</span><h3>{academicRecognition.title}</h3><p>{academicRecognition.institution}</p><a className="text-link" href={academicRecognition.certificate} target="_blank" rel="noreferrer">View Dean’s List certificate <ArrowUpRight size={16} /></a></article>
    </div>
  </div>
</section> }
