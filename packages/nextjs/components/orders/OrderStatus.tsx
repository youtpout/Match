import PropTypes from "prop-types";

export function OrderStatus({ status }) {
  const getStatus = () => {
    switch (status) {
      case 1:
        return "Active";
      case 2:
        return "Canceled";
      case 3:
        return "Sold";
      default:
        return "None";
    }
  };

  return <>{getStatus()}</>;
}

OrderStatus.propTypes = {
  status: PropTypes.number,
};
