const CLIENT_ID = "cdb05e717e7d4db3a166f187e3f6c399";
const CLIENT_SECRET = "ce07ba933b1f42c79a1661c1f3dfc5b3";

async function getToken() {

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "Authorization":
        "Basic " +
        btoa(CLIENT_ID + ":" + CLIENT_SECRET)
      },
      body:"grant_type=client_credentials"
    }
  );

  const data = await response.json();

  return data.access_token;
}

async function searchAlbums() {

  const query =
  document.getElementById("searchInput").value;

  const token = await getToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=album`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  displayAlbums(data.albums.items);
}
function displayAlbums(albums){

  const results =
  document.getElementById("results");

  results.innerHTML="";

  albums.forEach(album=>{

    results.innerHTML += `
      <div class="card">
        <img src="${album.images[0]?.url}">
        <h3>${album.name}</h3>
        <p>${album.artists[0].name}</p>
        <p>${album.release_date}</p>

        <a
         href="${album.external_urls.spotify}"
         target="_blank">
         Open Spotify
        </a>
      </div>
    `;
  });
}