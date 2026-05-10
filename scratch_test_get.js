async function test() {
  const url = 'https://shefaa-app.onrender.com/auth/google';
  try {
    const resp = await fetch(url, {
      method: 'GET',
    });
    const data = await resp.json();
    console.log(`--- GET Request ---`);
    console.log(JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}
test();
