const activities = [
  {
    "id": "A01",
    "name": "Découverte de la médina",
    "category": "Culture",
    "duration": "2 h",
    "price": 20,
    "image": "medina.webp",
    "location": "Nabeul",
    "slogan": "Une promenade au cœur de la ville.",
    "description": "Partez à la découverte des ruelles de la médina de Nabeul. Observez les façades, les petites boutiques et l'ambiance des rues. Cette activité permet de mieux connaître le patrimoine local. Prenez le temps de regarder les détails et de poser vos questions."
  },
  {
    "id": "A02",
    "name": "Atelier d’initiation à la poterie",
    "category": "Artisanat",
    "duration": "1 h 30",
    "price": 35,
    "image": "poterie.webp",
    "location": "Nabeul",
    "slogan": "Découvrez les gestes simples de la poterie.",
    "description": "Entrez dans l'univers de l'artisanat de Nabeul. Découvrez les étapes de base du travail de l'argile avec un accompagnement. Vous pourrez comprendre comment une pièce prend forme. L'atelier est pensé comme une première découverte."
  },
  {
    "id": "A03",
    "name": "Parcours découverte de Kerkouane",
    "category": "Culture",
    "duration": "2 h 30",
    "price": 30,
    "image": "kerk.webp",
    "location": "Kerkouane",
    "slogan": "Un parcours pour découvrir un site historique.",
    "description": "Explorez le site de Kerkouane et son histoire. Le parcours permet d'observer les vestiges et l'organisation de l'ancien établissement. La visite est une occasion de mieux comprendre le patrimoine de la région. Prévoyez des chaussures confortables."
  },
  {
    "id": "A04",
    "name": "Randonnée découverte",
    "category": "Nature",
    "duration": "3 h",
    "price": 25,
    "image": "randonnee.webp",
    "location": "Djebel Abderrahmane",
    "slogan": "Une balade pour profiter des paysages naturels.",
    "description": "Partez pour une randonnée à la découverte des paysages du Djebel Abderrahmane. Le parcours permet de profiter de l'air libre et d'observer la nature. Il est conseillé de porter des chaussures adaptées et d'emporter de l'eau. Le rythme reste celui d'une sortie découverte."
  },
  {
    "id": "A05",
    "name": "Circuit du littoral",
    "category": "Nature",
    "duration": "3 h",
    "price": 40,
    "image": "littoral.webp",
    "location": "Kélibia",
    "slogan": "Découvrez les paysages du bord de mer.",
    "description": "Suivez un circuit consacré au littoral de Kélibia. Profitez des points de vue sur la mer et des paysages côtiers. Cette sortie permet de découvrir la diversité du bord de mer. Pensez à prévoir une protection contre le soleil."
  },
  {
    "id": "A06",
    "name": "Peinture sur céramique",
    "category": "Artisanat",
    "duration": "2 h",
    "price": 25,
    "image": "ceramique.webp",
    "location": "Nabeul",
    "slogan": "Ajoutez des couleurs à une pièce en céramique.",
    "description": "Découvrez quelques techniques simples de décoration sur céramique. Choisissez des motifs et des couleurs pour personnaliser votre pièce. L'activité permet de découvrir une autre facette du savoir-faire local. Aucun niveau particulier n'est nécessaire."
  },
  {
    "id": "A07",
    "name": "Découverte d’un marché local",
    "category": "Découverte",
    "duration": "1 h 30",
    "price": 15,
    "image": "marche.webp",
    "location": "Nabeul",
    "slogan": "Une promenade au milieu des produits locaux.",
    "description": "Visitez un marché local et découvrez les produits proposés par les commerçants. Observez les couleurs, les senteurs et l'ambiance du marché. Cette activité donne un aperçu de la vie quotidienne. Vous pourrez également découvrir quelques spécialités régionales."
  },
  {
    "id": "A08",
    "name": "Promenade photographique",
    "category": "Découverte",
    "duration": "2 h",
    "price": 30,
    "image": "photo.webp",
    "location": "Hammamet",
    "slogan": "Observez les lieux autrement à travers la photo.",
    "description": "Partez en promenade dans Hammamet avec un regard de photographe. Repérez les détails architecturaux, les couleurs et les paysages. Cette sortie est adaptée aux personnes qui aiment prendre des photos. Un téléphone ou un appareil photo suffit."
  }
];

const cardsContainer = document.getElementById("activitiesList");
const searchInput = document.getElementById("searchActivity");
const categorySelect = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");
const detailsModal = new bootstrap.Modal(document.getElementById("activityModal"));

function showActivities() {
  const searchText = searchInput.value.toLowerCase();
  const chosenCategory = categorySelect.value;

  const filteredActivities = activities.filter(function(activity) {
    const matchesText = activity.name.toLowerCase().includes(searchText)
      || activity.location.toLowerCase().includes(searchText);
    const matchesCategory = chosenCategory === "Toutes" || activity.category === chosenCategory;
    return matchesText && matchesCategory;
  });

  cardsContainer.innerHTML = "";

  filteredActivities.forEach(function(activity) {
    const card = document.createElement("div");
    card.className = "col-12 col-sm-6 col-lg-4";
    card.innerHTML = `
      <article class="activity-card">
        <img src="images/${activity.image}" alt="Illustration : ${activity.name}">
        <div class="card-body">
          <span class="badge text-bg-light mb-2">${activity.category}</span>
          <h2 class="h5">${activity.name}</h2>
          <p>${activity.slogan}</p>
          <p class="small mb-2">${activity.duration} · ${activity.location}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price-tag">${activity.price} TND</span>
            <button class="btn btn-pink btn-sm" onclick="showDetails('${activity.id}')">Voir détails</button>
          </div>
        </div>
      </article>`;
    cardsContainer.appendChild(card);
  });

  resultCount.textContent = filteredActivities.length + " activité(s)";
}

function showDetails(activityId) {
  const activity = activities.find(function(item) { return item.id === activityId; });
  if (!activity) return;

  document.getElementById("modalTitle").textContent = activity.name;
  document.getElementById("modalImage").src = "images/" + activity.image;
  document.getElementById("modalImage").alt = "Illustration : " + activity.name;
  document.getElementById("modalDescription").textContent = activity.description;
  document.getElementById("modalInfo").textContent =
    activity.location + " · " + activity.duration + " · " + activity.price + " TND par personne";
  document.getElementById("bookActivity").href =
    "reservation.html?activity=" + encodeURIComponent(activity.id);
  detailsModal.show();
}

searchInput.addEventListener("input", showActivities);
categorySelect.addEventListener("change", showActivities);
showActivities();
