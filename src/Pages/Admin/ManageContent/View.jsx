import React from "react";
import BackButton from "../../../Components/Common/BackButton";
import BreadCrumbCommon from "../../../Components/Common/BreadCrumbCommon";
import DeleteButton from "../../../Components/Common/DeleteButton";
import editicon from "../../../assets/images/Icons/edit-icon.svg";
import Layout from "../../../Layout/Admin/Layout";
import { Link, useNavigate } from "react-router-dom";
import component from "../../../assets/images/component.png";

function ViewContent(props) {
  const navigate = useNavigate();
  return (
    <Layout activePage={'Manage Content'}>
      <BackButton />
      <BreadCrumbCommon crumbs={['Articles', 'Add Articles']} />
      <div className={"card-wrapper"}>
        <div className="custom-card-header">
          <div>
            <p className={"text-secondary f-18 fw-500"}>
              {'Articles Details'}
            </p>
            <p className={"text-muted f-12"}>
              {'Update or change the Articles information'}
            </p>
          </div>
          <div className="d-flex justify-content-end gap-3 align-items-center ">
            <Link
              to={`/admin/ManageContent/edit`}
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
        <div className="mb-3 p-5">
          <div className="row g-1">
            <div className="col-md-3" role="button" onClick={() => navigate('/admin/managecontent/view')}>
              <img src={component} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8" role="button" onClick={() => navigate('/admin/managecontent/view')}>
              <div className="card-body">
                <h5 className="card-title ">Demo Name</h5>
                <p className="card-text"><small className="text-muted f-14">Posted date : 12/05/2022</small></p>
                <p className="card-text mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus dicta reprehenderit exercitationem et voluptatibus ullam natus excepturi ipsam tenetur dignissimos amet, quisquam assumenda sit, cum libero vitae inventore corrupti explicabo!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem delectus voluptas sit minima, ex, praesentium aliquam totam eum nisi in porro dolorem optio earum iusto qui quod! Beatae, expedita. Consectetur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default ViewContent;
