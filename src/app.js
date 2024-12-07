const aedes = require("aedes")();
const net = require("net");

// Define the port for the MQTT broker
const PORT = 1883;

// Create a TCP server for the MQTT broker
const server = net.createServer(aedes.handle);

// Listen for incoming MQTT connections
server.listen(PORT, function () {
  console.log(`MQTT broker is running on port ${PORT}`);
});

// Handle client connections
aedes.on("client", (client) => {
  console.log(`Client connected: ${client.id}`);
});

// Handle client disconnections
aedes.on("clientDisconnect", (client) => {
  console.log(`Client disconnected: ${client.id}`);
});

// Handle subscriptions
aedes.on("subscribe", (subscriptions, client) => {
  console.log(
    `Client ${client.id} subscribed to:`,
    subscriptions.map((s) => s.topic).join(", ")
  );
});

// Handle publications
aedes.on("publish", (packet, client) => {
  if (client) {
    console.log(
      `Message from ${client.id} on topic ${packet.topic}:`,
      packet.payload.toString()
    );
  }
});
