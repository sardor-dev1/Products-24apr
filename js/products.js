let API__URL = "https://fakestoreapi.com";
const productsBtn = document.querySelector(".products__btn");
const products = document.querySelector(".products");
let limit = 4;
let count = 1;

async function producApi(url) {
  let data = await fetch(`${url}/products?limit=${limit * count}`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      productsBtn.innerHTML = "See more";
      productsBtn.removeAttribute("disabled");
    });
}
producApi(API__URL);

const productsCards = document.querySelector(".products__cards");

function mapData(product) {
  let producData = "";
  product.forEach((prod) => {
    producData += `
          <div class="products__card">
            <div class="products__card__img">
              <img class="products__img" data-id=${prod.id} src=${prod.image} alt="" />
            </div>
            <div class="products__card__info">
              <h3 class="products__card__info__title">category: ${prod.category}</h3>
              <p class="products__card__info__desc">price: ${prod.price}</p>
            </div>
          </div>
    `;
  });
  productsCards.innerHTML = producData;
}

productsBtn.addEventListener("click", () => {
  count++;
  producApi(API__URL);
  productsBtn.innerHTML = "loading...";
  productsBtn.setAttribute("disabled", true);
});

products.addEventListener("click", (e) => {
  if (e.target.className === "products__img") {
    let id = e.target.dataset.id;
    window.open(`./pages/product.html?id=${id}`, "_self");
  }
});

const loading = document.querySelector(".loading");

function loadCard(count) {
  let loadingCards = "";
  for (let i = 0; i < count; i++) {
    loadingCards += `
          <div class="loading__card">
            <div class="loading__card__img bg__animation"></div>
            <div class="loading__card__info bg__animation">
              <h1 class="loading__card__desc bg__animation"></h1>
              <p class="loading__card__desc bg__animation"></p>
              <p class="loading__card__desc bg__animation"></p>
              <p class="loading__card__desc bg__animation"></p>
              <p class="loading__card__desc bg__animation"></p>
            </div>
          </div>
    `;
  }
  loading.innerHTML = loadingCards;
}

loadCard(limit);
