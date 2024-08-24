function speechToTextConversion() {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

    // Check if the browser supports SpeechRecognition
    if (!SpeechRecognition) {
        alert("Sorry, your browser doesn't support Speech Recognition.");
        return;
    }

    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');
    var statusMessage = document.getElementById('statusMessage');
    var isRecording = false;

    document.getElementById("playButton").addEventListener("click", function () {
        if (!isRecording) {
            this.src = "rec.jpeg";  // Change to a recording icon
            recognition.start();
            statusMessage.textContent = "Recording Started";
            isRecording = true;
        } else {
            this.src = "mic.jpeg";  // Change back to the mic icon
            recognition.stop();
            statusMessage.textContent = "Recording Stopped";
            isRecording = false;
        }
    });

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var convertedText = event.results[last][0].transcript;
        diagnostic.value += convertedText + " ";  // Append the text
        console.log('Confidence: ' + event.results[last][0].confidence);
    };

    recognition.onspeechend = function () {
        recognition.stop();
        statusMessage.textContent = "Recording Stopped";
        isRecording = false;
        document.getElementById("playButton").src = "mic.jpeg";  // Reset icon
    };

    recognition.onnomatch = function () {
        diagnostic.value = 'I didn\'t recognize that speech.';
    };

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
        statusMessage.textContent = "Error: " + event.error;
    };
}

window.onload = speechToTextConversion;
