const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/",
});

api.defaults.headers.common["X-API-KEY"] =
  "18a4453d-86f1-4962-b5e2-18acdb29738e";

const API_URL_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2";

const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?";

const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = "https://api.thedogapi.com/v1/images/upload";

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
  const response = await fetch(API_URL_FAVORITES, {
    method: "GET",
    headers: {
      "X-API-KEY": "18a4453d-86f1-4962-b5e2-18acdb29738e",
    },
  });
  const data = await response.json();
  console.log("favorites");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status;
  } else {
    const section = document.getElementById("favoriteDogs");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Dogos favoritos");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.map((dog) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Quitar de favoritos");

      btn.appendChild(btnText);
      img.src = dog.image.url;
      img.width = 150;
      article.appendChild(img);
      article.appendChild(btn);
      btn.onclick = () => deleteFavorites(dog.id);

      section.appendChild(article);
    });
  }
}

async function saveFavoriteDog(id) {
  // const response = await fetch(API_URL_FAVORITES, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-API-KEY": "18a4453d-86f1-4962-b5e2-18acdb29738e",
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });
  //const data = await response.json();

  const { data, status } = await api.post("/favourites", {
    image_id: id,
  });
  console.log("save");

  if (status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
  } else {
    console.log("Dogo guardado en favoritos");
    loadFavoriteDogs();
  }
}

async function deleteFavorites(id) {
  const response = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "18a4453d-86f1-4962-b5e2-18acdb29738e",
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
  } else {
    console.log("Dogo eliminado de favoritos");
    loadFavoriteDogs();
  }
}

async function uploadDogoPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);
  console.log(formData.get("file"));

  const response = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      "X-API-KEY": "18a4453d-86f1-4962-b5e2-18acdb29738e",
    },
    body: formData,
  });
}

loadRandomDogs();

loadFavoriteDogs();
