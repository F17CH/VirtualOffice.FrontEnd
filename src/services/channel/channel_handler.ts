import { Channel, Socket } from "phoenix";
import { getSocket } from "./socket_handler";

export function newChannel(subtopic: string, screenName: string): Channel {
  var channel = getSocket().channel("conversation:" + subtopic, { screenName: screenName })

  channel.on("said_hello", response => {
    console.log("Returned Greeting:", response.message)
  })

  return channel;
}

export function joinChannel(channel: Channel): void {
  channel.join()
    .receive('ok', resp => { console.log("Joined successfully!", resp) })
    .receive('error', resp => { console.log("Unable to join", resp) })
}