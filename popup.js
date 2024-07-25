document.getElementById('getInfo').addEventListener('click', () => {
  chrome.runtime.sendMessage('getSystemInfo', response => {
    document.getElementById('info').textContent = JSON.stringify(response, null, 2);
  });
});


// document.getElementById('getInfo').addEventListener('click', () => {
//   const iframe = document.getElementById('systemInfoFrame');
//   iframe.src = 'chrome://system';
//   iframe.onload = function() {
//     try {
//       const doc = iframe.contentDocument || iframe.contentWindow.document;
//       const version = doc.querySelector('#version-section .version-number').innerText;
//       document.getElementById('info').textContent = `Chrome OS Version: ${version}`;
//     } catch (e) {
//       document.getElementById('info').textContent = 'Failed to fetch Chrome OS version due to security restrictions.';
//     }
//   };
// });

