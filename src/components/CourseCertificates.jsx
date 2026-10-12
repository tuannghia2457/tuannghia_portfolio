import { FileBadge, ArrowUpRight } from 'lucide-react'
import { courseCertificates } from '../portfolio-data'
import './course-certificates.css'

export default function CourseCertificates() { return <section id="certificates" className="course-certificates section-pad" aria-labelledby="course-certificates-title">
  <div className="course-certificates-heading"><p className="section-kicker mono">CONTINUING EDUCATION</p><h2 id="course-certificates-title">Online course certificates<span className="period">.</span></h2><p>Courses I’ve completed to deepen my understanding of AI and applied technologies.</p></div>
  <div className="course-certificate-grid">{courseCertificates.map(certificate => <article className="course-certificate-card" key={certificate.id}>
    <div className="course-certificate-topline"><span className="course-certificate-icon" aria-hidden="true"><FileBadge size={25} strokeWidth={1.5} /></span><span className="mono">ISSUED {certificate.issued}</span></div>
    <h3>{certificate.title}</h3><p className="course-certificate-issuer">{certificate.issuer}</p>
    <div className="course-certificate-skills"><span className="mono">RELATED SKILLS</span><div className="tag-list">{certificate.skills.map(skill => <span className="tag mono" key={skill}>{skill}</span>)}</div></div>
    {certificate.credentialUrl && <a className="text-link" href={certificate.credentialUrl} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={16} /></a>}
  </article>)}</div>
</section> }
