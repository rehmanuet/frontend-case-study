const selectors = {
  playButton: ".ytp-play-button",
  nextButton: ".ytp-next-button",
  muteButton: ".ytp-mute-button",
  volumeSlider: '[class*="ytp-volume-slider-active"]',
  volume:'[class="ytp-volume-panel ytp-volume-control-hover"]',
  timeDisplay: ".ytp-time-display",
  currentTime: ".ytp-time-current",
  totalTime: ".ytp-time-duration",
  toogleButton: ".ytp-autonav-toggle-button",
  settingButton: ".ytp-settings-button",
  miniPlayerButton: ".ytp-miniplayer-button",
  resizeButton: ".ytp-size-button",
  fullScreenButton: ".ytp-fullscreen-button",
  progressBar: ".ytp-progress-bar-padding",
  annotationLabel:
    '[class*="settings-menu"] [role="menuitemcheckbox"] [class*="menuitem-label"]',
  annotationToggle: "[class*='settings-menu'] [class*='toggle-checkbox']",
  playBackSpeedLabel:
    '[aria-haspopup="true"][class*="menuitem"]:nth-of-type(2) [class*="menuitem-label"]',
  playBackSpeedOption:
    '[aria-haspopup="true"][class*="menuitem"]:nth-of-type(2) [class*="menuitem-content"]',
  qualityLabel:
    '[aria-haspopup="true"][class*="menuitem"]:nth-of-type(3) [class*="menuitem-label"]',
  qualityOption:
    '[aria-haspopup="true"][class*="menuitem"]:nth-of-type(3) [class*="menuitem-content"]',
  videoPlayer: '[class="video-stream html5-main-video"]',
  video: '[id="video-title"] yt-formatted-string',
};

module.exports = { selectors };
