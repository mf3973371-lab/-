import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const token = request.headers.get('authentication');
    
    const response = await fetch('https://shefaa-app.onrender.com/user/resendOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authentication': token || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (ResendOtp):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لإعادة إرسال الكود', error: error.message }, 
      { status: 500 }
    );
  }
}
