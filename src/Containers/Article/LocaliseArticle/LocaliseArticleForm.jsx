import React, { useState, useEffect } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import FormHelperText from '@mui/material/FormHelperText';
import Select from "@mui/material/Select";
import { Button, HexColorComponent, BoxLoader } from '../../../Components';
import { articleAction } from '../../../_actions';
import { useDispatch, useSelector } from 'react-redux';
import _appConfig from '../../../_appConfig/_appConfig';
import './style.less';

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";


let isConsumableArticle = false;

function getSteps() {
  return [
    "Market and Partners",
    "Accessories",
    "Local Attributes",
    "Review",
  ];
}

const MarketAndPartnersForm = () => {
  const {
    control,
    register,
    resetField,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const formValues = control._formValues
  //console.log(control)
function getArralist () {
    let arrData = [];
    let obj = getValues(`partner.list`);
    if (obj && Object.keys(obj).length) {
      for (var i in obj) {
        //console.log("<><><>",obj[i])
        arrData.push(obj[i])
      }
    }
    return arrData
  }
  const useForceUpdate = () => useState()[1];
  function resetPartnerDate() {
    //console.log(">>>>>>>",formValues)
    let nameKey = 'Date_'.toLowerCase();
    let keys = Object.keys(formValues);
    let wantedKey = keys.find(key => {
      if (key.toLowerCase().includes(nameKey)) {
        //console.log('namekey',key);  
        setValue(key, '')
      }
    });
    // wantedKey && setValue(`${wantedKey}`,'')
    // wantedKey && {//console.log(wantedKey);setValue(wantedKey,'')};
  }

  const dispatch = useDispatch();
  const article = useSelector(state => state.article.MarketListForLocaliseArticle)
  const [isChecked, setIsChecked] = useState(getValues('LocaliseForPartner'));
  const [partnerChecked, setPartnerChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(getArralist());
  const toggleCheckBox = () => {
    (checkedState?.indexOf(true) > -1) && setError("customError", {
      types: {
        required: "Please select at least one partner"
      }
    });
  }
  const toggleCheckBoxPartner = (partnerName, isPartnerChecked) => {
    setPartnerChecked(!partnerChecked)
  }

  const handleOnChange = (item, position) => {
    const updatedCheckedState = checkedState?.map((item, index) =>
      index === position ? !item : item
    );
    if (updatedCheckedState.indexOf(true) > -1) {
      clearErrors('customError')
    } else {
      setError("customError", {
        types: {
          required: "Please select at least one partner"
        }
      });
    }
    setCheckedState(updatedCheckedState);
  }

  React.useEffect(() => {
    isChecked ? setError("customError", {
      types: {
        required: "Please select at least one partner"
      }
    }) : clearErrors('customError')
  }, [isChecked])

  let list = [{ 'value': '', 'label': '' }];
  const currencyList = {};
  //console.log(">>>>>..", article)
  article.length && article?.map((item) => {
    list.push({ 'value': item.MarketName, 'label': item.MarketName })
    currencyList[item.MarketName] = item.currency;
  })
  useEffect(() => {
    if (article[0]) {
      //console.log("resettt",checkedState)
      checkedState?.length ? clearErrors('customError') : setCheckedState(new Array(article[0].partners.length).fill(false))
    }
    setMarketList(list)
  }, [article]);


  function handleChange(e) {
    setValue("Currency", currencyList[e.target.value])
  }

  const [MarketList, setMarketList] = useState(list || [])
  return (
    <>
      <br />
      <label className="articleSubheader" >{"Please select the market that you would like to localise the article for."}</label>
      <br />
      <Controller
        control={control}
        name="Market"
        rules={{
          required: "This field is required.",
        }}
        render={({ field: { onChange, value } }) => (

          <Grid item lg={8} sm={8}>
            <FormControl variant="filled" sx={{
              '&: .MuiFilledInput-input': { padding: "12px" }
            }} error>
              <label>Select Market *</label>
              <Select style={{ maxWidth: '55ch' }}
                labelId="demo-simple-select-filled-label"
                id="simple-select"
                error={!!errors.Market}
                className={errors.Market && 'error-after'} inputProps={{ className: errors.Market && "error-border" }}
                value={value}
                onChange={(e) => { e.persist = () => { }; handleChange(e), onChange(e) }}
                displayEmpty
              >
                {MarketList.map((option) => (
                  option.value ? <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                    : <MenuItem disabled value={''}>{<span style={{ color: "rgb(177 177 177)", fontWeight: 300 }}>{"Select Market"}</span>}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.Market?.message}</FormHelperText>
            </FormControl></Grid>

        )}
      />
      <br />
      <br />
      <label className="lableText">
        Price
      </label>
      <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%' }}>
        <Controller
          control={control}
          name="Currency"
          render={({ field }) => (
            <Grid item lg={4} sm={4}> <FormControl variant="filled" sx={{
              '& .MuiTextField-root': { margin: "8px 0", width: '20ch' },
              '&: .MuiFilledInput-input': { padding: "12px" },
            }} error>
              <label>{"Currency"}</label><TextField
                id="Currency"
                variant="filled"
                placeholder=""
                size="small"
                disabled
                className={errors.Currency && 'error-after'}
                inputProps={{ className: errors.Currency && "error-border" }}
                {...field}
                error={Boolean(errors?.Currency)}
                helperText={errors.Currency?.message}
              /></FormControl></Grid>
          )}
        />

        <Controller
          control={control}
          name="SRP"
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[0-9]+$/,
              message: "This field can only contains Numbers."
            }
          }}
          render={({ field }) => (
            <Grid item lg={8} sm={8}> <FormControl variant="filled" sx={{
              '& .MuiTextField-root': { margin: "8px 0", display: "inline-flex" },
              '&: .MuiFilledInput-input': { padding: "12px" },
            }} error>
              <label>{"SRP Number*"}</label><TextField sx={{ width: '40ch' }}
                id="SRP"
                variant="filled"
                placeholder="Enter SRP Number"
                size="small"
                className={errors.SRP && 'error-after'}
                inputProps={{ className: errors.SRP && "error-border" }}
                {...field}
                error={Boolean(errors?.SRP)}
                helperText={errors.SRP?.message}
              /></FormControl></Grid>
          )}
        />
      </Grid>
      <br />

      <FormGroup
        onChange={(e) => {
          toggleCheckBox();
          if (e.target.checked) { clearErrors('customError') }
          if (e.target.checked) {
            setValue('LocaliseForPartner', true)
            setIsChecked(e.target.checked)
            setValue('partner', {})
            setCheckedState(checkedState)
          } else {
            setIsChecked(e.target.checked)
            resetField('liveDate')
            resetField('launchDate')
            setValue('LocaliseForPartner', false)
            setValue('partner', {})
            setCheckedState(new Array(article[0].partners.length).fill(false))
            resetPartnerDate()
          }
        }}
      >
        <FormControlLabel control={<Checkbox checked={isChecked} disableRipple defaultChecked={false} />} label="Localise for partners" />

      </FormGroup>

      {!isChecked ? <><h6>{'Live and Launch'}</h6>
        <br />
        <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%' }}>
          <Controller
            control={control}
            name="liveDate"
            rules={{
              required: "This field is required.",
            }}
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl variant="filled" sx={{
                '& .MuiTextField-root': { margin: "16px 0", width: '30ch' },
                '&: .MuiFilledInput-input': { padding: "12px" },
              }} error>
                <label>{"Live Date*"}</label>
                <TextField
                  type="date"
                  id="liveDate"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ className: errors.liveDate && "error-border" }}
                  size="small"
                  margin="normal"
                  {...field}
                  error={Boolean(errors?.liveDate)}
                  helperText={errors.liveDate?.message}
                /></FormControl></Grid>
            )}
          />
          <Controller
            control={control}
            name="launchDate"
            rules={{
              required: "This field is required.",
            }}
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl variant="filled" sx={{
                '& .MuiTextField-root': { margin: "16px 0", width: '30ch' },
                '&: .MuiFilledInput-input': { padding: "12px" },
              }} error>
                <label>{"Launch Date*"}</label>
                <TextField
                  type="date"
                  id="launchDate"
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ className: errors.launchDate && "error-border" }}
                  size="small"
                  margin="normal"
                  {...field}
                  error={Boolean(errors?.launchDate)}
                  helperText={errors.launchDate?.message}
                /> </FormControl></Grid>
            )}
          />
        </Grid></>
        :
        <><br />
          <label className="lableText">
            Partner
          </label>
          <div className={(errors.customError && errors.customError.types) ? " articleSubheader custom_Error" : "articleSubheader"}>
            {"Select one or more partner to localise."}
          </div>

          {article[0].partners.map((item, index) => {
            return <FormGroup
              {...register(`partner.list[${item}]`, item)}
              onChange={(e) => {
                handleOnChange(item, index)
                setValue(`partner.list[${item}]`, e.target.checked)

                // var keys = Object.keys(getValues('partner.list'));

                // var filtered = keys.filter(function(key) {
                //               return getValues('partner.list')[key]
                //               });
                //   // filtered.map(item=>{
                if (e.target.checked) {
                } else {
                  setValue(`partner.[${item}]`, {})
                }

                //  })    

              }}
            >
              <FormControlLabel control={<Checkbox checked={(getValues(`partner.list[${item}]`) == true) ? true : false} disableRipple defaultChecked={false} />} label={item} />

            </FormGroup>
          })}
          {checkedState?.map((item, index) => {
            var liveDatePartner = "liveDate_" + article[0].partners[index];
            var launchDatePartner = "launchDate_" + article[0].partners[index];
            var swtich = 'switch_' + article[0].partners[index];
            var swap = 'swap_' + article[0].partners[index];
            var D2C = 'D2C_' + article[0].partners[index];
            return item && <div style={{ height: '100%' }}>

              <br />
              <div style={{ height: '100%', background: "#F9F9FB" }}><label className="PartnerLabelTitle">{article[0].partners[index]}</label>
                <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%', margin: 0 }}>

                  <Controller
                    control={control}
                    name={liveDatePartner}
                    rules={{
                      required: "This field is required.",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Grid item lg={6} sm={6}> <FormControl variant="filled" sx={{
                        '& .MuiTextField-root': { margin: "16px 0", width: '30ch' },
                        '&: .MuiFilledInput-input': { padding: "12px" },
                      }} error>
                        <label>{"Live Date*"}</label>
                        <TextField
                          type="date"
                          id={liveDatePartner}
                          variant="filled"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ className: errors[liveDatePartner] && "error-border" }}
                          size="small"
                          margin="normal"
                          onChange={(e, value) => { onChange(e); setValue(`partner.${article[0].partners[index]}.LiveDate`, e.target.value) }}
                          value={getValues(`partner.${article[0].partners[index]}.LiveDate`)}
                          error={Boolean(errors[liveDatePartner])}
                          helperText={errors[liveDatePartner]?.message}
                        /></FormControl></Grid>
                    )}
                  />
                  <Controller
                    control={control}
                    name={launchDatePartner}
                    rules={{
                      required: "This field is required.",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Grid item lg={6} sm={6}> <FormControl variant="filled" sx={{
                        '& .MuiTextField-root': { margin: "16px 0", width: '30ch' },
                        '&: .MuiFilledInput-input': { padding: "12px" },
                      }} error>
                        <label>{"Launch Date*"}</label>
                        <TextField
                          type="date"
                          id={launchDatePartner}
                          variant="filled"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ className: errors[launchDatePartner] && "error-border" }}
                          size="small"
                          margin="normal"
                          onChange={(e, value) => { onChange(e); setValue(`partner.${article[0].partners[index]}.LaunchDate`, e.target.value) }}
                          value={getValues(`partner.${article[0].partners[index]}.LaunchDate`)}
                          error={Boolean(errors[launchDatePartner])}
                          helperText={errors[launchDatePartner]?.message}
                        /> </FormControl></Grid>
                    )}
                  />
                </Grid>
                <div style={{ marginLeft: "20px" }}> <label>{"Types of services"}</label>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Controller
                          name={`partner.${article[0].partners[index]}.Service.swtich`}
                          control={control}
                          render={({ field: props }) => (
                            <Checkbox
                              {...props}
                              checked={props.value}
                              disableRipple
                              onChange={(e) => props.onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label={"Available for Switch"}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Controller
                          name={`partner.${article[0].partners[index]}.Service.swap`}
                          control={control}
                          render={({ field: props }) => (
                            <Checkbox
                              {...props}
                              checked={props.value}
                              disableRipple
                              onChange={(e) => props.onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label={"Available for Swap"}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Controller
                          name={`partner.${article[0].partners[index]}.Service.D2C`}
                          control={control}
                          render={({ field: props }) => (
                            <Checkbox
                              {...props}
                              checked={props.value}
                              disableRipple
                              onChange={(e) => props.onChange(e.target.checked)}
                            />
                          )}
                        />
                      }
                      label={"Available for Direct To Customer (DTC)"}
                    />
                  </FormGroup>
                </div>
              </div></div>
          }
          )}
        </>}
    </>
  );

}

