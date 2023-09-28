import React, { useState, useEffect } from 'react'
import { makeStyles, InputAdornment } from '@material-ui/core';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useTable from "./useTable";
import LongMenu from './actionItems';
import { useDispatch, useSelector } from 'react-redux';
import Controls from "../controls/Controls";
import FormControl from '@mui/material/FormControl';
import { Search } from "@material-ui/icons";
import ClearIcon from '@mui/icons-material/Clear';
import { userActions } from '../../../_actions';
import { useHistory } from 'react-router-dom';
import { SelectBox } from '../../../Components';
import CrossIcon from '../controls/CrossIcon';
import SearchIcon from '../controls/SearchIcon';

const useStyles = makeStyles(theme => ({
    pageContent: {
        backgroundColor: "#F3F3F6",
        whiteSpace: "nowrap",
        width: '80vw',
        margin: "20px 0px",
        overflowX: 'auto',
        borderRadius: "0px",
    },
    searchInput: {
        width: '',
        margin: '0 5'
    },
    actionToolbarArticleList: {
        display:"inline-flex",
        maxHeight: 100
    },
    selectInput: {
        width: '200'
    },
    noRecordsFound: {
        width: '100%',
        height: 40,
        padding: 10,
        textAlign: 'center',
        backgroundClip: "#F3F3F6",
    },
    paginationContent: {
        whiteSpace: "nowrap",
        width: '80vw',
        marginTop: -20,
        marginBottom: 20,
        overflowX: 'auto',
        backgroundColor: "#E8E7EE",
        borderRadius: "0px",
    },
    marketNames: {
        display: 'inline',
		flexDirection: 'row',
		alignItems: 'flexStart',
		padding: '4px 8px',
		gap: '10px',
		height: '24px',
        marginLeft:5,

		/* SECONDARY / Tint 04 */
		background: '#D1CFDC',
		borderRadius: '4px',

		/* Inside auto layout */
		flex: 'none',
		order: 0,
		flexGrow: 0,
    },
}))

