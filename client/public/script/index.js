const country = document.getElementById("country");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

const xhr = new XMLHttpRequest();

country.addEventListener("keyup", () => {
  const search = country.value;
  loading.style.display = "inline-block";
  result.innerHTML = "";
  if (search !== "") {
    xhr.addEventListener("load", () => {
      result.innerHTML = "";
      loading.style.display = "none";
      const response = JSON.parse(xhr.responseText);

      if (response[0] === undefined) {
        result.innerHTML = `<h1>No se encontraron resultados</h1>`;
      } else {
        response.forEach((element) => {
          result.innerHTML += `<div class="container ">
            <div class="row">
              <div class="col country-result" onClick="handleSelect('${element}')">
                 ${makeQueryBoldInResults(element)}
              </div> 
            </div>
          </div>`;
        });
      }
    });

    xhr.open("GET", `/buscar?country=${search}`);
    xhr.send();
  } else {
    result.innerHTML = "";
    loading.style.display = "none";
  }
});

const handleSelect = (searchResult) => (country.value = searchResult);

const makeQueryBoldInResults = (queryResult) => {
  let countryInput = country.value.toLowerCase();
  let queryLowerCase = queryResult.toLowerCase();

  const firstPart = queryResult.slice(0, queryLowerCase.indexOf(countryInput));
  const boldPart = `<strong class="colorBold">${countryInput}</strong>`;
  const lastPart = queryResult.slice(
    queryLowerCase.indexOf(countryInput) + countryInput.length
  );

  return firstPart + boldPart + lastPart;
};
