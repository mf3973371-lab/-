import { NextResponse } from 'next/server';

export async function GET() {
  const endpoints = [
    'https://shefaa-app.onrender.com/user/getAllDoctor',
    'https://shefaa-app.onrender.com/user/getProfileDoctor',
    'https://shefaa-app.onrender.com/user/allDoctor'
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 0 } // Disable caching for debugging
      });

      if (response.ok) {
        const text = await response.text();
        if (!text) continue; // Try next if empty
        
        try {
          const data = JSON.parse(text);
          return NextResponse.json(data);
        } catch (e) {
          console.error(`JSON Parse Error for ${url}:`, e);
          continue;
        }
      }
    } catch (error) {
      console.error(`Fetch Error for ${url}:`, error);
    }
  }

  return NextResponse.json(
    { message: 'فشل جلب قائمة الأطباء من جميع المسارات المتاحة' }, 
    { status: 500 }
  );
}
