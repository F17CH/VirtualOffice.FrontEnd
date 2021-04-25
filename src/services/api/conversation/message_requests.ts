import { Conversation } from "../../../types/conversation/conversation";
import { Message } from "../../../types/conversation/message";
import { LoginCredentials } from "../../../types/login_credentials";
import { LoginResult } from "../../../types/login_result";
import { User } from "../../../types/user";
import { setUserToken } from "../../user_token_manager";
import { getResponseBody } from "../api_utils";
import { nonAuthorizedRequest } from "../non_authorized_request";
import { SignInResponse } from "../user/types/sign_in_response";
import { userAuthorizedRequest } from "../user_authorized_request";
import { ConversationCreateRequest } from "./types/conversation_create_request";

export async function postMessageCreate(conversationId : string, message: Message): Promise<Message> {

    return await userAuthorizedRequest(`${process.env.VIRTUAL_OFFICE_API_URL}/conversations/${conversationId}/messages`,
        "post",
        {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(message) 
        }
    ).then(async (response) => {
        var result: Message;

        switch (response.status) {
            case 200: {
                var message: Message = await getResponseBody<Message>(response);

                result = message;
                break;
            }
            default: {
                result = null;
                break;
            }
        }

        return result;
        });

}