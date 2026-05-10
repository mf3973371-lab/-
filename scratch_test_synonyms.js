async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google';
  const variants = [
    { name: 'token & role', payload: { token: 'dummy', role: 'Doctor' } },
    { name: 'access_token & role', payload: { access_token: 'dummy', role: 'Doctor' } },
    { name: 'credential & role', payload: { credential: 'dummy', role: 'Doctor' } },
    { name: 'id_token & role', payload: { id_token: 'dummy', role: 'Doctor' } },
    { name: 'just access_token', payload: { access_token: 'dummy' } },
    { name: 'just id_token', payload: { id_token: 'dummy' } },
    { name: 'Just role', payload: { role: 'Doctor' } }
  ];

  for (const v of variants) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v.payload)
      });
      const data = await resp.json();
      console.log(`${v.name} => ${JSON.stringify(data.message)}`);
    } catch(e) {}
  }
}
test();
