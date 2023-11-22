import React, { useEffect, useState } from "react";

import { Avatar, Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [loading, setLoading] = useState(true);
  const [dataApi, setDataApi] = useState([]);
  const navigate = useNavigate();
  const dataRegister = JSON.parse(localStorage.getItem("register"));
  useEffect(() => {
    if (!dataRegister) {
      navigate("/register");
    }

    const res = axios.get(
      "https://649cf38a9bac4a8e669d1b36.mockapi.io/todolist"
    );
    res
      .then((data) => {
        setDataApi(data.data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("register");
    navigate("/register");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fristName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
    },
  ];
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "10px",
            }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Typography sx={{ margin: "0 40px 0 15px" }}>
              {dataRegister.firstName + dataRegister.lastName}
            </Typography>
            <Button variant="contained" onClick={handleLogout}>
              log out
            </Button>
          </Box>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={dataApi}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </>
      )}
    </>
  );
}

export default Home;
