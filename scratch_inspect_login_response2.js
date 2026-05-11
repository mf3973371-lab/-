async function testFlow() {
  const baseUrl = 'https://shefaa-app.onrender.com';
  const email = `testuser_${Date.now()}@gmail.com`; // changed to gmail
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
        specialization: " الطب النفسي", // WITH THE EXACT SPACE
        price: 500
      })
    });
    const regData = await regResp.json();
    console.log("Registration Status:", regResp.status);
    console.log("Registration Data Full:", JSON.stringify(regData));

    // If registration required email confirmation, login will fail. 
    // Let's just see if this already provides the structure!
    if (regResp.status === 201 || regResp.status === 200 || regData.message === "Done") {
         console.log("\n--- SUCCESSFUL CREATION ---");
    }

  } catch (e) {
    console.error("Failed:", e);
  }
}
testFlow();
