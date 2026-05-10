import { NextResponse } from 'next/server';

export async function GET(request, context) {
  try {
    const params = await context.params;
    const id = params.id;

    const response = await fetch(`https://shefaa-app.onrender.com/user/getDoctorById/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (getDoctorById):', error);
    return NextResponse.json(
      { message: 'فشل جلب بيانات الطبيب', error: error.message },
      { status: 500 }
    );
  }
}
