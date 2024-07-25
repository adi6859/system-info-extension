chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'getSystemInfo') {
    getSystemInfo()
      .then(info => sendResponse(info))
      .catch(error => console.error('Error getting system info:', error));
    return true;  // Required for async sendResponse
  } else if (message === 'requestSystemInfo') {
    console.log('Ye mai aa gaya');
    const a = chrome.send('requestSystemInfo', ['requestSystemInfo_3']);
    console.log('kya ye chala', a);
    sendResponse(a);
    return true;
  }
});

async function getSystemInfo() {
  const cpuInfo = await new Promise(resolve => chrome.system.cpu.getInfo(resolve));
  const memoryInfo = await new Promise(resolve => chrome.system.memory.getInfo(resolve));
  const storageInfo = await new Promise(resolve => chrome.system.storage.getInfo(resolve));
  const osVersion = getChromeOSVersion();
  const manifest = getManifest();
  const platformInfo = await getPlatformInfo();

  // let deviceId;
  // try {
  //   deviceId = await new Promise((resolve, reject) => {
  //     if (chrome.enterprise ) {
  //       chrome.enterprise.deviceAttributes.getDirectoryDeviceId(resolve);
  //     } else {
  //       reject('chrome.enterprise.deviceAttributes is undefined');
  //     }
  //   });
  // } catch (error) {
  //   console.error('Failed to get device ID:', error);
  // }
  // const networkInterfaces = await new Promise(resolve => {
  //   chrome.system.network.getNetworkInterfaces(resolve);
  // });
  const userInfo = await new Promise((resolve, reject) => {
    chrome.identity.getProfileUserInfo((userInfo) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(userInfo);
      }
    });
  });
  return { cpuInfo, memoryInfo, storageInfo, osVersion, manifest, platformInfo ,userInfo};
}

function getChromeOSVersion() {
  const userAgent = navigator.userAgent;
  const match = userAgent.match(/CrOS\s([^\s]+)\s([\d.]+)/);
  if (match) {
    return match[2];
  } else {
    return 'Unknown';
  }
}

function getManifest() {
  return chrome.runtime.getManifest();
}

function getPlatformInfo() {
  return new Promise(resolve => chrome.runtime.getPlatformInfo(resolve));
}

// chrome.enterprise.deviceAttributes.getDirectoryDeviceId(deviceId => {
//   let publicDeviceId = document.getElementById('publicDeviceId');
//   publicDeviceId.innerText = deviceId;
// });