/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
 function playSong(songId) {
    const selectedS = document.getElementById(songId);
    const classes = []
    classes.push(["selected"])
    const songs = document.getElementsByClassName("song");
    for (let song of songs) {
        song.classList.remove(classes)
    }
    selectedS.classList.add(classes);
}


/**
 * Creates a song DOM element based on a song object.
 */
/** 
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
*/


function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const artistEl = createElement("span", [artist]);
    const albumEl= createElement("span",[album]);
    const titleEl=createElement("span",[title]);
    const idEl=createElement("span",[id])
    
    const durationEl = createElement("span", ["" + durationConvert(duration)] ,["duration", "short-duration"], {onclick: `console.log('${duration}')`});
  
    const coverImageArtUrl = coverArt;
    const imgEl = createElement("img", [] ,["album-art"], {src: coverImageArtUrl});
  
    return createElement("div", ["id: ", idEl, " title: ",titleEl, " album: ", albumEl, " Artist: ", artistEl, " Duration: ", durationEl, imgEl]);
  }


/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}

    // children
    const idEl = createElement("span", ["" + id] ,["id"]);
    const nameEl = createElement("span", ["" + name] );
    const songsEl = createElement("span", ["" + songs] ,["songs"]);
    const durationEl = createElement("span", ["" + durationConvert(playlistDuration(id))] ,["duration", "short-duration"]);

    // push childrens and classes
    children.push("Id: ",idEl, " name: ", nameEl, " The playlist songs: ",songsEl," Duration: ", durationEl);
    classes.push("playlist")

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

/** 
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
*/

function createElement(tagName, children = [], classes = [], attributes = {}) {
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
    
    
    sortTheSongs();
    sortThePlaylists();
    PrintAllSongs();
    PrintAllPlaylists();