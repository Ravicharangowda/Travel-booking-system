
const destinations = [
  {name:"Goa",state:"Goa",category:"Beach",price:8500,rating:4.8,emoji:"🏖️",days:"3 Days"},
  {name:"Manali",state:"Himachal Pradesh",category:"Mountain",price:14500,rating:4.9,emoji:"🏔️",days:"5 Days"},
  {name:"Kerala",state:"Kerala",category:"Nature",price:12500,rating:4.8,emoji:"🌴",days:"4 Days"},
  {name:"Jaipur",state:"Rajasthan",category:"Heritage",price:9500,rating:4.7,emoji:"🏰",days:"3 Days"},
  {name:"Mysore",state:"Karnataka",category:"Heritage",price:6500,rating:4.6,emoji:"🏯",days:"2 Days"},
  {name:"Ooty",state:"Tamil Nadu",category:"Mountain",price:7500,rating:4.7,emoji:"🌄",days:"3 Days"},
  {name:"Rishikesh",state:"Uttarakhand",category:"Adventure",price:11000,rating:4.8,emoji:"🚣",days:"4 Days"},
  {name:"Varanasi",state:"Uttar Pradesh",category:"Spiritual",price:8000,rating:4.6,emoji:"🛕",days:"3 Days"}
];

const $ = id => document.getElementById(id);

let activeCategory = "all";

const destGrid = $("destGrid");
const bookingForm = $("bookingForm");

function populateOptions() {
  destinations.forEach(d => {
    ["toDest","bDest"].forEach(id => {
      const option = document.createElement("option");
      option.value = d.name;
      option.textContent = d.name;
      $(id).appendChild(option);
    });
  });

  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    $("travelers").appendChild(option);
  }
}

function showDestinations() {
  const search = $("destSearch").value.toLowerCase();
  const budget = $("budgetFilter").value;
  const sort = $("sortFilter").value;

  let list = destinations.filter(d => {
    const matchSearch =
      (d.name + " " + d.state + " " + d.category)
      .toLowerCase().includes(search);

    const matchCategory =
      activeCategory === "all" ||
      d.category === activeCategory;

    let matchBudget = true;

    if (budget === "low") matchBudget = d.price < 10000;
    if (budget === "mid")
      matchBudget = d.price >= 10000 && d.price <= 20000;
    if (budget === "high") matchBudget = d.price > 20000;

    return matchSearch && matchCategory && matchBudget;
  });

  if (sort === "low") list.sort((a,b) => a.price-b.price);
  if (sort === "high") list.sort((a,b) => b.price-a.price);
  if (sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === "popular") list.sort((a,b) => b.rating-a.rating);

  $("resultCount").textContent = list.length + " destinations found";
  $("emptyState").hidden = list.length !== 0;
  destGrid.innerHTML = "";

  list.forEach(d => {
    const card = document.createElement("article");
    card.className = "destination-card";

    card.innerHTML = `
      <div class="dest-image" style="background:#e6f4f1">
        <span class="dest-emoji">${d.emoji}</span>
        <span class="rating">⭐ ${d.rating}</span>
      </div>
      <div class="dest-info">
        <h3>${d.name}</h3>
        <p class="dest-state">${d.state}</p>
        <p class="dest-tag">${d.category} Tour</p>
        <div class="dest-meta">
          <span class="price">₹${d.price.toLocaleString("en-IN")}
          <small>per person</small></span>
          <span class="duration">${d.days}</span>
        </div>
        <button class="primary-btn book-btn" type="button">
          Book This Trip
        </button>
      </div>`;

    card.querySelector("button").addEventListener("click", () => {
      $("bDest").value = d.name;
      updateSummary();
      $("booking").scrollIntoView({behavior:"smooth"});
    });

    destGrid.appendChild(card);
  });
}

function resetFilters() {
  $("destSearch").value = "";
  $("budgetFilter").value = "all";
  $("sortFilter").value = "popular";
  activeCategory = "all";

  document.querySelectorAll(".chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.cat === "all");
  });

  showDestinations();
}

