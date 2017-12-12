import * as React from 'react'

export interface FooterProps {

}

export default class Footer extends React.PureComponent<FooterProps, any>{
    render() {
        return (
            <div id="footer" role="contentinfo">
                <img className="back-to-top" src="images/back-to-top.png" alt="Back to top" title="Back to top" style={{display:'inline'}} />
                    <div id="footerWrapper">
                        <div id="footerAdminSection">
                            <div id="footerAdminLinksContainer" className="container">
                                <div id="footerAdminLinks" className="row">
                                    <ul className="inline">
                                        <li>
                                            <a href="#" target="_self">Home</a>
                                        </li>
                                        <li>
                                            <a href="#" target="_self">About this site</a>
                                        </li>
                                        <li>
                                            <a href="http://gov.bc.ca/disclaimer/" target="_self">Disclaimer</a>
                                        </li>
                                        <li>
                                            <a href="http://gov.bc.ca/privacy/" target="_self">Privacy</a>
                                        </li>
                                        <li>
                                            <a href="http://gov.bc.ca/webaccessibility/" target="_self">Accessibility</a>
                                        </li>
                                        <li>
                                            <a href="http://gov.bc.ca/copyright" target="_self">Copyright</a>
                                        </li>
                                        <li>
                                            <a href="#" target="_self">Contact Us</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                );
    }
}