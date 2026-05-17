import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty');
  const area = searchParams.get('area');
  const minRating = parseFloat(searchParams.get('minRating') || '0');
  const search = searchParams.get('search')?.toLowerCase();

  const endpoints = [
    'https://shefaa-app.onrender.com/user/getAllDoctor',
    'https://shefaa-app.onrender.com/user/getProfileDoctor',
    'https://shefaa-app.onrender.com/user/allDoctor'
  ];

  let allDoctors = [];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 0 }
      });

      if (response.ok) {
        const text = await response.text();
        if (!text) continue;
        
        try {
          const data = JSON.parse(text);
          const doctorsList = data.doctors || data.results || data.allDoctor || data.allDoctors || data.data || (Array.isArray(data) ? data : []);
          allDoctors = [...allDoctors, ...doctorsList];
        } catch (e) {
          console.error(`JSON Parse Error for ${url}:`, e);
        }
      }
    } catch (error) {
      console.error(`Fetch Error for ${url}:`, error);
    }
  }

  // De-duplicate by _id
  const uniqueDoctors = Array.from(new Map(allDoctors.map(doc => [doc._id, doc])).values());

  // Apply filters
  let filteredDoctors = uniqueDoctors;

  if (specialty) {
    filteredDoctors = filteredDoctors.filter(doc => 
      doc.specialization?.includes(specialty)
    );
  }

  if (area) {
    filteredDoctors = filteredDoctors.filter(doc => 
      doc.address?.includes(area)
    );
  }

  if (search) {
    filteredDoctors = filteredDoctors.filter(doc => 
      doc.userName?.toLowerCase().includes(search) || 
      doc.specialization?.toLowerCase().includes(search) ||
      doc.address?.toLowerCase().includes(search)
    );
  }

  // Note: Backend doesn't seem to have a real rating field yet, so we might simulate it or check for it
  if (minRating > 0) {
    filteredDoctors = filteredDoctors.filter(doc => 
      (doc.rating || 4.9) >= minRating // Default to 4.9 for now if not present
    );
  }

  if (filteredDoctors.length === 0 && allDoctors.length > 0 && !specialty && !area && !search && minRating === 0) {
     return NextResponse.json(
      { message: 'فشل جلب قائمة الأطباء من جميع المسارات المتاحة' }, 
      { status: 500 }
    );
  }

  return NextResponse.json({
    doctors: filteredDoctors,
    count: filteredDoctors.length
  });
}
