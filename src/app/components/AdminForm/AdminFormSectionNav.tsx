import React from 'react';
import { Glyphicon } from 'react-bootstrap';

class AdminFormSectionNav extends React.PureComponent<{ title: string, hasErrors?: boolean }>{
    render() {
        const { title, hasErrors } = this.props;
        let className: string = '';
        let glyph: React.ReactNode;
        if (hasErrors === true) {
            className = 'text-danger';
            glyph = <Glyphicon glyph="exclamation-sign" />;
        } else if (hasErrors === false) {
            className = 'text-success';
            glyph = <Glyphicon glyph="ok" />;
        }
        return (
            <span className={className}>
                {title} {glyph}
            </span>
        );
    }
}

export default AdminFormSectionNav;
