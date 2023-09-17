function getsource(id) {
  $.ajax({
    url: "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=584a37d0ea104db79189f851125c4cf2",
    success: function (res) {
      document.getElementById("sourceLink").innerHTML = res.sourceUrl;
      document.getElementById("sourceLink").href = res.sourceUrl;
    }
  });
}
function getRecipe(q) {
  console.log("getRecipe function called with query: " + q);


  $.ajax({
    url: "https://api.spoonacular.com/recipes/search?apiKey=584a37d0ea104db79189f851125c4cf2&number=1&query=" + q,
    success: function (res) {
      var title = "";

      if (res.results && res.results[0] && res.results[0].hasOwnProperty('title')) {
        title = "<h1>" + res.results[0].title + "</h1>";
      } 
      var image = "<img src='" + res.baseUri + res.results[0].image + "' class='recipe-image' />";
      var readyTime = "<span class='custom-class'>This recipe will be ready in " + res.results[0].readyInMinutes + " minutes</span>";

      document.getElementById("output").innerHTML = title + "<br>" + image + "<br>" + readyTime;

      getsource(res.results[0].id);
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const suggestionsList = document.getElementById('suggestions');


  searchInput.addEventListener('input', () => {
    const query = searchInput.value;


    if (query.trim() !== '') {

      fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=584a37d0ea104db79189f851125c4cf2&query=${query}`)
        .then(response => response.json())
        .then(data => {

          suggestionsList.innerHTML = '';

          data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;
            suggestionsList.appendChild(listItem);
          });
        })
        .catch(error => console.error(error));
    } else {

      suggestionsList.innerHTML = '';
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const suggestionsList = document.getElementById('suggestions');


  searchInput.addEventListener('input', () => {
    const query = searchInput.value;


    if (query.trim() !== '') {

      fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=584a37d0ea104db79189f851125c4cf2&query=${query}`)
        .then(response => response.json())
        .then(data => {

          suggestionsList.innerHTML = '';

          data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name;


            listItem.addEventListener('click', () => {

              searchInput.value = item.name;


              suggestionsList.innerHTML = '';
            });

            suggestionsList.appendChild(listItem);
          });
        })
        .catch(error => console.error(error));
    } else {

      suggestionsList.innerHTML = '';
    }
  });
});



