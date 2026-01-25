import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/stats")
      .then(res => res.json())
      .then(data => setStats(data));

    fetch("http://localhost:5000/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <p>Total Orders: {stats.totalOrders}</p>
        <p>Paid Orders: {stats.paidOrders}</p>
        <p>Revenue: ${stats.revenue / 100}</p>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.status}</td>
              <td>${order.amount / 100}</td>
              <td>
                <a
                  href={`http://localhost:5000/invoice/${order._id}`}
                  target="_blank"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
