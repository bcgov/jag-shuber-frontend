import * as React from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface StoryPageProps {
    title: string;
}

class StoryPage extends React.PureComponent<StoryPageProps> {
    render() {
        return (
            <div style={{padding: 10}}>
                <h1>{this.props.title}</h1>                
                {this.props.children}
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(StoryPage);