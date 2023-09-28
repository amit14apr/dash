import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import { useDispatch, useSelector } from 'react-redux';

import { inventoryActions } from '../../../_actions';
const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: 700,
            color: '#170f4f',
            backgroundColor: '##E8E7EE',
            width: 120,
        },
        '& tbody td': {
            fontWeight: '400',
            backgroundColor: '#fff',
        },
        '& tbody tr:hover': {
            backgroundColor: '#E8E7EE',
        },
    },
}))

export default function useTable(record, headCells, filterFn, warehouseType,textVal) {

    const classes = useStyles();
    const records = record.content || [];
    const totalPages = record.totalElements;
    const pages = [10, 20]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(record.size || 10)
    const [pageIndex, setPageIndex] = useState(0);
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const dispatch = useDispatch();
    const TblContainer = props => (
        <Table className="tableData">
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}>

                            {headCell.label}
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(inventoryActions.listWarehouse(`?offset=${newPage}&limit=${rowsPerPage}&warehouseType=${warehouseType}&warehouseNameOrCode=${textVal}`));
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        dispatch(inventoryActions.listWarehouse(`?offset=${page}&limit=${event.target.value}&warehouseType=${warehouseType}&warehouseNameOrCode=${textVal}`));
    }

    const TblPagination = () => (<TablePagination className='tablePagination'
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        colSpan={3}
        count={totalPages}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />)

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return records;
        // return stableSort(filterFn.fn(records), getComparator(order, orderBy))
        //     .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }
    const payloadPagingAndIndex = () => {
        let payloadData = `offset=${page}&limit=${rowsPerPage}`;
        return payloadData;
        // return stableSort(filterFn.fn(records), getComparator(order, orderBy))
        //     .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        payloadPagingAndIndex
    }
}
