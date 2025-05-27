import React from 'react';

function parseFormattedText(text) {
  const regex = /\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    if (match[0].startsWith('**')) {
      parts.push(<strong key={match.index}>{match[1]}</strong>);
    } else if (match[0].startsWith('[')) {
      parts.push(
        <a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" style={{ color: '#0073b1' }}>
          {match[2]}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts;
}

function PreviewSection({ title, content }) {
  const lines = content?.trim() ? content.split('\n').filter(Boolean) : [];
  if (!lines.length) return null;

  return (
    <div style={{ marginBottom: 25 }}>
      <h2 style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        borderBottom: '2px solid #000',
        paddingBottom: 6,
        marginBottom: 0
      }}>
        {title}
      </h2>
      <div style={{ height: 10 }} />
      <div style={{ paddingLeft: 20 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6 }}>
            <div style={{
              width: 12,
              fontWeight: 'bold',
              fontSize: 18,
              color: '#000',
              marginRight: 8,
              userSelect: 'none',
              lineHeight: '18px',
            }}>•</div>
            <div style={{
              whiteSpace: 'pre-wrap',
              fontSize: 14,
              color: '#000',
              flex: 1,
            }}>
              {parseFormattedText(line.trim() || '\u00A0')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewSection;
