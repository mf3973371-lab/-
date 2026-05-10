import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization');

    const response = await fetch('https://shefaa-app.onrender.com/user/getProfile', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'authorization': token || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (GetProfile):', error);
    return NextResponse.json(
      { message: 'فشل جلب بيانات الملف الشخصي', error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const token = request.headers.get('authorization');
    const body = await request.json();

    const response = await fetch('https://shefaa-app.onrender.com/user/updateProfile', {
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
    console.error('Proxy Error (UpdateProfile):', error);
    return NextResponse.json(
      { message: 'فشل تحديث بيانات الملف الشخصي', error: error.message },
      { status: 500 }
    );
  }
}
