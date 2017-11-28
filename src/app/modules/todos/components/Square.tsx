import * as React from 'react';
import * as PropTypes from 'prop-types';
import ItemTypes from '../ItemTypes';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props:any){
    return true;
  },
  drop(props: any) {
    console.log(props);
    //moveKnight(props.x, props.y);
  }
};

function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


class Square extends React.PureComponent<any, any> {
  static propTypes = {
    // x: PropTypes.number.isRequired,
    // y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };


  renderOverlay(color: string) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        opacity: 0.2,
        border:'dashed black 2px',        
      }}>
        {this.props.children}
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.TODO, squareTarget, collect)(Square)