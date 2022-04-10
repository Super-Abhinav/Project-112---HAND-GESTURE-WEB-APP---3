Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/29k5ztmzs/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model is Loaded !!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Index Pointing Up") {
            document.getElementById("result_emoji").innerHTML = "&#9757;";
            document.getElementById("quote").innerHTML = "I want to ask a question";
        }
        if (results[0].label == "Victory") {
            document.getElementById("result_emoji").innerHTML = "&#9996;";
            document.getElementById("quote").innerHTML = "That was a marvelous victory";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "This is looking amazing";
        }
        if (results[0].label == "Rock") {
            document.getElementById("result_emoji").innerHTML = "&#129304;";
            document.getElementById("quote").innerHTML = "Oh! You Are On A Party, Enjoy It!";
        }
        if (results[0].label == "Vulcan Hand") {
            document.getElementById("result_emoji").innerHTML = "&#128406;";
            document.getElementById("quote").innerHTML = "Live long and prosper, friends";
        }
        if (results[0].label == "Thumbs Down") {
            document.getElementById("result_emoji").innerHTML = "&#128078;";
            document.getElementById("quote").innerHTML = "I didn't liked it!";
        }
        if (results[0].label == "Raised Fist") {
            document.getElementById("result_emoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "Unity without verity is no better than conspiracy";
        }
    }
}

