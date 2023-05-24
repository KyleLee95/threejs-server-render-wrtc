## Quickstart

1. Clone Repo
2. cd && npm i
3. From the root directory (from two different terminal instances):

- 3.1 npm run dev (start vite client)
- 3.2 node src/server/index.js (start server)

## Motivation

Is it possible to render a 3D scene serverside and stream it to a client? With the advent of services such as Xbox Gamepass + GPU compute as a service, it's being proven that remote rendering of 3D services for real-time usage might be in our future.

This repo attempts to show one implementation of this concept. While this repo uses node.js and a faked "canvas" element to draw a WebGL scene that is streamed over WebRTC, it is not unreasonable to try to adapt the concepts put into practice to stream something else.

Potential applications include:

- Game Streaming
- CAD Streaming
- BIM Streaming

## Technologies used:

1. [Three.js](https://github.com/mrdoob/three.js/)
2. [Node WebRTC](https://github.com/node-webrtc/node-webrtc)
3. [Node Canvas](https://github.com/Automattic/node-canvas)
4. [Headless GL](https://github.com/stackgl/headless-gl)
5. [Geckos.io](https://github.com/geckosio/geckos.io)

## Known Issues

You may need to use node <= 16.15.1 for compatibility of node-pre-gyp. See the issues for [node-webrtc](https://github.com/node-webrtc/node-webrtc/issues)

## Sources/References used:

1. [Node WebRTC Examples](https://github.com/node-webrtc/node-webrtc-examples) -- specifically the [video compositing example](https://github.com/node-webrtc/node-webrtc-examples/tree/master/examples/video-compositing)
2. [sbcode](https://sbcode.net/threejs/ssr-branch/)
3. [Headless THREE by crabmusket](https://gist.github.com/crabmusket/b164c9b9d3c43db9bddbfb83afde0319)
