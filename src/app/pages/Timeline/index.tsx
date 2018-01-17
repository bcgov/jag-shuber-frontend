import * as React from "react"
import DailyTimeline from "../../modules/timeline/containers/DailyTimeline";
import { Button } from 'react-bootstrap'

class TimelinePage extends React.PureComponent {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: "1 0px", minWidth: 500 }}>
                    <DailyTimeline />
                </div>
                <div style={{
                    flex:"0 200px",                    
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    borderLeft: "2px solid #BBB",
                    borderBottom: "2px solid #BBB"
                }}>
                    <div style={{
                        background: "#003366",
                        flex: "0 0 60px",
                        border: "0px",
                        color: "#FFF",
                        textAlign: 'center'                        
                    }}>
                        <h3 style={{lineHeight:"60px",padding:0,margin:0,color: "#FFF" }}>Tools</h3>
                    </div>
                    <div style={{ flex: "1 1 auto", padding: 10, textAlign: "center" }}>
                        <Button block bsStyle="primary">Test Button</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimelinePage;


