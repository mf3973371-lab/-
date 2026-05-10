import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const token = request.headers.get('authorization');
    
    const apiUrl = `https://shefaa-app.onrender.com/doctor/AvailableTime${date ? `?date=${date}` : ''}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'authorization': token || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (GetAvailability):', error);
    return NextResponse.json(
      { message: 'فشل جلب المواعيد المتاحة', error: error.message }, 
      { status: 500 }
    );
  }
}
