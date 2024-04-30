const productCard = document.querySelector(".product");
let loading = document.querySelector(".loading__cards");

let API__URL = "https://fakestoreapi.com";

async function fetchData(api) {
  let param = new URLSearchParams(window.location.search);
  let id = param.get("id");

  const data = await fetch(`${api}/products/${id}`);
  data
    .json()
    .then((res) => mapDataProd(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}
fetchData(API__URL);

function mapDataProd(produc) {
  productCard.innerHTML = `
          <div class="product__card">
            <div class="product__img">
              <img src=${produc.image} alt="" />
            </div>
            <div class="product__info">
              <h1 class="product__info__title">title:  ${produc.title}</h1>
              <p class="product__info__desc">price:  ${produc.price}</p>
              <p class="product__info__desc">description:  ${produc.description}</p>
              <p class="product__info__desc">category:  ${produc.category}</p>
              <p class="product__info__desc">rate:  ${produc.rating.rate}</p>
              <p class="product__info__desc">count:  ${produc.rating.count}</p>
            </div>
          </div>
  `;
}

function loadCard(count) {
  let loadingCards = "";
  for (let i = 0; i < count; i++) {
    loadingCards += `
          <div class="loading__card">
            <div class="loading__card__img bg__animation"></div>
            <div class="loading__card__info bg__animation"></div>
          </div>
    `;
  }
  loading.innerHTML = loadingCards;
}
