const namespace = typeof (browser) !== 'undefined' ? browser : chrome;

const getDisplayMediaStream = () => {
    const constraints = {
        video: true,
        audio: true, //unsupported on FF,
        width: 320,
        height: 240
    };

    const mediaRecorderOptions = { mimeType: "video/webm; codecs=vp9" };

    navigator.mediaDevices.getDisplayMedia(constraints)
        .then(stream => {
            console.log('Got display stream:', stream);
            let videoStream = document.querySelector('#videoStream');
            videoStream.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
        });
};

getDisplayMediaStream();