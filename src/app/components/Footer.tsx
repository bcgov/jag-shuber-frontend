import * as React from 'react';
import Legend from './Legend/Legend';

// class BackToTopButton extends React.PureComponent {
//     scrollToTop(){
//         document.body.scrollTop = 0; // For Safari
//         document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//     }

//     render() {
//         return (
//             <img 
//                 className="back-to-top" 
//                 onClick={this.scrollToTop} 
//                 width="30"
//                 src="https://www2.gov.bc.ca/StaticWebResources/static/gov3/images/back-to-top.png" 
//                 alt="Back to top" 
//                 title="Back to top" 
//                 style={{display: 'inline'}} 
//             />
//         );
//     }
// }

export interface FooterProps {

}

export default class Footer extends React.PureComponent<FooterProps> {
    render() {
        return (
            <div id="footer">
                <Legend />
                {/* <BackToTopButton /> */}
                {/* <div id="footerWrapper">
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
                </div> */}
            </div>
        );
    }
}