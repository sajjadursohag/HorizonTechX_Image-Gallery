
const photos = [
  {
    title: "Mountain Serenity",
    category: "nature",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Forest Escape",
    category: "nature",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Ocean Dreams",
    category: "nature",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Modern Architecture",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "City Geometry",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Urban Lines",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Coastal Adventure",
    category: "travel",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "A Quiet Journey",
    category: "travel",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85"
  },
  {
    title: "Golden Hour",
    category: "travel",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85"
  }
];

const gallery = document.querySelector("#gallery");
const filterButtons = document.querySelectorAll(".filter-btn");
const photoCount = document.querySelector("#photo-count");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const imageCounter = document.querySelector("#image-counter");

const closeButton = document.querySelector("#close-btn");
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");

let filteredPhotos = [...photos];
let currentIndex = 0;
let lastFocusedElement = null;

// Render gallery cards
function renderGallery() {
  gallery.innerHTML = "";

  filteredPhotos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-item";
    button.setAttribute("aria-label", `View ${photo.title}`);

    const img = document.createElement("img");
    img.src = photo.image;
    img.alt = photo.title;
    img.loading = "lazy";
    img.decoding = "async";

    button.appendChild(img);

    button.addEventListener("click", () => {
      openLightbox(index, button);
    });

    gallery.appendChild(button);
  });

  photoCount.textContent =
    `${filteredPhotos.length} photo${filteredPhotos.length === 1 ? "" : "s"} found`;
}

// Filter by category
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filteredPhotos = selectedCategory === "all"
      ? [...photos]
      : photos.filter((photo) => photo.category === selectedCategory);

    renderGallery();
  });
});

// Show selected photo in lightbox
function showPhoto(index) {
  if (filteredPhotos.length === 0) return;

  currentIndex =
    (index + filteredPhotos.length) % filteredPhotos.length;

  const photo = filteredPhotos[currentIndex];

  lightboxImage.src = photo.image;
  lightboxImage.alt = photo.title;
  lightboxCaption.textContent = photo.title;
  imageCounter.textContent =
    `${currentIndex + 1} of ${filteredPhotos.length}`;

  const isSinglePhoto = filteredPhotos.length < 2;
  prevButton.disabled = isSinglePhoto;
  nextButton.disabled = isSinglePhoto;

  prevButton.style.opacity = isSinglePhoto ? "0.4" : "1";
  nextButton.style.opacity = isSinglePhoto ? "0.4" : "1";
}

function openLightbox(index, opener) {
  lastFocusedElement = opener;
  showPhoto(index);
  lightbox.showModal();
  closeButton.focus();
}

function closeLightbox() {
  if (lightbox.open) {
    lightbox.close();
  }
}

prevButton.addEventListener("click", () => {
  showPhoto(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  showPhoto(currentIndex + 1);
});

closeButton.addEventListener("click", closeLightbox);

// Close when clicking the backdrop
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Restore focus to the image that opened the viewer
lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
  lastFocusedElement?.focus();
});

// Keyboard navigation
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(currentIndex - 1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(currentIndex + 1);
  }
});

// Start the application
renderGallery();
