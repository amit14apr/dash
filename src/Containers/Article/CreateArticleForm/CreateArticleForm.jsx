import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import { Button, HexColorComponent } from "../../../Components";
import { articleAction, userActions } from "../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import _appConfig from "../../../_appConfig/_appConfig";
import "./style.less";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useFieldArray,
  useWatch,
} from "react-hook-form";

function getSteps() {
  return ["User Type", "User Info", "Review"];
}

const ArticleTypeForm = () => {
  const {
    control,
    register,
    resetField,
    formState: { errors },
  } = useFormContext();
  const formValues = control._defaultValues;
  const dispatch = useDispatch();
  const article = useSelector((state) => state.users.rolesList);

  let list = [{ value: "", label: "" }];
  article?.map((item) => {
    list.push({ value: item, label: item });
  });

  useEffect(() => {
    dispatch(userActions.getUserRolesList());
  }, []);

  useEffect(() => {
    setArticleTypeList(list);
  }, [article]);

  const [articleTypeList, setArticleTypeList] = useState(list || []);

  return (
    <>
      <br />
      <label className="articleSubheader">Please select the user type.</label>
      <br />

      <Controller
        control={control}
        name="articleType"
        rules={{
          required: "This field is required.",
        }}
        render={({ field: { onChange, value } }) => (
          <FormControl variant="filled" error>
            <label>User Role *</label>
            <Select
              labelId="demo-simple-select-filled-label"
              id="simple-select"
              error={!!errors.articleType}
              className={errors.articleType && "error-after"}
              inputProps={{ className: errors.articleType && "error-border" }}
              value={value}
              onChange={(e) => {
                e.persist = () => { };
                onChange(e);
              }}
              displayEmpty
            >
              {articleTypeList.map((option) =>
                option.value ? (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ) : (
                  <MenuItem disabled value={""}>
                    {
                      <span
                        style={{ color: "rgb(177 177 177)", fontWeight: 300 }}
                      >
                        Select Role Type
                      </span>
                    }
                  </MenuItem>
                )
              )}
            </Select>
            <FormHelperText>{errors.articleType?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
};

const DeviceInfo = (props) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const obj = props.data.getValues();
  const generateObjListForDropDownFields = (dataList, targetList) => {
    dataList?.map((item) => {
      targetList.push({ value: item, label: item });
    });
  };

  const department = useSelector((state) => state.users.departments);

  let departmentList = [{ value: "", label: "" }];

  const [userDepartmentList, setUserDepartmentList] = useState(
    departmentList || []
  );

  generateObjListForDropDownFields(department, departmentList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getDepartments());
  }, []);
  useEffect(() => {
    setUserDepartmentList(departmentList);
  }, [department]);

  return (
    <div className="deviceInfo">
      <br />
      <label className="articleSubheader">
        Please enter the user info details.
      </label>
      <br />
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="stretch"
        direction="row"
        style={{ height: "100%" }}
      >
        <Controller
          control={control}
          name="articleManufacturerList"
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/,
              message:
                "Entered value can not start/end or contain only white spacing",
            },
          }}
          render={({ field }) => (
            <Grid item lg={6} sm={6}>
              {" "}
              <FormControl>
                <label>{"First Name *"}</label>
                <TextField
                  variant="filled"
                  label=""
                  className={errors.articleManufacturerList && "error-after"}
                  placeholder="Enter First Name"
                  size="small"
                  inputProps={{
                    maxLength: 20,
                    className: errors.articleManufacturerList && "error-border",
                  }}
                  {...field}
                  error={errors.articleManufacturerList}
                  helperText={errors.articleManufacturerList?.message}
                />
              </FormControl>
            </Grid>
          )}
        />

        <Controller
          control={control}
          name="seriesOne"
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/,
              message:
                "Entered value can not start/end or contain only white spacing",
            },
          }}
          render={({ field }) => (
            <Grid item lg={6} sm={6}>
              <FormControl>
                <label>{"Last Name *"}</label>
                <TextField
                  id="seriesOne"
                  variant="filled"
                  placeholder="Enter Last Name"
                  size="small"
                  className={errors.seriesOne && "error-after"}
                  inputProps={{
                    maxLength: 60,
                    className: errors.seriesOne && "error-border",
                  }}
                  {...field}
                  error={Boolean(errors?.seriesOne)}
                  helperText={errors.seriesOne?.message}
                />
              </FormControl>
            </Grid>
          )}
        />

        <Controller
          control={control}
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/,
              message:
                "Entered value can not start/end or contain only white spacing",
            },
          }}
          name="seriesTwo"
          render={({ field }) => (
            <Grid item lg={6} sm={6}>
              <FormControl>
                <label>{"Email *"}</label>
                <TextField
                  id="seriesTwo"
                  variant="filled"
                  placeholder="Enter Email"
                  size="small"
                  className={errors.seriesTwo && "error-after"}
                  inputProps={{
                    maxLength: 60,
                    className: errors.seriesTwo && "error-border",
                  }}
                  {...field}
                  error={Boolean(errors?.seriesTwo)}
                  helperText={errors.seriesTwo?.message}
                />
              </FormControl>
            </Grid>
          )}
        />

        <Controller
          control={control}
          name="colorName"
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[0-9]+$/,
              message: "This field can only contains Numbers.",
            },
          }}
          render={({ field }) => (
            <Grid item lg={6} sm={6}>
              <FormControl>
                <label>{"Mobile *"}</label>
                <TextField
                  id="colorName"
                  variant="filled"
                  placeholder="Enter Mobile Number"
                  size="small"
                  className={errors.colorName && "error-after"}
                  inputProps={{
                    maxLength: 25,
                    className: errors.colorName && "error-border",
                  }}
                  {...field}
                  error={Boolean(errors?.colorName)}
                  helperText={errors.colorName?.message}
                />
              </FormControl>
            </Grid>
          )}
        />

        <Controller
          control={control}
          name="HEXCode"
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/,
              message:
                "Entered value can not start/end or contain only white spacing",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Grid item lg={6} sm={6}>
              <FormControl>
                <label>{"Password *"}</label>{" "}
                <TextField
                  id="HEXCode"
                  variant="filled"
                  placeholder="Enter Password"
                  size="small"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value}
                  className={errors.HEXCode && "error-after-HexCode"}
                  inputProps={{ maxLength: 25 }}
                  InputProps={{
                    className: errors.HEXCode && "searchIcon-error",
                  }}
                  error={Boolean(errors?.HEXCode)}
                  helperText={errors.HEXCode?.message}
                />
              </FormControl>
            </Grid>
          )}
        />

        {/* <Controller
          control={control}
          name="batterySize"
          rules={{
            required: "This field is required.",
            pattern: {
              value: /^[^\s]+(?:$|.*[^\s]+$)/,
              message:
                "Entered value can not start/end or contain only white spacing",
            },
          }}
          render={({ field }) => (
            <Grid item lg={6} sm={6}>
              <FormControl>
                <label>{"Country *"}</label>
                <TextField
                  id="batterySize"
                  variant="filled"
                  placeholder="Enter Country Code"
                  size="small"
                  className={errors.batterySize && "error-after"}
                  inputProps={{
                    maxLength: 8,
                    className: errors.batterySize && "error-border",
                  }}
                  {...field}
                  error={Boolean(errors?.batterySize)}
                  helperText={errors.batterySize?.message}
                />
              </FormControl>
            </Grid>
          )}
        /> */}

