// File Upload
document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("audioFile");
    if (!fileInput.files.length) {
        alert("Please select a file first!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    alert(data.message);
});

// Audio Recorder
let mediaRecorder;
let audioChunks = [];
let audioBlob = null;

document.getElementById("recordBtn").addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            audioChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        document.getElementById("audioPlayback").src = URL.createObjectURL(audioBlob);
        document.getElementById("uploadRecordingBtn").disabled = false;
    };

    mediaRecorder.start();
    audioChunks = [];
    document.getElementById("recordBtn").disabled = true;
    document.getElementById("stopBtn").disabled = false;
});

document.getElementById("stopBtn").addEventListener("click", () => {
    mediaRecorder.stop();
    document.getElementById("recordBtn").disabled = false;
    document.getElementById("stopBtn").disabled = true;
});

document.getElementById("uploadRecordingBtn").addEventListener("click", async () => {
    if (!audioBlob) {
        alert("No recording available!");
        return;
    }

    const formData = new FormData();
    formData.append("file", audioBlob, "recorded_audio.wav");

    const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    alert(data.message);
});
