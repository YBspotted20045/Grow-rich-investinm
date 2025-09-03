import React from "react";
import { useNavigate } from "react-router-dom";
import "./Deposit.css";   // ✅ Import the CSS file

const Deposit = () => {
  const navigate = useNavigate();

  const handleDepositClick = (amount) => {
    // Redirect to Vendor page and pass amount as state
    navigate("/vendor", { state: { amount } });
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-header">Make a Deposit</h2>

      <table className="deposit-table">
        <thead>
          <tr>
            <th>Package</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => handleDepositClick(5000)}>
            <td>₦5,000 Package</td>
            <td>Start with ₦5,000 and grow your wealth.</td>
            <td>
              <button className="vendor-button">Deposit ₦5,000</button>
            </td>
          </tr>
          <tr onClick={() => handleDepositClick(10000)}>
            <td>₦10,000 Package</td>
            <td>Double your returns with ₦10,000.</td>
            <td>
              <button className="vendor-button">Deposit ₦10,000</button>
            </td>
          </tr>
          <tr onClick={() => handleDepositClick(15000)}>
            <td>₦15,000 Package</td>
            <td>Go premium with ₦15,000 investment.</td>
            <td>
              <button className="vendor-button">Deposit ₦15,000</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Deposit;
