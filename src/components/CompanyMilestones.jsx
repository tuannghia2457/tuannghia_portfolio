export default function CompanyMilestones({ items = [], anchor }) {
  if (!items.length) return null
  return <section className="company-milestones" id={anchor} aria-label="Company milestones">
    <p className="section-kicker mono">MILESTONES</p>
    {items.map(item => <article key={item.title}>
      <h4>{item.title}</h4><p>{item.summary}</p><p className="milestone-result"><strong>{item.result}</strong></p>
      <details><summary>Research approach & contributions</summary><p>{item.technical}</p><ul>{item.contributions.map(text => <li key={text}>{text}</li>)}</ul><div className="tag-list">{item.technologies.map(tool => <span className="tag mono" key={tool}>{tool}</span>)}</div></details>
    </article>)}
  </section>
}
