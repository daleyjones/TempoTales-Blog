// Your existing JavaScript code

const token = 'BQCC2AzxJgQmSmFHa9sU7OP5TRU0PelqWeVVBu2tOcD4jYDZ3o-Jn22a8nOfrK9R0C2qS0wGmog5mPnpmYZjo807u4GgJIqWzaO_WpTVpDv3ewgWbQvZIVagC53NkqJFrX2Tb6Y7GMFZTbwX00VIksOSCNDX9p3ZXA9G2I4HxDRn8X_SZHAcbz-kIQtbOADS1H82ImjgXx9Rz8wdtI4HLPFMgjkYcf56n-hzDnjBLVroauikXmkrvfBkUyvUFGhBfIYd_A';

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

async function getTopTracks() {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi('v1/me/top/tracks?time_range=short_term&limit=5', 'GET')).items;
}

async function displayTopTracks() {
  const topTracks = await getTopTracks();
  const topTracksDiv = document.getElementById("top-tracks");
  let tracksHTML = "";

  topTracks.forEach(track => {
    tracksHTML += `<p>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</p>`;
  });

  topTracksDiv.innerHTML = tracksHTML;
}

document.addEventListener("DOMContentLoaded", function() {
  displayTopTracks();
});

// Function to fetch and display live API tracks
async function fetchLiveTracks() {
  try {
    const response = await fetch('https://api.example.com/live-tracks'); // Replace with your live API endpoint URL
    const liveTracks = await response.json();
    const liveTracksDiv = document.getElementById("live-tracks");
    let liveTracksHTML = "";

    liveTracks.forEach(track => {
      liveTracksHTML += `<article>
                            <h2>${track.title}</h2>
                            <p>${track.artist}</p>
                          </article>`;
    });

    liveTracksDiv.innerHTML = liveTracksHTML;
  } catch (error) {
    console.error(error);
  }
}

// Call the function to fetch and display live API tracks
fetchLiveTracks();

