import React from 'react';
import {
    Glyphicon,
    Collapse
} from 'react-bootstrap';
import './CollapsibleSection.css';

export interface ProfileSectionProps {
    isInitiallyCollapsed?: boolean;
    sectionTitle?: string;
}

export default class ProfileSection extends React.Component<ProfileSectionProps, { isCollapsed: boolean }> {
    constructor(props: any, context: any) {
        super(props, context);
        const {
            isInitiallyCollapsed: isCollapsed = true,
        } = props;
        this.state = { isCollapsed };
    }

    render() {
        const { sectionTitle } = this.props;
        const { isCollapsed } = this.state;

        return (
            <div>
                <div
                    className="collapsible-section-header"
                    style={isCollapsed ? {} : { border: 0 }}
                    onClick={() => this.setState({ isCollapsed: !this.state.isCollapsed })}
                >
                    {sectionTitle}
                    <Glyphicon
                        className="collapsible-section-arrow"
                        glyph={!isCollapsed ? 'chevron-up' : 'chevron-down'}
                    />
                </div>
                <Collapse in={!isCollapsed}>
                    <div>
                        {this.props.children}
                    </div>
                </Collapse>
            </div>
        );
    }
}
