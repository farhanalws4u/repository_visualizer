import { card, getLangHtml } from "./components/card.js";
import { loader } from "./components/loader.js";

let currentPage = 1;
let username = "";

window.addEventListener("load", (event) => {
  let mainContainer = document.getElementById("main-container");
  let formContainer = document.getElementById("form_container");

  mainContainer.style.display = "none";
  formContainer.style.display = "flex";
});

document.getElementById("submitBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  let loader = document.getElementById("loader");
  let formContainer = document.getElementById("form_container");
  let mainContainer = document.getElementById("main-container");
  let form = document.getElementById("form");
  username = document.getElementById("username").value;

  formContainer.style.display = "none";
  loader.style.display = "flex";

  let isUserFound = await fetchUserDetails();

  if (isUserFound) {
    if (fetchRepositories(username, currentPage, 10)) {
      mainContainer.style.display = "block";
      loader.style.display = "none";
    }
  } else {
    // form.removeChild("span");
    let span = document.createElement("span");
    span.style.color = "red";
    span.style.fontSize = "15px";
    span.textContent = "User Not Found!";
    span.style.marginTop = "10px";
    form.append(span);
    loader.style.display = "none";
    formContainer.style.display = "flex";
  }
});

let fetchUserDetails = async () => {
  const apiUrl = `https://api.github.com/users/${username}`;
  try {
    let response = await fetch(apiUrl, {
      headers: {
        Authorization: "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",
      },
    });
    let user = await response.json();

    if (user.message === "Not Found") return false;

    if (Object.keys(user).length > 0) {
      console.log({ user });
      document.getElementById("name").textContent = user.name;
      document.getElementById("bio").textContent = user.bio;
      document.getElementById("location").textContent = user.location;
      let blogUrlElement = document.getElementById("blogUrl");
      blogUrlElement.textContent = "Blog: " + user.blog;
      let blogUrl = String(user.blog).startsWith("http")
        ? user.blog
        : "https://" + user.blog;
      blogUrlElement.href = "https://" + user.blog;

      let githubUrlElement = document.getElementById("githubUrl");
      githubUrlElement.textContent = "Github: " + user.html_url;
      githubUrlElement.href = user.html_url;
      document.getElementById("profileImage").src = user.avatar_url;

      return true;
    }
  } catch (error) {
    console.log("Error while fetching user data!", error);
    return false;
  }
};

let fetchRepositories = async (username, page, perPage) => {
  const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

  try {
    let response = await fetch(apiUrl, {
      headers: {
        Authorization: "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",
      },
    });

    let repos = await response.json();
    const reposContainer = document.getElementById("repos-container");

    if (repos.length > 0) {
      reposContainer.innerHTML = loader;
      let allCardsHtml = "";

      for (const repo of repos) {
        let langHtml = await getLangHtml(repo.languages_url);
        let cardHtml = card(repo) + langHtml;
        allCardsHtml += cardHtml;
      }
      reposContainer.innerHTML = allCardsHtml;
      updatePaginationBar(username, page, perPage);
      currentPage = page;
    } else {
      reposContainer.innerHTML = "<h1>No Repositories Found!</h1>";
    }

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
function updatePaginationBar(username, currentPage, perPage) {
  const paginationBar = document.getElementById("pagination-bar");
  let nextBtn = document.getElementById("next");
  let prevBtn = document.getElementById("prev");
  paginationBar.innerHTML = "";

  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: "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",
    },
  })
    .then((response) => response.json())
    .then((user) => {
      const totalRepos = user.public_repos;
      let totalPages = Math.ceil(totalRepos / perPage);

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.addEventListener("click", () =>
          fetchRepositories(username, i, perPage)
        );
        if (i === currentPage) {
          pageButton.classList.add("active");
        }
        paginationBar.appendChild(pageButton);
      }
      if (currentPage === totalPages) {
        nextBtn.classList.add("arrow_btn_disable");
      } else {
        nextBtn.classList.remove("arrow_btn_disable");
      }
      if (currentPage === 1) {
        prevBtn.classList.add("arrow_btn_disable");
      } else {
        prevBtn.classList.remove("arrow_btn_disable");
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

document.getElementById("per-page").addEventListener("change", changePerPage);

function changePerPage(e) {
  let perPage = e.target.value;
  fetchRepositories(username, 1, perPage);
}

document.getElementById("next").addEventListener("click", function () {
  if (currentPage < 10) {
    fetchRepositories(username, ++currentPage, 10);
  }
});

document.getElementById("prev").addEventListener("click", function () {
  if (currentPage > 1) {
    fetchRepositories(username, --currentPage, 10);
  }
});
