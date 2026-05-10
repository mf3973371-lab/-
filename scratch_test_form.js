async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google';
  try {
    const params = new URLSearchParams();
    params.append('idToken', 'dummy');
    params.append('role', 'Doctor');
    
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const data = await resp.json();
    console.log(`--- Form Encoded ---`);
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
test();
