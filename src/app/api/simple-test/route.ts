export async function GET() {
  return new Response(JSON.stringify({
    success: true,
    message: 'Simple API test successful',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST() {
  return new Response(JSON.stringify({
    success: true,
    message: 'POST method working',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}