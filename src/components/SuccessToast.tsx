import React from "react";
import { Toast } from "react-bootstrap";

interface SuccessToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  show,
  onClose,
  message,
}) => {
  return (
    <div
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
    >
      <Toast show={show} onClose={onClose} delay={3000} autohide bg="success">
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
};

export default SuccessToast;
