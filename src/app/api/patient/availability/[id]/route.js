import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const token = request.headers.get('authorization');
    
    const apiUrl = `https://shefaa-app.onrender.com/doctor/AvailableTime/${id}${date ? `?date=${date}` : ''}`;
    
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
    console.error('Proxy Error (Patient GetAvailability):', error);
    return NextResponse.json(
      { message: 'فشل جلب مواعيد الطبيب', error: error.message }, 
      { status: 500 }
    );
  }
}
