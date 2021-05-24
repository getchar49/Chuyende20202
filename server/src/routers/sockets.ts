import { messageController, teamController } from "../controllers";

export default io => {
  io.on("connection", socket => {
    socket.on("message-send", async data => {
      const response = await messageController.createMessage(data);
      io.emit("message-receive", response);
    });
  });
};
