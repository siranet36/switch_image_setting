var value;
var isFirst = true;

function changeStatus() {
  chrome.contentSettings['images'].get(
    {
      'primaryUrl': 'http://*'
    },
    function(details) {
      value = details.setting;
      if (isFirst) {
        if (value == "allow") {
          chrome.browserAction.setIcon({path:"icon_allow.png"});
        } else {
          chrome.browserAction.setIcon({path:"icon_block.png"});
        }
        isFirst = false;
      } else {
        if (value == "allow") {
          setStatus("block");
          chrome.browserAction.setIcon({path:"icon_block.png"});
        } else {
          setStatus("allow");
          chrome.browserAction.setIcon({path:"icon_allow.png"});
        }
      }
    }
  );
}

function setStatus(setting) {
  chrome.contentSettings['images'].set(
    {
      'primaryPattern': '<all_urls>',
      'setting': setting
    }
  );
}

function updateIcon() {
  changeStatus();
}

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();
