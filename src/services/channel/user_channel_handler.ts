import { Channel, Socket } from "phoenix";
import { Conversation } from "../../types/conversation/conversation";
import { getResponseBody } from "./channel_utils";
import { getSocket } from "./socket_handler";

export function newUserChannel(userId: string): Channel {
  var channel = getSocket().channel("user:" + userId)

  return channel;
}