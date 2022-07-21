const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=18a4453d-86f1-4962-b5e2-18acdb29738e";

const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites?&api_key=18a4453d-86f1-4962-b5e2-18acdb29738e";

const spanError = document.getElementById("error");

async function loadRandomDogs() {
  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();
  console.log("random");
  console.log(data);
  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoriteDog(data[0].id);

    btn2.onclick = () => saveFavoriteDog(data[1].id);
  }
}

async function loadFavoriteDogs() {
  const response = await fetch(API_URL_FAVORITES);
  const data = await response.json();
  console.log("favorites");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status;
  } else {
    data.map((dog) => {
      const section = document.getElementById("favoriteDogs");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Quitar de favoritos");

      btn.appendChild(btnText);
      img.src = dog.image.url;
      img.width = 150;
      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
    });
  }
}

async function saveFavoriteDog(id) {
  const response = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await response.json();
  console.log("save");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
  }
}

loadRandomDogs();

loadFavoriteDogs();
