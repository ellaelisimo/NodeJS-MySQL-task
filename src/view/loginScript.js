const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector("#email").value.trim();
  const passwordInput = document.querySelector("#password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });

    if (res.ok) {
      loginForm.reset();
      const user = await res.json();

      localStorage.setItem("accessToken", user.token);
      window.location.assign("./groups.html");
    }

    if (!res.ok || res.status >= 400) {
      loginForm.reset();
      const user = await res.json();

      localStorage.setItem("accessToken", user.token);
      window.location.assign("./register.html");
    }
  } catch (error) {
    return console.error(error);
  }
});
