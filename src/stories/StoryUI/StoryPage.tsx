import * as React from 'react'

interface StoryPageProps {
    title: string
}

export default class StoryPage extends React.PureComponent<StoryPageProps> {
    render() {
        return (
            <div style={{padding:10}}>
                <h1>{this.props.title}</h1>                
                {this.props.children}
            </div>
        )
    }
}