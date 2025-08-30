import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import API from "../axios";
import "./Dashboard.css";
import "./Deposit.css";

export default function Deposit() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [user, setUser] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    vendorId: "",
    amount: "",
    reference: "",
    receipt: null,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // If user came from InvestmentForm, prefill amount & reference
  useEffect(() => {
    const amt = params.get("amount");
    const ref = params.get("ref");
    setForm((f) => ({
      ...f,
      amount: amt || f.amount,
      reference: ref || f.reference,
    }));
  }, [params]);

  // Fetch user + vendors
  useEffect(() => {
    (async () => {
      try {
        const me = await API.get("/auth/me");
        setUser(me.data.user);
      } catch {
        navigate("/login");
        return;
      }
      try {
        const res = await API.get("/payment/vendors"); // expected backend route
        setVendors(res.data.vendors || []);
      } catch {
        // fallback empty
        setVendors([]);
      }
    })();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "receipt") {
      setForm((f) => ({ ...f, receipt: files[0] || null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const submitDeposit = async (e) => {
    e.preventDefault();
    if (!form.vendorId || !form.amount || !form.reference || !form.receipt) {
      setToast("Please fill all fields and attach your receipt.");
      return;
    }
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("vendorId", form.vendorId);
      fd.append("amount", form.amount);
      fd.append("reference", form.reference);
      fd.append("receipt", form.receipt);

      const res = await API.post("/deposits", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setToast(res.data?.message || "Deposit submitted. Awaiting approval.");
      setForm({ vendorId: "", amount: "", reference: "", receipt: null });
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setToast(err.response?.data?.message || "Unable to submit deposit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <h2>GrowRich</h2>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/investments">Investments</Link></li>
          <li><Link to="/referrals">Referrals</Link></li>
          <li><Link to="/withdrawals">Withdrawals</Link></li>
          <li><Link to="/account">Bank Account</Link></li>
          <li><Link to="/deposit" className="active">Deposit</Link></li>
        </ul>
        <button
          className="gold-btn mt-4"
          onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
        >
          Logout
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <h3>Upload Deposit Receipt</h3>
          <div className="muted">User: {user?.fullname || "—"}</div>
        </div>

        <div className="content">
          <form className="deposit-card" onSubmit={submitDeposit}>
            <div className="field">
              <label>Choose Vendor</label>
              <select
                name="vendorId"
                value={form.vendorId}
                onChange={handleChange}
                required
              >
                <option value="">Select vendor</option>
                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name} • {v.bankName} • {v.accountNumber}
                  </option>
                ))}
              </select>
              <small className="hint">
                Vendors are payment channels only. Upload your receipt here to confirm.
              </small>
            </div>

            <div className="two-col">
              <div className="field">
                <label>Amount (NGN)</label>
                <input
                  type="number"
                  name="amount"
                  min="1000"
                  step="500"
                  placeholder="e.g. 20,000"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Payment Reference</label>
                <input
                  type="text"
                  name="reference"
                  placeholder="Bank transfer reference"
                  value={form.reference}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Receipt (image/PDF)</label>
              <input type="file" accept="image/*,.pdf" name="receipt" onChange={handleChange} />
            </div>

            <button className="gold-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Deposit"}
            </button>

            {toast && <div className="toast">{toast}</div>}
          </form>
        </div>
      </main>
    </div>
  );
        }
