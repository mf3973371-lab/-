async function testSignUp() {
  try {
    const payload = {
      role: "Doctor",
      fName: "Test",
      lName: "Test",
      email: `test${Date.now()}@example.com`,
      password: "Password123!",
      cPassword: "Password123!",
      address: "Cairo",
      phone: "01234567890",
      gender: "male",
      specialization: "الطب النفسي", // NO SPACE FIRST
      price: 100
    };

    console.log("Trying without space...");
    const res = await fetch('https://shefaa-app.onrender.com/user/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Data:", data);
    
    if (data.message && data.message.includes("validation") || res.status === 400) {
       console.log("FAILED WITH NO SPACE - Server rejected it.");
    } else {
       console.log("Allowed? Checking enum error message if present.");
    }
  } catch (err) {
    console.error(err);
  }
}
testSignUp();
