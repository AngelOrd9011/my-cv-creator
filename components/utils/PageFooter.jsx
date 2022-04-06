import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
const PageFooter = () => {
  return (
    <div className="sticky-footer">
      <div className="page-footer">
        <span className="contact">
          <FontAwesomeIcon icon={faGithub} />
        </span>
        <span className="contact">
          <FontAwesomeIcon icon={faFacebook} />
        </span>
        <span className="contact">
          <FontAwesomeIcon icon={faWhatsapp} />
        </span>
        <span className="copy-rights">
          <FontAwesomeIcon icon={faCopyright} /> {'  '}AngelOrd9011
        </span>
      </div>
    </div>
  );
};
export default PageFooter;
