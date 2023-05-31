import React from 'react';
import editicon from "../../../assets/images/Icons/edit-icon.svg";
import Layout from '../../../Layout/Admin/Layout';
import BreadCrumbCommon from '../../../Components/Common/BreadCrumbCommon';
import { useNavigate } from "react-router-dom";
import LogoModal from '../../../Components/ManageContent/LogoModal';
import SocialMediaLinksModal from '../../../Components/ManageContent/SocialMediaLinks';
import ColorModal from '../../../Components/ManageContent/Color';
import PagesNameModal from '../../../Components/ManageContent/PagesName';
import HeaderOnly from "../../../Components/Common/HeaderOnly";


function ManageContent() {
    const navigate = useNavigate();

    return (
        <Layout activePage={'Manage Content'}>
            <p className={"f-18 fw-500"} style={{ color: '#161002' }}>{"Manage Contents"}</p>
            <BreadCrumbCommon crumbs={["Manage Contents"]} />
            <div className={"card-wrapper"}>
                    <HeaderOnly
                        title={'Manage Content'}
                        subTitle={'View and manage your content directly'}
                    />
                <div className="row g-4 p-5">
                    <div className="col">
                        <LogoModal logoText={'Logo'} icon={editicon} />
                    </div>
                    <div className="col">
                        <SocialMediaLinksModal logoText={'Social media links'} icon={editicon} />
                    </div>
                    <div className="col">
                        <PagesNameModal logoText={'Pages Name'} icon={editicon} />
                    </div>
                    <div className="col">
                        <ColorModal logoText={'Color'} icon={editicon} />
                    </div>
                </div>

                {/* <div className={"card-wrapper"}>
                    <div className="custom-card-header ">
                        <div>
                            <h2 className="f-18 text-primary fw-500">{'Articles'}</h2>
                            <p className="text-muted f-14">{'View and manage your articles directly from here'}</p>
                        </div>
                        <Button className='primary--btn' onClick={() => navigate(`/admin/ManageContent/create`)}>+ Add New</Button>
                    </div>
                    <div className='border-top mt-3'>
                        <div className="mb-3 p-4">
                            <div className="row g-3">
                                <div className="col-md-3" role="button" onClick={() => navigate('/admin/managecontent/view')}>
                                    <img src={component} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-6" role="button" onClick={() => navigate('/admin/managecontent/view')}>
                                    <div className="card-body">
                                        <h5 className="card-title my-2">Demo Name</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <div className="col-md-3 border-left px-5">
                                    <p className='text-muted mt-5  mb-3 f-16'>posted: 11/5/2023</p>
                                    <div className="my-2 d-flex align-items-center">
                                        <Link
                                            to={`/admin/managecontent/view`}
                                        >
                                            <img
                                                className="icon-13 mr-15 action-edit-icon"
                                                src={editicon}
                                                alt="Edit"
                                            />
                                        </Link>
                                        <DeleteButton
                                            name="Items"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-top mt-3'>
                        <div className="mb-3 p-4">
                            <div className="row g-3">
                                <div className="col-md-3 cursor-pointer" role="button" onClick={() => navigate('/admin/managecontent/view')}>
                                    <img src={component} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-6" role="button" onClick={() => navigate('/admin/managecontent/view')}>
                                    <div className="card-body">
                                        <h5 className="card-title my-2">Demo Name 1</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <div className="col-md-3 border-left px-5">
                                    <p className='text-muted mt-5  mb-3 f-16'>posted: 11/5/2023</p>
                                    <div className="my-2 d-flex align-items-center">
                                        <Link
                                            to={`/admin/managecontent/view`}
                                        >
                                            <img
                                                className="icon-13 mr-15 action-edit-icon"
                                                src={editicon}
                                                alt="Edit"
                                            />
                                        </Link>
                                        <DeleteButton
                                            name="Items"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center align-items-center my-5'>
                        <Button className='primary--btn--outline mx-auto' onClick={() => navigate(`/admin/managecontent/viewall`)}>View All</Button>
                    </div>
                </div> */}
            </div>
        </Layout>
    );
}

export default ManageContent;
