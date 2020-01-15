import * as React from 'react';
import './Page.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { currentUserScopes } from '../../modules/user/selectors';
import { currentLocation as currentLocationSelector } from '../../modules/user/selectors';
import { updateCurrentLocation } from '../../modules/user/actions';
import { RootState, ThunkAction } from '../../store';

export interface PageToolbarProps {
    style?: any; // React.CSSProperties;
    left?: React.ReactNode;
    middle?: React.ReactNode;
    right?: React.ReactNode;
}

export class PageToolbar extends React.PureComponent<PageToolbarProps>{
    render() {
        const { style, left, middle, right } = this.props;
        return (
            <div
                style={{
                    flex: 1,
                    maxWidth: '93%',
                    minWidth: 800,
                    margin: '0 auto',
                    height: 56,
                    borderRadius: 0,
                    ...style
                }}
            >
                <div style={{ float: 'left' }}>
                    {left}
                </div>
                <div style={{ float: 'right' }}>
                    {right}
                </div>
                <div style={{ textAlign: 'center' }}>
                    {middle}
                </div>
            </div>
        );
    }
}

export interface PageProps {
    style?: any; // React.CSSProperties;
    toolbarStyle?: any; // React.CSSProperties;
    contentStyle?: any; // React.CSSProperties;
    toolbar?: React.ReactNode;
    // Disable specific locations
    disableLocations?: boolean;
    dispatchDisableLocations?: any;
}

export class Page extends React.PureComponent<PageProps> {
    static Toolbar = PageToolbar;
    constructor(props: PageProps) {
        super(props);

        const { disableLocations, dispatchDisableLocations } = props;
        if (disableLocations === true) {
            // Set to All Locations and disable
            dispatchDisableLocations();
        }
    }

    render() {
        const { style = {}, toolbar, toolbarStyle = {}, contentStyle = {} } = this.props;
        return (
            <div className="pageContainer" style={style}>
                {toolbar && (
                    <div className="page-toolbar" style={toolbarStyle}>
                        {toolbar}
                    </div>
                )}
                <div className="page-content" style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default
    connect<Partial<PageProps>, Partial<{ dispatchDisableLocations?: any }>, {}>(
        null,
        (dispatch) => ({
                // TODO: Export and standardize the ALL_LOCATIONS const
                dispatchDisableLocations: () => dispatch(updateCurrentLocation('ALL_LOCATIONS'))
        }))(Page);
