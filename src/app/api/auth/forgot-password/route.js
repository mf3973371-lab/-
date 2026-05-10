import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://shefaa-app.onrender.com/user/forgetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (ForgotPassword):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لإرسال كود الاستعادة', error: error.message }, 
      { status: 500 }
    );
  }
}
