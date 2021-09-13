/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {
    const selectedSong = document.getElementsByName(songId);
    const classes = []
    classes.push(["selected"])
    const songs = document.getElementsByClassName("song");
    for (let song of songs) {
        song.classList.remove(classes)
    }
    selectedSong.classList.add(classes);
}


/**
 * Creates a song DOM element based on a song object.
 */
 function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [];
    const classes = [];
    const ul = document.createElement("ul");
    for(let i=0; i<5; i++) {
        if(arguments[i] === arguments[4]) {
            arguments[i] = durationConvert(arguments[4]);
        }
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    const pic= document.createElement("img");
    pic.src= arguments[5];
    ul.appendChild(pic);
    children.push(ul);
    classes.push(["songs"]);
    const attrs = { onclick: `playSong(${id})`,id : "song" +id }
    return createElement("div", children, classes, attrs)
}


/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const ul= document.createElement("ul");
    for(let i=0; i<3; i++){
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    let li= document.createElement("li");
    li.innerHTML = durationConvert(playlistDuration(arguments[0]));  
    ul.appendChild(li);
    children.push(ul);
    classes.push(["playlists"])
    return createElement("div", children, classes, attrs)
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


    function createElement(tagName, children = [], classes = [], attributes = {}) {
        const element = document.createElement(tagName);
        if(children && typeof children !== "object") children = [children];
        element.append(...children);
        if (classes && typeof classes !== "object") classes = [classes];
        element.classList.add(...classes);
        for( let attr in attributes){
            element.setAttribute(attr,attributes[attr]);
        }
        return element;
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
    for(let i of playlistSongs) {
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

const playlistDivElement= document.getElementById("playlists")
const songDivElement= document.getElementById("songs");


function PrintTheSongs(){
        for(let song of player.songs){
            const { id, title, album, artist, duration, coverArt}= song;
            const songElement = createSongElement(id, title, album, artist, duration, coverArt);
            songDivElement.appendChild(songElement);
        }
    }


function PrintThePlaylists(){
        for(let playlist of player.playlists){
            const { id, name, songs}= playlist;
            const playlistElement = createPlaylistElement(id, name, songs);
            playlistDivElement.appendChild(playlistElement);
        }
    }
    
    
    sortTheSongs();
    sortThePlaylists();
    PrintTheSongs();
    PrintThePlaylists();
    