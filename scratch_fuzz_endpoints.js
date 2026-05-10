async function test() {
  const paths = [
    'auth/loginGoogle',
    'auth/googleLogin',
    'auth/signUpGoogle',
    'auth/loginWithGoogle',
    'user/google',
    'user/googleLogin',
  ];
  
  for (const path of paths) {
    const url = `https://shefaa-app.onrender.com/${path}`;
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: 'dummy', role: 'Doctor' })
      });
      const data = await resp.json();
      console.log(`Path: ${path} => ${resp.status} => ${JSON.stringify(data.message)}`);
    } catch (e) {
      console.log(`Path: ${path} failed`);
    }
  }
}
test();
