async function testFlow() {
  const baseUrl = 'https://shefaa-app.onrender.com';
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'Password123!';
  
  console.log("1. Registering user...");
  try {
    const regResp = await fetch(`${baseUrl}/user/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: "Doctor",
        fName: "Tester",
        lName: "One",
        email: email,
        password: password,
        cPassword: password,
        address: "Cairo, Egypt",
        phone: "01234567890",
        gender: "male",
        specialization: "الطب النفسي",
        price: 500
      })
    });
    const regData = await regResp.json();
    console.log("Registration Status:", regResp.status);
    console.log("Registration Data Keys:", Object.keys(regData));
    console.log("Registration Data Full:", JSON.stringify(regData));

    console.log("\n2. Logging in to see final JSON structure...");
    const logResp = await fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    });
    const logData = await logResp.json();
    console.log("Login Status:", logResp.status);
    console.log("Login Data Keys:", Object.keys(logData));
    console.log("Login Data Full:", JSON.stringify(logData));
    
  } catch (e) {
    console.error("Failed:", e);
  }
}
testFlow();
