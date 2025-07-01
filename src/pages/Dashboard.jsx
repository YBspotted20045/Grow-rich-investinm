import React, { useEffect, useState } from 'react';
import API from '../axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await API.get('/user/me');
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-green-200">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Welcome, {user?.fullname}</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Investment Amount:</strong> ₦{user?.investmentAmount || '0'}</p>
          <p><strong>Referred Users:</strong> {user?.referrals?.length || 0}</p>
          <p><strong>Status:</strong> {user?.status}</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
