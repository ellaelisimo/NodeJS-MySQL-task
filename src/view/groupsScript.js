const getGroups = async () => {
  try {
    const response = await fetch("http://localhost:5000/groups");

    const [groups] = await response.json();

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

document
  .querySelector("#group-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameGroupInput = document.querySelector("#group-id").value.trim();

    try {
      const res = await fetch("http://localhost:5000/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameGroupInput,
        }),
      });
      console.log(res);
      if (res.ok) {
        window.location.href("./bills.html");
      }
      if (!res.ok) {
        return console.error("Incorrect group name.");
      }
    } catch (error) {
      return console.error(error);
    }
  });
