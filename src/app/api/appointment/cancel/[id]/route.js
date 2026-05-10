import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization');

    console.log(`Proxy forwarding cancellation for ID: ${id}`);
    const response = await fetch(`https://shefaa-app.onrender.com/appointment/cancelAppointment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': token || '',
      },
      cache: 'no-store'
    });

    const rawText = await response.text();
    console.log(`Backend response for cancellation [${response.status}]:`, rawText);
    
    let data = {};
    try { data = JSON.parse(rawText); } catch(e) { data = { message: rawText }; }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (CancelAppointment):', error);
    return NextResponse.json(
      { message: 'فشل إلغاء الموعد', error: error.message },
      { status: 500 }
    );
  }
}
