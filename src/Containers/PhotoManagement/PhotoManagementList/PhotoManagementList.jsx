import React, { useState, useEffect } from "react";
import { makeStyles, InputAdornment } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useTable from "./useTable";
import LongMenu from "./actionItems";
import { useDispatch, useSelector } from "react-redux";
import Controls from "../controls/Controls";
import { articleAction } from "../../../_actions";
import { useHistory } from "react-router-dom";
import CrossIcon from "../controls/CrossIcon";
import SearchIcon from "../controls/SearchIcon";
import { SelectBox } from "../../../Components";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    backgroundColor: "#F3F3F6",
    whiteSpace: "nowrap",
    width: "80vw",
    margin: "20px 0px",
    overflowX: "auto",
    borderRadius: "0px",
  },
  searchInput: {
    width: "",
    margin: "0 5",
  },
  actionToolbarPhotoManagementList: {
    display: "inline-flex",
    maxHeight: 100
  },
  selectInput: {
    width: "200",
  },
  noRecordsFound: {
    width: "100%",
    height: 40,
    padding: 10,
    textAlign: "center",
    backgroundClip: "#F3F3F6",
  },
  paginationContent: {
    whiteSpace: "nowrap",
    width: "80vw",
    marginTop: -20,
    marginBottom: 20,
    overflowX: "auto",
    backgroundColor: "#E8E7EE",
    borderRadius: "0px",
  },
  marketNames: {
    display: "inline",
    flexDirection: "row",
    alignItems: "flexStart",
    padding: "4px 8px",
    gap: "10px",
    height: "24px",
    marginLeft: 5,

    /* SECONDARY / Tint 04 */
    background: "#D1CFDC",
    borderRadius: "4px",

    /* Inside auto layout */
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
}));

