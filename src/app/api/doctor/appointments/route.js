import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization');
    
    const response = await fetch('https://shefaa-app.onrender.com/doctor/createAvailableTime', {
      method: 'POST',
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
    console.error('Proxy Error (CreateAppointment):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لإضافة الموعد', error: error.message }, 
      { status: 500 }
    );
  }
}
