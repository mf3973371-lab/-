async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google';
  const payload = [{ idToken: 'dummy', role: 'Doctor' }];
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await resp.json();
    console.log(`Array Wrap => ${JSON.stringify(data.message)}`);
  } catch (e) { console.error(e); }
}
test();