async function displayRecommendedTracks() {
    const recommendedTracks = await getRecommendations();
    const recommendedTracksDiv = document.getElementById("recommended-tracks");
    let recommendedTracksHTML = "";
  
    recommendedTracksHTML += `<h1>The Rhythm Titans: Unveiling the 10 Best Rock Drummers of All Time!</h1>
                              <p>Hey there, fellow music enthusiasts! If you're like me, a die-hard rock music lover, you'll understand just how vital the role of a drummer is in any rock band. The heartbeat of the band, the pulse of the music – the drummers elevate rock anthems to an entirely different level! As a self-proclaimed aficionado of beats and crashes, I can't help but admire the raw energy and technical finesse that these drummers bring to the table. And yes, being an ardent Metallica fan, I must confess that Lars Ulrich holds a god-like status in my rock pantheon. But today, I aim to honor not just Lars but also nine other drumming legends who have left an indelible mark on rock 'n' roll history. Without further ado, let's dive into my top ten rock drummers of all time:</p>
                              <ol>
                                <li>John Bonham (Led Zeppelin) - A drumming virtuoso who had an unparalleled ability to blend power and subtlety, Bonham's grooves still resonate in the hearts of rock aficionados worldwide. His performance on "Moby Dick" alone is enough to secure his place at the top of this list.</li>
                                <li>Neil Peart (Rush) - Often referred to as "The Professor," Neil Peart's unparalleled precision and storytelling through his drumming elevated Rush's music to a progressive rock masterpiece. His influence on countless drummers cannot be overstated.</li>
                                <li>Keith Moon (The Who) - The embodiment of chaotic energy behind the kit, Moon's drumming style was unorthodox, wild, and unpredictable. His manic drumming on tracks like "Won't Get Fooled Again" left an indelible mark on the rock landscape.</li>
                                <li>Ginger Baker (Cream) - The driving force behind Cream's bluesy rock sound, Baker's mastery of polyrhythms and his unique approach to jazz-inspired drumming made him an icon in the drumming world.</li>
                                <li>Stewart Copeland (The Police) - Fusing reggae, punk, and rock, Copeland's drumming was the backbone of The Police's distinctive sound. His use of syncopation and unconventional time signatures made him a true trailblazer.</li>
                                <li>Dave Grohl (Nirvana, Foo Fighters) - Starting as Nirvana's powerhouse drummer, Grohl transitioned into a rock frontman. His hard-hitting yet melodic drumming on Nirvana's tracks and his work with Foo Fighters showcase his versatile talent.</li>
                                <li>Ringo Starr (The Beatles) - Often overshadowed but never underestimated, Ringo's steady and solid drumming laid the foundation for some of The Beatles' greatest hits, making him a legend in his own right.</li>
                                <li>Ian Paice (Deep Purple) - The man behind the iconic drum intro of "Smoke on the Water," Paice's powerful and innovative drumming defined the classic rock era.</li>
                                <li>Phil Collins (Genesis) - Not only an extraordinary vocalist but also a gifted drummer, Collins' unique playing style and emotional delivery added an extra layer of depth to Genesis' progressive rock compositions.</li>
                                <li>Lars Ulrich (Metallica) - Finally, my hero and drumming god, Lars Ulrich! As the heartbeat of Metallica, Lars's fierce and relentless drumming style has inspired countless drummers worldwide. His work on tracks like "One" and "Master of Puppets" is unparalleled, driving Metallica's thrash metal anthems to legendary status.</li>
                              </ol>
                              <p>Of course, this list is entirely subjective, and I'm sure many of you might have your own favorites. The world of rock drumming is rich with talent, and each drummer brings something unique to the table. So, let's take a moment to celebrate all the drummers who have contributed to the rhythm and soul of rock 'n' roll, shaping the genre into what it is today. Let the beats keep rolling, and the rock keep thundering! Rock on! 🤘</p>`;
  
    recommendedTracksHTML += `<h1>Unraveling K-Pop: Why It's Unpopular to Predict It as the Music of the 2020s</h1>
                              <p>Greetings, fellow music enthusiasts! As a music critic, it is my duty to explore the ever-evolving world of music and identify trends that might shape the soundscape of the new decade. Among the many genres vying for dominance, one has caught my attention: K-Pop. While acknowledging the greatness of rock, metal, and grunge, I must admit that predicting K-Pop as the music of the 2020s is, undoubtedly, an unpopular opinion. Why, you ask? Well, let's delve into the vibrant world of K-Pop and examine the reasons behind this controversial claim.</p>
                              <p>First and foremost, let's understand what K-Pop is all about. K-Pop, short for Korean Pop, is a genre that originated in South Korea and has taken the global music scene by storm. It is characterized by its catchy melodies, visually striking music videos, synchronized dance routines, and multi-talented idol groups. Over the years, K-Pop has amassed a massive and dedicated fan base, making it a cultural phenomenon on an international scale.</p>
                              <p>However, the claim that K-Pop will become the music of the 2020s faces several challenges, and I must tread carefully as I explain my stance. While acknowledging its popularity and undeniable impact, K-Pop faces some key hurdles on its path to musical dominance.</p>
                              <ol>
                                <li>Language Barrier: K-Pop's primary language is Korean, and while this hasn't stopped its global spread, it does present a significant challenge for mainstream success in English-speaking markets. The language barrier might limit K-Pop's reach and accessibility compared to other English-based genres.</li>
                                <li>Cultural Differences: K-Pop is deeply rooted in Korean culture, and while its appeal is evident, its cultural elements might not resonate as strongly with all audiences worldwide. Genres like rock and metal, on the other hand, have universal themes of rebellion, angst, and love, making them more relatable to diverse audiences.</li>
                                <li>Genre Saturation: K-Pop's immense success has led to an influx of new groups and releases, potentially saturating the market. This saturation could lead to audience fatigue and a desire for fresh musical experiences from other genres.</li>
                                <li>Evolving Tastes: Musical preferences are constantly changing, and the tastes of audiences may not remain static throughout the decade. Other genres like electronic dance music, indie, or even a revival of older styles could emerge as the dominant sound.</li
                                <li>Cultural Exchange: The global music landscape is a melting pot of influences, with artists borrowing from various genres to create unique sounds. The 2020s might be characterized by a blending of styles rather than the rise of a singular genre.</li>
                                </ol>
                                <p>Drawing parallels between K-Pop and disco is intriguing. Both genres experienced immense popularity, captivating audiences around the world. However, like disco, K-Pop could face a similar trajectory where it eventually becomes niche rather than dominating the mainstream.</p>
                                <p>To clarify, my intention is not to dismiss the significance of K-Pop or its massive fan base. K-Pop's influence on the music industry and its impact on culture cannot be denied. It has already left an indelible mark on the music world. However, predicting it as the sole genre that will define the 2020s might be overlooking the complexities of the global music scene.</p>
                                <p>In conclusion, K-Pop is undoubtedly an exciting genre that deserves recognition, but it might face challenges in becoming the definitive sound of the 2020s. As music critics, let's embrace diversity and appreciate the various genres that will shape the decade, with each contributing its unique essence to the rich tapestry of modern music. Let the music play on! 🎶</p>`;
    
      recommendedTracksHTML += `<h1>In Search of Classic Blues: Is Modern Music Living Up to Its Legendary Past?</h1>
                                <p>As an ardent classic blues fan, I can't help but wonder if I am alone in my sentiment that modern music simply doesn't hold a candle to the legendary sounds of yesteryears. The soul-stirring rhythms, heartfelt lyrics, and raw emotion of classic blues have left an indelible mark on my musical soul. But are today's tunes living up to that timeless magic? Let's explore this intriguing question.</p>
                                <p>In the era of classic blues, artists like Muddy Waters, B.B. King, and Etta James embodied the very essence of music. Their performances spoke directly to the soul, and their songs transcended generations, carrying a profound weight of emotion and experience. Their music was raw, authentic, and deeply connected to the struggles and joys of everyday life.</p>
                                <p>Fast forward to the modern music landscape, and we find an entirely different scene. The advent of technology has undoubtedly revolutionized the way music is created, produced, and distributed. It has brought forth a plethora of new genres and sub-genres, catering to an ever-widening array of tastes. But has this expansion diluted the power of music?</p>
                                <p>One could argue that modern music has lost some of its authenticity and connection to the human experience. With the rise of digital production techniques, auto-tune, and commercialization, some contemporary songs feel mass-produced and lacking in genuine emotion. Gone are the days of intimate recording sessions in smoky blues clubs; instead, we find an industry that sometimes prioritizes profit over artistry.</p>
                                <p>That said, it would be unfair to overlook the gems present in modern music. Talented artists continue to emerge, bearing the torch of the classic blues spirit and infusing it with their unique perspectives. In many ways, music remains an art form that reflects the zeitgeist of society. Some modern musicians eloquently capture the challenges and triumphs of our time, much like the blues greats did in theirs.</p>
                                <p>However, the sheer volume of modern music and the ease of access due to streaming services and the internet might make it challenging for the truly exceptional pieces to rise above the noise. As classic blues fans, we tend to seek a certain depth and soul in music, which might lead us to dismiss a significant portion of contemporary offerings.</p>
                                <p>Ultimately, the appreciation of music is highly subjective and deeply personal. As classic blues enthusiasts, it is natural for us to compare the present to a golden era that resonated profoundly with our hearts. However, we must also acknowledge that music, like all art forms, is ever-evolving. The beauty lies in its ability to adapt, embrace change, and reach new heights.</p>
                                <p>So, are we the only ones feeling this way? Perhaps not. Classic blues fans around the world might share this sentiment. But let us remember that music, like life, is a journey of discovery and growth. Let us cherish the timeless classics while remaining open to new musical experiences that may one day capture our souls just as powerfully.</p>
                                <p>As the search for that modern blues gem continues, the love for classic blues will remain a constant beacon, guiding us back to the roots of where it all began. The past will forever hold its place in our hearts, but let's stay curious and keep our ears open to the sounds of the present and the possibilities of the future. After all, music's magic knows no bounds, and we might just stumble upon a contemporary masterpiece that leaves us breathless and in awe, just like the classic blues legends of old.</p>`;
    
      recommendedTracksDiv.innerHTML = recommendedTracksHTML;
    }
    
    document.addEventListener("DOMContentLoaded", function() {
      displayRecommendedTracks();
    });
    