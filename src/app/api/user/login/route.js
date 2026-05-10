import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://shefaa-app.onrender.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (userLogin):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لتسجيل الدخول', error: error.message }, 
      { status: 500 }
    );
  }
}
