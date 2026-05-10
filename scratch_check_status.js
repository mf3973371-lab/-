async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google';
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'dummy', role: 'Doctor' })
    });
    console.log(`Current status of ${url}: ${resp.status}`);
    const data = await resp.json();
    console.log("Response body:", JSON.stringify(data));
  } catch (e) { console.error("Fetch error:", e); }
}
test();
