import ml5 from 'ml5';

export default function (s) {
  s.state = {};
  s.dispatch = () => {};

  let video;
  let poseNet;
  let pose;
  let skeleton;
  let recorder;
  let videoRecorded;

  function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }

  function videoLoad() {
    videoRecorded.loop();
  }

  function toggleRecording() {
    if (recorder.state !== 'recording') {
      recorder.start();
    } else {
      // https://stackoverflow.com/a/34259326
      recorder.ondataavailable = (e) => {
        videoRecorded = createVideo(URL.createObjectURL(e.data), videoLoad);
      };

      recorder.stop();
      button.html('Record');
    }
  }

  function modelLoaded() {
    console.log('poseNet ready');
  }
  s.setup = () => {
    s.createCanvas(640, 480);
    video = s.createCapture(s.VIDEO, (stream) => {
      // create a recorder object with the camera stream
      recorder = new MediaRecorder(stream, {
        // mimeType: 'video/mp4'
      });
    });
    //video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  };

  s.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    if (props.record) {
      toggleRecording();
    }
  };

  s.draw = () => {
    s.image(video, 0, 0);

    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = s.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      s.fill(255, 0, 0);
      s.fill(0, 0, 255);
      s.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
      s.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        s.fill(0, 255, 0);
        s.ellipse(x, y, 16, 16);
      }

      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        s.strokeWeight(2);
        s.stroke(255);
        s.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
    }
  };
}