const Accessories = (props) => {
  const {
    control,
    register,
    resetField,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }
  const debounceOnKeyUp = React.useCallback(debounce(handleKeyUp, 400), []);
  const dispatch = useDispatch();
  const Accessories = useSelector(state => state.article.ArticleAccessories)
  const [searchData, setSearchData] = useState(Accessories)
  const [loading, setLoading] = useState(false);
  const [checkDisable, setCheckDisable] = useState(false);
  const [inputValue, setInputValue] = React.useState(getValues("Accessories") || "");
  //console.log(">>>>>>>>>>>", getValues("Accessories"))
  function handleKeyUp(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
    setLoading(true)
    //setSearchData([])
    dispatch(articleAction.getAcccessories(e.target.value))

  }
  useEffect(() => {
    if (Accessories?.length) {
      setLoading(false)
      setSearchData(Accessories)
    }
  })

  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [])

  function handleChange(e) {
    setValue('Accessories', e.target.value)
  }

  return (
    <>
      <br />
      <label className="lableText">{"Accessories"}</label>
      <label className="articleSubheader" >{"Add, edit or remove mapped accessories."}</label>

      <Grid item lg={6} sm={6}><FormControl variant="filled" error>
        <Controller
          control={control}
          name="Accessories"
          defaultValue={[]} // this prevents the "controlled/uncontrolled change" error
          rules={{
            maxLength: { value: 4, message: "Please enter maximum of 3 characters." }
          }}
          render={props => (
            <Autocomplete
              id="Accessories"
              multiple
              className={errors.Accessories && 'error-after'}
              options={searchData}
              error={!!errors.Accessories}
              getOptionLabel={searchData => searchData?.title}
              getOptionSelected={(searchData, value) => searchData.value === value.value}
              filterSelectedOptions
              filterOptions={(options, state) => options}
              value={props?.value?.length > 4 ? props?.value?.pop() : getValues("Accessories") || getValues("Accessories") ? getValues("Accessories") : undefined}
              onChange={(e, values) => {
                if (e.keyCode == 13) {
                  e.preventDefault();
                }
                if (values.length > 4) {
                  values.pop();
                } values.length <= 4 && setValue("Accessories", values)
              }}
              onKeyUp={(e) => {
                debounceOnKeyUp(e)
                e.preventDefault()
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={params => (
                <TextField className={errors.Accessories && "AccessoriesInput"}
                  {...params}
                  variant="filled"
                  placeholder="Add accessories by name or SKU"
                  fullWidth
                  onChange={e => {
                    if (e.keyCode == 13) {
                      e.preventDefault();
                    }
                  }}
                  error={Boolean(errors?.Accessories)}
                  helperText={errors.Accessories?.message}
                />
              )}
            />
          )}
        />
      </FormControl></Grid>
    </>
  );
}


const LocalAttributes = (props) => {

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  //console.log(">>>form state>>>", control)
  const dispatch = useDispatch();
  const generateObjListForDropDownFields = (dataList, targetList) => {
    let data = [{ 'value': '', 'label': '' }]
    dataList?.map(item => {
      data.push({ 'value': item, 'label': item })
    })
    console.log(data)
    setLocalChargingListArr(data)
  }
  const articleListOfSKU = useSelector(state => state.article.listArticleBySKU)
  const LocalLanguageOptionList = useSelector(state => state.article.MarketListForLocaliseArticle.language)
  const chargingCapacityArticle = useSelector(state => state.article.ArticleFieldsOfSKUType)
  const [articleSKU, setArticleSKU] = useState([]);
  const [LocalChargingListArr, setLocalChargingListArr] = useState([{ 'value': '', 'label': '' }]);
  const [checkSerialised, setcheckSerialised] = useState(getValues('serialised'))
  function handleChange(e, element) {
    setValue(element, LocalLanguageOptionList)
  }
  useEffect(() => {
    dispatch(articleAction.getArticleBySKU(getValues("SKU")));
    dispatch(articleAction.getFieldsFromSKUType('nonSerialisedArticleType'))
  }, [])

  useEffect(() => {
    if (articleListOfSKU?.data?.length) {
      setArticleSKU(articleListOfSKU.data[0]);
    }
  }, [articleListOfSKU])



  let LocalSimCardTypeList = [{ 'value': '', 'label': '' }, { 'value': 'dual-micro', 'label': 'dual-micro' }, { 'value': 'dual-nano', 'label': 'dual-nano' }, { 'value': 'nano', 'label': 'nano' }, { 'value': 'e-sim', 'label': 'e-sim' }];
  let LocalLanguageList = [{ 'value': '', 'label': '' }, { 'value': 'zh_HK', 'label': 'zh_HK' }];

  useEffect(() => {
    if (chargingCapacityArticle?.articleChargingCapacityList?.length) {
      generateObjListForDropDownFields(chargingCapacityArticle?.articleChargingCapacityList, LocalChargingListArr)
    }
  }, [chargingCapacityArticle])
  const reviewFormFieldSerialised = [
    'SKU Type',
    'Article Type',
    'Article Description',
    'Manufacturer Name',
    'Series 1 (Family Name)',
    'Series 2 (No.)',
    'Network Connection',
    'Network Technology',
    'RAM Size',
    'Storage Size/ROM',
    'Color Name',
    'HEX Code',
    'Operating System',
    'Screen Size (inches)',
    'Front Camera (MP)',
    'Rear Camera (MP)',
    'Battery Size (maH)',
    'Cable',
    'Charging Capacity (W)'
  ];
  const reviewFormFieldNonSerialised = [
    'SKU Type',
    'Article Type',
    'Article Description',
    'Manufacturer Name',
    'Series 1 (Family Name)',
    'Series 2 (No.)',
    'Color Name',
    'HEX Code',
    'Screen Size (inches)',
    'Front Camera (MP)',
    'Rear Camera (MP)',
    'Battery Size (maH)',
    'Cable',
    'Charging Capacity (W)'
  ];

  //console.log(">>>>>>>>>>>>>", articleSKU);
  const reviewObj = {
    SKUType: articleSKU?.serialized ? "Serialised" : "Non Serialised",
    articleType: articleSKU?.type?.code,
    articleDescription: articleSKU?.description?.code,
    manufacturerName: articleSKU?.manufacturer?.code,
    seriesOne: articleSKU?.seriesOne?.code,
    seriesTwo: articleSKU?.seriesTwo?.code,
    articleNetworkConnectionList: articleSKU?.attributes?.networkConnection?.value,
    articleNetworkTechnologyList: articleSKU?.attributes?.networkTechnology?.value,
    articleRAMSizeList: articleSKU?.attributes?.ram?.value,
    articleStorageSizeList: articleSKU?.attributes?.storageSize?.value,
    colorName: articleSKU?.color?.code,
    HEXCode: articleSKU?.attributes?.hexCode?.value,
    articleOperatingSystemList: articleSKU?.attributes?.operatingSystem?.value,
    screenSize: articleSKU?.attributes?.size?.value,
    frontCamera: articleSKU?.attributes?.frontCamera?.value.EN,
    rearCamera: articleSKU?.attributes?.frontCamera?.value.EN,
    batterySize: articleSKU?.attributes?.batterySize?.value.EN,
    cable: articleSKU?.attributes?.cable?.value,
    articleChargingCapacityList: articleSKU?.attributes?.capacity?.value.EN,
  }

  const {
    articleRAMSizeList,
    articleStorageSizeList,
    articleNetworkTechnologyList,
    articleOperatingSystemList,
    articleNetworkConnectionList,
    ...nonSerialisedObj } = reviewObj;

  //console.log("<><>", reviewObj)
  for (const property in reviewObj) {
    setValue(property, reviewObj[property]);
  }
  const reviewFormField = articleSKU && articleSKU.serialized ? reviewFormFieldSerialised : reviewFormFieldNonSerialised;
  const objReview = articleSKU.serialized ? reviewObj : nonSerialisedObj;
  const listItems = Object.keys(objReview).map((keys, i) => {
    objReview[keys] == 'serialised' && (objReview[keys] = 'Serialised')
    objReview[keys] == 'nonSerialised' && (objReview[keys] = 'Non Serialised')
    return <><ListItem style={{ paddingLeft: "5px" }}

      secondaryAction={
        <div className="reviewValue">{
          reviewFormField[i] === 'HEX Code' ?
            objReview[keys] ? <HexColorComponent data={objReview[keys]} WrapperWidth={true} /> : '-'
            : objReview[keys] || '-'

        } </div>
      }
    >
      <ListItemText
        primary={<div className="reviewKey">{reviewFormField[i]}</div>}
      />
    </ListItem>
      <Divider sx={{ width: "100% !important" }} /></>
  }
  );

  return (
    <>
      <BoxLoader />
      <br />
      <Grid item xs={12} md={6}>
        <div className="reviewScreen">
          <label className="lableText">Global Attributes</label>
          <List>
            {listItems}
          </List>
        </div>
      </Grid>

      <br />
      <br />
      <div className="reviewScreen">
        <label className="lableText">Please Enter the localised information for the fields below:</label>

        <br />
        <label className="lableText">Local Attributes</label>
      </div>
      <div sx={{
        '& .MuiTextField-root': { margin: "16px 0", width: '30ch', },
        '& .MuiSelect-select': { width: '18ch' },
        '&: .MuiFilledInput-input': { padding: "12px" },
      }}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%' }}>
          <Controller
            control={control}
            name="LocalManufacturerName"
            rules={{
              required: "This field is required.",
              minLength: { value: 2, message: "Please enter minimum of 2 characters." },
              pattern: {
                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                message: "Entered value can not start/end or contain only white spacing"
              }
            }}
            render={({ field }) => (

              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Manufacturer Name*"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalManufacturerName && 'error-after'}
                  placeholder="Enter Manufacturer Name"
                  size="small"
                  inputProps={{ maxLength: 25, className: errors.LocalManufacturerName && "error-border" }}
                  {...field}
                  error={errors.LocalManufacturerName}
                  helperText={errors.LocalManufacturerName?.message}
                /></FormControl></Grid>
            )}
          />
          {articleSKU?.serialized ? <Controller
            control={control}
            rules={{
              validate: (value) => {
                return (
                  (/^[^\s]+(?:$|.*[^\s]+$)/.test(value) == false) ? value == '' ? true : "Entered value can not start/end or contain only white spacing" : true
                );
              },
              pattern: {
                value: /^[ A-Za-z\u3000\u3400-\u4DBF\u4E00-\u9FFF]{0,25}$/,
                message: "Please enter only alphabets"
              },
              minLength: { value: 1, message: "Please enter minimum of 1 characters." },
              required: "This field is required.",
            }}
            name="LocalColorName"
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Color Name*"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalColorName && 'error-after'}
                  placeholder="Enter Color Name"
                  size="small"
                  inputProps={{ maxLength: 25, className: errors.LocalColorName && "error-border" }}
                  {...field}
                  error={errors.LocalColorName}
                  helperText={errors.LocalColorName?.message}
                /></FormControl></Grid>

            )}
          />
            :
            <Controller
              control={control}
              rules={{
                validate: (value) => {
                  return (
                    (/^[^\s]+(?:$|.*[^\s]+$)/.test(value) == false) ? value == '' ? true : "Entered value can not start/end or contain only white spacing" : true
                  );
                },
                pattern: {
                  value: /^[ A-Za-z\u3000\u3400-\u4DBF\u4E00-\u9FFF]{0,25}$/,
                  message: "Please enter only alphabets"
                },
                required: false,
                minLength: { value: 1, message: "Please enter minimum of 1 characters." },
              }}
              name="LocalColorName"
              render={({ field }) => (
                <Grid item lg={6} sm={6}> <FormControl>
                  <label>{"Color Name"}</label><TextField
                    variant="filled"
                    label=""
                    className={errors.LocalColorName && 'error-after'}
                    placeholder="Enter Color Name"
                    size="small"
                    inputProps={{ maxLength: 25, className: errors.LocalColorName && "error-border" }}
                    {...field}
                    error={errors.LocalColorName}
                    helperText={errors.LocalColorName?.message}
                  /></FormControl></Grid>

              )}
            />
          }

          <Controller
            control={control}
            rules={{
              required: "This field is required.",
              minLength: { value: 3, message: "Please enter minimum of 3 characters." },
              pattern: {
                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                message: "Entered value can not start/end or contain only white spacing"
              }
            }}
            name="LocalSeriesOne"
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Series 1(Family name part 1)*"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalSeriesOne && 'error-after'}
                  placeholder="Enter Series 1"
                  size="small"
                  inputProps={{ maxLength: 35, className: errors.LocalSeriesOne && "error-border" }}
                  {...field}
                  error={errors.LocalSeriesOne}
                  helperText={errors.LocalSeriesOne?.message}
                /></FormControl></Grid>
            )}
          />
          <Controller
            control={control}
            rules={{
              minLength: { value: 1, message: "Please enter minimum of 1 characters." },
              pattern: {
                value: /^[^\s]+(?:$|.*[^\s]+$)/,
                message: "Entered value can not start/end or contain only white spacing"
              }
            }}
            name="LocalSeriesTwo"
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Series 2 (Family name part 2)"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalSeriesTwo && 'error-after'}
                  placeholder="Enter Series 2"
                  size="small"
                  inputProps={{ maxLength: 20, className: errors.LocalSeriesTwo && "error-border" }}
                  {...field}
                  error={errors.LocalSeriesTwo}
                  helperText={errors.LocalSeriesTwo?.message}
                /></FormControl></Grid>
            )}
          />

          <Controller
            control={control}
            name="LocalSimCardType"
            render={({ field: { onChange, value }, fieldState }) => (
              <Grid item lg={6} sm={6}>
                <FormControl variant="filled" error>
                  <label>Sim Card Type</label>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="simple-select"
                    error={!!errors.LocalSimCardType}
                    className={errors.LocalSimCardType && 'error-after'} inputProps={{ className: errors.LocalSimCardType && "error-border" }}
                    value={value}
                    onChange={(e) => { e.persist = () => { }; handleChange(e), onChange(e) }}
                    displayEmpty
                  >
                    {LocalSimCardTypeList.map((option) => (
                      option.value ? <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                        : <MenuItem disabled value={''}>{<span style={{ color: "rgb(177 177 177)", fontWeight: 300 }}>{"Select Sim Card Type"}</span>}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.LocalSimCardType?.message}</FormHelperText>
                </FormControl></Grid>
            )}
          />
          {articleSKU?.serialized ? <Controller
            control={control}
            rules={{
              required: "This field is required.",
              minLength: { value: 3, message: "Please enter minimum of 3 characters." }
            }}
            name="LocalModelNumber"
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Model No.*"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalModelNumber && 'error-after'}
                  placeholder="Enter Model No."
                  size="small"
                  inputProps={{ maxLength: 25, className: errors.LocalModelNumber && "error-border" }}
                  {...field}
                  error={errors.LocalModelNumber}
                  helperText={errors.LocalModelNumber?.message}
                /></FormControl></Grid>
            )}
          />
            :
            <Controller
              control={control}
              rules={{
                minLength: { value: 3, message: "Please enter minimum of 3 characters." },
                required: false,
              }}
              name="LocalModelNumber"
              render={({ field }) => (
                <Grid item lg={6} sm={6}> <FormControl>
                  <label>{"Model No."}</label><TextField
                    variant="filled"
                    label=""
                    className={errors.LocalModelNumber && 'error-after'}
                    placeholder="Enter Model No."
                    size="small"
                    inputProps={{ maxLength: 25, className: errors.LocalModelNumber && "error-border" }}
                    {...field}
                    error={errors.LocalModelNumber}
                    helperText={errors.LocalModelNumber?.message}
                  /></FormControl></Grid>
              )}
            />
          }
          <Controller
            control={control}
            name="LocalFrontCamera"
            rules={{
              minLength: { value: 1, message: "Please enter minimum of 1 characters." },
              pattern: {
                value: /^[+\0-9]+$/,
                message: "This field can only contains numbers and + symbol"
              }
            }}
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Front Camera (MP)"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalFrontCamera && 'error-after'}
                  placeholder="Enter Front Camera (MP)"
                  size="small"
                  inputProps={{ maxLength: 4, className: errors.LocalFrontCamera && "error-border" }}
                  {...field}
                  error={errors.LocalFrontCamera}
                  helperText={errors.LocalFrontCamera?.message}
                /></FormControl></Grid>
            )}
          />
          <Controller
            control={control}
            name="LocalRearCamera"
            rules={{
              minLength: { value: 1, message: "Please enter minimum of 1 characters." },
              pattern: {
                value: /^[+\0-9]+$/,
                message: "This field can only contains numbers and + symbol"
              }
            }}
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Rear Camera (MP)"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalRearCamera && 'error-after'}
                  placeholder="Enter Rear Camera (MP)"
                  size="small"
                  inputProps={{ maxLength: 10, className: errors.LocalRearCamera && "error-border" }}
                  {...field}
                  error={errors.LocalRearCamera}
                  helperText={errors.LocalRearCamera?.message}
                /></FormControl></Grid>
            )}
          />
          <Controller
            control={control}
            name="LocalBatterySize"
            rules={{
              pattern: {
                minLength: { value: 4, message: "Please enter minimum of 4 characters." },
                value: /^[0-9]+$/,
                message: "This field can only contains Numbers."
              }
            }}
            render={({ field }) => (
              <Grid item lg={6} sm={6}> <FormControl>
                <label>{"Battery Size (maH)"}</label><TextField
                  variant="filled"
                  label=""
                  className={errors.LocalBatterySize && 'error-after'}
                  placeholder="Enter Battery Size (maH)"
                  size="small"
                  inputProps={{ maxLength: 10, className: errors.LocalBatterySize && "error-border" }}
                  {...field}
                  error={errors.LocalBatterySize}
                  helperText={errors.LocalBatterySize?.message}
                /></FormControl></Grid>
            )}
          />
          <Controller
            control={control}
            name="LocalChargingCapacity"
            render={({ field: { onChange, value }, fieldState }) => (
              <Grid item lg={6} sm={6}>
                <FormControl variant="filled" error>
                  <label>{"Charging Capacity"}</label>
                  <Select
                    labelId="demo-simple-select-filled-label1"
                    id="simple-selectdsfsd"
                    error={!!errors.LocalChargingCapacity}
                    className={errors.LocalChargingCapacity && 'error-after'} inputProps={{ className: errors.LocalChargingCapacity && "error-border" }}
                    value={value}
                    onChange={(e) => { e.persist = () => { }; handleChange(e), onChange(e) }}
                    displayEmpty
                  >
                    {LocalChargingListArr.map((option) => (
                      option.value ?
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                        :
                        <MenuItem>{<span style={{ color: "rgb(177 177 177)", fontWeight: 300 }}>{"Select Charging Capacity"}</span>}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.LocalChargingCapacity?.message}</FormHelperText>
                </FormControl></Grid>
            )}
          />

          <Controller
            control={control}
            rules={{
              required: "This field is required.",
            }}
            name="LocalLanguage"
            render={({ field: { onChange, value }, fieldState }) => (
              <Grid item lg={6} sm={6}>
                <FormControl variant="filled" error>
                  <label>{"Language *"}</label>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="simple-select"
                    error={!!errors.LocalLanguage}
                    className={errors.LocalLanguage && 'error-after'} inputProps={{ className: errors.LocalLanguage && "error-border" }}
                    value={value}
                    onChange={(e) => { e.persist = () => { }; handleChange(e, 'LocalLanguage'), onChange(e) }}
                    displayEmpty
                  >
                    {LocalLanguageList.map((option) => (
                      option.value ? <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                        : <MenuItem disabled value={''}>{<span style={{ color: "rgb(177 177 177)", fontWeight: 300 }}>{"Select Language"}</span>}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.LocalLanguage?.message}</FormHelperText>
                </FormControl></Grid>
            )}
          />
        </Grid>
      </div>
    </>
  );
}

const Review = (props) => {
  const {
    getValues,
    setValue
  } = useFormContext();
  const objFielddata = props.data.getValues();
  const articleListOfSKU = useSelector(state => state.article.listArticleBySKU)
  let [localiseDescriptionValue, setLocaliseDescriptionValue] = useState('');
  let globaldescriptiondata = [];


  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  };

  const localAttributeData = [
    // { 'Article Type': objFielddata.LocalArticleType },
    { 'Article Description': localiseDescriptionValue },
    { 'Manufacturer Name': objFielddata.LocalManufacturerName },
    { 'Color Name': objFielddata.LocalColorName },
    { 'Series 1 (Family Name Part 1)': objFielddata.LocalSeriesOne },
    { 'Series 2 (Family Name Part 2)': objFielddata.LocalSeriesTwo },
    { 'Sim Card Type': objFielddata.LocalSimCardType },
    { 'Model No.': objFielddata.LocalModelNumber },
    { 'Front Camera': objFielddata.LocalFrontCamera },
    { 'Rear Camera': objFielddata.LocalRearCamera },
    { 'Battery Size': objFielddata.LocalBatterySize },
    { 'Charging Capacity': objFielddata.LocalChargingCapacity },
    { 'Language': objFielddata.LocalLanguage },
  ];


  useEffect(() => {
    if (articleListOfSKU) {
      console.log("articleListOfSKU", articleListOfSKU.data[0]);
      let SKUData = articleListOfSKU.data[0];
      if (SKUData.serialized) {
        let storageSizeData = '';
        if (SKUData?.attributes?.ram?.value) {
          if (SKUData?.attributes?.storageSize?.value && SKUData?.attributes?.storageSize?.value !== "NA") {
            storageSizeData = "+" + SKUData?.attributes?.storageSize?.value;
          } else {
            storageSizeData = '';
          }
        } else {
          storageSizeData = SKUData?.attributes?.storageSize?.value ? SKUData?.attributes?.storageSize?.value : '';
        }
        globaldescriptiondata.push(
          { "manufacturerName": objFielddata.LocalManufacturerName || SKUData?.manufacturer?.code },
          { "seriesOne": objFielddata.LocalSeriesOne || SKUData?.seriesOne?.code },
          { "seriesTwo": objFielddata.LocalSeriesTwo || SKUData?.seriesTwo?.code },
          { "networkConnection": SKUData?.attributes?.networkConnection?.value === "NA" ? "" : SKUData?.attributes?.networkConnection?.value },
          { "networkTechnology": SKUData?.attributes?.networkTechnology?.value === "NA" ? "" : SKUData?.attributes?.networkTechnology?.value },
          { "ramSize": SKUData?.attributes?.ram?.value },
          { "storageSize": storageSizeData },
          { "colorName": objFielddata.LocalColorName || SKUData?.color?.code }
        )
      } else {
        globaldescriptiondata.push(
          { "manufacturerName": objFielddata.LocalManufacturerName || SKUData?.manufacturer?.code },
          { "seriesOne": objFielddata.LocalSeriesOne || SKUData?.seriesOne?.code },
          { "seriesTwo": objFielddata.LocalSeriesTwo || SKUData?.seriesTwo?.code },
          { "colorName": objFielddata.LocalColorName || SKUData?.color?.code },
          { "cable": SKUData?.attributes?.cable?.value },
          { "chargingCapacity": objFielddata.LocalChargingCapacity || SKUData?.attributes?.capacity?.value.EN }
        )
      }
      let strVal = '';
      globaldescriptiondata.map((item, i) => {
        if (Object.keys(item)[0] == 'storageSize') {
          strVal = strVal + Object.values(item)[0]
        } else {
          strVal = strVal + " " + Object.values(item)[0]
        }
      })
      setLocaliseDescriptionValue(strVal.trim())
      setValue('localDescription', strVal.trim())
    }
  }, [articleListOfSKU])


  const { Market, SRP, Currency, liveDate, launchDate, Accessories } = objFielddata;
  const CarrierInfoFields = [
    'SRP',
    'Currency',
    'Market',
    'Live Date',
    'Launch Date'
  ]
  const CarrierlistItems = [SRP, Currency, Market, liveDate, launchDate].map((keys, i) => {
    let date = '';
    if (CarrierInfoFields[i] == 'Live Date') {
      date = formatDate(keys)
    } else if (CarrierInfoFields[i] == 'Launch Date') {
      date = formatDate(keys)
    }
    return <>{keys ? <><ListItem style={{ paddingLeft: "5px" }}
      secondaryAction={
        <div className="reviewValue">{date ? date : keys} </div>
      }
    >
      <ListItemText
        primary={<div className="reviewKey">{CarrierInfoFields[i]}</div>}
      />
    </ListItem>
      <Divider sx={{ width: "100% !important" }} /></> : <></>}</>
  }
  );
  const isLocaliseForPartner = objFielddata.LocaliseForPartner;
  let partnerName = objFielddata.partner;
  const PartnerArr = [];
  for (let i in partnerName) {
    if (!partnerName || i === 'list' || !partnerName[i].LiveDate) {

    } else {
      PartnerArr.push(
        { 'partner Name': i },
        { "Live date": formatDate(partnerName[i].LiveDate) },
        { "Launch Date": formatDate(partnerName[i].LaunchDate) },
        {
          "Types Of Services": `${partnerName[i].Service.swap ? "Available for Swap " : ""} 
                                  ${partnerName[i].Service.swtich ? "Available for Switch " : ""} 
                                  ${partnerName[i].Service.D2C ? "Available for Direct To Customer (DTC)" : ""}`
        }
      )
    }
  }
  //console.log(PartnerArr)

  const listPartners = PartnerArr.map((k, i) => {
    let title = true;
    if (Object.keys(k)[0] === 'partner Name') { title = true } else { title = false };
    return <> {title ? <label className="lableText" style={{ marginTop: 15 }}>{Object.values(k)[0]}</label> : <><ListItem style={{ paddingLeft: "5px" }}
      secondaryAction={
        <div className="reviewValue">{Object.values(k)[0] || '-'} </div>
      }
    >
      <ListItemText
        primary={<div className="reviewKey">{Object.keys(k)[0]}</div>}
      />
    </ListItem>
      <Divider sx={{ width: "100% !important" }} /></>
    }
    </>
  })

  const AccessorieslistItems = Accessories && Accessories.map((keys, i) => {
    return <><ListItem style={{ paddingLeft: "5px" }}

      secondaryAction={
        <div className="reviewValue">{keys.title || '-'} </div>
      }
    >
      <ListItemText
        primary={<div className="reviewKey">{`Accessories ${i + 1}`}</div>}
      />
    </ListItem>
      <Divider sx={{ width: "100% !important" }} /></>
  }
  );

  const LocalAttributeslistItems = localAttributeData.map((k, i) => {
    return <><ListItem style={{ paddingLeft: "5px" }}

      secondaryAction={
        <div className="reviewValue">{Object.values(k)[0] || '-'} </div>
      }
    >
      <ListItemText
        primary={<div className="reviewKey">{Object.keys(k)[0]}</div>}
      />
    </ListItem>
      <Divider sx={{ width: "100% !important" }} /></>
  }
  );
  return (
    <div className="reviewScreen">
      <Grid item xs={12} md={6}>
        <br />
        <label className="articleSubheader">
          {`Please confirm the details below to localise article for ${objFielddata.Market}.`}
        </label>
        <br />
        <label className="lableText">
          Carrier Info
        </label>
        <List>
          {CarrierlistItems}
        </List>

        {isLocaliseForPartner &&
          <><label className="lableText">
            {"Partner(s)"}
          </label>
            <List>
              {listPartners}
            </List>
          </>
        }

      { Accessories && <label className="lableText">  Accessories  </label> }
        
        <List>
          {AccessorieslistItems}
        </List>

        <label className="lableText">
          Local Attributes
        </label>
        <List>
          {LocalAttributeslistItems}
        </List>
      </Grid>
    </ div>
  );
};

function getStepContent(step, methods) {
  switch (step) {
    case 0:
      return <MarketAndPartnersForm />;
    // return <Accessories data={methods} />;
    case 1:
      return <Accessories data={methods} />;
    //  return <MarketAndPartnersForm />;
    case 2:
      return <LocalAttributes data={methods} />;
    case 3:
      return <Review data={methods} />;
    default:
      return "unknown step";
  }
}

const LocaliseArticleForm = (props) => {
  const methods = useForm({
    defaultValues: {
      SKU: props.data.sku || "",
      serialised: props.data.serialized,
      Market: "",
      Currency: "",
      SRP: "",
      LocaliseForPartner: false,
      liveDate: "",
      launchDate: "",
      Accessories: "",
      // LocalArticleType: "",
      LocalManufacturerName: "",
      LocalLanguage: "",
      LocalSimCardType: "",
      articleNetworkConnectionList: "",
      articleNetworkTechnologyList: "",
      articleRAMSizeList: "",
      articleStorageSizeList: "",
      LocalColorName: "",
      HEXCode: "",
      articleOperatingSystemList: "",
      screenSize: "",
      LocalFrontCamera: "",
      LocalRearCamera: "",
      LocalBatterySize: "",
      cable: "",
      articleChargingCapacityList: "",
      LocalModelNumber: "",
    },
  });
  useEffect(() => {
    dispatch(articleAction.getMarketListForLocaliseArticle())
  }, []);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };

  const dispatch = useDispatch();
  const inventory = useSelector(state => state.inventory)
  const handleNext = (data) => {
    //console.log("final data", data, "Props data", props);
    if (activeStep == steps.length - 1) {

      const payloadLocaliseArticle =
      {
        "id": props.data.id,
        "market": [
          data.Market
        ],
        "description": {
          "name": {
            "zh_HK": data.localDescription
          },
          "code": data.articleDescription
        },
        "color": {
          "name": {
            "zh_HK": data.LocalColorName
          }
        },
        "seriesOne": {
          "name": {
            "zh_HK": data.LocalSeriesOne
          }
        },
        "seriesTwo": {
          "name": {
            "zh_HK": data.LocalSeriesTwo
          }
        },
        "manufacturer": {
          "name": {
            "zh_HK": data.LocalManufacturerName
          }
        },
        "attributes": {
          "batterySize": {
            "type": "HashMapStringAttribute",
            "value": {
              "HK": data.LocalBatterySize
            }
          },
          "frontCamera": {
            "type": "HashMapStringAttribute",
            "value": {
              "HK": data.LocalFrontCamera
            }
          },
          "rearCamera": {
            "type": "HashMapStringAttribute",
            "value": {
              "HK": data.LocalRearCamera
            }
          },
          "simType": {
            "type": "HashMapStringAttribute",
            "value": {
              "HK": data.LocalSimCardType
            }
          },
          "capacity": {
            "type": "HashMapStringAttribute",
            "value": {
              "HK": data.LocalChargingCapacity
            }
          },
          "modelNumber": {
            "type": "HashMapStringAttribute",
            "value": {
              "HK": data.LocalModelNumber,
            }
          }
        }
      }
      const payloadCreateAccessoriesMapping = [{
        "sku": props.data.sku,
        "accessory": {
            "HK": {
                "type": "ArrayListAttribute",
                "csvValue": null,
                "value": data?.Accessories?.map(item=> item.title)
            }
        }
    }]
    function partnerInfo(partnerData){
      const obj = {}
      for(var d in partnerData) {
        if(d != 'list') {
          obj[d] = partnerData[d];
        }
    }
    return obj;
    }
    const payloadCreateSystemConfigiration = {
      "sku": props.data.sku,
      "systemConfig": data.LocaliseForPartner ? {
        "HK": [partnerInfo(data.partner)]
      }
      : {
        "HK": [ {
          "launchDate": data.launchDate,
          "LiveDate": data.liveDate,
        }]
      }
  }
  const payload_SRP = [
    {
        "sku": props.data.sku,
        "price": {
            "HK": {
                "type": "MoneyObjectAttribute",
                "value": {
                    "currencyCode": "HKD",
                    "amount": data.SRP
                }
            }
        }
    }
]
      dispatch(articleAction.createAccessoriesMapping(payloadCreateAccessoriesMapping)) 
      dispatch(articleAction.articleSystemConfiguration(payloadCreateSystemConfigiration)) 
      dispatch(articleAction.createSuggestedRetailPrice(payload_SRP)) 
      dispatch(articleAction.localiseArticle(props.data, payloadLocaliseArticle)) 
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  useEffect(() => {
    if (inventory && inventory.warehouseCreated) {
      setActiveStep(activeStep + 1);
    }
  }, [inventory]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="LocaliseStepperForm" >
      <br />
      <h5 className="PopupTitle">{`Localise Article ${props.data.sku}`}</h5>
      <br />
      <Stepper alternativeLabel activeStep={activeStep} >
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepFalied() && activeStep == index) {
            labelProps.error = true;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleNext)} >
          <Divider sx={{ width: "100% !important", marginTop: "10px" }} />
          <Box
            component="form"
            style={{ overflowY: "auto", paddingBottom: 20, maxHeight: 290, minHeight: 290 }}
            noValidate
            autoComplete="off"
          > {getStepContent(activeStep, methods)} </Box>

          <Divider sx={{ width: "100% !important" }} />
          <Typography className="cancelPopup" onClick={props.onCloseModal}>Cancel</Typography>
          <div className="stepperButton">
            {activeStep ? <Typography className="activeActive" onClick={handleBack}>Back</Typography> : ''}


            <Button size="small" label={activeStep === steps.length - 1 ? "Save" : "Next"}
              variant="contained"
              color="primary"
              type="submit"
            >
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export { LocaliseArticleForm };