import React from "react";
import Layout from "../../../Layout/Client/Layout";
import HomeLandingPage from "../../../Components/Home/HomeLandingPage";
import OurCollection from "../../../Components/Home/OurCollection";

function Home() {
    return (
        <Layout footer={true} chatWithUs={true} showLogin={true}>
            <HomeLandingPage />
            <OurCollection />
        </Layout>
    )
}

export default Home;
