var player;
var playerElement;
var descText = null
var linkText = null
var cameraId = 0;
var cameraIntervalId = null;
var cameraInterval = 30000;
var documentHeight = null;
var documentWidth = null;
var currentTimeZone = null;

function SetVideoSize() {
  // var currentCamera = cameras[cameraId];
  // var width = documentWidth;
  // var height = (currentCamera.height * documentWidth / currentCamera.width).toFixed();
  // if (height > documentHeight) {
  //     height = documentHeight;
  //     width = (currentCamera.width * documentHeight / currentCamera.height).toFixed();
  // }

  // console.log("view width:", width, " view height:", height);

  // var widthValue = width.toString();
  // var heightValue = height.toString();
  // if ((playerElement.width !== widthValue) || (playerElement.height !== heightValue)) {
  //   playerElement.width = widthValue;
  //   playerElement.height = heightValue;
  // }
}

function SwitchToCamera(cameraIdToSwitch) {
  var currentCamera = cameras[cameraIdToSwitch];

  const arguments = currentCamera.url.split('/')
  const videoId = arguments[arguments.length - 1]

  descText.innerText = "[" + currentCamera.category + "] " + currentCamera.Description
  linkText.setAttribute('href', `https://youtu.be/${videoId}`)
  linkText.innerText = `https://youtu.be/${videoId}`

  player.loadVideoById(videoId)
  player.playVideo()
}

function SwitchToNextCamera() {
  if (!cameraIntervalId) {
    StartCameraLoop()
  }
  cameraId++;
  if (cameraId >= cameras.length) {
      cameraId = 0;
  }
  SetVideoSize();
  SwitchToCamera(cameraId);
}

function SwitchToLastCamera() {
  if (cameraIntervalId) {
    StopCameraLoop()
  }
  cameraId--;
  if (cameraId < 0) {
    cameraId = cameras.length - 1;
  }
  SetVideoSize();
  SwitchToCamera(cameraId);
}

function ToggleCameraLoop() {
  if (cameraIntervalId) {
    StopCameraLoop()
  }
  else {
    StartCameraLoop()
  }
}

function StopCameraLoop() {
  if (cameraIntervalId) {
      clearInterval(cameraIntervalId);
      cameraIntervalId = null;
  }
}

function StartCameraLoop() {
  StopCameraLoop();
  cameraIntervalId = setInterval(SwitchToNextCamera, cameraInterval);
}

function ResetSize() {
  documentHeight = Math.max(
      document.documentElement["clientHeight"],
      document.body["scrollHeight"],
      document.documentElement["scrollHeight"],
      document.body["offsetHeight"],
      document.documentElement["offsetHeight"]
  );
  documentWidth = Math.max(
      document.documentElement["clientWidth"],
      document.body["scrollWidth"],
      document.documentElement["scrollWidth"],
      document.body["offsetWidth"],
      document.documentElement["offsetWidth"]
  );
  SetVideoSize();
  console.log("body width:", documentWidth, " body height:", documentHeight);
}

function Start() {
  SwitchToCamera(cameraId);
  StartCameraLoop();
}

window.onload = function () {
  currentTimeZone = Math.floor(new Date().getTimezoneOffset() / 60);
  console.log("Time Zone:", currentTimeZone);

  ResetSize();
  playerElement = document.getElementById('player')

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  descText = document.getElementById('descText')
  linkText = document.getElementById('videolink')
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'cmkAbDUEoyA',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  Start();
}

function onPlayerStateChange(event) {
  console.log("Player state change", event.data)
}