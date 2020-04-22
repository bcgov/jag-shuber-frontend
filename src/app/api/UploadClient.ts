import * as SA from 'superagent';

export declare type SuperAgentRequestInterceptor = (req: SA.SuperAgentRequest) => SA.SuperAgentRequest;

import {
    IdType
} from './Api';

import {
    ImageUpload,
    UploadAPI
} from './UploadApi';

const UPLOAD_BASE_URL = 'http://localhost:8080/';

export default class UploadClient implements UploadAPI {
    constructor(baseUrl: string) {
    }

    protected processError(err: any) {
    }

    async uploadImage(userId: IdType, image: Partial<any>): Promise<ImageUpload> {
        if (!userId) {
            // throw 'No Id to request';
        }

        console.log('dump user image upload request, we still need to post the payload');
        console.log(image);

        // TODO: Use baseUrl from constructor
        const response = await SA.post(UPLOAD_BASE_URL + 'api/file/upload')
            .set('Access-Control-Allow-Origin', '*').send(image);

        return response.body;
    }
}