const headCellsGlobal = [
  { id: "sku", label: "SKU No.", sortField: "sku", editable: true },
  { id: "SKUType", label: "SKU Type", sortField: "serialized", editable: true },
  { id: "type", label: "Article Type", sortField: "type.code", editable: true },
  {
    id: "description",
    label: "Article Description",
    sortField: "description.code",
    editable: true,
  },
  {
    id: "frontImage",
    label: "Front Image",
    sortField: "frontImage",
    editable: true,
  },
  {
    id: "backImage",
    label: "Back Image",
    sortField: "backImage",
    editable: true,
  },
  {
    id: "manufacturerName",
    label: "Manufacturer Name",
    sortField: "manufacturer.code",
    editable: true,
  },
  {
    id: "seriesOne",
    label: "Series 1 (Family Name)",
    sortField: "seriesOne.code",
    editable: true,
  },
  {
    id: "seriesTwo",
    label: "Series 2 (No.)",
    sortField: "seriesTwo.code",
    editable: true,
  },
  {
    id: "networkConnection",
    label: "Network Connection",
    sortField: "attributes.networkConnection.value",
    editable: true,
  },
  {
    id: "networkTechnology",
    label: "Network Technology",
    sortField: "attributes.networkTechnology.value",
    editable: true,
  },
  {
    id: "ram",
    label: "RAM",
    sortField: "attributes.ram.value",
    editable: true,
  },
  {
    id: "storageSize",
    label: "Storage Size/ROM",
    sortField: "attributes.storageSize.value",
    editable: true,
  },
  { id: "color", label: "Color Name", sortField: "color.code", editable: true },
  {
    id: "hexCode",
    label: "HEX Code",
    sortField: "attributes.hexCode.value",
    editable: true,
  },
  {
    id: "operatingSystem",
    label: "Operating System",
    sortField: "attributes.operatingSystem.value",
    editable: true,
  },
  {
    id: "screenSize",
    label: "Screen Size (inches)",
    sortField: "attributes.size.value",
    editable: true,
  },
  {
    id: "frontCamera",
    label: "Front Camera (MP)",
    sortField: "attributes.frontCamera.value.EN",
    editable: true,
  },
  {
    id: "rearCamera",
    label: "Rear Camera (MP)",
    sortField: "attributes.rearCamera.value.EN",
    editable: true,
  },
  {
    id: "batterySize",
    label: "Battery size (maH)",
    sortField: "attributes.batterySize.value.EN",
    editable: true,
  },
  {
    id: "cable",
    label: "Cable",
    sortField: "attributes.cable.value",
    editable: true,
  },
  {
    id: "chargingCapacity",
    label: "Charging Capacity (W)",
    sortField: "attributes.capacity.value",
    editable: true,
  },
  {
    id: "action",
    label: "",
    accessor: "[row identifier to be passed to button]",
  },
];
function PhotoManagementList(props) {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  useEffect(() => {
    const { listArticle } = article;
    setRecords(listArticle || []);
    setShowPagination(
      listArticle && listArticle.totalRecords > 10 ? true : false
    );
  }, [article]);

  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [headcells, setHeadCells] = useState(headCellsGlobal);
  const [showPagination, setShowPagination] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [textVal, setTextVal] = useState("");
  const [textValSearch, setTextValSearch] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [searchValidationError, setSearchValidationError] = useState("");
  const [FrontImage, setFrontImage] = useState('Please Select');
  const [BackImage, setBackImage] = useState('Please Select');
  const [FrontImageData, setFrontImageData] = useState(FrontImage);

  const handleFrontImageInputChange = e => {
      const { name, value } = e.target
      if(value == 'Please Select') {
        return
      }
      else if (BackImage == 'Please Select') {
        dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=frontImage&filterValues=${value}&filterFields=search&filterValues=${textValSearch?.replace(
          /\+/g,
          "%2B"
        )}&sort=asc&orderBy=description.code`));
      } else {
        dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=frontImage&filterValues=${value}&filterFields=backImage&filterValues=${BackImage}&filterFields=search&filterValues=${textValSearch?.replace(
          /\+/g,
          "%2B"
        )}&sort=asc&orderBy=description.code`));
      }
      setFrontImage(value)
  }
  const handleBackImageInputChange  = e => {
      const { name, value } = e.target
      if(value == 'Please Select') {
        return
      }
      else if (FrontImage == 'Please Select') {
        dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=backImage&filterValues=${value}&filterFields=search&filterValues=${textValSearch?.replace(
          /\+/g,
          "%2B"
        )}&sort=asc&orderBy=description.code`));
      } else {
        dispatch(articleAction.listArticle(`?pageNumber=1&limit=10&filterFields=frontImage&filterValues=${FrontImage}&filterFields=backImage&filterValues=${value}&filterFields=search&filterValues=${textValSearch?.replace(
          /\+/g,
          "%2B"
        )}&sort=asc&orderBy=description.code`));
      }
      setBackImage(value);
  }

  const updateMarketDropDown = () => {
      setBackImage('Please Select'); //set default value which comes first in asc order
   }
  useEffect(() => {
    dispatch(
      articleAction.listArticle(
        `?pageNumber=1&limit=10&filterFields=&filterValues=&sort=asc&orderBy=description.code`
      )
    );
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
    setOrderBy,
    setDefaultView,
  } = useTable(records, headcells, filterFn, FrontImage, textVal, BackImage);
  const resetForm = (e) => {
    setDefaultView(true);
    setShowClearIcon(false);
    setOrder("asc");
    setOrderBy("description.code");
    setTextVal("");
    setTextValSearch("");
    setSearchValidationError("");
    setHeadCells(headCellsGlobal);
    setFrontImage("Please Select")
    setBackImage("Please Select")
    dispatch(
      articleAction.listArticle(
        `?pageNumber=1&limit=10&filterFields=&filterValues=&sort=asc&orderBy=description.code`
      )
    );
    setFilterFn({
      fn: (items) => {
        return items;
      },
    });
  };

  let isData = recordsAfterPagingAndSorting().length ? true : false;

  const handleClear = () => {
      resetForm();
  };
  const handleSearch = () => {
    setTextVal(textValSearch);
    if (textValSearch.length <= 2) {
      setSearchValidationError("Please enter minimum of 3 characters.");
      return;
    } else {
      setShowClearIcon(true);
    }
    setFrontImageData(FrontImage);

    setHeadCells(headCellsGlobal);
    dispatch(
      articleAction.listArticle(
        `?${payloadPagingAndIndex()}${FrontImage != "Please Select" ? `&filterFields=frontImage&filterValues=${FrontImage}`:``}${BackImage  != "Please Select" ? `&filterFields=backImage&filterValues=${BackImage}`:``}&filterFields=search&filterValues=${textValSearch.replace(
          /\+/g,
          "%2B"
        )}&sort=${order}&orderBy=${orderBy}`
      )
    );
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleValidation = (e) => {
    setShowClearIcon(false);
    if (!e.target.value.length) {
      setShowClearIcon(false);
    }
    setSearchValidationError(
      e.target.value.length < 3 && e.target.value.length > 0
        ? "Please enter minimum of 3 characters."
        : ""
    );
  };

//   const history = useHistory();
//   const getLocalValues = (item)=> {
//     if(BackImage === 'Hong Kong')
//     return item.zh_HK ? item.zh_HK : '-';
// }

// const getLocalAttributes = (item)=> {
//     if(BackImage === 'Hong Kong')
//     return item.HK ? item.HK : '-';
// }
  return (
    <>
      <div className={classes.actionToolbarPhotoManagementList}>
                <SelectBox sx={{ m : 1 , minWidth: 120}}
                    label="Front Image"
                    name={FrontImage}
                    value={FrontImage}
                    options={['Please Select','Yes', 'No']}
                    onChange={handleFrontImageInputChange}
                />

              <span style={{ paddingLeft: 15 }}>
                <SelectBox sx={{ m : 1 , minWidth: 120}}
                    label="Back Image"
                    name={BackImage}
                    value={BackImage}
                    options={['Please Select','Yes', 'No']}
                    onChange={handleBackImageInputChange}
                />
                </span>
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
                    placeholder="Search articles by SKU or Article Description"
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
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.sku}</TableCell>
                <TableCell>
                  {item.serialized ? "Serialised" : "Non Serialised"}
                </TableCell>
                <TableCell>{item.type?.code}</TableCell>
                <TableCell>{item.description?.code || "-"}</TableCell>
                <TableCell>{item.frontImage || "-"}</TableCell>
                <TableCell>{item.backImage || "-"}</TableCell>
                <TableCell>{item.manufacturer?.code || "-"}</TableCell>
                <TableCell>{item.seriesOne?.code || "-"}</TableCell>
                <TableCell> {item.seriesTwo?.code || "-"}</TableCell>
                <TableCell>
                  {item.attributes.networkConnection?.value || "-"}
                </TableCell>
                <TableCell>
                  {item.attributes.networkTechnology?.value || "-"}
                </TableCell>
                <TableCell>{item.attributes.ram?.value || "-"}</TableCell>
                <TableCell>
                  {item.attributes.storageSize?.value || "-"}
                </TableCell>
                <TableCell>{item.color?.code || "-"}</TableCell>
                <TableCell>{item.attributes.hexCode?.value || "-"}</TableCell>
                <TableCell>
                  {item.attributes.operatingSystem?.value || "-"}
                </TableCell>
                <TableCell>{item.attributes.size?.value || "-"}</TableCell>
                <TableCell>
                  {item.attributes.frontCamera?.value.EN || "-"}
                </TableCell>
                <TableCell>
                  {item.attributes.rearCamera?.value.EN || "-"}
                </TableCell>
                <TableCell>
                  {item.attributes.batterySize?.value.EN || "-"}
                </TableCell>
                <TableCell>{item.attributes.cable?.value || "-"}</TableCell>
                <TableCell>
                  {item.attributes.capacity?.value.EN || "-"}
                </TableCell>
                <TableCell align="center">
                  <LongMenu onClick={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>

        {!isData && (
          <div className={classes.noRecordsFound}>
            There are no articles to display.
          </div>
        )}
      </Paper>
      <Paper className={classes.paginationContent}>
        <TblPagination />
      </Paper>
    </>
  );
}
export { PhotoManagementList };
