export default function CompanyMilestones({ items = [], anchor }) {
  if (!items.length) return null
  return <section className="company-milestones" id={anchor} aria-label="Company milestones">
    {items.map(item => <div key={item.title}>
      <p className="milestone-note">Milestone: {item.title} — presented at Current Topics in Mathematics and Industrial Applications 2026.</p>
      <details className="milestone-certificate"><summary>View certificate</summary>
        {item.certificate ? <a className="text-link" href={item.certificate} target="_blank" rel="noreferrer">Open conference certificate</a> : <p>Certificate will be added soon.</p>}
      </details>
    </div>)}
  </section>
}
