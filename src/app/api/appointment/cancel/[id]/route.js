import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const token = request.headers.get('authorization');
    const body = await request.json().catch(() => ({}));
    const { reason, role, specialization, doctorId } = body;

    console.log(`Proxy forwarding cancellation for ID: ${id}, Reason: ${reason}, Role: ${role}, Specialization: ${specialization}`);
    
    // Forward to backend
    const response = await fetch(`https://shefaa-app.onrender.com/appointment/cancelAppointment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': token || '',
      },
      body: JSON.stringify({ reason }),
      cache: 'no-store'
    });

    const rawText = await response.text();
    console.log(`Backend response for cancellation [${response.status}]:`, rawText);
    
    let data = {};
    try { data = JSON.parse(rawText); } catch(e) { data = { message: rawText }; }
    
    // If cancellation is successful, provide recommendations
    if (response.ok) {
       try {
         const doctorsResponse = await fetch(`${new URL(request.url).origin}/api/doctors/list`);
         const doctorsData = await doctorsResponse.json();
         const allDoctors = doctorsData.doctors || [];
         
         const canceledDocId = doctorId || data.doctorId || data.doctor?._id;
         
         // Attempt to find the canceled doctor in the database to guarantee we have their specialization
         const actualCanceledDoctor = allDoctors.find(d => d._id === canceledDocId || d.id === canceledDocId);
         const targetSpecialization = specialization || actualCanceledDoctor?.specialization;

         console.log("Target Specialization for Recommendations:", targetSpecialization);

         // Filter by specialty
         let recommendations = allDoctors.filter(d => d._id !== canceledDocId && d.id !== canceledDocId);
         if (targetSpecialization) {
            recommendations = recommendations.filter(d => d.specialization?.trim() === targetSpecialization.trim());
         }
         
         // Pick up to 3 random matching doctors
         recommendations = recommendations.sort(() => 0.5 - Math.random()).slice(0, 3);

            
         data.recommendations = recommendations;
         data.message = (data.message || 'Done') + '. تم العثور على بدلاء مقترحين.';
       } catch (recErr) {
         console.error('Failed to fetch recommendations:', recErr);
       }
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy Error (CancelAppointment):', error);
    return NextResponse.json(
      { message: 'فشل إلغاء الموعد', error: error.message },
      { status: 500 }
    );
  }
}
