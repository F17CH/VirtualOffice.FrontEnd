import { Channel, Socket } from "phoenix";
import { Conversation } from "../../types/conversation/conversation";
import { Message } from "../../types/conversation/message";
import { User } from "../../types/user";
import { joinChannel } from "./channel_handler";
import { getResponseBody } from "./channel_utils";
import { getSocket } from "./socket_handler";

export function newConversationChannel(
  conversation: Conversation,
  currentUser: User,
  onNewMessage: (conversation: Conversation, newMessage: Message) => void): void {
  var newConversationChannel = getSocket().channel("conversation:" + conversation.id)

  newConversationChannel.on("message_new", async (response) => {
    var newMessage: Message = response.data;

    if (newMessage.user_id != currentUser.id) {
      onNewMessage(conversation, newMessage);
    }
  });

  joinChannel(newConversationChannel);
}