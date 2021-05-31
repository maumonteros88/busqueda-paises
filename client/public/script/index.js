const country = document.getElementById("country");
const result = document.getElementById("result");

const xhr = new XMLHttpRequest();

country.addEventListener("keyup", () => {
  // @ts-ignore
  const search = country.value;
  if (search !== "") {
    xhr.addEventListener("load", () => {
      result.innerHTML = "";
      const response = JSON.parse(xhr.responseText);
      response.forEach((element) => {
        result.innerHTML += `<div class="container ">
          <div class="row">
            <div class="col country-result" onClick="handleSelect('${element}')">${handleSearch(
          element
        )}</strong></div> 
          </div>
        </div>`;
      });
    });

    // @ts-ignore
    xhr.open("GET", `/buscar?country=${search}`);
    xhr.send();
  } else {
    result.innerHTML = "";
  }
});

// @ts-ignore
const handleSelect = (searchResult) => (country.value = searchResult);

const handleSearch = (searchResult) => {
  let countryInput = country.value.toLowerCase();
  let searchCountryResult = searchResult.toLowerCase();

  return `${searchCountryResult.slice(
    0,
    searchCountryResult.indexOf(countryInput)
  )}<strong>${searchCountryResult.slice(
    searchCountryResult.indexOf(countryInput)
  )}`;
};
