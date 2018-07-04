import * as React from 'react';
import * as Version from '../version';
import moment from 'moment';

export interface AppVersionDisplayProps {
    commitHash?: boolean;
    buildDate?: boolean;
    apiVersion?: boolean;
    apiCommitHash?: boolean;
    style?: React.CSSProperties;
}

export default class AppVersionDisplay extends React.PureComponent<AppVersionDisplayProps, any> {
    public render() {
        const {
            commitHash = true,
            buildDate = true,
            apiVersion = true,
            apiCommitHash = true,
            style
        } = this.props;

        const itemsToDisplay = [
            commitHash && `Version: ${Version.COMMIT_HASH.substr(0, 12)}`,
            (apiVersion || apiCommitHash) &&
            `API: ${Version.API_VERSION} ${apiCommitHash && `(${Version.API_COMMIT_HASH.substr(0, 12)})`}`,
            buildDate && `Date: ${moment(Version.BUILD_DATE).calendar()}`,
        ].filter(i => i !== false);
        return (
            <div>
                <div style={{ color: 'white', display: 'flex', paddingLeft: 5, paddingRight: 5, ...style }}>
                    {itemsToDisplay.map(((item, index) => {
                        const textAlign = index === (itemsToDisplay.length - 1)
                            ? 'right'
                            : index > 0 ? 'center' : undefined;
                        return (
                            <div
                                style={{
                                    flex: 1,
                                    textAlign
                                }}
                            >
                                {item}
                            </div>
                        );
                    }))}
                </div>
            </div>
        );
    }
}
