let detail = document.querySelector(".bio-wrap-detailed");
let birth = document.querySelector(".birth");
let pob = document.querySelector(".pob");
let imageURLSmall = "https://image.tmdb.org/t/p/w200";
let imageURLProfile = "https://image.tmdb.org/t/p/w300";
let credits = document.querySelector(".credits-list");

let fetchURL = fetch(
  "https://api.themoviedb.org/3/person/1158?api_key=0ba2250a3707fdd6ad89ccd539184b04&language=en-US&append_to_response=images,movie_credits"
);

fetchURL
  .then(result => {
    //we get a promise object
    console.log(result);
    return result.json();
  })
  .then(data => {
    console.log(data);

    // let imagefilePath = data.images.profiles.map(imagefile => {
    //   return imagefile.file_path;
    // });

    //map through all the movie credits

    let movieCredits = data.movie_credits.cast.map(movieList => {
      return movieList;
    });

    for (let i = 0; i < movieCredits.length; i++) {
      let movieCard = createElement("li"),
        movieTitleCont = createElement("div"),
        movieTitle = createElement("h3"),
        movieRoleName = createElement("p"),
        movieCardPoster = createElement("img");
      let moviePosters = imageURLSmall + movieCredits[i].poster_path;
      movieTitle.innerHTML = movieCredits[i].title;
      movieRoleName.innerHTML = movieCredits[i].character;
      movieCardPoster.src = moviePosters;

      appendElement(movieCard, movieTitleCont);
      appendElement(movieTitleCont, movieTitle);
      appendElement(movieTitleCont, movieRoleName);
      appendElement(movieCard, movieCardPoster);
      appendElement(credits, movieCard);
    }

    detail.innerHTML = data.biography;
    birth.innerHTML = data.birthday;
    pob.innerHTML = data.place_of_birth;
  });

//factory functions
function createElement(ele) {
  return document.createElement(ele);
}
function appendElement(parent, ele) {
  return parent.appendChild(ele);
}