function updateSummary() {
  const selected = destinations.find(
    d => d.name === $("bDest").value
  );

  if (!selected) {
    $("summaryBox").textContent =
      "Select a destination to see the estimated price.";
    return;
  }

  const count = Number($("bPass").value) || 1;
  $("summaryBox").textContent =
    selected.name + " - ₹" +
    (selected.price * count).toLocaleString("en-IN") +
    " estimated total for " + count + " passenger(s).";
}

function bookTravel(event) {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const booking = {
    id: "WB" + Date.now().toString().slice(-8),
    name: $("bName").value,
    email: $("bEmail").value,
    phone: $("bPhone").value,
    destination: $("bDest").value,
    date: $("bDate").value,
    passengers: $("bPass").value
  };

  let bookings = [];

  try {
    bookings = JSON.parse(
      localStorage.getItem("wanderlyBookings") || "[]"
    );
  } catch(e) {}

  bookings.push(booking);

  try {
    localStorage.setItem(
      "wanderlyBookings",
      JSON.stringify(bookings)
    );
  } catch(e) {
    alert("Booking could not be saved in this browser.");
  }

  $("confirmBody").textContent =
    "Booking ID: " + booking.id +
    " | Name: " + booking.name +
    " | Destination: " + booking.destination +
    " | Date: " + booking.date +
    " | Passengers: " + booking.passengers;

  $("confirmDialog").showModal();
  bookingForm.reset();
  updateSummary();
  showBookings();
}

function showBookings() {
  let bookings = [];

  try {
    bookings = JSON.parse(
      localStorage.getItem("wanderlyBookings") || "[]"
    );
  } catch(e) {}

  $("bookingList").innerHTML = "";

  bookings.forEach(b => {
    const item = document.createElement("p");
    item.textContent =
      b.id + " - " + b.name + " - " +
      b.destination + " - " + b.date;
    $("bookingList").appendChild(item);
  });
}

// Destination filters
$("destSearch").addEventListener("input", showDestinations);
$("budgetFilter").addEventListener("change", showDestinations);
$("sortFilter").addEventListener("change", showDestinations);

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    activeCategory = chip.dataset.cat;
    document.querySelectorAll(".chip").forEach(c =>
      c.classList.remove("active")
    );
    chip.classList.add("active");
    showDestinations();
  });
});

$("resetFilters").addEventListener("click", resetFilters);
$("emptyReset").addEventListener("click", resetFilters);

// Booking form
bookingForm.addEventListener("submit", bookTravel);
$("bDest").addEventListener("change", updateSummary);
$("bPass").addEventListener("input", updateSummary);

$("clearBookings").addEventListener("click", () => {
  if (confirm("Clear all bookings?")) {
    localStorage.removeItem("wanderlyBookings");
    showBookings();
  }
});

// Search trips
$("searchForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!$("searchForm").reportValidity()) return;

  const from = $("fromLoc").value;
  const to = $("toDest").value;

  $("searchMsg").textContent =
    "Trips found from " + from + " to " +
    (to || "all destinations") + "!";

  $("destSearch").value = to;
  showDestinations();
  $("destinations").scrollIntoView({behavior:"smooth"});
});

// Contact form demo
$("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!$("contactForm").reportValidity()) return;

  alert("Thank you! Your message has been submitted successfully.");
  $("contactForm").reset();
});

// Mobile menu
$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  nav.classList.toggle("open");
  $("menuToggle").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    $("mainNav").classList.remove("open");
    $("menuToggle").classList.remove("open");
  });
});

// Confirmation dialog
["closeConfirm","doneConfirm"].forEach(id => {
  $(id).addEventListener("click", () => {
    $("confirmDialog").close();
  });
});

$("printConfirm").addEventListener("click", () => window.print());

// Set minimum travel date
const today = new Date().toISOString().split("T")[0];
$("bDate").min = today;
$("departDate").min = today;
$("returnDate").min = today;

// Start website
populateOptions();
showDestinations();
showBookings();
updateSummary();

$("year").textContent = new Date().getFullYear();
