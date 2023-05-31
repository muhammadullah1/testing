import React from "react";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import DeleteButton from "../../../Components/Common/DeleteButton";
import editicon from "../../../assets/images/Icons/edit-icon.svg";
import Layout from "../../../Layout/Admin/Layout";
import { Link, useNavigate } from "react-router-dom";
import component from "../../../assets/images/component.png";
import HeaderWithButtan from "../../../Components/Common/HeaderWithButtan";

function ViewContent(props) {
    const navigate = useNavigate();
    return (
        <Layout activePage={'Manage Content'}>
            <BackButton />
            <BreadCrumbCommon crumbs={['Articles']} />
            <div className={"card-wrapper"}>
                <HeaderWithButtan
                    title={'Articles'}
                    desc={'View and manage your articles directly from here'}
                    btnText={'+ Add New'}
                    goto={`/admin/managecontent/create`}
                />
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
            </div>
        </Layout>
    );
}
export default ViewContent;
