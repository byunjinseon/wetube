const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");   
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volume = document.getElementById("jsVolume");

const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
        method:"POST"
    });
};

let moveTimer;

function handleDrag(e) {
    const { 
        target: {value}
    } = e;
    videoPlayer.volume = value;
    if(value >= 0.6) {
        volumeBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
    } else if(value >= 0.2) {
        volumeBtn.innerHTML = "<i class='fas fa-volume-down'></i>";
    } else {
        volumeBtn.innerHTML = "<i class='fas fa-volume-off'></i>";
    }
}

function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
    const totalTimeString = formatDate(videoPlayer.duration);
    console.log(totalTimeString);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if(hours < 10) {
        hours = `0${hours}`;
    } 
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(seconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}

function handleMouseEnter(e) {
    clearTimeout(moveTimer);
    this.nextSibling.style.opacity = "1";
    moveTimer = setTimeout(() => {
        this.nextSibling.style.opacity = "0";
    }, 3000);
}

function exitFullScreen(e) {
    videoPlayer.classList.remove('fullVideo');
    fullScreenBtn.innerHTML = "<i class='fas fa-expand'></i>";
    fullScreenBtn.removeEventListener('click', exitFullScreen);
    fullScreenBtn.addEventListener('click', goFullScreen);   
    if(document.exitFullScreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullscreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function goFullScreen() {
    fullScreenBtn.innerHTML = "<i class='fas fa-compress'></i>";
    videoPlayer.classList.add('fullVideo');
    fullScreenBtn.removeEventListener('click', goFullScreen);   
    fullScreenBtn.addEventListener('click', exitFullScreen);
    videoContainer.webkitRequestFullscreen();   
    if(document.exitFullScreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullscreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function handleVolumeClick() {
    if(videoPlayer.muted) {
        volumeBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
        videoPlayer.muted = false;
        volume.value = videoPlayer.volume;
    } else {
        volume.value = 0;
        volumeBtn.innerHTML = "<i class='fas fa-volume-mute'></i>";
        videoPlayer.muted = true;
    }
}

function handlePlayClick(e) {
    if(videoPlayer.paused) {
        playBtn.innerHTML = "<i class='fas fa-play'></i>"
        videoPlayer.play();
    } else if(!videoPlayer.paused) {
        playBtn.innerHTML = "<i class='fas fa-pause'></i>"
        videoPlayer.pause();
    }
}

function handelEnded() {
    registerView();
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = "<i class='fas fa-play'></i>"
}

function init() {
    videoPlayer.volume = 0.5;
    playBtn.addEventListener('click', handlePlayClick);
    videoPlayer.addEventListener('click', handlePlayClick);
    videoPlayer.addEventListener('mousemove', handleMouseEnter);
    volumeBtn.addEventListener('click', handleVolumeClick);
    fullScreenBtn.addEventListener('click', goFullScreen);
    videoPlayer.addEventListener('loadedmetadata', setTotalTime);
    videoPlayer.addEventListener('ended', handelEnded);
    volume.addEventListener('input', handleDrag);
}

if(videoContainer) {
    init();
}