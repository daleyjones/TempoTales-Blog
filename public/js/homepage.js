// Authorization token that must have been created previously.
const token = 'BQAWQqZ_dgeeMQAdVd1x-ewyRrvJB7zE-w1pb4Iy54piFLuJ2uqiVR-_3FewamMhSh4Nmxs-FxcHjgtYlJ7aQXEE1y7x7bG_jsUCfHL5x3ElENYOKToPXtLH6Jx4sRfDtMS9Gd7vWObwLHOZuMI0WQ9BRd66UmQQZwxwmLdoPApjCWLeQrhY_pJXHPIffaS_T3d2NcPrAIn-3fzDFuXV4ghxN0C_yaE9ttdDralEvIQyqTcN83mQWdRs5WxbtiYhbMWx_g';

// Function to make API requests
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

// Function to get top tracks from Spotify API
async function getTopTracks() {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

// Function to display top tracks
async function displayTopTracks() {
  try {
    const topTracks = await getTopTracks();
    const topTracksDiv = document.getElementById("top-tracks");
    let tracksHTML = "";

    topTracks.forEach((track, index) => {
      tracksHTML += `<div class="track">
                       <div class="rank">${index + 1}</div>
                       <div class="info">
                         <h3>${track.name}</h3>
                         <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                       </div>
                     </div>`;
    });

    topTracksDiv.innerHTML = tracksHTML;
  } catch (error) {
    console.error(error);
  }
}

// Function to get recommended tracks from Spotify API
async function getRecommendations() {
  const topTracksIds = [
    '5NXthnJecYXjt7sTEWETTY', '52okn5MNA47tk87PeZJLEL', '1jo3TwNGCXfNdB5uba3ZVv', '57VeLYXrvNxe8Vs18K2M9W', '2FDTHlrBguDzQkp7PVj16Q',
  ];

  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

// Function to display recommended tracks
function displayRecommendedTracks(recommendedTracks) {
  const recommendedTracksDiv = document.getElementById("recommended-tracks");
  let tracksHTML = "";

  recommendedTracks.forEach((track, index) => {
    tracksHTML += `<div class="track">
                     <div class="rank">${index + 1}</div>
                     <div class="info">
                       <h3>${track.name}</h3>
                       <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                     </div>
                   </div>`;
  });

  recommendedTracksDiv.innerHTML = tracksHTML;
}

// Function to fetch and display live tracks
async function fetchLiveTracks() {
  try {
    const recommendedTracks = await getRecommendations();
    displayRecommendedTracks(recommendedTracks);
  } catch (error) {
    console.error(error);
  }
}

// Function to create and display the Spotify playlist
async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi('v1/me', 'GET');

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
    }
  );

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

// Function to display the embedded Spotify playlist
function displayEmbeddedPlaylist(playlistId) {
  const playlistContainer = document.getElementById("playlist-container");
  const iframe = document.createElement("iframe");
  iframe.title = "Spotify Embed: Recommendation Playlist";
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.minHeight = "360px";
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";
  playlistContainer.appendChild(iframe);
}

// Fetch and display the top tracks and recommended tracks
document.addEventListener("DOMContentLoaded", async function () {
  displayTopTracks();
  fetchLiveTracks();

  const tracksUri = [
    'spotify:track:5NXthnJecYXjt7sTEWETTY', 'spotify:track:52okn5MNA47tk87PeZJLEL', 'spotify:track:1jo3TwNGCXfNdB5uba3ZVv',
    'spotify:track:57VeLYXrvNxe8Vs18K2M9W', 'spotify:track:2FDTHlrBguDzQkp7PVj16Q', // Add more tracks if needed
  ];
  const createdPlaylist = await createPlaylist(tracksUri);
  displayEmbeddedPlaylist(createdPlaylist.id);
});
