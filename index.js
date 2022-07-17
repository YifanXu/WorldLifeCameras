var videoFrame = null;
var descText = null
var cameraId = 0;
var cameraIntervalId = null;
var cameraInterval = 30000;
var documentHeight = null;
var documentWidth = null;

function SetVideoSize() {
  var currentCamera = cameras[cameraId];
  var width = documentWidth;
  var height = (currentCamera.height * documentWidth / currentCamera.width).toFixed();
  if (height > documentHeight) {
      height = documentHeight;
      width = (currentCamera.width * documentHeight / currentCamera.height).toFixed();
  }

  console.log("view width:", width, " view height:", height);

  var widthValue = width.toString();
  var heightValue = height.toString();
  if ((videoFrame.width !== widthValue) || (videoFrame.height !== heightValue)) {
      videoFrame.width = widthValue;
      videoFrame.height = heightValue;
  }
}

function SwitchToCamera(cameraIdToSwitch) {
  var currentCamera = cameras[cameraIdToSwitch];
  descText.innerText = "[" + currentCamera.category + "] " + currentCamera.Description
  videoFrame.src = currentCamera.url + "?autoplay=1&mute=1";
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
    stopCameraLoop()
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
    stopCameraLoop()
  }
  else {
    StartCameraLoop()
  }
}

function StartCameraLoop() {
  cameraIntervalId = setInterval(SwitchToNextCamera, cameraInterval);
}

function stopCameraLoop() {
  if (cameraIntervalId) {
      clearInterval(cameraIntervalId);
      cameraIntervalId = null;
  }
}

function ResetSize() {
  var body = document.body;
  var html = document.documentElement;

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

window.onload = function () {
  videoFrame = document.getElementsByTagName("iframe")[0];
  descText = document.getElementById('descText')
  console.log(descText)
  ResetSize();
  SwitchToCamera(cameraId);
  StartCameraLoop();
}