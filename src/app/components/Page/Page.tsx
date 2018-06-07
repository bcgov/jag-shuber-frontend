import * as React from 'react';
import './Page.css';

export interface PageProps {
    style?: React.CSSProperties;
    toolbarStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    toolbar?: React.ReactNode;
}


export interface PageToolbarProps {
    style?: React.CSSProperties;
    left?: React.ReactNode;
    middle?: React.ReactNode;
    right?: React.ReactNode;
}

class PageToolbar extends React.PureComponent<PageToolbarProps>{
    render() {
        const { style, left, middle, right } = this.props;
        return (
            <div
                style={{
                    flex: 1,
                    maxWidth: '80%',
                    minWidth: 800,
                    margin: '0 auto',
                    height: 46,
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

export default class Page extends React.PureComponent<PageProps> {
    static Toolbar = PageToolbar;
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
