import { CSSProperties } from "react";

type IDragDrop = { isActive: boolean, isOver: boolean, canDrop: boolean }





export function standardBackground({ isActive, isOver, canDrop }:IDragDrop): CSSProperties {
    let backgroundColor = 'transparent'
    if (isActive) {
        backgroundColor = 'green'
    } else if (canDrop) {
        backgroundColor = 'lightGreen'
    } else if (isOver && !canDrop) {
        backgroundColor = '#FF000088'
    }

    return {
        opacity:0.2,
        backgroundColor,
    }
}

export function standardBorder({ isActive, isOver, canDrop }:IDragDrop): CSSProperties {
    let backgroundColor = 'transparent'
    if (isActive) {
        backgroundColor = 'green'
    } else if (canDrop) {
        backgroundColor = 'lightGreen'
    } else if (isOver && !canDrop) {
        backgroundColor = '#FF000088'
    }

    return {
        backgroundColor,
    }
}