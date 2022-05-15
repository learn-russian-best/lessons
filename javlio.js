// Check If There's Local Storage Color Option

let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  // console.log("Local Storage Is not empty you can set it on root now");
  // console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main--color", mainColors);
  // Remove Active Class From All Colors List items
  document.querySelectorAll(".colors-list li").forEach(function (element) {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local storage item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}
// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Inerval
let backgroundInterval;
// Check if there's localstorage Random Background item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If random background local Storage is empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active Class From Spans
  let backgroundSpans = document.querySelectorAll(".random-backgrounds span");
  backgroundSpans.forEach(function (unlock) {
    unlock.classList.remove("active");
  });
}
// Toggle Spin Class On Icon
let toggleSpin = document.querySelector(".toggle-settings .fa-cog");
// Toggle To Open SideBar
let toggleOpen = document.querySelector(".settings-box");
toggleSpin.onclick = function () {
  // Toggle Class Fa-spin For Rotation On Slef
  this.classList.toggle("fa-spin");
  // Toggle Class Open On Main Settings Box
  toggleOpen.classList.toggle("open");
};
// Switch Colors

const colorLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorLi.forEach(function (li) {
  // Click On Ever List Items
  li.addEventListener("click", function (event) {
    // Set Color On root
    document.documentElement.style.setProperty(
      "--main--color",
      event.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", event.target.dataset.color);
    // Remove Active Class From All Children
    handleActive(event);
  });
});

// Switch random background Option

const randomBckgroundElements = document.querySelectorAll(
  ".random-backgrounds span"
);
// Loop On All Spans
randomBckgroundElements.forEach(function (span) {
  // Click On Ever Span
  span.addEventListener("click", function (event) {
    handleActive(event);

    if (event.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImage();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundOption);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Images
let imagesArray = [
  "learn.jpg",
  "moscow.png",
  "rusgram.jpg",
  "russianconcept.jpg",
];

// Function To Randomize Images
function randomizeImage() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      // Change Bckground Image Url
      landingPage.style.backgroundImage =
        'url("/' + imagesArray[randomNumber] + '")';
    }, 10000);
  }
}
// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // console.log("skills section reached");
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach(function (lock) {
      lock.style.width = lock.dataset.progress;
    });
  }
};
// Create PopUp To The Images
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(function (img) {
  img.addEventListener("click", function (event) {
    // Create Overlay Element
    let overLay = document.createElement("div");
    // Add Class To OvarLay
    overLay.className = "popup-overlay";
    // Append Overlay To the Body
    document.body.appendChild(overLay);
    // Create The PopUp Box
    let popupBox = document.createElement("div");
    // Add Class To the Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heading
      imgHeading.appendChild(imgText);
      // Append the heading to the popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Add image To popup Box
    popupBox.appendChild(popupImage);
    // Append the Popup Box To Body
    document.body.appendChild(popupBox);
    // Create The Close The  Span
    let closeButton = document.createElement("span");
    // Create The CLose Button Text
    let closeButtonText = document.createTextNode("X");
    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add CLass To the Close Button
    closeButton.className = "close-button";
    // Add Close Button To the Popup Box
    popupBox.appendChild(closeButton);
  });
});
// Close popup Box
document.addEventListener("click", function (event) {
  if (event.target.className == "close-button") {
    // Remove The current popup
    event.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// All Bullets selectors
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Links selectors
const allLinks = document.querySelectorAll(".links a");
// this is what people say don't repeat yourself one function you can it many times Dry Code
function scrollToSomeWhere(elements) {
  elements.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();

      document.querySelector(event.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Handle Active State
function handleActive(event) {
  // Remove Active Class From All Children
  event.target.parentElement
    .querySelectorAll(".active")
    .forEach(function (element) {
      element.classList.remove("active");
    });
  // Add Active Class On self
  event.target.classList.add("active");
}
// Show bullets And Bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach(function (span) {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
// loop on the spans
bulletsSpan.forEach(function (span) {
  span.addEventListener("click", function (even) {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(even);
  });
});

// Reset Button
let resetButton = document.querySelector(".reset-option");
resetButton.onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  // Reload The Current Window
  window.location.reload();
};
// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");
  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};
// Click Anywhere Outside Menu Toggle Button
document.addEventListener("click", function (e) {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check if Menu is open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});
// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
