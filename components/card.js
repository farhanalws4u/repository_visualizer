export const card = (repo) => {
  return `<div class="repo_card">
            <a
              target="_blank"
              class="repo_card_link"
              href="${repo.html_url}"
            >
              <div class="repo_card__name_and_fork_container">
                <h2 class="repo_card__name">${repo.name}</h2>
                <div class="repo_card__fork_container">
                  <img
                    class="fork_image"
                    src="./assets/images/fork.png"
                    alt="fork"
                  />
                  <p>${repo.forks_count}</p>
                </div>
              </div>
              <p class="repo_card_description">
               ${repo.description || "No description"}
              </p>
              <div class="repo_card__lang_container">
             `;
};

export const getLangHtml = async (languages_url) => {
  let langsHtml = "";
  try {
    let response = await fetch(languages_url);
    let languages = await response.json();
    let keys = Object.keys(languages);

    if (keys.length === 0) {
      langsHtml = `<span class="repo_card__lang">No Languages!</span>`;
    } else {
      for (let i = 0; i < Math.min(keys.length, 3); i++) {
        if (i === 2 && keys.length > 3) {
          langsHtml += `<span class="repo_card__lang">${
            keys[i] + " " + (keys.length - 3) + "+"
          }</span>`;
        } else {
          langsHtml += `<span class="repo_card__lang">${keys[i]}</span>`;
        }
      }
    }
  } catch (error) {
    console.log("Error while fetching languages", error);
    langsHtml = `<span class="repo_card__lang">Error fetching languages</span>`;
  }

  return (
    langsHtml +
    `</div>
            </a>
          </div>`
  );
};
