function encryptAndDownload() {
  const videoFile = document.getElementById('videoInput').files[0];
  const secretText = document.getElementById('secretTextInput').value;

  const videoReader = new FileReader();
  videoReader.onload = function (event) {
    const videoData = event.target.result;
    const encryptedData = encryptData(videoData, secretText);
    const encryptedBlob = new Blob([encryptedData], { type: 'video/mp4' });
    const encryptedAnchor = document.createElement('a');
    encryptedAnchor.href = URL.createObjectURL(encryptedBlob);
    encryptedAnchor.download = 'encrypted_video.mp4';
    encryptedAnchor.click();
  };

  videoReader.readAsArrayBuffer(videoFile);
}

function decryptAndDisplay() {
  const encryptedVideoFile = document.getElementById('encryptedVideoInput').files[0];

  const videoReader = new FileReader();
  videoReader.onload = function (event) {
    const encryptedData = event.target.result;
    const decryptedData = decryptData(encryptedData);
    const decryptedText = new TextDecoder().decode(decryptedData);

    const secretTextDisplay = document.getElementById('secretTextDisplay');
    secretTextDisplay.textContent = 'Decrypted Message: ' + decryptedText;
  };

  videoReader.readAsArrayBuffer(encryptedVideoFile);
}


function encryptData(videoData, secretText) {
  const videoArray = new Uint8Array(videoData);
  const secretArray = new TextEncoder().encode(secretText);

  for (let i = 0; i < secretArray.length; i++) {
    videoArray[i] = secretArray[i];
  }

  return videoArray;
}

function decryptData(encryptedData) {
  const encryptedArray = new Uint8Array(encryptedData);
  const decryptedArray = new Uint8Array(encryptedArray.length);

  for (let i = 0; i < encryptedArray.length; i++) {
    decryptedArray[i] = encryptedArray[i];
  }

  return decryptedArray;
}
