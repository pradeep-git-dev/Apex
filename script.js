let currentUser = null;
const likeStatus = new WeakMap();

function navigateTo(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = section.id === id ? 'block' : 'none';
  });
}

function showLogin() {
  closeModal();
  document.getElementById("loginModal").style.display = "flex";
}

function showSignup() {
  closeModal();
  document.getElementById("signupModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("signupModal").style.display = "none";
}

function registerUser() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPass").value;

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Registered successfully!");
  closeModal();
}

function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.email !== email || user.password !== password) {
    alert("Invalid credentials.");
    return;
  }

  currentUser = user;
  alert("Login successful!");
  closeModal();
}

function postArticle() {
  if (!currentUser) {
    alert("Please login to post.");
    return;
  }

  const title = document.getElementById("newTitle").value.trim();
  const content = document.getElementById("newContent").value.trim();
  if (!title || !content) {
    alert("Fill in both title and content.");
    return;
  }

  const articleHTML = `
    <div class="article">
      <h3>${title}</h3>
      <p>${content}</p>
      <small>By ${currentUser.name}</small>
      <div class="likes">
        <button onclick="likeArticle(this)">👍</button><span class="count">0</span>
        <button onclick="dislikeArticle(this)">👎</button><span class="count">0</span>
      </div>
    </div>
  `;

  document.getElementById("articleList").insertAdjacentHTML("afterbegin", articleHTML);
  document.getElementById("homeArticles").insertAdjacentHTML("afterbegin", articleHTML);

  document.getElementById("newTitle").value = "";
  document.getElementById("newContent").value = "";
}

function likeArticle(btn) {
  const article = btn.closest('.article');
  if (!likeStatus.has(article)) likeStatus.set(article, { liked: false, disliked: false });
  const status = likeStatus.get(article);

  if (status.liked) return;
  status.liked = true;

  const countSpan = btn.nextElementSibling;
  countSpan.textContent = parseInt(countSpan.textContent) + 1;
}

function dislikeArticle(btn) {
  const article = btn.closest('.article');
  if (!likeStatus.has(article)) likeStatus.set(article, { liked: false, disliked: false });
  const status = likeStatus.get(article);

  if (status.disliked) return;
  status.disliked = true;

  const countSpan = btn.nextElementSibling;
  countSpan.textContent = parseInt(countSpan.textContent) + 1;
}

function searchArticles() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".article").forEach(article => {
    const title = article.querySelector("h3").innerText.toLowerCase();
    const body = article.querySelector("p").innerText.toLowerCase();
    article.style.display = title.includes(query) || body.includes(query) ? "block" : "none";
  });
}

function addPodcast() {
  const url = document.getElementById("podcastUrl").value.trim();
  const videoId = extractYouTubeID(url);

  if (!videoId) {
    alert("Please enter a valid YouTube URL.");
    return;
  }

  const embed = document.createElement("div");
  embed.classList.add("podcast-video");
  embed.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
  `;
  document.getElementById("podcastList").prepend(embed);
  document.getElementById("podcastUrl").value = "";
}

function extractYouTubeID(url) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function addImageArticle() {
  const fileInput = document.getElementById("imageUpload");
  const caption = document.getElementById("imageCaption").value;

  if (!fileInput.files.length) {
    alert("Please upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgArticle = document.createElement("div");
    imgArticle.classList.add("image-article");
    imgArticle.innerHTML = `
      <img src="${e.target.result}" style="max-width:100%; border-radius:8px; margin-bottom:10px;">
      <p>${caption}</p>
    `;
    document.getElementById("imageArticles").prepend(imgArticle);
    fileInput.value = "";
    document.getElementById("imageCaption").value = "";
  };
  reader.readAsDataURL(fileInput.files[0]);
}
