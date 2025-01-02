import Chat  from "../models/chatModel.js";

export async function getMainChat(_req, res) {
  try {
    const mainChat = await Chat.findOne({ participants: "main_group" });
    if (!mainChat) {
      const newChat = new Chat({ participants: ["main_group"] });
      await newChat.save();
      return res.status(201).json(newChat);
    }
    res.status(200).json(mainChat);
  } catch (error) {
    console.error("Error fetching main chat:", error);
    res.status(500).json({ error: "Error fetching main chat" });
  }
}

export async function sendMessage(req, res) {
  const { chatId, sender, content, type } = req.body;

  if (!sender || !content || !type) {
    return res.status(400).json({ error: "Invalid message data" });
  }

  try {
    // LOBBY CHAT
    if (type === 'public') {
      const chat = await Chat.findOne({ participants: "main_group" });
      if (!chat) {
        // If no lobby chat exists, create one
        const newChat = new Chat({ participants: ["lobby"], messages: [{ sender, content }] });
        await newChat.save();

        return res.status(201).json(newChat);
      } else {
        chat.messages.push({ sender, content });
        await chat.save();
        return res.status(200).json(chat);
      }
    }

    // PRIVATE ROOM / CHAT
    if (type === 'private' && chatId) {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      // check if the sender is a participant of the chat
      if (!chat.participants.includes(sender)) {
        return res.status(403).json({ error: "You are not a participant of this chat" });
      }

      chat.messages.push({ sender, content });
      await chat.save();
      return res.status(200).json(chat);
    }

    return res.status(400).json({ error: "Invalid message type" });

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
}

export async function startPrivateChat(req, res) {
  const { participants } = req.body;

  if (!participants || participants.length < 2 || participants.length > 456) {
    return res.status(400).json({ error: "At least 2 participants are required" });
  }

  participants.sort();

  try {
    const existingChat = await Chat.findOne({
      participants: { $all: participants },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const newChat = new Chat({ participants: participants });
    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error starting private chat:", error);
    res.status(500).json({ error: "Error starting private chat" });
  }
}
