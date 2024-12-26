const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  const message = msg.toString().trim();
  console.log(`Received: ${message} from ${rinfo.address}:${rinfo.port}`);

  // Process commands
  let response;
  if (message === "TURN_ON") {
    console.log("Turning on device");
    response = "ACK: Device ON";
  } else if (message === "TURN_OFF") {
    console.log("Turning off device");
    response = "ACK: Device OFF";
  } else {
    response = "ACK: Unknown command";
  }

  // Send response
  server.send(response, rinfo.port, rinfo.address, (err) => {
    if (err) console.error(err);
  });
});

server.bind(12345, () => {
  console.log("UDP server is listening on port 12345");
});
