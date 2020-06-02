import * as React from 'react';
import './Page.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    currentLocation as currentLocationSelector,
    isLocationSet as isLocationSetSelector,
    currentUserScopes
} from '../../modules/user/selectors';
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
        const { style, left, middle, right, children } = this.props;
        return (
            <div
                style={{
                    flex: 1,
                    maxWidth: '93%',
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
                    {children}
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
    dispatchDisableCurrentLocation?: any;
    dispatchResetCurrentLocation?: any;
}

export class Page extends React.Component<PageProps & PageStateProps & PageDispatchProps> {
    static Toolbar = PageToolbar;
    constructor(props: PageProps & PageStateProps & PageDispatchProps) {
        super(props);

        const {
            disableLocations,
            dispatchDisableCurrentLocation,
            dispatchResetCurrentLocation,
            currentLocation
        } = props;

        // TODO: Export and standardize the ALL_LOCATIONS const
        if (disableLocations === true) {
            if (currentLocation !== 'ALL_LOCATIONS') {
                // Set to All Locations and disable the location switch
                console.log('disable current location');
                dispatchDisableCurrentLocation();
            }
        } else if (disableLocations === false) {
            if (currentLocation === 'ALL_LOCATIONS') {
                // TODO: Let's display a confirm modal or something instead
                //  of pushing the user to the Select your Location screen
                console.log('reset current location');
                dispatchResetCurrentLocation();
            }
        }
    }

    shouldComponentUpdate(nextProps: Readonly<PageProps & PageStateProps & PageDispatchProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false; // This prevents infinite loop on props change
    }

    render() {
        const {
            style = {},
            toolbar,
            toolbarStyle = {},
            contentStyle = {} ,
            disableLocations,
            currentLocation,
            // isCurrentLocationSet
        } = this.props;

        const isCurrentLocationSet = (
            typeof currentLocation === 'string' &&
            currentLocation !== 'ALL_LOCATIONS' &&
            currentLocation !== '');

        const shouldRenderChildren = ((disableLocations !== false) || (!disableLocations && isCurrentLocationSet));

        return (
            <div className="pageContainer" style={style} key={currentLocation}>
                {toolbar && (
                    <div className="page-toolbar" style={toolbarStyle}>
                        {toolbar}
                    </div>
                )}
                <div className="page-content" style={contentStyle}>
                    {shouldRenderChildren ? this.props.children : null}
                </div>
            </div>
        );
    }
}

export interface PageStateProps extends PageProps {
    currentLocation?: any;
    isCurrentLocationSet?: boolean;
};

export interface PageDispatchProps extends PageProps {
    dispatchDisableCurrentLocation?: any;
    dispatchResetCurrentLocation?: any;
};

export default
    connect<Partial<PageStateProps>, Partial<PageDispatchProps>, PageProps, RootState>(
        (state: RootState) => ({
            currentLocation: currentLocationSelector(state),
            isCurrentLocationSet: isLocationSetSelector(state)
        }),
        (dispatch) => ({
                // TODO: Export and standardize the ALL_LOCATIONS const
                dispatchDisableCurrentLocation: () => dispatch(updateCurrentLocation('ALL_LOCATIONS')),
                dispatchResetCurrentLocation: () => dispatch(updateCurrentLocation(''))
        }))(Page);
