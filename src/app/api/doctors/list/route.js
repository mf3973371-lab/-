import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

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

  // Fetch all ratings from Firebase using REST API to bypass Next.js server gRPC connection errors
  let ratingsMap = {};
  try {
    const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/shefaa-web/databases/(default)/documents/ratings?pageSize=1000';
    const ratingsRes = await fetch(firestoreUrl, {
      method: 'GET',
      next: { revalidate: 0 }
    });
    
    if (ratingsRes.ok) {
      const ratingsData = await ratingsRes.json();
      if (ratingsData.documents) {
        ratingsData.documents.forEach((doc) => {
          const fields = doc.fields;
          if (!fields) return;
          
          const docId = (fields.doctorId?.stringValue || fields.doctorId?.integerValue || fields.doctorId?.doubleValue)?.toString().trim();
          
          let ratingVal = null;
          if (fields.rating) {
            if ('integerValue' in fields.rating) {
              ratingVal = parseInt(fields.rating.integerValue, 10);
            } else if ('doubleValue' in fields.rating) {
              ratingVal = parseFloat(fields.rating.doubleValue);
            } else if ('stringValue' in fields.rating) {
              ratingVal = parseFloat(fields.rating.stringValue);
            }
          }
          
          if (docId && ratingVal !== null && !isNaN(ratingVal)) {
            if (!ratingsMap[docId]) {
              ratingsMap[docId] = { sum: 0, count: 0 };
            }
            ratingsMap[docId].sum += ratingVal;
            ratingsMap[docId].count += 1;
          }
        });
      }
    } else {
      console.error("Error fetching ratings via Firestore REST API. Status:", ratingsRes.status);
    }
  } catch (firebaseError) {
    console.error("Error fetching ratings from Firebase REST API:", firebaseError);
  }

  // Fetch doctor locations from Firebase using REST API to bypass Next.js server gRPC connection errors
  let locationsMap = {};
  try {
    const locationsUrl = 'https://firestore.googleapis.com/v1/projects/shefaa-web/databases/(default)/documents/userLocations?pageSize=1000';
    const locationsRes = await fetch(locationsUrl, {
      method: 'GET',
      next: { revalidate: 0 }
    });
    
    if (locationsRes.ok) {
      const locationsData = await locationsRes.json();
      if (locationsData.documents) {
        locationsData.documents.forEach((doc) => {
          const fields = doc.fields;
          if (!fields) return;
          
          const email = fields.email?.stringValue?.toLowerCase().trim();
          const userId = fields.userId?.stringValue?.trim();
          const docId = doc.name.split('/').pop().toLowerCase();
          const fName = fields.fName?.stringValue?.trim().toLowerCase() || "";
          const lName = fields.lName?.stringValue?.trim().toLowerCase() || "";
          const nameKey = `${fName} ${lName}`.trim();

          let lat = null;
          if (fields.latitude) {
            lat = 'doubleValue' in fields.latitude ? parseFloat(fields.latitude.doubleValue) :
                  'integerValue' in fields.latitude ? parseInt(fields.latitude.integerValue, 10) :
                  'stringValue' in fields.latitude ? parseFloat(fields.latitude.stringValue) : null;
          }

          let lon = null;
          if (fields.longitude) {
            lon = 'doubleValue' in fields.longitude ? parseFloat(fields.longitude.doubleValue) :
                  'integerValue' in fields.longitude ? parseInt(fields.longitude.integerValue, 10) :
                  'stringValue' in fields.longitude ? parseFloat(fields.longitude.stringValue) : null;
          }

          if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
            const loc = { latitude: lat, longitude: lon };
            if (email) locationsMap[email] = loc;
            if (userId) locationsMap[userId] = loc;
            if (nameKey) locationsMap[nameKey] = loc;
            locationsMap[docId] = loc;
          }
        });
      }
    } else {
      console.error("Error fetching locations via Firestore REST API. Status:", locationsRes.status);
    }
  } catch (locationsError) {
    console.error("Error fetching locations from Firebase REST API:", locationsError);
  }

  // Merge Firebase ratings and locations with the doctors list
  const uniqueDoctorsWithRatings = uniqueDoctors.map(doc => {
    const docId = (doc._id || doc.id)?.toString().trim();
    const emailKey = doc.email?.toLowerCase().trim();
    const docNameKey = doc.userName ? doc.userName.trim().toLowerCase() : `${doc.fName?.trim().toLowerCase()} ${doc.lName?.trim().toLowerCase()}`;

    // Find location matching this doctor precisely using email or ID
    const location = locationsMap[emailKey] || 
                     locationsMap[docId?.toLowerCase()];

    const ratingInfo = ratingsMap[docId];
    
    let mergedDoc = {
      ...doc,
      latitude: location ? location.latitude : null,
      longitude: location ? location.longitude : null,
      rating: null,
      ratingCount: 0
    };

    if (ratingInfo && ratingInfo.count > 0) {
      mergedDoc.rating = ratingInfo.sum / ratingInfo.count;
      mergedDoc.ratingCount = ratingInfo.count;
    }

    return mergedDoc;
  });

  // Apply filters
  let filteredDoctors = uniqueDoctorsWithRatings;

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

  // Filter based on real rating if minRating is specified
  if (minRating > 0) {
    filteredDoctors = filteredDoctors.filter(doc => 
      doc.rating !== null && doc.rating >= minRating
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

