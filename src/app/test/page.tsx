export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Test Page - No Auth Required</h1>
      <p>If you can see this page, the middleware is working correctly.</p>
      <p>Environment: {process.env.NODE_ENV || 'not set'}</p>
      <p>Time: {new Date().toISOString()}</p>
      
      <h2>Test Links:</h2>
      <ul>
        <li><a href="/api/test">/api/test - API endpoint</a></li>
        <li><a href="/api/public/debug">/api/public/debug - Public debug API</a></li>
        <li><a href="/public-debug">/public-debug - Debug page</a></li>
        <li><a href="/test.json">/test.json - Static file</a></li>
      </ul>
    </div>
  );
}