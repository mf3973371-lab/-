async function checkDoctors() {
  try {
    const endpoints = [
      'https://shefaa-app.onrender.com/user/getProfileDoctor',
    ];
    
    for (const url of endpoints) {
      console.log(`Checking ${url}...`);
      const res = await fetch(url);
      const data = await res.json();
      
      let doctors = [];
      if (Array.isArray(data)) doctors = data;
      else if (data.doctors && Array.isArray(data.doctors)) doctors = data.doctors;
      else if (data.user && Array.isArray(data.user)) doctors = data.user;
      else if (data.allDoctor && Array.isArray(data.allDoctor)) doctors = data.allDoctor;
      else if (data.message === "Done" && data.allDoctor) doctors = data.allDoctor;

      if (doctors.length > 0 || Array.isArray(data) && data.length > 0) {
        const finalData = Array.isArray(data) ? data : doctors;
        const specs = new Set();
        finalData.forEach(d => {
            if (d.specialization) specs.add(d.specialization);
        });
        console.log("Found specializations in backend:");
        console.log(Array.from(specs));
        return;
      } else {
          console.log("Response structure:");
          console.log(JSON.stringify(data).substring(0, 500));
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

checkDoctors();
