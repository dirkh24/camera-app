const cameraView = document.querySelector("#camera--view")
const cameraOutput = document.querySelector("#camera--output")
const cameraSensor = document.querySelector("#camera--sensor")
const cameraTrigger = document.querySelector("#camera--trigger")
const cameraFlipper = document.querySelector("#camera--flipper")

let supports = navigator.mediaDevices.getSupportedConstraints();
if( supports['facingMode'] === true ) {
  cameraFlipper.disabled = false;
}

let shouldFaceUser = true; //Default is the front cam
var constraints = { video: { facingMode: shouldFaceUser ? 'user' : 'environment' }, audio: false };

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
            .then(function(stream) {
                track = stream.getTracks()[0];
                cameraView.srcObject = stream;
            })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

cameraFlipper.addEventListener('click', function(){
  // we need to flip, stop everything
  cameraView.pause()
  cameraView.srcObject = null
  // toggle \ flip
  shouldFaceUser = !shouldFaceUser;
  cameraStart();
})


window.addEventListener("load", cameraStart, false);
