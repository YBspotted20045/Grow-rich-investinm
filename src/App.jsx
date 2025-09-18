export default function App() {
  return (
    <Routes>
      {/* Default: if logged in → dashboard, otherwise → signup */}
      <Route
        path="/"
        element={
          localStorage.getItem("gr_token") ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Signup />
          )
        }
      />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ── Protected User Layout ── */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="account" element={<Account />} />
        <Route path="referrals" element={<ReferralDashboard />} />
      </Route>

      {/* ── Admin Routes ── */}
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="deposits" element={<ManageDeposits />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
