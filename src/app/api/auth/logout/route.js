import { NextResponse } from 'next/server';

async function handleLogout(request) {
  try {
    const token = request.headers.get('authorization');
    console.log("Logout proxy token:", token);
    
    let flag = 'current';
    try {
      const body = await request.json();
      if (body && body.flag) {
        flag = body.flag;
      }
    } catch (e) {
      // استخدام الافتراضي
    }
    
    console.log(`Triggering parallel dual-logout: logOut(flag: "${flag}") & refreshToken`);

    // 1. استدعاء النهاية الأولى: POST /user/logOut (لإلغاء الجلسات)
    const logOutPromise = fetch('https://shefaa-app.onrender.com/user/logOut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': token || '',
      },
      body: JSON.stringify({ flag }),
      cache: 'no-store',
    }).then(res => res.json().catch(() => ({}))).catch(err => {
      console.error("Error in POST /user/logOut:", err);
      return {};
    });

    // 2. استدعاء النهاية الثانية: PATCH /user/refreshToken (بدلاً من revokeToken)
    const refreshPromise = fetch('https://shefaa-app.onrender.com/user/refreshToken', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': token || '',
      },
      cache: 'no-store',
    }).then(res => res.json().catch(() => ({}))).catch(err => {
      console.error("Error in PATCH /user/refreshToken:", err);
      return {};
    });

    // تنفيذ الطلبين معاً بشكل متوازي للحصول على أعلى مستوى حماية وأسرع أداء
    const [logOutData, refreshData] = await Promise.all([logOutPromise, refreshPromise]);

    console.log("Dual-Logout completed successfully", { logOutData, refresh: refreshData });
    
    return NextResponse.json({ logOut: logOutData, refresh: refreshData }, { status: 200 });
  } catch (error) {
    console.error('Proxy Error (Dual-Logout):', error);
    return NextResponse.json(
      { message: 'فشل الاتصال بالسيرفر لتسجيل الخروج الكامل', error: error.message }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  return handleLogout(request);
}

export async function POST(request) {
  return handleLogout(request);
}
