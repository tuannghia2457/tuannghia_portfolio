import { profile } from '../profile'

// Background-removed portrait (Apple Vision foreground mask, from personal_image.JPG) standing behind the hero copy.
export default function HomePortrait() { return <figure className="editorial-portrait hero-figure">
  <img src="/images/optimized/portrait-cutout.webp" alt={`${profile.displayName} wearing his Ho Chi Minh City University of Technology–University of Technology Sydney shirt`} width="933" height="1500" fetchpriority="high" decoding="async" />
</figure> }
