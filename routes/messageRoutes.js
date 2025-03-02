const express = require("express");
const { getMessages, createMessage, getMessageById, deleteMessage } = require("../Controller/messageController");

const router = express.Router();

router.get("/", getMessages);
router.post("/", createMessage);
router.get("/:id", getMessageById);
router.delete("/:id", deleteMessage);

module.exports = router;
