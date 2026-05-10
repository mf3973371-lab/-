async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google';
  
  // Test variant 1: Authorization header
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dummy_google_token'
      },
    });
    const data = await resp.json();
    console.log(`--- Variant: Authorization Header ---`);
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }

  // Test variant 2: Different header names?
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'idToken': 'dummy',
        'role': 'Doctor'
      },
    });
    const data = await resp.json();
    console.log(`--- Variant: Specific Headers ---`);
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
test();
