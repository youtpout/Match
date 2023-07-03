import PropTypes from "prop-types";

export function OrderStatus({ status }) {
  const getStatus = () => {
    switch (status) {
      case 1:
        return (
          <span className="tooltip" data-tip="Active">
            🔵
          </span>
        );
      case 2:
        return (
          <span className="tooltip" data-tip="Canceled">
            🔴
          </span>
        );
      case 3:
        return (
          <span className="tooltip" data-tip="Sold">
            🟢
          </span>
        );
      default:
        return (
          <span className="tooltip" data-tip="Unknow">
            🟤
          </span>
        );
    }
  };

  return <>{getStatus()}</>;
}

OrderStatus.propTypes = {
  status: PropTypes.number,
};
