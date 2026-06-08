import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  try {
    const params = await context.params;
    const id = params.id?.toString().trim();

    const response = await fetch(`https://shefaa-app.onrender.com/user/getDoctorById/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    // Fetch ratings from Firestore using REST API runQuery to bypass Next.js server gRPC connection errors
    let avgRating = null;
    let count = 0;
    let reviewsList = [];
    try {
      const firestoreUrl = 'https://firestore.googleapis.com/v1/projects/shefaa-web/databases/(default)/documents:runQuery';
      const body = {
        structuredQuery: {
          from: [{ collectionId: "ratings" }],
          where: {
            fieldFilter: {
              field: { fieldPath: "doctorId" },
              op: "EQUAL",
              value: { stringValue: id }
            }
          }
        }
      };

      const ratingsRes = await fetch(firestoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        next: { revalidate: 0 }
      });

      if (ratingsRes.ok) {
        const ratingsData = await ratingsRes.json();
        let sum = 0;
        if (Array.isArray(ratingsData)) {
          ratingsData.forEach((item) => {
            if (item.document) {
              const doc = item.document;
              const fields = doc.fields;
              if (!fields) return;
              
              const docId = doc.name.split('/').pop();
              
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

              const comment = fields.comment?.stringValue || "";
              const patientName = fields.patientName?.stringValue || "مريض شفاء";
              const createdAt = fields.createdAt?.stringValue || "";
              const appointmentId = fields.appointmentId?.stringValue || "";
              const doctorId = fields.doctorId?.stringValue || "";

              reviewsList.push({
                id: docId,
                rating: ratingVal,
                comment,
                patientName,
                createdAt,
                appointmentId,
                doctorId
              });

              if (ratingVal !== null && !isNaN(ratingVal)) {
                sum += ratingVal;
                count++;
              }
            }
          });
        }
        if (count > 0) {
          avgRating = sum / count;
        }
      } else {
        console.error("Error querying ratings via Firestore REST API. Status:", ratingsRes.status);
      }
    } catch (firebaseErr) {
      console.error("Firebase REST query error in doctor detail:", firebaseErr);
    }

    if (data.doctor) {
      data.doctor.rating = avgRating;
      data.doctor.ratingCount = count;
      data.doctor.reviews = reviewsList;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (getDoctorById):', error);
    return NextResponse.json(
      { message: 'فشل جلب بيانات الطبيب', error: error.message },
      { status: 500 }
    );
  }
}

