import { profile } from '../profile'
export default function HomePortrait() { return <figure className="editorial-portrait">
  <div className="portrait-mat">
    <div className="portrait-photo"><img src="/images/optimized/portrait.jpg" alt={`${profile.displayName} wearing his HCMUT–UTS shirt`} width="640" height="427" fetchPriority="high" /></div>
    <div className="portrait-tracking" aria-hidden="true"><i /><i /><i /><i /></div>
    <span className="portrait-subject mono">SUBJECT: {profile.displayName.toUpperCase()} / COMPUTER VISION</span>
  </div>
  <figcaption><span className="mono">01 / THE HUMAN BEHIND THE SYSTEMS</span><span className="portrait-caption">A little curiosity. A human perspective.</span></figcaption>
</figure> }
