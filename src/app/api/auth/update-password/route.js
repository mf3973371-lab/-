import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    const token = request.headers.get('authorization');
    const body = await request.json();
    
    const response = await fetch('https://shefaa-app.onrender.com/user/updatePassword', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': token || '',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (UpdatePassword):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لتحديث كلمة المرور', error: error.message }, 
      { status: 500 }
    );
  }
}