<Controller
         control={control}
         name="batterySize"
          render={({ field: { onChange, value }, fieldState }) => (
            <Grid item lg={6} sm={6}>
              <FormControl variant="filled" error>
                <label>{"Emirate *"}</label>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="batterySize"
                  error={!!errors.batterySize}
                  className={
                    errors.batterySize && "error-after"
                  }
                  inputProps={{
                    className:
                      errors.batterySize && "error-border",
                  }}
                  value={value}
                  onChange={(e) => {
                    e.persist = () => { };
                    onChange(e);
                  }}
                  displayEmpty
                >
                 <MenuItem disabled value={""}>
                        {
                          <span
                            style={{
                              color: "rgb(177 177 177)",
                              fontWeight: 300,
                            }}
                          >
                            {"Select Emirate"}
                          </span>
                        }
                      </MenuItem>
          <MenuItem value={'Abu Dhabi'}>Abu Dhabi</MenuItem>
          <MenuItem value={'Ajman'}>Ajman</MenuItem>
          <MenuItem value={'Dubai'}>Dubai</MenuItem>
          <MenuItem value={'Fujairah'}>Fujairah</MenuItem>
          <MenuItem value={'Ras Al Khaimah'}>Ras Al Khaimah</MenuItem>
          <MenuItem value={'Sharjah'}>Sharjah</MenuItem>
          <MenuItem value={'Umm Al Quwain'}>Umm Al Quwain</MenuItem>
                </Select>

                <FormHelperText>
                  {errors.batterySize?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />

        <Controller
          control={control}
          name="articleChargingCapacityList"
          render={({ field: { onChange, value }, fieldState }) => (
            <Grid item lg={6} sm={6}>
              <FormControl variant="filled" error>
                <label>{"Department *"}</label>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="simple-select"
                  error={!!errors.articleChargingCapacityList}
                  className={
                    errors.articleChargingCapacityList && "error-after"
                  }
                  inputProps={{
                    className:
                      errors.articleChargingCapacityList && "error-border",
                  }}
                  value={value}
                  onChange={(e) => {
                    e.persist = () => { };
                    onChange(e);
                  }}
                  displayEmpty
                >
                  {departmentList.map((option) =>
                    option.value ? (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ) : (
                      <MenuItem disabled value={""}>
                        {
                          <span
                            style={{
                              color: "rgb(177 177 177)",
                              fontWeight: 300,
                            }}
                          >
                            {"Select Department"}
                          </span>
                        }
                      </MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText>
                  {errors.articleChargingCapacityList?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
        />
      </Grid>
    </div>
  );
};
const Review = (props) => {
  const { setValue } = useFormContext();
  const objFielddata = props.data.getValues();
  const reviewFormFieldSerialised = [
    "User Role",
    "First Name",
    "Last Name",
    "Email",
    "Mobile",
    "Password",
    "Country",
    "Department",
  ];

  const { ...serialisedObj } = objFielddata;

  const objReview = serialisedObj;
  const reviewFormField = reviewFormFieldSerialised;

  console.log(">>>", objReview);
  const listItems = Object.keys(objReview).map((keys, i) => {
    objReview[keys] == "serialised" && (objReview[keys] = "Serialised");
    objReview[keys] == "nonSerialised" && (objReview[keys] = "Non Serialised");
    return (
      <>
        <ListItem
          style={{ paddingLeft: "5px" }}
          secondaryAction={
            <div className="reviewValue">
              {objReview[keys] ? objReview[keys] : "-"}{" "}
            </div>
          }
        >
          <ListItemText
            primary={<div className="reviewKey">{reviewFormField[i]}</div>}
          />
        </ListItem>
        <Divider sx={{ width: "100% !important" }} />
      </>
    );
  });
  return (
    <div className="reviewScreen">
      <Grid item xs={12} md={6}>
        <br />
        <label className="articleSubheader">
          Please verify the user details below before confirming.
        </label>
        <br />
        <label className="lableText">User Info</label>
        <List>{listItems}</List>
      </Grid>
    </div>
  );
};

function getStepContent(step, methods) {
  switch (step) {
    case 0:
      return <ArticleTypeForm />;
    case 1:
      return <DeviceInfo data={methods} />;
    case 2:
      return <Review data={methods} />;
    default:
      return "unknown step";
  }
}

const CreateArticleForm = (props) => {
  const methods = useForm({
    defaultValues: {
      articleType: "",
      articleManufacturerList: "",
      seriesOne: "",
      seriesTwo: "",
      colorName: "",
      HEXCode: "",
      batterySize: "",
      articleChargingCapacityList: "",
    },
  });
 
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };

  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      const payload = {
        roleId: data.articleType,
        firstName: data.articleManufacturerList,
        lastName: data.seriesOne,
        email: data.seriesTwo,
        userName: data.seriesTwo,
        mobile: data.colorName,
        password: data.HEXCode,
        countryCode: data.batterySize,
        department: data.articleChargingCapacityList
      };

      dispatch(userActions.register(payload));
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
    <div className="ArticleStepperForm">
      <br />
      <h5 className="PopupTitle">Create User</h5>
      <br />
      <Stepper alternativeLabel activeStep={activeStep}>
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
        <form onSubmit={methods.handleSubmit(handleNext)}>
          <Divider sx={{ width: "100% !important", marginTop: "10px" }} />
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { margin: "16px 0", width: "30ch" },
              "& .MuiSelect-select": { width: "21.4ch" },
              "&: .MuiFilledInput-input": { padding: "12px" },
            }}
            style={{
              overflowY: "auto",
              paddingBottom: 20,
              maxHeight: 290,
              minHeight: 290,
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            {getStepContent(activeStep, methods)}{" "}
          </Box>

          <Divider sx={{ width: "100% !important" }} />
          <Typography className="cancelPopup" onClick={props.onCloseModal}>
            Cancel
          </Typography>
          <div className="stepperButton">
            {activeStep ? (
              <Typography className="activeActive" onClick={handleBack}>
                Back
              </Typography>
            ) : (
              ""
            )}

            <Button
              size="small"
              label={activeStep === steps.length - 1 ? "Create" : "Next"}
              variant="contained"
              color="primary"
              type="submit"
            ></Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export { CreateArticleForm };
