let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let shouldlX = 0;
let shouldlY = 0;
let shouldrX = 0;
let shouldrY = 0;

// nose=0 lefteye=1 righteye=2 leftear=3 rightear=4 leftshould=5
// rightshould=6

function setup() {
  createCanvas(800, 640);
  video = createCapture(VIDEO);
  video.hide();
  console.log(ml5);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
  // console.log(poses);
  if (poses.length > 0) {
  	let newX = poses[0].pose.keypoints[0].position.x;
  	let newY = poses[0].pose.keypoints[0].position.y;
    let elX = poses[0].pose.keypoints[1].position.x;
  	let elY = poses[0].pose.keypoints[1].position.y;
    let erX = poses[0].pose.keypoints[2].position.x;
  	let erY = poses[0].pose.keypoints[2].position.y;
    let shlX = poses[0].pose.keypoints[5].position.x;
  	let shlY = poses[0].pose.keypoints[5].position.y;
    let shrX = poses[0].pose.keypoints[6].position.x;
  	let shrY = poses[0].pose.keypoints[6].position.y;
  	noseX = lerp(noseX, newX, 0.5);
  	noseY = lerp(noseY, newY, 0.5);
    eyelX = lerp(eyelX, elX, 0.5);
  	eyelY = lerp(eyelY, elY, 0.5);
    eyerX = lerp(eyerX, erX, 0.5);
    eyerY = lerp(eyerY, erY, 0.5);
    shouldlX = lerp(shouldlX, shlX, 0.5);
    shouldlY = lerp(shouldlY, shrY, 0.5);
    shouldrX = lerp(shouldrX, shrX, 0.5);
    shouldrY = lerp(shouldrY, shrY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eyelX, eyelY);
  
  fill(255, 0, 0 );
  ellipse(noseX, noseY, 25);
  
  fill(0, 0, 255);
  ellipse(eyelX, eyelY, d);
  
  fill(0, 0, 255);
  ellipse(eyerX, eyerY, d);
  
  fill(100);
  arc(shouldlX, shouldlY - 40, 150, 125, PI+QUARTER_PI*4, PI);
  
  fill(100);
  arc(shouldrX, shouldrY - 40, 150, 125, PI+QUARTER_PI*4, PI);
  
  line(noseX, noseY, eyelX, eyelY);
  line(noseX, noseY, eyerX, eyerY);
  line(eyelX, eyelY, eyerX, eyerY);
  line(shouldlX, shouldlY, shouldrX, shouldrY);
  line(shouldlX, shouldlY, eyelX, eyelY);
  line(shouldrX, shouldrY, eyerX, eyerY);
  line(noseX, noseY, shouldlX, shouldlY);
  line(noseX, noseY, shouldrX, shouldrY);
  
  
  
  
}