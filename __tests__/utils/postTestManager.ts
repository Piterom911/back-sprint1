import {HTTP_STATUS, HttpStatusType, URI_PATHS} from "../../src/models/common";
import request from "supertest";
import {app} from "../../src/app";

const getRequest = () => request(app)

export const postTestManager = {
    async createPost(data: any,
                     expectedStatusCode: HttpStatusType = HTTP_STATUS.CREATED,
                     authData: string
    ) {

        const createPostResponse = await getRequest()
            .post(URI_PATHS.posts)
            .set('Authorization', authData)
            .send(data)
            .expect(expectedStatusCode)

        return createPostResponse
    }
}