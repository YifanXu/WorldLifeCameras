var settings = {
  autoplay: true,
  sound: false,
  dayOnly: false
}
var categorySetting = {}
var msgClearTimeouts = {}

var player;
var playerElement;
var descText = null
var linkText = null
var panelButton = null
var panel;

var cameraId = 0;
var cameraIntervalId = null;
var cameraInterval = 30000;
var documentWidth = null;
var currentTimeZone = null;
var settingsPanelOpen = false;

var settingsOnChange = {
  autoplay: (newState) => {
    if (newState) StartCameraLoop()
    else StopCameraLoop()
  },
  sound: (newState) => {
    if (newState) player.unMute()
    else player.mute()
  }
}

function SwitchToCamera(cameraIdToSwitch) {
  console.log(`switching camera to ${cameraIdToSwitch}`)
  var currentCamera = cameras[cameraIdToSwitch];

  const arguments = currentCamera.url.split('/')
  const videoId = arguments[arguments.length - 1]

  descText.innerText = "[" + currentCamera.category + "] " + currentCamera.Description
  linkText.setAttribute('href', `https://youtu.be/${videoId}`)
  linkText.innerText = `https://youtu.be/${videoId}`

  player.loadVideoById(videoId)
  player.playVideo()
}

// Return the id of the next valid camera. -1 if there are not any.
function findNextCamera (currentId, interval) {
  let i = currentId + interval
  while (true) {
    // Loop index
    if (i >= cameras.length) {
      i = 0;
    }
    else if (i < 0) {
      i = cameras.length - 1
    }

    // If i is back where it started, there are no valid cameras
    if (i === currentId) return -1

    if (checkCameraValidity(i)) {
      return i
    }

    i += interval
  }
}

function SwitchToNextCamera() {
  if (!cameraIntervalId) {
    StartCameraLoop()
  }
  const newId = findNextCamera(cameraId, 1)

  if (newId !== -1) {
    cameraId = newId;
    SwitchToCamera(cameraId);
  }
  else {
    console.log('no valid cameras to switch to!')
  }
}

function ManualSwitchToNextCamera() {
  // If the settingspanel is open, user probably just clicked to close it
  if (settingsPanelOpen) {
    toggleSettingsPanel()
    return
  }
  // Make sure the interval is reset
  StopCameraLoop()
  StartCameraLoop()
  SwitchToNextCamera()
}

function SwitchToLastCamera() {
  // If the settingspanel is open, user probably just clicked to close it
  if (settingsPanelOpen) {
    toggleSettingsPanel()
    return
  }
  
  if (cameraIntervalId) {
    StopCameraLoop()
  }
  const newId = findNextCamera(cameraId, -1)

  if (newId !== -1) {
    cameraId = newId;
    SwitchToCamera(cameraId);
  }
  else {
    console.log('no valid cameras to switch to!')
  }
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

  settings.autoplay = false
  syncSettingButton('autoplay')
}

function StartCameraLoop() {
  StopCameraLoop();
  cameraIntervalId = setInterval(SwitchToNextCamera, cameraInterval);

  settings.autoplay = true
  syncSettingButton('autoplay')
}

function checkCameraValidity (id) {
  var camera = cameras[id]

  // By category
  if (!categorySetting[camera.category]) {
    return false
  }

  // By time
  if (settings.dayOnly) {
    let local = new Date( (new Date()).getTime() + camera.timezone * 3600 * 1000)
    console.log(`localtime: ${local.toISOString()}`)
    let minHour = camera.start_hour ?? 5
    let maxHour = camera.start_hour ?? 19
    if (local.getUTCHours() < minHour || local.getHours >= maxHour) {
      return false
    }
  }

  return true
}

function toggleSettingsPanel () {
  settingsPanelOpen = !settingsPanelOpen
  if (settingsPanelOpen) {
    panelButton.innerText = '<'
    panel.className = 'open'
  }
  else {
    panelButton.innerText = '>'
    panel.className = 'close'
  }
}

function formsubmit(event) {

  event.preventDefault()

  StopCameraLoop()
  const newInterval = parseInt(document.getElementById('autoplaydelayinput').value)
  if (newInterval > 5) {
    cameraInterval = newInterval * 1000
    updateMsgTxt('autoplaydelaymessage', `Autoplay interval set to ${newInterval}s`)
  }
  else {
    updateMsgTxt('autoplaydelaymessage', `Interval must be at least 5 seconds`, true)
  }
  StartCameraLoop()

  return false
}

function updateMsgTxt (elemName, msg, isError = false) {
  const elem = document.getElementById(elemName)
  elem.innerText = msg
  elem.className = isError ? "msgred" : "msggreen"

  if (msgClearTimeouts[elemName]) {
    clearTimeout(msgClearTimeouts[elemName])
  }

  msgClearTimeouts[elemName] = setTimeout(() => {
    elem.innerText = ''
  }, 5000)
}

function changeAutoplayDelay (event) {
  console.log(event.target.value)
}

function updateSetting (event) {
  const name = event.target.classList[1];
  const value = event.target.classList[2]
  settings[name] = value === 'on'
  if (settingsOnChange[name]) {
    settingsOnChange[name](settings[name])
  }
  const element = document.getElementById(`${name}Slider`)
  if (element) element.className=`toggleSlider ${value}`
}

// Update the button state in ui to data for a specific setting. If setting is null, update all of them
function syncSettingButton (settingName = null) {
  if (settingName) {
    document.getElementById(`${settingName}Slider`).className = `toggleSlider ${settings[settingName] ? 'on' : 'off'}`
  }
  else {
    Object.keys(settings).forEach(s => syncSettingButton(s))
  }
}

function initCategorySetting () {
  // Dynamically generate list of categories
  for (const camera of cameras) {
    if (!categorySetting[camera.category]) {
      categorySetting[camera.category] = true
    }
  }

  // Copy preset element for each category, and insert them one after another
  const prefab = document.getElementById('environmentCategory')
  let lastElem = prefab

  for (const category of Object.keys(categorySetting)) {
    const clone = prefab.cloneNode(true)
    clone.id = `${category}|Category`
    clone.innerText = category
    lastElem.after(clone)
    lastElem = clone
  }
  
  // remove prefab, since it was never a real category
  prefab.remove()
}

function updateCategorySetting (event) {
  const target = event.target
  const category = target.id.split('|')[0]
  const newState = target.classList[1] === 'off'
  categorySetting[category] = newState
  target.className = `categoryButton ${newState ? 'on' : 'off'}`
}

function Start() {
  SwitchToCamera(cameraId);
  StartCameraLoop();
}

window.onload = function () {
  currentTimeZone = Math.floor(new Date().getTimezoneOffset() / 60);
  console.log("Time Zone:", currentTimeZone);

  playerElement = document.getElementById('player')

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  descText = document.getElementById('descText')
  linkText = document.getElementById('videolink')
  panelButton = document.getElementById('settingPanelToggle')
  panel = document.getElementById('settingPanel')

  document.getElementById('autoplaydelayinput').value = Math.floor(cameraInterval) / 1000
  initCategorySetting()
  syncSettingButton()
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    videoId: 'dQw4w9WgXcQ',
    playerVars: { 
      'controls': 0, 
      'playsinline': 1,
      'fs': 0,
      'disablekb': 1,
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(100)
  event.target.mute()
  Start()
}

function onPlayerError (event) {
  console.log (event)
}