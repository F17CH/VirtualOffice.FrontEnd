import { LoginCredentials } from "../../../types/login_credentials";
import { LoginResult } from "../../../types/login_result";
import { User } from "../../../types/user";
import { setUserToken } from "../../user_token_manager";
import { getResponseBody } from "../api_utils";
import { nonAuthorizedRequest } from "../non_authorized_request";
import { SignInResponse } from "../user/types/sign_in_response";
import { userAuthorizedRequest } from "../user_authorized_request";
import { ConversationCreateRequest } from "./types/conversation_create_request";
import { ConversationCreateResponse } from "./types/conversation_create_response";

export async function postConversationCreate(conversationCreateRequest : ConversationCreateRequest): Promise<ConversationCreateResponse> {

    return await userAuthorizedRequest(`http://localhost:4010/api/conversation/`,
        "post",
        {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(conversationCreateRequest) 
        }
    ).then(async (response) => {
        var result: ConversationCreateResponse;

        switch (response.status) {
            case 200: {
                var conversationCreateResponse: ConversationCreateResponse = await getResponseBody<ConversationCreateResponse>(response);

                result = conversationCreateResponse;
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