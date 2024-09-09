document.addEventListener("DOMContentLoaded", async () => {
  const login = document.getElementById("login-container");
  const anon = document.getElementById("anon-container");
  const logged = document.getElementById("logged-container");

  const fetchUserData = async () => {
    anon.style.display = "none";
    logged.style.display = "none";
    login.style.display = "none";

    // get data from server
    const authDetails = await fetch("/api/me");

    if (authDetails.status === 401) {
      // user is not logged in
      login.style.display = "block";
      return;
    }

    if (authDetails.status === 200 || authDetails.status === 204) {
      // everything is fine, we have the user data
      const userData = await authDetails.json();
      const title = document.getElementById("user-title");
      title.innerText = `Welcome, ${userData.firstName} ${userData.lastName}`;
      const details = document.getElementById("user-details");
      details.innerText = `You are logged in as a ${userData.role}. Your email is ${userData.email}, and your secret information is ${userData.secret}`;
      logged.style.display = "block";
      return;
    }

    // something fishy happened
    anon.style.display = "block";
  };

  // hide everything
  login.style.display = "none";
  anon.style.display = "none";
  logged.style.display = "none";

  // prevent form from submitting
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // login button
  document.getElementById("login-button").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    await fetchUserData();
  });

  await fetchUserData();
});
