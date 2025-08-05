export default function MastersPage() {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f9fafb',
      minHeight: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <img 
          src={`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-size="12">⚙️</text></svg>`)}`}
          alt=""
          style={{ width: '1.25rem', height: '1.25rem' }}
        />
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#374151',
          margin: 0
        }}>
          マスター管理
        </h1>
      </div>
      
      <p style={{
        color: '#6b7280',
        fontSize: '1rem',
        margin: 0,
        textAlign: 'center',
        padding: '3rem 0'
      }}>
        データを読み込み中...
      </p>
    </div>
  );
}