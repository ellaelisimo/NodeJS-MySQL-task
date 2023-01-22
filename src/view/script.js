// const registerForm = document.querySelector("#register-form");

// registerForm.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const registerNameInput = document.querySelector("#name").value.trim();
//   const registerEmailInput = document.querySelector("#email").value.trim();
//   const registerPasswordInput = document
//     .querySelector("#password")
//     .value.trim();

//   try {
//     const res = await fetch("http://localhost:5000/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         full_name: registerNameInput,
//         email: registerEmailInput,
//         password: registerPasswordInput,
//       }),
//     });

//     if (res.ok) {
//       registerForm.reset();
//       const user = await res.json();
//       localStorage.setItem("accessToken", user.token);
//       window.location.assign("./login.html");
//     }

//     if (!res.ok) {
//       return console.error("Can not register you.");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const registerNameInput = document.querySelector("#name").value.trim();
  const registerEmailInput = document.querySelector("#email").value.trim();
  const registerPasswordInput = document
    .querySelector("#password")
    .value.trim();

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: registerNameInput,
        email: registerEmailInput,
        password: registerPasswordInput,
      }),
    });
    console.log(res);
    if (res.ok) {
      registerForm.reset();
      const user = await res.json();

      localStorage.setItem("accessToken", user.token);
      window.location.assign("./login.html");
    }
    if (!res.ok) {
      return console.error("Can not register you.");
    }
  } catch (error) {
    return console.error(error);
  }
});
