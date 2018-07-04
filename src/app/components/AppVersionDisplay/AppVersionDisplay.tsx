import * as React from 'react';
import * as Version from '../../version';
import moment from 'moment';
import './AppVersionDisplay.css';

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

        const formatHash = (hash = '') => hash.substr(0, 12);
        const itemsToDisplay = [
            commitHash && `Version: ${formatHash(Version.COMMIT_HASH)}`,
            (apiVersion || apiCommitHash) &&
            `API: ${apiVersion && Version.API_VERSION} ${apiCommitHash && `(${formatHash(Version.API_COMMIT_HASH)})`}`,
            buildDate && `Built: ${moment(Version.BUILD_DATE).calendar()}`,
        ].filter(i => i !== false);
        return (
            <div className='app-version-display' style={{...style }}>
                {itemsToDisplay.map(item => (
                    <span>{item}</span>
                ))}
            </div>
        );
    }
}
