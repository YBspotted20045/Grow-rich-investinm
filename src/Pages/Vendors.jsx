import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../axios";
import "./Dashboard.css";
import "./Vendors.css";

export default function Vendors() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [vendors, setVendors] = useState([]);

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
        const res = await API.get("/payment/vendors");
        setVendors(res.data.vendors || []);
      } catch {
        setVendors([]);
      }
    })();
  }, [navigate]);

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
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/vendors" className="active">Vendors</Link></li>
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
          <h3>Approved Vendors</h3>
          <div className="muted">{vendors.length} available</div>
        </div>

        <div className="content vendors-grid">
          {vendors.length === 0 && (
            <div className="empty">No vendors available right now.</div>
          )}
          {vendors.map((v) => (
            <div className="vendor-card" key={v._id}>
              <div className="head">
                <div className="avatar">{(v.name || "V")[0]}</div>
                <div>
                  <div className="title">{v.name}</div>
                  <div className="sub">
                    {v.bankName} • {v.accountNumber}
                  </div>
                </div>
              </div>

              {v.whatsapp && (
                <a
                  className="wa-btn"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${v.whatsapp.replace(/\D/g, "")}`}
                >
                  Message on WhatsApp
                </a>
              )}

              <Link className="gold-btn outline" to="/deposit">
                Upload Receipt → Deposit
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
              }
