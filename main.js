img = "";
egg="";
object=[];
var song;
function preload(){
   
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(500,500);
    video.hide();
    song = loadSound("aa.mp3");
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function draw(){
    image(video,0,0,500,500);
 if(egg !=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i=0;i<object.length;i++)
    {
        document.getElementById("status").innerHTML-"Status : Object Detected";
 
        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        
    }
    if(object.length==0){
        document.getElementById("baby").innerHTML="No object detected.";
        song.play();
        song.rate(1.5);
        song.setVolume(0.5);
    }
    else{
        document.getElementById("baby").innerHTML="Object found."
        song.stop();
    }
 }
}
function modelLoaded(){
    egg=true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object=results;
    
}