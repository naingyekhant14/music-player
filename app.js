const playListContainerTag =
  document.getElementsByClassName("playListContainer")[0];
const currentTimeAndTotaltimeTag = document.getElementsByClassName(
  "currentTimeAndTotaltime"
)[0];
const audioTag = document.getElementsByClassName("song")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const nextButton = document.getElementById("next-btn");
const backwardButton = document.getElementById("backward-btn");
const tracks = [
  {
    trackId: "music/GFatt-အဝေးပြေးလမ်းမ(OfficialMV)_942.m4a",
    title: "GFatt-အဝေးပြေးလမ်းမ",
  },
  {
    trackId: "./music/GFatt+AmeraHpone-ရွက်လှေ(officiallyricsvideo)_749.m4a",
    title: "GFatt+AmeraHpone-ရွက်လှေ",
  },
  {
    trackId: "./music/ShweHtooInfinity2017_585.m4a",
    title: "ShweHtooInfinity",
  },
  {
    trackId: "music/GFatt-နာရတဲ့ကဗ်ာ🖤💔_425.m4a",
    title: "GFatt-နာရတဲ့ကဗ်ာ",
  },
  {
    trackId:
      "./music/SaiSaiKhamLeng-ရည်းစားစာ(LoveLetter)YeeZarSar[MusicVideo]_821.m4a",
    title: "SaiSaiKhamLeng- YeeZarSar",
  },

  {
    trackId:
      "./music/မိန်းကလေးတစ်ယောက်ကိုချစ်မိရင်MainKaLayTaYoutKoChitMiYin-SaiSaiKhamLengFeat.KaungMyat-2004_300.m4a",
    title: "MainKaLayTaYoutKoChitMiYin",
  },
];
let currentplayingIndex = 0;
for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.classList.add("track-item");
  const title = (i + 1).toString() + " . " + tracks[i].title;
  trackTag.textContent = title;
  playListContainerTag.append(trackTag);
  trackTag.addEventListener("click", () => {
    currentplayingIndex = i;
    playsong();
  });
}
let dur_ation = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
  dur_ation = Math.floor(audioTag.duration);
  durationText = createMinuteAndSecondText(dur_ation);
});
audioTag.addEventListener("timeupdate", () => {
  const current_Time = Math.floor(audioTag.currentTime);
  const currentTimeText = createMinuteAndSecondText(current_Time);
  const currentTimeTextandDurationText = currentTimeText + ":" + durationText;
  currentTimeAndTotaltimeTag.textContent = currentTimeTextandDurationText;
  updateCurrentProgress(current_Time);
});
const updateCurrentProgress = (current_Time) => {
  const currentProgresswitdh = (500 / dur_ation) * current_Time;
  currentProgressTag.style.width = currentProgresswitdh + "px";
};

const createMinuteAndSecondText = (totalSeconds) => {
  const minute = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minuteText = minute < 10 ? "0" + minute.toString() : minute;
  const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondsText;
};
let isplaying = false;

playButton.addEventListener("click", () => {
  isplaying = true;
  const current_Time = Math.floor(audioTag.currentTime);
  if (current_Time === 0) {
    const songIdtoPlay = tracks[currentplayingIndex].trackId;
    audioTag.src = songIdtoPlay;
    audioTag.play();
    updatePlayingAndPauseButton();
  } else {
    audioTag.play();
    updatePlayingAndPauseButton();
  }
});
pauseButton.addEventListener("click", () => {
  isplaying = false;
  audioTag.pause();
  updatePlayingAndPauseButton();
});
backwardButton.addEventListener("click", () => {
  if (currentplayingIndex === 0) {
    return;
  } else {
    currentplayingIndex -= 1;
    playsong();
  }
});
nextButton.addEventListener("click", () => {
  console.log("hello");
  if (currentplayingIndex === tracks.length - 1) {
    return;
  } else {
    currentplayingIndex += 1;
    playsong();
  }
});
const playsong = () => {
  const songIdtoPlay = tracks[currentplayingIndex].trackId;
  audioTag.src = songIdtoPlay;
  audioTag.play();
  isplaying = true;
  updatePlayingAndPauseButton();
};
const updatePlayingAndPauseButton = () => {
  if (isplaying) {
    playButton.style.display = "none";
    pauseButton.style.display = "inline";
  } else {
    playButton.style.display = "inline";
    pauseButton.style.display = "none";
  }
};
