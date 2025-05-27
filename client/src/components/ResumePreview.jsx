import React from 'react';

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
              {line.trim() || '\u00A0'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewSection;
