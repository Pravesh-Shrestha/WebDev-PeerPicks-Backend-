const express = require("express");
const router = express.Router();
const MessageController = require("../Controller/messageController");

router.get("/getAllMessages", MessageController.getMessages);
router.get("/getMessagesById/:id", MessageController.getMessageById);
router.post("/addMessage", MessageController.createMessage);
router.delete("/deleteMessage/:id", MessageController.deleteMessage);

module.exports = router;
