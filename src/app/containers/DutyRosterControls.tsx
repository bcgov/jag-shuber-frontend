import * as React from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import { visibleTime } from '../modules/timeline/selectors';
import { updateVisibleTime as setVisibleTime } from '../modules/timeline/actions';

interface DutyRosterControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface DutyRosterControlsProps {
}

interface DutyRosterDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
}

class DutyRosterControls extends React.PureComponent<
    DutyRosterControlsProps & DutyRosterControlsStateProps & DutyRosterDistpatchProps> {

    render() {
        const { visibleTimeStart, visibleTimeEnd, updateVisibleTime } = this.props;
        return (
            <div>
                <Button
                    onClick={() => updateVisibleTime(
                        moment(visibleTimeStart).subtract('day', 1),
                        moment(visibleTimeEnd).subtract('day', 1)
                    )}
                >
                    <Glyphicon glyph="chevron-left" />
                </Button>

                <Button
                    onClick={() => updateVisibleTime(
                        moment(visibleTimeStart).add('day', 1),
                        moment(visibleTimeEnd).add('day', 1)
                    )}
                >
                    <Glyphicon glyph="chevron-right" />
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return visibleTime(state);
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime
}
// tslint:disable-next-line:max-line-length
export default connect<DutyRosterControlsStateProps, DutyRosterDistpatchProps, DutyRosterControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(DutyRosterControls);