// Authorization token that must have been created previously.
const token = 'BQBAzlX9uRMIfPNqUMoU5039xRMl-AcIkyqMWShgV6dghHPFKqHF5XyMkpIG61ZRRNCMElb5YNV3eTbkEerIvy4lmhSY-lYFSUeKhqh05WBTALLLK0HRKmEyWidKvxBHTPcgD5URHs9WhJewO52YQcjCJqoJhU4ke4dQKE_JoaUejWylze-G3a15LfAsCDNcnb1JP-nMVfleEixCmTdGeHzh8uqMp1jmTPyCxI9qKEqHnymnTLgYDZ7hpQtqfX2Rn1nVRA';
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
function displayMusicArticle(article) {
    const articleContainer = document.getElementById("article-container");
    let articleHTML = `
        <div class="article">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <h2 class="article-title">${article.title}</h2>
            <p class="article-content">${article.content}</p>
        </div>`;
    articleContainer.innerHTML += articleHTML; // Use += to append the article content
}

// Music article data (You can replace this with your own articles from the provided one)
const musicArticle = {
  title: "Ed Sheeran: The Sensational Singer-Songwriter Making Waves in Music History",
  content: `In the ever-evolving world of music, certain artists manage to transcend boundaries and capture the hearts of millions worldwide. Ed Sheeran, the British singer-songwriter, is undeniably one of those exceptional talents. From his humble beginnings to global stardom, Sheeran's musical journey is a testament to the power of raw talent, dedication, and an unwavering passion for music.

  Early Life and Beginnings:
  Born on February 17, 1991, in Halifax, West Yorkshire, England, Edward Christopher Sheeran showed a profound interest in music from a young age. Raised in Framlingham, Suffolk, he learned to play the guitar at an early age and began writing his own songs in his early teens. Even before becoming a household name, Sheeran showcased his determination by performing at numerous open mic nights and small venues, honing his craft and captivating audiences with his soulful voice and heartfelt lyrics.

  The Rise to Fame:
  Sheeran's breakthrough came in 2011 with the release of his debut studio album "+," pronounced as "plus." The album featured the chart-topping singles "The A Team" and "Lego House," earning him critical acclaim and catapulting him to international recognition. With his signature blend of acoustic pop, folk, and R&B influences, Sheeran's music resonated with listeners of all ages, and he quickly amassed a dedicated fan base.

  The Red-Headed Superstar:
  Ed Sheeran's second album, "x" (pronounced "multiply"), released in 2014, solidified his status as a global superstar. The album's lead single, "Sing," showcased a more upbeat and pop-oriented sound, while hits like "Thinking Out Loud" and "Photograph" further cemented his reputation as a master storyteller with an emotive vocal delivery. "x" earned Sheeran multiple Grammy nominations and continued to top charts worldwide, setting new records for album sales and digital downloads.

  Divide and Conquer:
  In 2017, Ed Sheeran's third studio album, "÷" (pronounced "divide"), took the world by storm. The album's lead single, "Shape of You," became an instant anthem, dominating airwaves and playlists globally. "Castle on the Hill" and "Galway Girl" were also massive hits, showcasing Sheeran's versatility as an artist. "÷" broke numerous records and earned him the prestigious Grammy Award for Best Pop Vocal Album.

  Beyond Music:
  Ed Sheeran's impact extends beyond his music. He has consistently used his platform to support various charitable causes, advocating for social and environmental issues. Sheeran's involvement in charity work and philanthropy reflects his genuine commitment to making a positive impact on the world.

  The Comeback:
  After a brief hiatus, Ed Sheeran returned to the music scene with his 2019 album "No.6 Collaborations Project." The album featured an array of collaborations with artists from different genres, showcasing his ability to seamlessly adapt his sound and work with diverse talents.

  Legacy:
  Ed Sheeran's impact on the music industry is undeniable. His soul-stirring lyrics, captivating melodies, and genuine authenticity have earned him a special place in the hearts of fans worldwide. He has consistently sold out stadiums, headlined major music festivals, and inspired countless aspiring musicians.

  Conclusion:
  Ed Sheeran's remarkable journey from a young musician with a guitar to an international superstar serves as an inspiration to artists worldwide. His passion for music, dedication to his craft, and genuine connection with his audience are the hallmarks of a true artist. As Ed Sheeran continues to evolve and experiment with his sound, one thing remains certain: his music will continue to resonate and leave a lasting impact on generations to come. The red-headed singer-songwriter has undoubtedly etched his name in music history, and his star continues to shine brightly in the vast musical constellation.`,
  image: "./images/edsheeran.jpg" // Replace with the URL of an image of Ed Sheeran
};

