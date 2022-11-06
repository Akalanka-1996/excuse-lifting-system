import React from "react";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import RequestForm from "../components/RequestForm";
import RequestTable from "../components/RequestTable";
import Footer from "../components/Footer";
import AdminHeader from "../components/AdminHeader";
import PostHeader from "../components/PostHeader";
import AdminTable from "../components/AdminTable";
import PostTable from "../components/PostTable";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user?.name}</h1>
      </section>

      {user?.userRole === "basic" ? (
        <>
        <RequestForm />
        <RequestTable />
        
        </>
      ) : (
        [user?.userRole === "admin" ? 
        
          <>
          <AdminHeader />
          <AdminTable />
          </>
           : 
          <>
           <PostHeader />
           <PostTable />
          </>
         ]
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
