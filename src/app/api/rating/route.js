import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

export async function POST(request) {
  try {
    const body = await request.json();

    // Add new rating with timestamp to Firebase
    const ratingData = {
      ...body,
      createdAt: new Date().toISOString()
    };
    
    // Write to Firestore 'ratings' collection
    const docRef = await addDoc(collection(db, 'ratings'), ratingData);

    console.log('Rating saved successfully to Firebase with ID:', docRef.id);
    
    return NextResponse.json({
      message: 'تم تسجيل تقييمك بنجاح في قاعدة البيانات (Firebase)! شكراً لك ✨',
      rating: { id: docRef.id, ...ratingData }
    });
  } catch (error) {
    console.error('Firebase Rating Error:', error);
    return NextResponse.json(
      { message: 'فشل تسجيل التقييم في السيرفر', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read from Firestore 'ratings' collection
    const q = query(collection(db, 'ratings'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const ratings = [];
    querySnapshot.forEach((doc) => {
      ratings.push({ id: doc.id, ...doc.data() });
    });
    
    return NextResponse.json(ratings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
