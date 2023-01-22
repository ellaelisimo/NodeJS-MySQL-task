const loginForm = document.querySelector("#login-form");

const getGroups = async () => {
  try {
    const response = await fetch("http://localhost:5000/groups");

    const groups = await response.json();

    console.log(groups);
    showGroups(groups);
  } catch (error) {
    console.error(error);
  }
};
getGroups();

const showGroups = (groups) => {
  groups.forEach((group) => {
    const groupCard = document.createElement("div");
    const id = document.createElement("h4");
    const groupName = document.createElement("h5");

    id.innerText = group.id;
    groupName.innerText = group.name;

    groupCard.append(id, groupName);
    document.querySelector("#group-div").append(groupCard);
  });
};

loginForm.addEventListener("click", async (event) => {
  event.preventDefault();

  await getGroups();

  document.querySelector("#show-groups").style.display = "none";
  //   document.querySelector("#output").style.backgroundColor = "#222";
});
