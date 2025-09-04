import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaWallet, FaUsers, FaMoneyCheck, FaBank, FaPlusCircle } from "react-icons/fa";
import API from "../axios";
import "./Dashboard.css";
import "./Account.css";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

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
        const res = await API.get("/account/me");
        if (res.data) setForm({
          bankName: res.data.bankName || "",
          accountNumber: res.data.accountNumber || "",
          accountHolder: res.data.accountHolder || "",
        });
      } catch { /* ignore */ }
    })();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.bankName || !form.accountNumber || !form.accountHolder) {
      setToast("Fill in all fields.");
      return;
    }
    try {
      setSaving(true);
      const res = await API.post("/account/add", form);
      setToast(res.data?.message || "Saved.");
    } catch (err) {
      setToast(err.response?.data?.message || "Unable to save account.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div className="loader">Loading...</div>;

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <h2>GrowRich</h2>
        <ul>
          <li><Link to="/dashboard"><FaHome /> Dashboard</Link></li>
          <li><Link to="/investments"><FaWallet /> Investments</Link></li>
          <li><Link to="/referrals"><FaUsers /> Referrals</Link></li>
          <li><Link to="/withdrawals"><FaMoneyCheck /> Withdrawals</Link></li>
          <li><Link to="/account" className="active"><FaBank /> Bank Account</Link></li>
          <li><Link to="/deposit"><FaPlusCircle /> Deposit</Link></li>
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
          <h3>Bank Details</h3>
          <div className="muted">User: {user?.fullname || "—"}</div>
        </div>

        <div className="content">
          <form className="account-card" onSubmit={save}>
            <div className="field">
              <label>Bank Name</label>
              <input
                name="bankName"
                placeholder="e.g. Access Bank"
                value={form.bankName}
                onChange={handleChange}
                aria-label="Bank Name"
              />
            </div>
            <div className="two-col">
              <div className="field">
                <label>Account Number</label>
                <input
                  name="accountNumber"
                  placeholder="e.g. 0123456789"
                  value={form.accountNumber}
                  onChange={handleChange}
                  aria-label="Account Number"
                />
              </div>
              <div className="field">
                <label>Account Holder</label>
                <input
                  name="accountHolder"
                  placeholder="Your full name"
                  value={form.accountHolder}
                  onChange={handleChange}
                  aria-label="Account Holder"
                />
              </div>
            </div>
            <button className="gold-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Details"}
            </button>
            {toast && (
              <div className="toast">
                {toast}
                <button onClick={() => setToast("")}>Dismiss</button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
