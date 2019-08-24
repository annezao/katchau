import React from "react";
import Particles from 'react-particles-js';
import "../assets/css/loader.css";

const Loader = (props) => {
    return (
        <div id="loader">
            <div className="particles-container">
                <Particles className="particles" params={{
                        "particles": {
                            "number": {
                                "value": 30
                            },
                            "size": {
                                "value": 3
                            },
                            "line_linked": {
                                "enable": true
                            },
                            "opacity": {
                                "value": 0.2
                            }
                        }
                    }}
                />
            </div>           
            
            <div className="vertical-centered-box">
                <div className="content">
                    <div className="loader-circle"></div>
                    <div className="loader-line-mask">
                        <div className="loader-line"></div>
                    </div>
                    <svg version="1.1" id="ZapIcon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                        y="0px" width="150px" height="150px" viewBox="0 0 500 500" xmlSpace="preserve">
                        <path></path>
                        <g>
                            <defs>
                                <polygon id="Bolt_x5F_Bottom" points="314,234.7 243.1,234.7 187.7,383.9 		"></polygon>
                            </defs>
                            <clipPath id="Bolt_x5F_Bottom_1_">
                                <use xlinkHref="#Bolt_x5F_Bottom" overflow="visible" />
                            </clipPath>
                            <rect className="bolt-bottom-fill" x="187.7" y="234.7" clipPath="url(#Bolt_x5F_Bottom_1_)" fill="#FFFFFF"
                                width="126.2" height="149.2"></rect>
                            <polygon className="bolt-bottom-shadow" opacity="0.1" clipPath="url(#Bolt_x5F_Bottom_1_)"
                                points="314,286.8 187.7,266.8 187.7,234.7 314,234.7 	"></polygon>
                        </g>
                        <g>
                            <defs>
                                <polygon id="Bolt_x5F_Mid" points="187.7,265.3 258.6,265.3 314,234.7 243.1,234.7 		"></polygon>
                            </defs>
                            <clipPath id="Bolt_x5F_Mid_1_">
                                <use xlinkHref="#Bolt_x5F_Mid" overflow="visible" />
                            </clipPath>
                            <rect className="bolt-middle-fill" x="187.7" y="234.7" clipPath="url(#Bolt_x5F_Mid_1_)" fill="#FFFFFF"
                                width="126.2" height="30.7"></rect>
                        </g>
                        <g>
                            <defs>
                                <polygon id="Bolt_x5F_top" points="187.7,265.3 258.6,265.3 314,116.1 		"></polygon>
                            </defs>
                            <clipPath id="Bolt_x5F_top_1_">
                                <use xlinkHref="#Bolt_x5F_top" overflow="visible" />
                            </clipPath>
                            <rect className="bolt-top-fill" x="187.7" y="116.1" clipPath="url(#Bolt_x5F_top_1_)" fill="#FFFFFF" width="126.2"
                                height="149.2"></rect>
                        </g>
                    </svg>   
                    <p>{props.msg}</p>
                </div>
            </div>
        
                
        </div>        
    );
};

export default Loader;





