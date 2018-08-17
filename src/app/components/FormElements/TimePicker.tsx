import React from 'react';
import moment from 'moment';
import Slider from 'rc-slider';
import { TimeType } from '../../api/Api';
import {
  HandleWithTooltip,
  createMarks,
  DisabledSliderSection,
  adjustMarks,
  SliderMarkCollection
} from './TimeSliderCommon';
import 'rc-slider/assets/index.css';

export interface TimePickerProps {
  minTime: TimeType;
  maxTime: TimeType;
  minAllowedTime?: TimeType;
  maxAllowedTime?: TimeType;
  selectedTime?: TimeType;
  timeIncrement?: number;
  onTimeChanged?: (selectedTime: TimeType) => void;
  handleColor?: string;
  railColor?: string;
}

export default class TimePicker extends React.Component<TimePickerProps> {

  private handleAfterChange(selectedMinutes: any) {
    const { minTime, onTimeChanged } = this.props;
    if (onTimeChanged) {
      const newTime = moment(minTime).add('minutes', selectedMinutes).format();
      onTimeChanged(newTime);
    }
  }

  componentWillMount() {
    const {
      minTime: _minTime,
      selectedTime: _selectedTime,
      onTimeChanged
    } = this.props;
    const minTime = moment(_minTime);
    const selectedTime = _selectedTime ? moment(_selectedTime) : minTime;

    // Here we need to issue onTimeChange events if the min times
    // are larger or smaller than the current time
    if (selectedTime) {
      const adjustedSelectedTime = minTime.isAfter(selectedTime) ? minTime : selectedTime;
      if (adjustedSelectedTime !== selectedTime) {
        if (onTimeChanged) {
          onTimeChanged(adjustedSelectedTime.format());
        }
      }
    }
  }

  render() {
    const {
      minTime: _minTime,
      maxTime: _maxTime,
      timeIncrement = 15,
      selectedTime: _selectedTime,
      handleColor = '#003366',
      railColor = '#9bc2e4'
    } = this.props;
    const minTime = moment(_minTime);
    const maxTime = moment(_maxTime);

    const minAllowedTime = moment(minTime).add(2, 'hours');
    const maxAllowedTime = moment(maxTime).subtract(2, 'hours');

    // if selected time isn't set, use either the minimum allowed time or the minTime for the slider
    const selectedTime = _selectedTime ? moment(_selectedTime) : (minAllowedTime ? moment(minAllowedTime) : minTime);
    const defaultSelectedMin = selectedTime ? moment.duration(selectedTime.diff(minTime)).asMinutes() : 0;

    type SliderSectionProps = {
      width?: any;
      start: number;
      end: number;
      marks: any;
    };
    let disabledMinSection: SliderSectionProps | undefined = undefined;
    let disabledMaxSection: SliderSectionProps | undefined = undefined;

    const fullDuration = moment.duration(maxTime.diff(minTime)).asMinutes()
    const mainSection: SliderSectionProps = {
      start: 0,
      end: fullDuration,
      marks: undefined
    };

    if (minAllowedTime) {
      disabledMinSection = {
        start: mainSection.start,
        end: moment.duration(moment(minAllowedTime).diff(minTime)).asMinutes(),
        marks: createMarks(moment(minTime), moment(minAllowedTime), timeIncrement)
      };

      // Blank the label on the last mark of the disabled timeline since we have that mark
      // in the main section
      const sortedKeys = Object.keys(disabledMinSection.marks)
        .map(k => parseFloat(k))
        .sort((a, b) => a - b);
      const lastKey = sortedKeys[sortedKeys.length - 1];

      (disabledMinSection.marks as SliderMarkCollection)[lastKey].label = '';

      // Replace the main sections start with the end of the disabledMaxSection
      mainSection.start = disabledMinSection.end;
    }

    if (maxAllowedTime) {
      disabledMaxSection = {
        start: moment.duration(moment(maxAllowedTime).diff(minTime)).asMinutes(),
        end: mainSection.end,
        marks: undefined
      };

      disabledMaxSection.marks = adjustMarks(
        createMarks(moment(maxAllowedTime), moment(maxTime), timeIncrement),
        disabledMaxSection.start
      );

      // Blank the label on the first mark of the disabled timeline since we have that mark
      // in the main section
      const firstKey = Object.keys(disabledMaxSection.marks)
        .map(k => parseFloat(k))
        .sort((a, b) => a - b)[0];
      (disabledMaxSection.marks as SliderMarkCollection)[firstKey].label = '';

      // Replace the main sections end with the start of the disabledMaxSection
      mainSection.end = disabledMaxSection.start;
    }
    const mainMarks = createMarks(
      moment(minTime).add(mainSection.start, 'minutes'),
      moment(minTime).add(mainSection.end, 'minutes'),
      timeIncrement);

    // Need to adjust the mainSectionMarks to account for disabledMinSection
    mainSection.marks = minAllowedTime ? adjustMarks(mainMarks, mainSection.start) : mainMarks;

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
        {disabledMinSection &&
          <DisabledSliderSection
            fullDuration={fullDuration}
            step={timeIncrement}
            dots={true}
            min={disabledMinSection.start}
            max={disabledMinSection.end}
            marks={disabledMinSection.marks}
          />
        }

        <Slider
          step={timeIncrement}
          dots={true}
          defaultValue={defaultSelectedMin}
          min={mainSection.start}
          max={mainSection.end}
          marks={mainSection.marks}
          dotStyle={{ borderColor: railColor }}
          activeDotStyle={{ borderColor: railColor }}
          railStyle={{ backgroundColor: railColor }}
          handleStyle={{ borderColor: handleColor, backgroundColor: handleColor }}
          trackStyle={{ backgroundColor: railColor }}
          onAfterChange={(e) => this.handleAfterChange(e)}
          handle={(p: any) =>
            <HandleWithTooltip
              overlayFormatter={(v) => moment(minTime).add('minutes', v).format('HH:mm')}
              overlayStyle={{ zIndex: 1200 }}
              {...p}
            />
          }
          style={{
            zIndex: 105
          }}
        />

        {disabledMaxSection &&
          <DisabledSliderSection
            fullDuration={fullDuration}
            step={timeIncrement}
            dots={true}
            min={disabledMaxSection.start}
            max={disabledMaxSection.end}
            marks={disabledMaxSection.marks}
          />
        }
      </div>
    );
  }
}
