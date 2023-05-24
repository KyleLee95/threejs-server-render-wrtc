import React, { useEffect } from "react";

import geckos from "@geckos.io/client";
/*******************GECKOS SOCKETS************/

const channel = geckos({ port: 3000 }); // default port is 9208

channel.onConnect((error) => {
  if (error) {
    console.error(error.message);
    return;
  }
  channel.on("chat message", (data) => {
    console.log(`You got the message ${data}`);
  });

  channel.emit("chat message", "a short message sent to the server");
});

//***************************WEBRTC***********/
let remoteStream;
let remoteVideo;
let peerConnection;
let uuid;
let localVideo;
const peerConnectionConfig = {
  iceServers: [
    { urls: "stun:stun.stunprotocol.org:3478" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

function pageReady() {
  uuid = createUUID();

  localVideo = document.getElementById("localVideo");

  channel.on("message", gotMessageFromServer);
}

function start(isCaller) {
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  remoteStream = new MediaStream();
  peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.ontrack = gotRemoteStream;
  const mediaConstraints = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  };
  if (isCaller) {
    peerConnection
      .createOffer(mediaConstraints)
      .then(createdDescription)
      .catch(errorHandler);
  }
}

function gotMessageFromServer(message) {
  if (!peerConnection) start(false);

  const signal = message;

  // Ignore messages from ourself
  if (signal.uuid == uuid) return;

  if (signal.sdp) {
    peerConnection
      .setRemoteDescription(new RTCSessionDescription(signal.sdp))
      .then(function () {
        // Only create answers in response to offers
        if (signal.sdp.type == "offer") {
          peerConnection
            .createAnswer()
            .then(createdDescription)
            .catch(errorHandler);
        }
      })
      .catch(errorHandler);
  } else if (signal.ice) {
    console.log("signal.ice", signal.ice);
    peerConnection
      .addIceCandidate(new RTCIceCandidate(signal.ice))
      .catch(errorHandler);
  }
}

function gotIceCandidate(event) {
  if (event.candidate != null) {
    channel.emit("message", { ice: event.candidate, uuid: uuid });
  }
}

function createdDescription(description) {
  console.log("description");
  peerConnection
    .setLocalDescription(description)
    .then(function () {
      console.log("emitting");
      channel.emit("message", {
        sdp: peerConnection.localDescription,
        uuid: uuid,
      });
    })
    .catch(errorHandler);
}

function gotRemoteStream(event) {
  console.log("remote stream", event);
  remoteVideo = document.getElementById("remoteVideo");
  remoteVideo.srcObject = event.streams[0];
}

function errorHandler(error) {
  console.log(error);
}

// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
export const Home = () => {
  useEffect(() => {
    pageReady();
  }, []);
  return (
    <div>
      <h1>Press start to start stream</h1>

      <button onClick={() => start(true)}> Start </button>
      <video id="localVideo" />

      <video
        id="remoteVideo"
        autoPlay
        muted
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};