const musicArticle2 = {
  title: "Arctic Monkeys: Pioneers of Indie Rock and Trailblazers of Musical Brilliance",
  content: `In the ever-changing landscape of the music industry, few bands have left as profound an impact as the Arctic Monkeys. Hailing from Sheffield, England, this remarkable quartet burst onto the scene in the mid-2000s, captivating audiences with their raw energy, poetic lyrics, and a distinct blend of indie and rock sensibilities. Their meteoric rise to fame is a testament to their extraordinary talent, innovative spirit, and unwavering dedication to their craft.

  A Humble Beginning:
  
  Formed in 2002, the Arctic Monkeys started as a group of friends with a shared passion for music. Their early days were marked by small gigs in local pubs and clubs, where they honed their skills and refined their sound. The band's frontman, Alex Turner, proved to be a gifted lyricist from the start, penning songs that resonated deeply with audiences and showcased a keen understanding of the human experience.
  
  The MySpace Sensation:
  
  The turning point for the Arctic Monkeys came with the advent of social media, particularly MySpace. Harnessing the power of the internet, the band self-released demos and live recordings, generating an unprecedented online following. The buzz around their music quickly spread like wildfire, and the Arctic Monkeys became a sensation before the world even knew it. Their unique blend of indie rock and Turner's evocative lyrics struck a chord with listeners, solidifying their place as the vanguard of a new wave of British indie music.
  
  "Whatever People Say I Am, That's What I'm Not":
  
  In 2006, the Arctic Monkeys released their debut album, "Whatever People Say I Am, That's What I'm Not." The album made history as the fastest-selling debut in the UK at the time, catapulting the band to international stardom. Songs like "I Bet You Look Good on the Dancefloor" and "When the Sun Goes Down" became anthems of a generation, embodying the spirit of youthful rebellion and the raw essence of indie rock.
  
  Innovators and Evolution:
  
  The Arctic Monkeys' subsequent albums showcased their evolution as musicians and songwriters. From "Favourite Worst Nightmare" to "AM," the band continuously pushed the boundaries of their sound while staying true to their indie roots. Their ability to experiment with different styles while maintaining their unique identity set them apart from their peers. The album "AM" saw the band embracing elements of R&B and hip-hop, resulting in a mesmerizing and mature sonic experience.
  
  Captivating Live Performances:
  
  Known for their electrifying live performances, the Arctic Monkeys' stage presence has been nothing short of mesmerizing. Whether performing in intimate venues or headlining major festivals, the band's energy and connection with their audience have been unparalleled. Alex Turner's charismatic and enigmatic persona, combined with the band's tight musicianship, creates an unforgettable experience for concert-goers.
  
  Transcending Genres and Borders:
  
  Beyond their musical prowess, the Arctic Monkeys' impact extends beyond the boundaries of indie rock. Their influence has seeped into mainstream culture, reaching listeners from all corners of the globe. Their success has transcended genres and generations, making them a household name worldwide. Their music has become a soundtrack to the lives of countless fans, and their artistic integrity continues to inspire musicians across genres.
  
  Legacy and Lasting Impact:
  
  The Arctic Monkeys' legacy as indie rock pioneers is firmly cemented in the annals of music history. Their honest storytelling, fueled by Alex Turner's evocative lyrics, continues to resonate with fans young and old. Their work has inspired a new wave of musicians, ensuring that their influence will endure for generations to come. Their commitment to artistic evolution and dedication to pushing the boundaries of music stand as a testament to their enduring relevance and impact on the music world.
  
  Conclusion:
  
  The Arctic Monkeys' journey from a group of friends making music in Sheffield to becoming one of the most influential indie rock bands of their time is nothing short of extraordinary. Their musical brilliance, combined with their authenticity and innovation, has left an indelible mark on the hearts of music enthusiasts worldwide. As they continue to evolve and create, the Arctic Monkeys' status as trailblazers of the indie rock genre remains unshakable, and their artistry continues to shine brightly, guiding the way for future generations of musicians and fans alike.`,
  image: "./images/artic.jpg" // Replace with the URL of an image of Ed Sheeran
};



const musicArticle3 = {
    title: "In Search of Classic Blues: Is Modern Music Living Up to Its Legendary Past?",
    content: `As an ardent classic blues fan, I can't help but wonder if I am alone in my sentiment that modern music simply doesn't hold a candle to the legendary sounds of yesteryears. The soul-stirring rhythms, heartfelt lyrics, and raw emotion of classic blues have left an indelible mark on my musical soul. But are today's tunes living up to that timeless magic? Let's explore this intriguing question. ... [The rest of the article content] ... After all, music's magic knows no bounds, and we might just stumble upon a contemporary masterpiece that leaves us breathless and in awe, just like the classic blues legends of old.`,
    image: "https://example.com/image3.jpg" // Replace with the URL of the image for this article
};

const hipHopArticles = [
    {
      title: "The Evolution of Hip-Hop: From the Streets to Mainstream Dominance",
      content: "Hip-hop, once an underground movement born in the streets of the Bronx, has undergone a remarkable transformation over the decades...",
      image: "https://example.com/hiphop-image1.jpg" // Replace with the URL of the image for this article
    },
    {
      title: "Sampling: The Art of Repurposing Music in Hip-Hop",
      content: "A hallmark of hip-hop's creative process is sampling – the art of taking snippets from existing songs and incorporating them into new beats...",
      image: "https://example.com/hiphop-image2.jpg" // Replace with the URL of the image for this article
    },
    {
      title: "Hip-Hop's Social Impact: From Activism to Cultural Diplomacy",
      content: "Hip-hop has long been a platform for artists to express their social and political views, championing causes and addressing pressing issues in society...",
      image: "https://example.com/hiphop-image3.jpg" // Replace with the URL of the image for this article
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