const headCellsGlobal = [
    { id: 'firstName', label: 'First Name', sortField: 'firstName', editable: true },
    { id: 'lastName', label: 'Last Name', sortField: 'lastName', editable: true },
    { id: 'email', label: 'Email', sortField: 'email', editable: true },
    { id: 'userName', label: 'UserName', sortField: 'userName', editable: true },
    { id: 'countryCode', label: 'Country', sortField: 'countryCode', editable: true },
    { id: 'backImage', label: 'Permissions', sortField: 'backImage', editable: true },
    { id: 'department', label: 'Department',  sortField: 'department', editable: true },
    { id: 'createdAt', label: 'Created At', sortField: 'createdAt', editable: true },
    { id: 'updatedAt', label: 'Updated At', sortField: 'updatedAt', editable: true },
    {
        id: 'action',
        label: '',
        accessor: '[row identifier to be passed to button]'
    },
]
function ArticleList(props) {
    const dispatch = useDispatch();
    const article = useSelector(state => state.article)
    
    useEffect(() => {
        const { userslist } = article;
        if(userslist) {
        setRecords(userslist || [])
        }
        setShowPagination(userslist && userslist.totalElements > 10 ? true : false)
    }, [article]);

    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [headcells, setHeadCells] = useState(headCellsGlobal);
    const [showPagination, setShowPagination] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [textVal, setTextVal] = useState('');
    const [textValSearch, setTextValSearch] = useState('');
    const [showClearIcon, setShowClearIcon] = useState(false);


    const [articleType, setArticleType] = useState('Global');
    const [marketType, setMarketName] = useState('');
    const [ArticleTypeData, setArticleTypeData] = useState(articleType);

    const [searchValidationError, setSearchValidationError] = useState('');

    const handleArticleInputChange = e => {
        const { name, value } = e.target
        setArticleType(value)
        setTextVal('');
        setTextValSearch('');
        if(value == 'Global') {
            setMarketName('');
           // dispatch(userActions.getUserList(`?pageNumber=1&limit=10&filterFields=&filterValues=&sort=asc&orderBy=description.code`));
           dispatch(userActions.getUserList(`?${payloadPagingAndIndex()}&firstName=${textValSearch}&sort=${order}&orderBy=${orderBy}`));
        } else {
            //updateMarketDropDown();
           // dispatch(userActions.getUserList(`?pageNumber=1&limit=10&filterFields=market&filterValues=Hong Kong&sort=asc&orderBy=description.name.zh_HK`));
           dispatch(userActions.getUserList());
        }
       
    }
    const handleMarketInputChange = e => {
        const { name, value } = e.target
        setMarketName(value);
        setTextVal('');
        if(value) {
            dispatch(userActions.getUserList(`?${payloadPagingAndIndex()}&firstName=${textValSearch}&sort=${order}&orderBy=${orderBy}`));
        }
    }


    useEffect(() => {
             dispatch(userActions.getUserList(`?${payloadPagingAndIndex()}&sort=${order}&orderBy=${orderBy}`));
    }, []);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        payloadPagingAndIndex,
        order,
        orderBy,
        setOrder,
        setOrderBy
    } = useTable(records, headcells, filterFn, articleType, textVal, marketType);
    const resetForm = (e) => {
        setShowClearIcon(false)
        setOrder('desc');
        setOrderBy('updatedAt');
        setTextVal('');
        setTextValSearch('');
        setSearchValidationError('');
        setArticleType('Global')
        setHeadCells(headCellsGlobal)
        setArticleTypeData('Global')
        setMarketName('')
        dispatch(userActions.getUserList(`?offset=0&limit=10`));
        setFilterFn({
            fn: items => {
                return items;
            }
        })

    }
   
    let isData = recordsAfterPagingAndSorting().length ? true : false;

    const handleClear = () => {
       
        if (articleType === "Global") {
            resetForm();
        } else {
            resetLocalView();
         }
    }
    const handleSearch = () => {
        setTextVal(textValSearch);
        if (textValSearch.length <= 2) {
            setSearchValidationError("Please enter minimum of 3 characters.");
            return;
        } else {
            setShowClearIcon(true)
        }
        dispatch(userActions.getUserList(`?${payloadPagingAndIndex()}&firstName=${textValSearch}&sort=${order}&orderBy=${orderBy}`));
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
    const handleValidation = (e) => {
        setShowClearIcon(false)
        if(!e.target.value.length) {
            setShowClearIcon(false)
        }
        setSearchValidationError((e.target.value.length < 3 && e.target.value.length > 0) ? "Please enter minimum of 3 characters." : "");
    }

    const history = useHistory();

    return (
        <>
            <div className={classes.actionToolbarArticleList}>
                
                <Controls.Input className={searchValidationError ? "searchIcon-error SearchTextBox" : "SearchTextBox"} 
                    label="Search"
                    InputProps={{

                        endAdornment: (<InputAdornment position="end">
                           {showClearIcon ? 
                            <a style={{ cursor: "pointer", paddingRight : "16px !important" }} onClick={handleClear}><CrossIcon/></a>
                            :   
                            <a style={{ cursor: "pointer", paddingRight : "16px !important" }} onClick={handleSearch}><SearchIcon /> </a>
                            
                            }
                        </InputAdornment>)
                    }}
                    placeholder="Search user by First Name"
                    value={textValSearch}
                    onChange={e => { setTextValSearch(e.target.value), handleValidation(e) }}
                    onKeyDown={e =>_handleKeyDown(e)}
                    error={searchValidationError}
                />
                <FormControl className='resetTextContainer'>
                    <Typography className="resetSearch" onClick={resetForm}>Reset</Typography>
                    </FormControl>
            </div>
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    {isData ? <TableBody>
                        {recordsAfterPagingAndSorting().map(item =>
                            <TableRow key={item.id}>
                                <TableCell>{item.firstName}</TableCell>
                                <TableCell>{item.lastName}</TableCell>
                                <TableCell>{item.email }</TableCell>
                                <TableCell>{ item.userName}</TableCell>
                                <TableCell>{item.countryCode}</TableCell>
                                <TableCell></TableCell>

                                <TableCell>{item.department}</TableCell>

                                <TableCell>{ item.createdAt }</TableCell>

                                <TableCell> { item.updatedAt}</TableCell>
                               
                                <TableCell align="center">
                                    <LongMenu articleType = {articleType} marketValueFromDB = {item.market} marketValueFromUI = {marketType} onClick={item} />
                                </TableCell>
                            </TableRow>
                        )}
                   </TableBody>

: <TableRow key={1}>
    <TableCell align="center" style={{ textAlign: "center", verticalAlign: "middle" }}>
        There are no user to display.
    </TableCell>
</TableRow>}
</TblContainer>
{showPagination ? <TblPagination /> : <></>}
</Paper>
</>
)
}
export { ArticleList };
