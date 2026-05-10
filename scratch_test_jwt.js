async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google/';
  // Realistically long dummy JWT structure:
  const longToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY0NjE3MTQwOTM1MTNkZTdhM2MyMGQ4NWE2MGU0OWZhNmNjNDQ5ZjIiLCJ0eXAiOiJKV1QifQ.' + 
                   'eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3MTIyNzMwMjU3MDctcmpvNWQ2ODg2MW5iYTBmOHMzbHFpcTRvbmlsZjNtaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3MTIyNzMwMjU3MDctcmpvNWQ2ODg2MW5iYTBmOHMzbHFpcTRvbmlsZjNtaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUwOTYxNzQwMjIzMjI0NTg1MTUiLCJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiVGVzdCBVc2VyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhrY3Iyb0Q5ZUZ0b0wtbENzVklvczhXNmRBMXJTSzB2eWl5d25mQzRLdGRzdz1zOTYtYyIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJVc2VyIiwiaWF0IjoxNzA2ODY2OTIyLCJleHAiOjE3MDY4NzA1MjJ9.' +
                   'dummy_sig_here_that_is_sufficiently_long_and_complex_to_satisfy_simple_length_constraints_dummy_dummy_dummy';

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: longToken,
        role: 'Doctor'
      })
    });
    const data = await resp.json();
    console.log(`--- LONG JWT TEST ---`);
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
test();
