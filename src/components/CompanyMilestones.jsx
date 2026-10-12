export default function CompanyMilestones({ items = [], anchor }) {
  if (!items.length) return null
  return <section className="company-milestones" id={anchor} aria-label="Company milestones">
    {items.map(item => <p key={item.title}>Milestone: {item.title} — presented at Current Topics in Mathematics and Industrial Applications 2026.</p>)}
  </section>
}
