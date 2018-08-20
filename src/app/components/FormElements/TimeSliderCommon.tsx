import React from 'react';
import Tooltip from 'rc-tooltip';
import { TimeType } from '../../api/Api';
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

export type SliderMarkCollection = { [key: number]: SliderMark | string };

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

function getMinMaxMarks(marks: SliderMarkCollection): { min: number, max: number } | undefined {
    const sorted = Object.keys(marks).map(k => parseFloat(k)).sort((a, b) => a - b);
    if (sorted.length > 0) {
        return {
            min: sorted[0],
            max: sorted[sorted.length - 1]
        };
    }
    return undefined;
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
        const {
            fullDuration,
            marks = {} } = this.props;
        const { style = {}, min, max, ...restProps } = this.props;
        const { min: minMark = 0, max: maxMark = 0 } = getMinMaxMarks(marks as any) || {};
        const disabledDuration = maxMark - minMark;
        const width = `${(disabledDuration) / fullDuration * 100}%`;
        // const width = disabledDuration > 0 ? '33%' : '0%';
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
                min={minMark}
                max={maxMark}
                {...restProps}
            />
        );
    }
}

export interface TimeLimitProps {
    minAllowedTime?: TimeType;
    maxAllowedTime?: TimeType;
}

export interface TimeRangeProps {
    minTime: TimeType;
    maxTime: TimeType;
    timeIncrement?: number;
    style?: React.CSSProperties;
}

/**
 * Wraps a Time Slider type component and provides the ability to add limits
 * to the slider component which are displayed as disabled slider components.
 *
 * @export
 * @template P
 * @param {React.ComponentType<P>} ComponentToWrap
 * @returns {(React.ComponentType<P & TimeLimitProps>)}
 */
// tslint:disable-next-line:max-line-length
export function sliderWithLimits<P extends TimeRangeProps>(ComponentToWrap: React.ComponentType<P>): React.ComponentType<P & TimeLimitProps> {
    class WrappedSlider extends React.Component<P & TimeLimitProps>{
        render() {

            const {
                minTime: _minTime,
                maxTime: _maxTime,
                timeIncrement = 15,
                minAllowedTime,
                maxAllowedTime,
            } = this.props;
            const minTime = moment(_minTime);
            const maxTime = moment(_maxTime);

            let disabledMinMarks: SliderMarkCollection | undefined = undefined;
            let disabledMaxMarks: SliderMarkCollection | undefined = undefined;

            const fullDuration = moment.duration(maxTime.diff(minTime)).asMinutes();
            const mainMintime = minAllowedTime || minTime;
            const mainMaxTime = maxAllowedTime || maxTime;
            const mainDuration = moment.duration(moment(mainMaxTime).diff(moment(mainMintime))).asMinutes();
            const mainWidth = `${(mainDuration / fullDuration) * 100}%`;

            if (minAllowedTime) {
                disabledMinMarks = createMarks(moment(minTime), moment(minAllowedTime), timeIncrement);

                // Blank the label on the last mark of the disabled timeline since we have that mark
                // in the main section
                const sortedKeys = Object.keys(disabledMinMarks)
                    .map(k => parseFloat(k))
                    .sort((a, b) => a - b);
                const lastKey = sortedKeys[sortedKeys.length - 1];
                disabledMinMarks[lastKey] = '';
            }

            if (maxAllowedTime) {
                disabledMaxMarks = createMarks(moment(maxAllowedTime), moment(maxTime), timeIncrement)

                // Blank the label on the first mark of the disabled timeline since we have that mark
                // in the main section
                const firstKey = Object.keys(disabledMaxMarks)
                    .map(k => parseFloat(k))
                    .sort((a, b) => a - b)[0];
                disabledMaxMarks[firstKey] = '';
            }

            return (
                <div
                    style={{
                        display: 'flex',
                        marginLeft: 5,
                        marginRight: 15,
                        marginBottom: 25,
                        marginTop: 15
                    }}
                >
                    {disabledMinMarks &&
                        <DisabledSliderSection
                            fullDuration={fullDuration}
                            step={timeIncrement}
                            dots={true}
                            marks={disabledMinMarks}
                        />
                    }

                    <ComponentToWrap
                        {...this.props}
                        minTime={mainMintime}
                        maxTime={mainMaxTime}
                        style={{
                            zIndex: 105,
                            width: mainWidth
                        }}
                    />

                    {disabledMaxMarks &&
                        <DisabledSliderSection
                            fullDuration={fullDuration}
                            step={timeIncrement}
                            dots={true}
                            marks={disabledMaxMarks}
                        />
                    }
                </div>
            );
        }
    }

    return WrappedSlider;
}