songnice = "";
songgood = "";
leftwrist_x = 0;
leftwrist_y = 0;
rightwrist_x = 0;
rightwrist_y = 0;
scoreleftwrist = 0; 
scorerightwrist = 0;
songnicestatus = "";
songgoodstatus = "";

function preload(){
    songnice = loadSound("music.mp3");
    songgood = loadSound("music3.mp3");
}

function setup(){
   canvas = createCanvas(500, 400);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
   posenet = ml5.poseNet(video, modelLoaded);
   posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Model Is Loaded!")
}

function gotPoses(results){
    if(results.length > 0){
       console.log(results);
       leftwrist_x = results[0].pose.leftWrist.x;
       leftwrist_y = results[0].pose.leftWrist.y;
       console.log("leftwristX = " + leftwrist_x +" leftwristY = " + leftwrist_y);
       rightwrist_x = results[0].pose.rightWrist.x;
       rightwrist_y = results[0].pose.rightWrist.y;
       console.log("rightwristX = " + rightwrist_x +" rigthwristY = " + rightwrist_y);
       scoreleftwrist = results[0].pose.keypoints[9].score;
       console.log("scoreleftwrist = " + scoreleftwrist);
       scorerightwrist = results[0].pose.keypoints[10].score;
       console.log("scorerightwrist = " + scorerightwrist);
    }
}

function draw(){
    console.log("draw")
    image(video, 0, 0, 500, 400);
    fill("pink");
    stroke("purple");
    if(scoreleftwrist > 0.2)
    {
    console.log("scoreleftwrist greater")
    circle(leftwrist_x, leftwrist_y, 20);
    storage_numba = Number(leftwrist_y);
    remove_decimal = floor(storage_numba);
    number_chutku = remove_decimal/400;
    console.log("number_chutku = " + number_chutku);
    songnice.play(); 
    songnice.setVolume(number_chutku);
    songgood.stop();
    songnicestatus = songnice.isPlaying();
    console.log("songnicestatus = " + songnicestatus);
    }
    if(scorerightwrist > 0.2)
    {
    console.log("scorerightwrist greater")
    circle(rightwrist_x, rightwrist_y, 20);
    storage_numba = Number(rightwrist_y);
    remove_decimal = floor(storage_numba);
    number_chutku = remove_decimal/500;
    console.log("number_chutku = " + number_chutku);
    songgood.play(); 
    songgood.setVolume(number_chutku);
    songnice.stop();
    songgoodstatus = songgood.isPlaying();
    console.log("songgoodstatus = " + songgoodstatus);
    }
}
