import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Ensure coordinates are included if present
    const payload = {
      ...body,
      // The backend might expect specific names, but we pass what we have
      latitude: body.latitude,
      longitude: body.longitude
    };

    // الاتصال بالسيرفر الأصلي من جهة السيرفر (Server-side) لتجنب CORS
    const response = await fetch('https://shefaa-app.onrender.com/user/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر الخارجي', error: error.message }, 
      { status: 500 }
    );
  }
}
