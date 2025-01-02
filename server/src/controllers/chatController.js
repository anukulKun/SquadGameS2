import Chat  from "../models/chatModel.js";

export async function getMainChat(req, res) {
  try {
    const mainChat = await Chat.findOne({ participants: "main_group" });
    if (!mainChat) {
      return res.status(404).json({ error: "Main chat not found" });
    }
    res.status(200).json(mainChat);
  } catch (error) {
    console.error("Error fetching main chat:", error);
    res.status(500).json({ error: "Error fetching main chat" });
  }
}

export async function sendMessage(req, res) {
    const { chatId, sender, content } = req.body;
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
  
      chat.messages.push({ sender, content });
      await chat.save();
  
      res.status(200).json(chat);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Error sending message" });
    }
  }

  export async function startPrivateChat(req, res) {
    const { participant1, participant2 } = req.body;
  
    try {
      const existingChat = await Chat.findOne({
        participants: { $all: [participant1, participant2] },
      });
  
      if (existingChat) {
        return res.status(200).json(existingChat);
      }

      const newChat = new Chat({ participants: [participant1, participant2] });
      await newChat.save();
  
      res.status(201).json(newChat);
    } catch (error) {
      console.error("Error starting private chat:", error);
      res.status(500).json({ error: "Error starting private chat" });
    }
  }
  