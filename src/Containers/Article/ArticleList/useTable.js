import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import AscIcon from '../controls/AscIcon';
import DescIcon from '../controls/DescIcon';

import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../../_actions';
const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: 700,
            color: '#170f4f',
            backgroundColor: '#d0d0d0',
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

export default function useTable(record, headCells, filterFn, articleType,textVal, marketType) {

    const classes = useStyles();
    
    const records = record.content || [];
    console.log("############========================= record.size ==="+record.numberOfElements)
    const totalPages = record.totalPages;
    console.log("############========================= record.pageable.offset ==="+ record.pageable)
    const pages = [10, 20]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(record.numberOfElements || 10)
    const [pageIndex, setPageIndex] = useState(0);
    const [order, setOrder] = useState('desc');
    const [pageOrder, setPageOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('updatedAt');
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (record) {
    //       setPage(record.number);
    //     }
    //   }, [record]);

    const TblContainer = props => (
        <Table className="tableData">
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = order === 'asc';
            setPageOrder(order);
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId);
            let search ='';
            if(textVal){
                search = 'search';
            }
            
                dispatch(userActions.getUserList(`?${payloadPagingAndIndex()}&filterFields=${search}&filterValues=${textVal}&sort=${order}&orderBy=${cellId}`));
           
            
        }
        
        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                      
                        <TableCell key={headCell.sortField}
                        >
                           <TableSortLabel
                           hideSortIcon={false}
                           IconComponent={ headCell.label ? (orderBy === headCell.sortField &&  order === 'asc' ? DescIcon : AscIcon) : '' }
                           onClick={() => handleSortRequest(headCell.sortField)}>
                            {headCell.label}
                           </TableSortLabel>
                        </TableCell>
                        ))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        //   setPageIndex(newPage)
           setPage(newPage);
           let firstName = "";
           if(textVal)
           firstName=firstName + '=';
           dispatch(userActions.getUserList(`?offset=${newPage}&limit=${rowsPerPage}&${firstName}${textVal}&sort=${pageOrder}&orderBy=${orderBy}`));
    }

    const handleChangeRowsPerPage = (event) => {
       
        setRowsPerPage(event.target.value)
        let firstName = "";
           if(textVal)
           firstName=firstName + '=';
        dispatch(userActions.getUserList(`?offset=${pageIndex}&limit=${event.target.value}&${firstName}${textVal}&sort=${pageOrder}&orderBy=${orderBy}`));
        
       
    }

    const TblPagination = () => (<TablePagination style={{width:"100%"}} className='tablePagination'
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
        payloadPagingAndIndex,
        order,
        orderBy,
        setOrder,
        setOrderBy,
    }
}
