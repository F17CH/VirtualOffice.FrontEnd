import { Conversation } from "../../../types/conversation/conversation";
import { LoginCredentials } from "../../../types/login_credentials";
import { LoginResult } from "../../../types/login_result";
import { User } from "../../../types/user";
import { setUserToken } from "../../user_token_manager";
import { getResponseBody } from "../api_utils";
import { nonAuthorizedRequest } from "../non_authorized_request";
import { SignInResponse } from "../user/types/sign_in_response";
import { userAuthorizedRequest } from "../user_authorized_request";
import { ConversationCreateRequest } from "./types/conversation_create_request";

export async function postConversationCreate(conversationCreateRequest : ConversationCreateRequest): Promise<Conversation> {
    debugger;
    return await userAuthorizedRequest(`${process.env.BACKEND_URL}/conversations/`,
        "post",
        {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(conversationCreateRequest) 
        }
    ).then(async (response) => {
        var result: Conversation;

        switch (response.status) {
            case 200: {
                var conversation: Conversation = await getResponseBody<Conversation>(response);

                result = conversation;
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