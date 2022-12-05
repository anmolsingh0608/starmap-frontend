import Layout from "../../../component/admin/layout";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axiosUrl from "../../../component/axiosUrl";

const Orders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetch = () => {
      axiosUrl.defaults.headers.common["authorization"] = `Bearer ${token}`;
      axiosUrl
        .get("/api/orders")
        .then((res) => setOrders(res.data.orders))
        .catch((err) => console.log(err));
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
    },
    {
      name: "region",
      selector: (row) => row.region,
      sortable: true,
    },
    {
      name: "view",
      selector: (row) => (
        <Link
          to={{
            pathname: `/admin/orders/${row._id}`,
          }}
        >
          View
        </Link>
      ),
    },
  ];

  console.log(orders);

  return (
    <Layout>
      <DataTable columns={columns} data={orders} pagination />
    </Layout>
  );
};

export default Orders;
