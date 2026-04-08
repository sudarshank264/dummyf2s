import React from 'react';

const Ticker = () => {
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        <span className="ticker-label">Breaking</span>
        <p className="ticker-text">
          🇨🇦 <a href="#blogs">Canada to Grant Permanent Residency to 33,000 Temporary Workers</a> — New IRCC TR-to-PR pathway now open.
          &nbsp;&nbsp;|&nbsp;&nbsp;
          🇩🇪 Germany Opportunity Card now accepting applications from skilled workers worldwide.
        </p>
      </div>
    </div>
  );
};

export default Ticker;
