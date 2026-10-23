import { useMemo, useState } from 'react'
import RoleResponsibilities from './RoleResponsibilities'
import CompanyMilestones from './CompanyMilestones'
import { buildTimeline, formatDuration, monthIndex, monthLabel } from '../lib/timeline'
import { companyShortNames } from '../portfolio-data'
import './experience-timeline.css'

// Overview: one bar per role on a shared year axis, so overlapping roles read at a glance.
function TimelineOverview({ roles, today }) {
  const first = Math.floor(Math.min(...roles.map(role => role.start)) / 12) * 12
  const last = (Math.floor(Math.max(...roles.map(role => role.end)) / 12) + 1) * 12
  const ratio = month => (month - first) / (last - first)
  const position = month => `${ratio(month) * 100}%`
  const years = Array.from({ length: (last - first) / 12 }, (_, i) => first / 12 + i)
  const now = monthIndex(today) + today.getDate() / 31

  return <div className="timeline-overview"><div className="timeline-chart" style={{ '--today': ratio(now) }}>
    <div className="timeline-axis mono" aria-hidden="true">
      {years.map(year => <span key={year} style={{ left: position(year * 12) }}>{year}</span>)}
    </div>
    <ol className="timeline-lanes">
      {roles.map(role => <li key={role.id} className="timeline-lane">
        <span className="timeline-lane-label" title={`${role.company} — ${role.title}`}><strong>{companyShortNames[role.company] ?? role.company}</strong> <span>{role.title}</span></span>
        <span className="timeline-track">
          {years.map(year => <span key={year} className="timeline-gridline" style={{ left: position(year * 12) }} aria-hidden="true" />)}
          {/* The date sits beside its bar: after it for early roles, before it for late ones. */}
          <span className="timeline-bar-dates mono" aria-hidden="true" style={ratio(role.start) > .45 ? { right: `calc(100% - ${position(role.start)} + 12px)` } : { left: `calc(${position(role.current ? now : role.end + 1)} + 12px)` }}>{monthLabel(role.start)} — {role.current ? 'Now' : monthLabel(role.end)}</span>
          <a className={`timeline-bar${role.current ? ' is-current' : ''}`} href={`#${role.id}`}
            style={{ left: position(role.start), width: `calc(${position(role.current ? now : role.end + 1)} - ${position(role.start)})` }}
            aria-label={`${role.title} at ${role.company}, ${monthLabel(role.start)} to ${role.current ? 'present' : monthLabel(role.end)}`} />
        </span>
      </li>)}
    </ol>
    <span className="timeline-today mono" aria-hidden="true"><span>Today</span></span>
  </div></div>
}

export default function ExperienceTimeline({ items, today: todayProp }) {
  const [today] = useState(() => todayProp ?? new Date())
  const roles = useMemo(() => buildTimeline(items, today), [items, today])
  return <div className="experience-timeline">
    <TimelineOverview roles={roles} today={today} />
    <ol className="timeline-list">
      {roles.map(role => <li className={`timeline-item experience-item${role.current ? ' is-current' : ''}`} id={role.id} key={role.id}>
        <div className="timeline-when">
          <p className="experience-period mono">{role.period}</p>
          <p className="timeline-duration mono">{formatDuration(role.months)}{role.current && <span className="timeline-now">Now</span>}</p>
        </div>
        <div className="timeline-rail" aria-hidden="true"><span className="timeline-node" /></div>
        <div className="experience-main">
          <h3>{role.title}</h3>
          <p className="experience-org">{role.organization}</p>
          {role.location && <p className="experience-location mono">{role.location}</p>}
          <details className="experience-details"><summary>Responsibilities & contributions</summary><RoleResponsibilities items={role.responsibilities} /></details>
          {/* The #ivs-pothole-milestone anchor lives in the IVS company panel, which opens for that hash. */}
          <CompanyMilestones items={role.milestones} />
          <div className="experience-stack tag-list" aria-label="Skills and tools">{role.stack.split(' · ').map(skill => <span className="tag mono" key={skill}>{skill}</span>)}</div>
        </div>
      </li>)}
    </ol>
  </div>
}
