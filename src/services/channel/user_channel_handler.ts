import { Channel, Socket } from "phoenix";
import { Conversation } from "../../types/conversation/conversation";
import { getResponseBody } from "./channel_utils";
import { getSocket } from "./socket_handler";

export function newUserChannel(userId: string): Channel {
  var channel = getSocket().channel("user:" + userId)

  return channel;
}

export function sayHello(channel: Channel, greeting: string): void {
  channel.push("hello", {"message": greeting})
    .receive("ok", response => {
      console.log("Hello", response.message)
    })
    .receive("error", response => {
      console.log("unable to say hello to the channel.", response.message)
    });
}