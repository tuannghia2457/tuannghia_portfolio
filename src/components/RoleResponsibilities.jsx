function HighlightedText({ text, highlights = [] }) {
  const pieces = highlights.reduce((parts, phrase) => parts.flatMap(part => {
    if (typeof part !== 'string') return [part]
    return part.split(phrase).flatMap((piece, index) => index ? [{ phrase }, piece] : [piece])
  }), [text])
  return pieces.map((piece, index) => typeof piece === 'string' ? piece : <strong key={index}>{piece.phrase}</strong>)
}

export default function RoleResponsibilities({ items }) {
  return <ul className="role-responsibilities">{items.map(item => <li key={item.text}><HighlightedText {...item} /></li>)}</ul>
}
