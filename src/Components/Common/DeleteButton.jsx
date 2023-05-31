import React from "react";
import { Button, Modal, message } from "antd";
import RemoveCircleIcon from "../../assets/images/Icons/delete-icon.svg";
import RemoveCircleIconWhite from "../../assets/images/Icons/Delete_icon_white.svg";
import dangerIcon from "../../assets/images/SVGS/danger.svg";
import { apiClient } from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useLanguage } from '../../Constants/LanguageContext';

function DeleteButton({
  name = "",
  apiEndpoint = "",
  queryKey = "",
  text = "",
  noOfItems = 0,
  showWhiteImg = false,
  onDelete,
  isNavigate = false,
  navigateTo,
}) {
  const [isDeleteAble, setIsDeleteAble] = React.useState(noOfItems === 0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const navigate = useNavigate();
  const toggleModalState = () => {
    setIsModalVisible(!isModalVisible);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return apiClient.post(apiEndpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toggleModalState();
      message.success("Record Deleted Successfully");
      if (isNavigate) {
        navigate(navigateTo);
      }
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div>
      <span className="cursor-pointer" onClick={toggleModalState}>
        <img
          src={showWhiteImg ? RemoveCircleIconWhite : RemoveCircleIcon}
          alt="delete"
        />
        {text}
      </span>

      {isDeleteAble ? (
        <Modal
          title={<p className={"f-18 fw-500"}>Delete Confirmation</p>}
          visible={isModalVisible}
          footer={null}
          onCancel={toggleModalState}
        >
          <div className="d-flex flex-column align-items-center">
            <img src={dangerIcon} alt="danger" />
            <p
              className={"f-14 fw-600 text-center w-100"}
              style={{
                background: "#FFE8E8",
                color: "#940909",
                padding: "10px 20px",
                marginTop: 20,
              }}
            >
              Are you sure you want to delete this?
            </p>
            <div
              className="d-flex justify-content-end w-100 mb-3"
              style={{ marginTop: 50 }}
            >
              <Button onClick={toggleModalState} className={"mx-2"}>
                Cancel
              </Button>
              <Button type={"primary"} onClick={handleDelete} danger>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      ) : (
        <>
          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={toggleModalState}
          >
            <div className="d-flex flex-column align-items-center">
              <img src={dangerIcon} alt="danger" />
              <p className={"f-18 fw-600 text-danger"}>
                You cannot perform this action
              </p>
              <p
                className={"f-14 fw-500 text-muted w-75"}
                style={{ textAlign: "center" }}
              >
                Because this category contains {noOfItems} items, first you have
                to adjust them, and then you will be able to delete this.
              </p>

              <Button
                className={"mt-2"}
                type={"primary"}
                onClick={toggleModalState}
                danger
              >
                OK
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default DeleteButton;
