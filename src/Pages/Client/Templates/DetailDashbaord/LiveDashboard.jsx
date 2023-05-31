import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function LiveDashboard() {
  const iframeUrl = `<iframe width="100%" height="500px"   src="https://onedrive.live.com/embed?resid=DEF089C22750BA74%212357&authkey=%21AHym98Cy2v3Kydo&em=2&Item=dashboard&wdHideGridlines=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edesNext=false&resen=true&ed1JS=false"></iframe>`;
  return (
    <div className="live-dashbaord">
      <div className="row ">
        <div className="col-5 p-4 ">
          <h1>Live Dashboard test</h1>
          {/* <a href={iframeUrl} target="_blank" rel="noopener noreferrer">{iframeUrl}</a> */}
          <div className="mt-4" style={{wordWrap:'break-word'}}>
            {iframeUrl}
          </div>
          <Button className="primary--btn mt-4">Try Now</Button>
        </div>
        <div className="col-4">
          <iframe
            style={{position: "relative", height: "100%", width: "100%"}}
            src="https://onedrive.live.com/embed?resid=DEF089C22750BA74%212357&authkey=%21AHym98Cy2v3Kydo&em=2&Item=dashboard&wdHideGridlines=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edesNext=false&resen=true&ed1JS=false"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default LiveDashboard;
