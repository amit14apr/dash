import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import AscIcon from "../controls/AscIcon";
import DescIcon from "../controls/DescIcon";

import { useDispatch, useSelector } from "react-redux";

import { articleAction } from "../../../_actions";
const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: 700,
      color: "#170f4f",
      backgroundColor: "#d0d0d0",
      width: 120,
    },
    "& tbody td": {
      fontWeight: "400",
      backgroundColor: "#fff",
    },
    "& tbody tr:hover": {
      backgroundColor: "#E8E7EE",
    },
  },
}));

export default function useTable(
  record,
  headCells,
  filterFn,
  frontImage,
  textVal,
  backImage
) {
  const classes = useStyles();
  const records = record.data || [];
  const totalPages = record.totalRecords;
  const pages = [10, 20];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    record.noOfRecordsInCurrentPage || 10
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [order, setOrder] = useState("asc");
  const [defaultView, setDefaultView] = useState(true);
  const [pageOrder, setPageOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("description.code");

  const dispatch = useDispatch();

  useEffect(() => {
    if (record) {
      setPage(record.currentPage - 1);
    }
  }, [record]);

  const TblContainer = (props) => (
    <Table className="tableData">{props.children}</Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = order === "asc";
      setDefaultView(false);
      setPageOrder(order);
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
      let search = "";
      if (textVal) {
        search = "search";
      }

      dispatch(
        articleAction.listArticle(
          `?${payloadPagingAndIndex()}&filterFields=${search}&filterValues=${textVal}&sort=${order}&orderBy=${cellId}`
        )
      );
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.sortField}>
              <TableSortLabel
                hideSortIcon={false}
                IconComponent={
                  headCell.label
                    ? orderBy === headCell.sortField &&
                      !defaultView &&
                      order === "asc"
                      ? DescIcon
                      : AscIcon
                    : ""
                }
                onClick={() => handleSortRequest(headCell.sortField)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    let search = "";
    if (textVal) {
      search = "search";
    }
    setPageIndex(newPage + 1);
      dispatch(
        articleAction.listArticle(
          `?pageNumber=${
            newPage + 1
          }&limit=${rowsPerPage}&filterFields=${search}&filterValues=${textVal}&sort=${pageOrder}&orderBy=${orderBy}`
        )
      );
    
  };

  const handleChangeRowsPerPage = (event) => {
    let search = "";
    if (textVal) {
      search = "search";
    }
    setRowsPerPage(event.target.value);
   
      dispatch(
        articleAction.listArticle(
          `?pageNumber=${pageIndex}&limit=${event.target.value}&filterFields=${search}&filterValues=${textVal}&sort=${pageOrder}&orderBy=${orderBy}`
        )
      );
   
  };

  const TblPagination = () => (
    <TablePagination
      style={{ width: "100%" }}
      className="tablePagination"
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      colSpan={3}
      count={totalPages}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  const recordsAfterPagingAndSorting = () => {
    return records;
  };
  const payloadPagingAndIndex = () => {
    let payloadData = `pageNumber=${pageIndex}&limit=${rowsPerPage}`;
    return payloadData;
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    payloadPagingAndIndex,
    order,
    orderBy,
    setOrder,
    setOrderBy,
    setDefaultView,
  };
}
