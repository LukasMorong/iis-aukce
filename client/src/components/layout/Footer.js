import React from 'react';

import './Footer.css'

const Footer = () => {
    return(
        <div className="main-footer">
            <div className="container">
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} IIS-AUKCE | xmoron01 | xjanci14 | xmisia01
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;