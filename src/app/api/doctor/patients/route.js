import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization');

    const response = await fetch('https://shefaa-app.onrender.com/user/getDoctorPatients', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'authorization': token || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (GetDoctorPatients):', error);
    return NextResponse.json(
      { message: 'فشل جلب قائمة المرضى', error: error.message },
      { status: 500 }
    );
  }
}
