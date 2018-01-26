import * as React from 'react'

interface StorySectionProps {
    title: string
}

export default class StorySection extends React.PureComponent<StorySectionProps> {
    render() {
        return (
            <div style={{paddingTop:20}}>
                <h2 style={{paddingBottom:10,marginBottom:20,borderBottom:"2px solid lightgray"}}>{this.props.title}</h2>                
                {this.props.children}
            </div>
        )
    }
}