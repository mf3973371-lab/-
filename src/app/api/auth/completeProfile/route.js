import { NextResponse } from 'next/server';

export async function PATCH(request) {
  try {
    const token = request.headers.get('authorization');
    const body = await request.json();

    const response = await fetch('https://shefaa-app.onrender.com/auth/completeProfile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': token || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (completeProfile):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لإكمال البيانات', error: error.message },
      { status: 500 }
    );
  }
}
