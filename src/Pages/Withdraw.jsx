import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axios";
import "./Dashboard.css";
import "./Withdraw.css";

export default function Withdraw() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user, bank account, and previous withdrawals
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
        const acc = await API.get("/account/me");
        setAccount(acc.data);
      } catch {
        setAccount(null);
      }
      try {
        const h = await API.get("/withdrawals");
        setHistory(h.data.withdrawals || []);
      } catch {
        setHistory([]);
      }
    })();
  }, [navigate]);

  const requestWithdraw = async (e) => {
    e.preventDefault();
    if (!account?._id) {
      setToast("Add your bank account first.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setToast("Enter a valid amount.");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("/withdrawals", { amount: Number(amount) });
      setToast(res.data?.message || "Withdrawal request sent.");
      setAmount("");
      const h = await API.get("/withdrawals");
      setHistory(h.data.withdrawals || []);
    } catch (err) {
      setToast(err.response?.data?.message || "Unable to request withdrawal.");
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
          <li><Link to="/withdrawals" className="active">Withdrawals</Link></li>
          <li><Link to="/account">Bank Account</Link></li>
          <li><Link to="/deposit">Deposit</Link></li>
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
          <h3>Request Withdrawal</h3>
          <div className="muted">Balance: ₦{user?.balance ?? 0}</div>
        </div>

        <div className="content withdraw-grid">
          <form className="withdraw-card" onSubmit={requestWithdraw}>
            <div className="field">
              <label>Amount (NGN)</label>
              <input
                type="number"
                min="1000"
                step="500"
                placeholder="e.g. 10,000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {account ? (
              <div className="bank-box">
                <div>Bank: <b>{account.bankName}</b></div>
                <div>Acct Name: <b>{account.accountHolder}</b></div>
                <div>Acct No: <b>{account.accountNumber}</b></div>
              </div>
            ) : (
              <div className="warn">
                No bank account added. <Link to="/account">Add now</Link>.
              </div>
            )}

            <button className="gold-btn" disabled={loading}>
              {loading ? "Submitting..." : "Request Withdrawal"}
            </button>
            {toast && <div className="toast">{toast}</div>}
          </form>

          <div className="history">
            <h4>Recent Requests</h4>
            <div className="table">
              <div className="thead">
                <span>Date</span><span>Amount</span><span>Status</span>
              </div>
              {history.length === 0 && <div className="empty">No requests yet.</div>}
              {history.map((w) => (
                <div className="trow" key={w._id}>
                  <span>{new Date(w.requestedAt).toLocaleString()}</span>
                  <span>₦{w.amount}</span>
                  <span className={`tag ${w.status}`}>{w.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
