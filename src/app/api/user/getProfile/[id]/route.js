import { NextResponse } from 'next/server';

export async function GET(request, context) {
  try {
    const params = await context.params;
    const id = params.id;
    const token = request.headers.get('authorization');

    const response = await fetch(`https://shefaa-app.onrender.com/user/getProfile/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'authorization': token || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (getProfileByID):', error);
    return NextResponse.json(
      { message: 'فشل جلب بيانات هذا الملف', error: error.message },
      { status: 500 }
    );
  }
}
