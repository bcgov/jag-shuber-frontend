import {BadgeProps, NavbarProps} from 'react-bootstrap'
import * as React from 'react';

declare module 'react-bootstrap' {
    export interface BadgeProps {
        bsStyle?: string;
    }


    export interface NavbarProps {
        stacked?: boolean
    }

    // export class Panel extends panel{
    //     static Heading: React.Component<any>
    // }

}