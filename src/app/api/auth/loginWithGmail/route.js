import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('Proxy calling backend URL: https://shefaa-app.onrender.com/auth/google');
    const response = await fetch('https://shefaa-app.onrender.com/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Proxy backend response status:', response.status);
    console.log('Proxy backend response body:', data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (loginWithGmail):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر الخارجي', error: error.message },
      { status: 500 }
    );
  }
}
