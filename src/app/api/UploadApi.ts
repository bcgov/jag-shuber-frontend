import { IdType } from './Api';

export type ImageUpload = any;

export interface UploadAPI {
    uploadImage(userId: IdType, image: any): Promise<ImageUpload>;
}
