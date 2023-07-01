prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350, height:300, image_format:'png',png_quality:100
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="cap_img" src="'+ data_uri + '"/>';
    });
}

console.log('Ml5 version ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Hdiog1eAl/model.json', modelLoaded);

function modelLoaded(){
console.log('MODEL HAS LOADED!!');
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1 = "The first prediction is: " + prediction_1;
    speak_data_2 = "The second prediction is: " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);


}

function check(){
    img = document.getElementById('cap_img');
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    document.getElementById("result_emo_name").innerHTML = results[0].label;
    document.getElementById("result_emo_name2").innerHTML = results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();

if(results[0].label == "Happy"){
    document.getElementById("update_emoji").innerHTML = "&#128522;";
}

if(results[0].label == "sad"){
    document.getElementById("update_emoji").innerHTML = "&#128532;";
}

if(results[0].label == "shocked"){
    document.getElementById("update_emoji").innerHTML = "&#129325;";
}

if(results[1].label == "Happy"){
    document.getElementById("update_emoji2").innerHTML = "&#128522;";
}

if(results[1].label == "sad"){
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
}

if(results[1].label == "shocked"){
    document.getElementById("update_emoji2").innerHTML = "&#129325;";
}



    }
}
