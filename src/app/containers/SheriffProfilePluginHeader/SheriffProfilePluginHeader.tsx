import * as React from 'react';
import SheriffDisplay from '../SheriffDisplay';
import toTitleCase from '../../infrastructure/toTitleCase';
import {
    Image
} from 'react-bootstrap';
import {
    SheriffProfilePluginBase,
    SheriffProfilePluginProps
} from '../../components/SheriffProfile/SheriffProfilePlugin';
import { IdType, Leave, Sheriff } from '../../api';

import SheriffRankDisplay from '../SheriffRankDisplay';

import { Field } from 'redux-form';
import UploadField from '../../components/FormElements/UploadField';

import './SheriffProfilePluginHeader.css';
import avatarImg from '../../assets/images/avatar.png';
import { Dispatch } from 'redux';
import { LEAVE_CODE_PERSONAL } from '../../api/Api';
import { toTimeString } from 'jag-shuber-api';
import { createOrUpdateLeaves } from '../../modules/leaves/actions';

export default class SheriffProfilePluginHeader extends SheriffProfilePluginBase<Sheriff> {
    name = 'header';
    formFieldNames = {
        imageData: 'sheriff.imageData'
    };
    profileImage: any = null;
    // getBase64Preview: any = null;
    // getPreviewUrl: any = null;
    DisplayComponent = ({ sheriffId }: SheriffProfilePluginProps) => (
        <>
            <SheriffDisplay
                sheriffId={sheriffId}
                RenderComponent={({ sheriff: {
                    firstName = '',
                    lastName = '',
                    imageUrl = '',
                    imageData = {},
                    badgeNo = '',
                    rankCode = ''
                } = {} }) =>
                    (
                        <div className="sheriff-profile-header">
                            <Image
                                src={imageUrl ? imageUrl : avatarImg}
                                circle={true}
                                width="115"
                                height="115"
                            />
                            <div style={{ marginTop: 30, fontSize: 14 }}>#{badgeNo}</div>
                            <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                                {firstName.toUpperCase()} {lastName.toUpperCase()}
                            </div>
                            <div style={{ fontSize: 14 }}><SheriffRankDisplay code={rankCode} /></div>
                        </div>
                    )
                }
            />
        </>
    )

    FormComponent = ({ sheriffId , data }: SheriffProfilePluginProps) => {
        return (
            <>
                <SheriffDisplay
                    sheriffId={sheriffId}
                    RenderComponent={({
                          sheriff: {
                              firstName = '',
                              lastName = '',
                              imageUrl = '',
                              imageData = {} as any,
                              badgeNo = '',
                              rankCode = ''
                          } = {}
                      }) => {
                        const updateImagePreview = async (filePreview: any) => {
                            if (!filePreview) return;
                            const imageSource = (filePreview.getBase64Img && typeof filePreview.getBase64Img === 'function')
                                ? await filePreview.getBase64Img() : undefined;

                            if (imageSource) {
                                this.profileImage.src = imageSource;
                            }
                        };

                        // @ts-ignore
                        let imageSrc = (imageUrl)
                            ? imageUrl
                            : avatarImg;

                        return (
                            <div style={{padding: 10, textAlign: 'center'}}>
                                <img
                                    className="profile-image"
                                    alt={'Profile Image'}
                                    ref={el => this.profileImage = el}
                                    src={imageSrc}
                                    // circle={true}
                                    width="115"
                                    height="115"
                                />
                                <div style={{marginTop: 30}}>
                                    <Field
                                        name={this.formFieldNames.imageData}
                                        component={(p) => {
                                            return (
                                                <UploadField
                                                    {...p}
                                                    placeholder={`Select Image`}
                                                    showLabel={false}
                                                />
                                            );
                                        }}
                                        label={`Image`}
                                        onChange={updateImagePreview}
                                        disabled={false}
                                    />
                                </div>
                                <div style={{marginTop: 30, fontSize: 14}}>#{badgeNo}</div>
                                <div style={{fontWeight: 'bold', fontSize: 18}}>
                                    {firstName.toUpperCase()} {lastName.toUpperCase()}
                                </div>
                                <div style={{fontSize: 14}}><SheriffRankDisplay code={rankCode}/></div>
                            </div>
                        );
                      }
                    }
                />
            </>
        );
    }

    async onSubmit(sheriffId: IdType, formValues: any, dispatch: Dispatch<any>): Promise<any> {
        const data = this.getDataFromFormValues(formValues);
        console.log('dumping plugin data');
        console.log(data);
    }
}
