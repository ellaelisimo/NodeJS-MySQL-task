const getBills = async () => {
  try {
    const res = await fetch(`http://localhost:5000/bills`);
    const [bills] = await res.json();

    showBills(bills);
  } catch (error) {
    throw Error();
  }
};
getBills();

const showBills = (bills) => {
  bills.forEach((bill) => {
    const billCard = document.createElement("div");
    const id = document.createElement("h4");
    const group_id = document.createElement("h4");
    const amount = document.createElement("h5");
    const description = document.createElement("h5");

    id.innerText = bill.id;
    group_id.innerText = bill.group_id;
    amount.innerText = bill.amount;
    description.innerText = bill.description;

    billCard.append(id, group_id, amount, description);
    document.querySelector("#bill-div").append(billCard);
  });
};
