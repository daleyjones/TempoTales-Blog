// Authorization token that must have been created previously.
const token = 'BQB5epFbWMMoUSa0BrPlMZX-FEORkKnQHZ07Nj6sLvNoCk6DCwZ2hRCDIa2vKZgUCSEzNJg5nBOpTKryLm2W17Ob26WeQdS1LvGjG5oRGcvcUJaFHcy4eLOgaSGL4Dr4A9LLg5LG0S-gc_cravugRbR1YGrMvdL-ohEy7uA0DhMqAF-Y6vC4seidKHnWepZ12yUY4xsLIP-zOe7hEzc_lNe82ohLNsfBe0YkIIwoP9gSyR9uyqu4GuhD_zh_x7-Y979V4A';

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

// Function to display the music article
// Function to display the music article
function displayMusicArticle(article) {
    const articleContainer = document.getElementById("article-container");
    let articleHTML = `
        <div class="article">
            <h2 class="article-title">${article.title}</h2>
            <p class="article-content">${article.content}</p>
        </div>`;
    articleContainer.innerHTML += articleHTML; // Use += to append the article content
}

// Music article data (You can replace this with your own articles from the provided one)
const musicArticle = {
    title: "The Rhythm Titans: Unveiling the 10 Best Rock Drummers of All Time!",
    content: `Hey there, fellow music enthusiasts! If you're like me, a die-hard rock music lover, you'll understand just how vital the role of a drummer is in any rock band. The heartbeat of the band, the pulse of the music – the drummers elevate rock anthems to an entirely different level! ... [The rest of the article content] ... Let the beats keep rolling, and the rock keep thundering! Rock on! :the_horns:`
};

const musicArticle2 = {
    title: "Unraveling K-Pop: Why It's Unpopular to Predict It as the Music of the 2020s",
    content: `Greetings, fellow music enthusiasts! As a music critic, it is my duty to explore the ever-evolving world of music and identify trends that might shape the soundscape of the new decade. Among the many genres vying for dominance, one has caught my attention: K-Pop. While acknowledging the greatness of rock, metal, and grunge, I must admit that predicting K-Pop as the music of the 2020s is, undoubtedly, an unpopular opinion. Why, you ask? Well, let's delve into the vibrant world of K-Pop and examine the reasons behind this controversial claim. ... [The rest of the article content] ... Let the music play on!`
};

const musicArticle3 = {
    title: "In Search of Classic Blues: Is Modern Music Living Up to Its Legendary Past?",
    content: `As an ardent classic blues fan, I can't help but wonder if I am alone in my sentiment that modern music simply doesn't hold a candle to the legendary sounds of yesteryears. The soul-stirring rhythms, heartfelt lyrics, and raw emotion of classic blues have left an indelible mark on my musical soul. But are today's tunes living up to that timeless magic? Let's explore this intriguing question. ... [The rest of the article content] ... After all, music's magic knows no bounds, and we might just stumble upon a contemporary masterpiece that leaves us breathless and in awe, just like the classic blues legends of old.`
};

const hipHopArticles = [
    {
      title: "The Evolution of Hip-Hop: From the Streets to Mainstream Dominance",
      content: "Hip-hop, once an underground movement born in the streets of the Bronx, has undergone a remarkable transformation over the decades...",
    },
    {
      title: "Sampling: The Art of Repurposing Music in Hip-Hop",
      content: "A hallmark of hip-hop's creative process is sampling – the art of taking snippets from existing songs and incorporating them into new beats...",
    },
    {
      title: "Hip-Hop's Social Impact: From Activism to Cultural Diplomacy",
      content: "Hip-hop has long been a platform for artists to express their social and political views, championing causes and addressing pressing issues in society...",
    }
];

// Display the music articles and hip-hop articles when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    displayMusicArticle(musicArticle);
    displayMusicArticle(musicArticle2);
    displayMusicArticle(musicArticle3);

    hipHopArticles.forEach((article) => {
        displayMusicArticle(article);
    });
});

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
