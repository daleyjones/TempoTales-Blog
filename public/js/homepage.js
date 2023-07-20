
document.addEventListener("DOMContentLoaded", function() {
    loadMusicUpdates();
});

function loadMusicUpdates() {
  
    const musicUpdates = [
        {
            title: "New Album Release",
            content: "Exciting news! Artist XYZ just released their latest album...",
            date_created: "2023-07-20"
        },
        {
            title: "Concert Announcement",
            content: "Get ready to rock! Band ABC announces a world tour...",
            date_created: "2023-07-19"
        }
    ];

    const musicUpdatesDiv = document.getElementById("music-updates");
    let updatesHTML = "";

    
    musicUpdates.forEach(update => {
        updatesHTML += `<article>
                            <h2>${update.title}</h2>
                            <p>${update.content}</p>
                            <p><em>Published on: ${update.date_created}</em></p>
                        </article>`;
    });

    musicUpdatesDiv.innerHTML = updatesHTML;
}
