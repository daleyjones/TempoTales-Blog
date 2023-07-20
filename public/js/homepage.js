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
            // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
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