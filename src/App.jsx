import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const App = () => {
  const [fieldname, setFieldname] = useState("");
  const [headername, setHeadername] = useState("");

  const [rows, setRows] = useState([
    { id: 1 },
  ]);

  const [columns, setColumns] = useState([
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    { field: "id", headerName: "ID", width: 90, editable: true },
  ]);

  const addRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows(prevRows => [...prevRows, newRow]);
  };

  const addColumn = (e) => {
    e.preventDefault();
    const newColumn = {
      field: fieldname,
      headerName: headername.charAt(0).toUpperCase() + headername.slice(1),
      width: 150,
      editable: true,
      sortable: true,
    };
    setColumns([...columns, newColumn]);
    document.querySelector(".NewFieldDiv").style.display = "none";
    setFieldname("");
    setHeadername("");
  };

  const displayNewFieldDiv = () => {
    document.querySelector(".NewFieldDiv").style.display = "flex";
  };

  const handleDelete = (id) => {
    const dec=confirm("Do you want to delete this row?")
    if(dec){
      setRows(prevRows => prevRows.filter(row => row.id !== id));
    }
  };

  return (
    <>
      <div className="NewFieldDiv hidden bg-[#1b1b1b85] h-[100vh] w-[100%] absolute z-10 items-center justify-center">
        <form onSubmit={addColumn} className="box flex flex-col gap-4 items-center p-4 pt-16 h-[50vh] rounded-2xl bg-[#00000091] text-black w-[25%]">
          <input
            className="p-2 text-sm w-[100%] rounded-2xl font-medium"
            type="text"
            value={fieldname}
            onChange={(e) => setFieldname(e.target.value)}
            placeholder="Enter the Field name"
            required
          />
          <input
            className="p-2 text-sm w-[100%] rounded-2xl font-medium"
            type="text"
            value={headername}
            onChange={(e) => setHeadername(e.target.value)}
            placeholder="Enter the HeaderName"
            required
          />
          <button type="submit" className="border-solid border-[2px] border-black p-2 rounded-2xl bg-blue-800 text-white">
            Create New Column
          </button>
        </form>
      </div>

      <button
        className="absolute top-8 right-10 border-solid border-[2px] border-black p-2 rounded-2xl bg-blue-800 text-white"
        onClick={displayNewFieldDiv}
      >
        + Add New Column
      </button>

      <div className="flex justify-center items-center h-[90vh]">
        <Box sx={{ border: "2px solid black", height: "70vh", width: "50%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hideFooterPagination
            disableRowSelectionOnClick
            processRowUpdate={(updatedRow, originalRow) => mySaveOnServerFunction(updatedRow)}
          />
        </Box>
      </div>

      <button
        className="absolute bottom-20 left-20 border-solid border-[2px] border-black p-2 rounded-2xl bg-blue-800 text-white"
        onClick={addRow}
      >
        + Add New Row
      </button>
    </>
  );
};

export default App;
