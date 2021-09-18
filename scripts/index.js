/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {
    alert("You are playing song number " + songId);
    const attention = document.getElementById(`song-${songId}`);
    attention.style.backgroundColor="green";
    setTimeout(() =>{
    attention.style.backgroundColor="lightgray";
    },1000)
}


function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [];
    const classes = [];
    
    const titleEL = createElement("div", ["Title: " + title] ,["title"]);
    const albumEL = createElement("div", ["Album: " + album] ,["album"]);
    const artistEl = createElement("div", ["Artist: " + artist], ["artist"]);
    const durationEl = createElement("div", ["" + durationConvert(duration)] ,["duration",durationColor(duration)]);
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});
    const removeEL = createElement("button", ["🗑️"], ["button"], {}, {});
    const addEL = createElement("button", ["▶️"], ["button"], {onclick:`playSong(${id})`}, {});

    children.push(imgEl, titleEL, albumEL, artistEl, durationEl, removeEL, addEL)
    classes.push(["song"]);

    const attrs = { id: `song-${id}` };
    const eventListeners = {};

    return createElement("div", children, classes, attrs, eventListeners);

}


/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}

    const idEl = createElement("span", ["" + id] ,["id"]);
    const nameEl = createElement("span", ["" + name] );
    const songsEl = createElement("span", ["" + songs] ,["songs"]);
    const durationEl = createElement("span", ["" + durationConvert(playlistDuration(id))] ,["duration", "short-duration"]);

    children.push("Id: ",idEl, " name: ", nameEl, " The playlist songs: ",songsEl," Duration: ", durationEl);
    classes.push("playlist")

    return createElement("div", children, classes, attrs, eventListeners)
}


    /**
     * Creates a new DOM element.
     *
     * Example usage:
     * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
     *
     * @param {String} tagName - the type of the element
     * @param {Array} children - the child elements for the new element.
     *                           Each child can be a DOM element, or a string (if you just want a text element).
     * @param {Array} classes - the class list of the new element
     * @param {Object} attributes - the attributes for the new element
     */


function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const el = document.createElement(tagName);
      
    // Children
    for(const child of children) {
      el.append(child);
    }
  
    // Classes
    for(const cls of classes) {
      el.classList.add(cls);
    }
  
    // Attributes
    for (const attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
    // Events
    for (act in eventListeners) {
        element.addEventListener(act, eventListeners[act]);
    }
  
    return el;
  }
    
    
    
function durationConvert(duration){
  let min = Math.floor(duration / 60);
  let sec = duration % 60;
  if (min < 10){
    min = "0" + String(min);
  }
  if (sec < 10) {
    sec = "0" + String(sec);
  }
  return min+':'+sec
}


function playlistDuration(id) {
    let sum=0;
    const playlistSongs=GetPlaylistById(id)["songs"]; 
    for(let i of playlistSongs) 
    {
        let songduration= GetsongById(i)["duration"]; 
        sum+=songduration;
    }
    
    return sum;
    }


function GetPlaylistById(id) {
      let playlistFinder= player.playlists.find(x=> x["id"]===id);
      return playlistFinder;
    }

    
function GetsongById(id) {
      let songFinder= player.songs.find(x=> x["id"]===id);
      return songFinder;
    }
    

function sortTheSongs () {
        player.songs.sort((a, b) => (a.title > b.title) * 2 - 1)
    }


function sortThePlaylists () {
        player.playlists.sort((a, b) => (a.name > b.name) * 2 - 1)
    }

    const songdiv= document.getElementById("songs");
    const playlistDiv= document.getElementById("playlists")
    
    function PrintAllSongs()
    {
        for(let song of player.songs)
        {
            const { id, title, album, artist, duration, coverArt}= song;
            const songElem = createSongElement({id, title, album, artist, duration, coverArt});
            songdiv.appendChild(songElem);
        }
    }
    function PrintAllPlaylists()
    {
        for(let playlist of player.playlists)
        {
            const { id, name, songs}= playlist;
            const playlistElem = createPlaylistElement({id, name, songs});
            playlistDiv.appendChild(playlistElem);
        }
    }

    function durationColor(duration){
        if (duration<120){
          return "short-duration";
        }
        if(duration>420 ){
            return "durationMore"
        }
        if (duration>=120&&duration<=420){
            return "durationBetween"
        }
      }

      /**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
 function handleSongClickEvent(event) {
    const songId = Number(event.target.parentElement.id.split("-")[1]);
    const target = event.target.innerText;
  
    if (onclick === "🗑️") {
        removeSong(songId);
    }
    if (target === "▶️") {
        playSong(songId);
    }  
  }

  function handleAddSongEvent(event) {

    const userInputs = inputs.children;
    const songInputs = 
    { title: userInputs[0].value,
      album: userInputs[1].value,
      artist: userInputs[2].value,
      duration: userInputs[3].value,
      coverArt: userInputs[4].value
    }
  
    songInputs.duration = songInputs.duration.split(":");
    songInputs.duration = parseInt(songInputs.duration[0] *60) + parseInt(songInputs.duration[1]);
  
  
    addSong(songInputs);
  }

  function addSong({ title, album, artist, duration, coverArt }){
    const id = maxID(player.songs) + 1;
    const newSong = { id, title, album, artist, duration, coverArt };
    player.songs.push(newSong);
    const songElm = createSongElement(newSong);
    document.getElementById("songs").insertBefore(songElm, null);
  }

  function maxID (arr)
{
  let max=0;
  for (let i = 0; i < arr.length; i++) 
  {
    if (arr[i].id > max) 
      max = arr[i].id;
  }
  return max;
}

function removeSong(songId) {
    document.getElementById(`song-${songId}`).remove();
    console.log(player.songs)
    let songIndex=player.songs.indexOf(getSongByID(songId))
    player.songs.splice(songIndex,1);
    for (let i=0; i<player.playlists.length; i++){
      for (let j=0; j<player.playlists[i].songs.length; j++){
        if (player.playlists[i].songs[j] === songId)
          player.playlists[i].songs.splice(j,1);
      }
    }
}
 


function getSongByID(id){
    for (let index = 0; index < player.songs.length; index++) {
      if(player.songs[index].id === id){
        return player.songs[index];
      }
  }
  throw new Error("This song are not exist")
  }

 document.getElementById("add-button").addEventListener("click", handleAddSongEvent)
    
    
    sortTheSongs();
    sortThePlaylists();
    PrintAllSongs();
    PrintAllPlaylists();