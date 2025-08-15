import { useState } from "react";

export default function Landing() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [email, setEmail] = useState("");
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState("");

  const investmentPlans = [
    { amount: 5000, label: "₦5,000" },
    { amount: 10000, label: "₦10,000" },
    { amount: 15000, label: "₦15,000" },
  ];

  const vendors = [
    { name: "WhatsApp", link: "https://wa.me/your-number" },
    { name: "Telegram", link: "https://t.me/your-username" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan || !email || !proof) {
      setMessage("Please fill all fields and upload proof of payment.");
      return;
    }
    // Here we will later connect to backend
    setMessage("Submitted successfully! Admin will confirm your payment.");
    setEmail("");
    setSelectedPlan("");
    setProof(null);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to GrowRichInvestments</h1>
      <h2>Choose an Investment Plan:</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        {investmentPlans.map((plan) => (
          <button
            key={plan.amount}
            style={{
              padding: "10px 20px",
              backgroundColor: selectedPlan === plan.amount ? "#4CAF50" : "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            onClick={() => setSelectedPlan(plan.amount)}
          >
            {plan.label}
          </button>
        ))}
      </div>

      <h2>Choose a Vendor to Make Payment:</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        {vendors.map((vendor) => (
          <a
            key={vendor.name}
            href={vendor.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 20px",
              backgroundColor: "#f39c12",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            {vendor.name}
          </a>
        ))}
      </div>

      <h2>Submit Your Payment Proof:</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", margin: "5px 0", width: "100%" }}
        /><br />

        <label>Upload Proof:</label><br />
        <input
          type="file"
          onChange={(e) => setProof(e.target.files[0])}
          style={{ margin: "5px 0", width: "100%" }}
        /><br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
}
