import {BadgeProps, NavbarProps} from 'react-bootstrap'
declare module 'react-bootstrap' {
    export interface BadgeProps {
        bsStyle?: string;
    }


    export interface NavbarProps {
        stacked?: boolean
    }
}