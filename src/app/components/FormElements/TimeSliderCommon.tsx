import React from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
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

export function createMarks(minTime: Moment, maxTime: Moment, timeIncrement: number) : {} {
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