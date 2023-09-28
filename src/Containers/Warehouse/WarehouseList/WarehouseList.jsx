import React, { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { makeStyles, Toolbar, InputAdornment } from '@material-ui/core';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Input, Checkbox, PasswordInput, PasswordStrengthIndicator, SelectBox } from '../../../Components';
import useTable from "./useTable";
import LongMenu from './actionItems';

import { useDispatch, useSelector } from 'react-redux';
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";

import { inventoryActions } from '../../../_actions';

import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    pageContent: {
        backgroundColor: "#d0d0d0",
        whiteSpace: "nowrap",
        width: 1080,
        marginBottom:20
    },
    searchInput: {
        width: '',
        margin: '0 5'
    },
    selectInput: {
        width: '200'
    }
}))


const headCells = [
    { id: 'warehouseName', label: 'Name', editable: true },
    { id: 'code', label: 'Code', editable: true },
    { id: 'type', label: 'Type', editable: true },
    { id: 'owner', label: 'Owner', editable: true },
    { id: 'businessNature', label: 'Business Nature', editable: true },
    { id: 'status', label: 'Status', editable: true },
    {
        id: 'action',
        label: '',
        accessor: '[row identifier to be passed to button]'
    },
]
function WarehouseList(props) {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory)
    useEffect(() => {
        const { listWarehouse } = inventory;
        console.log(">>list warehouse>>",listWarehouse)
        setRecords(listWarehouse || [])
        setShowPagination( listWarehouse && listWarehouse.totalElements > 10 ? true : false)
    },[inventory]);

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [showPagination, setShowPagination] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [textVal, setTextVal] = useState('');


    const [warehouseType, setWarehouseType] = useState('All');

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log(">>>",e.target);
        setWarehouseType(value)
    }

    const resetForm = (e) => {
        setTextVal('');
        setWarehouseType('All')
        dispatch(inventoryActions.listWarehouse());
        setFilterFn({
            fn: items => {
                return items;
            }
        })

    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        payloadPagingAndIndex
    } = useTable(records, headCells, filterFn,warehouseType,textVal);
    let isData = recordsAfterPagingAndSorting().length ? true : false;
    
    const handleSearch = (e) => {
        dispatch(inventoryActions.listWarehouse(`?${payloadPagingAndIndex()}&warehouseType=${warehouseType}&warehouseNameOrCode=${textVal}`));
    }
    const history = useHistory();
    const handleRowClick = (row) => {
        history.push(`/warehouse/${row}`);
    }

    return (
        <>
            <div style={{ flex: 1 }}>
                <Controls.SelectDropoDown
                    name={warehouseType}
                    label="Warehouse Type"
                    value={warehouseType}
                    defaultValue={warehouseType}
                    onChange={handleInputChange}
                />

                <Controls.Input
                    label="Search by name or code"
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <Search style={{ cursor: "pointer" }} onClick={handleSearch} />
                        </InputAdornment>)
                    }}
                    value={textVal}
                    onChange={e => setTextVal(e.target.value)}
                />

                <div className='button-cont' style={{ display: "inline-block" }} ><Button variant="contained" onClick={resetForm}>Reset</Button></div>
            </div>
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    {isData ? <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.companyDetails.ownerName}</TableCell>
                                <TableCell>{item.companyDetails.businessNature}</TableCell>
                                <TableCell >{item.status}</TableCell>
                                <TableCell align="center">
                                    <LongMenu onClick={item} />
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>

                        : <TableRow key={1}>
                            <TableCell align="center" style={{ textAlign: "center", verticalAlign: "middle" }}>
                                There are no warehouses to display.
                            </TableCell>
                        </TableRow>}
                </TblContainer>
                {showPagination ? <TblPagination /> : <></>}
            </Paper>
        </>
    )
}
export { WarehouseList };
