const bookingForm = document.getElementById("bookingForm");
const activityField = document.getElementById("bookingActivity");
const dateField = document.getElementById("bookingDate");
const peopleField = document.getElementById("participants");

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateField.min = localToday;

const params = new URLSearchParams(window.location.search);
const selectedActivity = params.get("activity");
const activityPrices = {
  A01: "20", A02: "35", A03: "30", A04: "25",
  A05: "40", A06: "25", A07: "15", A08: "30"
};
if (activityPrices[selectedActivity]) {
  const names = ["Découverte de la médina", "Atelier d’initiation à la poterie",
    "Parcours découverte de Kerkouane", "Randonnée découverte", "Circuit du littoral",
    "Peinture sur céramique", "Découverte d’un marché local", "Promenade photographique"];
  const ids = ["A01","A02","A03","A04","A05","A06","A07","A08"];
  const index = ids.indexOf(selectedActivity);
  activityField.selectedIndex = index + 1;
}

function calculatePrice() {
  const unitPrice = Number(activityField.value);
  const people = Number(peopleField.value);
  const subtotal = unitPrice * people;
  const discount = people >= 4 ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2) + " TND";
  document.getElementById("discount").textContent = discount.toFixed(2) + " TND";
  document.getElementById("total").textContent = total.toFixed(2) + " TND";
}

bookingForm.addEventListener("submit", function(event) {
  event.preventDefault();
  bookingForm.classList.add("was-validated");

  const dateIsValid = dateField.value && dateField.value >= localToday;
  const peopleAreValid = Number(peopleField.value) >= 1 && Number(peopleField.value) <= 6;
  dateField.setCustomValidity(dateIsValid ? "" : "Date invalide");
  peopleField.setCustomValidity(peopleAreValid ? "" : "Nombre invalide");

  if (!bookingForm.checkValidity()) {
    document.getElementById("bookingMessage").textContent =
      "Veuillez vérifier les champs indiqués.";
    document.getElementById("bookingMessage").className = "text-danger mt-3";
    return;
  }

  calculatePrice();
  document.getElementById("bookingMessage").textContent =
    "Calcul terminé. Ceci est une simulation : aucune réservation réelle n'a été effectuée.";
  document.getElementById("bookingMessage").className = "text-success mt-3";
});

bookingForm.addEventListener("reset", function() {
  setTimeout(function() {
    bookingForm.classList.remove("was-validated");
    document.getElementById("subtotal").textContent = "0 TND";
    document.getElementById("discount").textContent = "0 TND";
    document.getElementById("total").textContent = "0 TND";
    document.getElementById("bookingMessage").textContent = "";
    dateField.min = localToday;
  }, 0);
});
