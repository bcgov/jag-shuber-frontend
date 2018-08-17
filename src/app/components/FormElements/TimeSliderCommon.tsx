import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider, { Handle, SliderProps } from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import moment, { Moment } from 'moment';

export interface HandleWithTooltipProps {
    value: number;
    dragging: boolean;
    index: any;
    overlayStyle?: React.CSSProperties;
    overlayFormatter?: (value: number) => string;
}

export class HandleWithTooltip extends React.PureComponent<HandleWithTooltipProps> {
    render() {
        const {
            value,
            index,
            dragging,
            overlayFormatter = (v: number) => `${v}`,
            overlayStyle = {},
            ...restProps
        } = this.props;
        const handleProps = restProps as any;
        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={overlayFormatter(value)}
                visible={dragging}
                placement="top"
                key={index}
                overlayStyle={{
                    zIndex: 115,
                    ...overlayStyle
                }}
            >
                <Handle value={value} {...handleProps} />
            </Tooltip>
        );
    }
}

export interface SliderMark {
    style: React.CSSProperties;
    label: string;
}

export type SliderMarkCollection = { [key: number]: SliderMark };

export function createMarks(minTime: Moment, maxTime: Moment, timeIncrement: number): SliderMarkCollection {
    const durationMinutes: number = moment.duration(maxTime.diff(minTime)).asMinutes();
    const numberOfMarks: number = durationMinutes / timeIncrement;

    let markLabels = {};
    for (let i = 0; i <= numberOfMarks; i++) {
        const index = i * timeIncrement;
        const minuteValue = i * timeIncrement;
        let timeLabel = moment(minTime).add('minutes', minuteValue);
        if (timeLabel.get('minutes') === 0) {
            markLabels[index] = {
                style: {
                    transform: 'rotate(45deg)',
                    webkitTransform: 'rotate(45deg)',
                    msTransform: 'rotate(45deg)',
                    marginLeft: 0,
                    marginTop: -2
                },
                label: timeLabel.format('HH:mm')
            };
        } else {
            markLabels[index] = '';
        }
    }

    return markLabels;
}

export function adjustMarks(marks: SliderMarkCollection, adjustment: number): SliderMarkCollection {
    return Object.keys(marks)
        .map(k => parseInt(k))
        .reduce(
            (newMarks, markKey) => {
                newMarks[markKey + adjustment] = marks[markKey];
                return newMarks;
            },
            {});
}

export interface DisabledSliderSectionProps extends SliderProps {
    fullDuration: number;
}

/**
 * A disabled slider section that can be used to represent a portion of the slider track 
 * that cannot be selected
 * 
 * @export
 * @class DisabledSliderSecion
 * @extends {React.PureComponent<SliderProps>}
 */
export class DisabledSliderSection extends React.PureComponent<DisabledSliderSectionProps> {
    render() {
        const railColor = 'lightgray';
        const handleColor = 'lightgray';
        const { fullDuration, min = 0, max = 0 } = this.props;
        const { style = {}, ...restProps } = this.props;
        const width = `${(max - min) / fullDuration * 100}%`;
        return (
            <Slider
                handle={(p) => null}
                disabled={true}
                dots={true}
                dotStyle={{ borderColor: railColor }}
                activeDotStyle={{ borderColor: railColor }}
                railStyle={{ backgroundColor: railColor }}
                handleStyle={{ borderColor: handleColor, backgroundColor: handleColor }}
                trackStyle={{ backgroundColor: railColor }}
                style={{
                    zIndex: 100,
                    style,
                    width
                }}
                {...restProps}
            />
        );
    }
}