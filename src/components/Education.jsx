import { ArrowUpRight } from 'lucide-react'
import { education, academicRecognition, studentTestimonialUrl } from '../portfolio-data'
import './education.css'

export default function Education() { return <section id="education" className="education-section section-pad" aria-labelledby="education-title">
  <div className="education-heading"><p className="section-kicker mono">STUDY & ACADEMIC ACHIEVEMENTS</p><h2 id="education-title">From physics to artificial intelligence.</h2><p>My education brings together analytical foundations, AI studies, and an international learning environment.</p></div>
  <div className="education-layout">
    <div className="education-records">{education.map(item => <article className="education-record" key={item.institution}>
      <div className="school-identity"><span className="school-logo">{item.logo ? <img src={item.logo} alt="" width="64" height="64" loading="lazy" /> : <span className="mono">{item.abbreviation}</span>}</span><div><span className="school-period mono">{item.period || 'TRANSNATIONAL EDUCATION'}</span><h3>{item.institution}</h3></div></div>
      <p className="education-degree">{item.degree}</p><p className="education-program">{item.program}</p><p className="education-summary">{item.summary}</p>
      {item.activities.length > 0 && <div className="school-activities"><span className="mono">ACTIVITIES & SOCIETIES</span><ul>{item.activities.map(activity => <li key={activity}>{activity}</li>)}</ul></div>}
      {item.skills.length > 0 && <div className="school-skills"><span className="mono">RELATED SKILLS</span><div className="tag-list">{item.skills.map(skill => <span className="tag mono" key={skill}>{skill}</span>)}</div></div>}
      {item.grade && <div className="education-grade"><span className="mono">ACADEMIC GRADE</span><strong>{item.grade}</strong></div>}
    </article>)}</div>
    <div className="education-capabilities">
      <article className="language-record"><h3>Languages & communication</h3>
        <div className="academic-language"><strong>English</strong><span>Full professional proficiency</span></div>
        <div className="ielts-record"><span className="mono">IELTS</span><strong>8.0</strong><span>Overall band score</span></div>
        <div className="academic-language"><strong>Japanese</strong><span>Elementary proficiency</span></div>
        <div className="academic-language"><strong>Vietnamese</strong></div>
      </article>
      <article className="academic-recognition"><span className="section-kicker mono">ACADEMIC RECOGNITION</span><h3>{academicRecognition.title}</h3><p>{academicRecognition.institution}</p><a className="text-link" href={academicRecognition.certificate} target="_blank" rel="noreferrer">View Dean’s List certificate <ArrowUpRight size={16} /></a></article>
      <article className="academic-recognition"><span className="section-kicker mono">STUDENT VOICE</span><h3>Featured in UTS/HCMUT Student Testimonial</h3><p>Sharing my experience of the transnational education program, learning, and class representation.</p><a className="text-link" href={studentTestimonialUrl} target="_blank" rel="noreferrer">Read my student story <ArrowUpRight size={16} /></a></article>
      <article className="academic-recognition"><span className="section-kicker mono">CLASS RECOGNITION</span><h3>Class Voted Collaborator</h3><p>Recognized by my class for collaboration.</p></article>
    </div>
  </div>
</section> }
