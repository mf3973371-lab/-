import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    const body = await request.json();
    console.log("Reset Password Payload:", body);
    
    const response = await fetch('https://shefaa-app.onrender.com/user/resetPassword', {
      method: 'PATCH',
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
    console.error('Proxy Error (ResetPassword):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لتغيير كلمة المرور', error: error.message }, 
      { status: 500 }
    );
  }
}
