document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementsByClassName("video")[0] as HTMLVideoElement;
  const myButton = document.getElementsByClassName("playButton")[0] as HTMLButtonElement;
  let isPlaying = false;

  myButton.addEventListener("click", () => {
    if (isPlaying) {
      video.pause();
      myButton.style.opacity = "1";
      isPlaying = false;
    } else {
      video.play();
      myButton.style.opacity = "0";
      isPlaying = true;
    }
  });

  video.addEventListener("click", () => {
    if (isPlaying) {
      video.pause();
      myButton.style.opacity = "1";
      isPlaying = false;
    }
    // } else {
    //   video.play();
    //   myButton.style.opacity = "0";
    //   isPlaying = true;
    // }
  });
});
