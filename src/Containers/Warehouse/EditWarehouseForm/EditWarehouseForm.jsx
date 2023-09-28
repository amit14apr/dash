import React, { useState, useEffect } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '../../../Components';
import { inventoryActions } from '../../../_actions';
import { useDispatch, useSelector } from 'react-redux';
import _appConfig from '../../../_appConfig/_appConfig';
import './style.less';

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";



function getSteps() {
  return [
    "Facility and Company",
    "Location and Contact",
  ];
}
const FaciltyForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  const FacilityType = [
    {
      value: "Internal",
      label: "Internal"
    },
    {
      value: "External",
      label: "External"
    }
  ];
  return (
    <>
      <br />
      <label>Facility Details</label>
      <Controller
        control={control}
        name="facilityName"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="facilityName"
            variant="filled"
            label="Facility Name *"
            placeholder="Enter Facility Name"
            size="small"
            inputProps={{ maxLength: 30 }}
            {...field}
            error={Boolean(errors?.facilityName)}
            helperText={errors.facilityName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="facilityType"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            variant="filled"
            defaultValue=""
            label="Facility Type *"
            error={errors.facilityType}
            helperText={errors.facilityType?.message}
            {...field}
          >
            {FacilityType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <br />
      <Controller
        control={control}
        name="facilityCode"
        render={({ field }) => (
          <TextField
            id="facilityCode"
            variant="filled"
            disabled={true}
            label="Facility Code"
            size="small"
            inputProps={{ maxLength: 30 }}
            {...field}
          />
        )}
      />
      <br />
      <label>Company Details</label>
      <Controller
        control={control}
        name="attentionName"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="attentionName"
            variant="filled"
            label="Attention Name *"
            placeholder="Enter Attention Name"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.attentionName)}
            helperText={errors.attentionName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="companyName"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="companyName"
            variant="filled"
            label="Company Name *"
            placeholder="Enter Company Name"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.companyName)}
            helperText={errors.companyName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="ownerName"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="ownerName"
            variant="filled"
            label="Owner Name *"
            placeholder="Enter Owner Name"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.ownerName)}
            helperText={errors.ownerName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="businessNature"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="businessNature"
            variant="filled"
            label="Business Nature *"
            placeholder="Enter Business Nature"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.businessNature)}
            helperText={errors.businessNature?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="taxCode"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="taxCode"
            variant="filled"
            label="Tax Code *"
            placeholder="Enter Tax Code "
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.taxCode)}
            helperText={errors.taxCode?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="TIN_No"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="TIN_No"
            variant="filled"
            label="TIN No.*"
            placeholder="Enter TIN Number"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.TIN_No)}
            helperText={errors.TIN_No?.message}
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const country = [
    {
      value: "Malaysia",
      label: "Malaysia"
    },
    {
      value: "Hong Kong",
      label: "Hong Kong"
    }
  ];
  return (
    <>
      <br />
      <label>Location Details</label>
      <Controller
        control={control}
        name="address1"
        rules={{
          required: "This field is required.",
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="address1"
            label="Address Line 1 *"
            variant="filled"
            placeholder="Enter Address"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.address1)}
            helperText={errors.address1?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="address2"
        rules={{
          minLength: {
            value: 5,
            message: "Please enter minimum of 5 characters."
          },
        }}
        render={({ field }) => (
          <TextField
            id="address2"
            label="Address Line 2 "
            variant="filled"
            placeholder="Enter Address"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.address2)}
            helperText={errors.address2?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        rules={{
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="city"
            label="City"
            variant="filled"
            placeholder="Enter City Name"
            size="small"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.city)}
            helperText={errors.city?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="state"
        rules={{
          minLength: { value: 5, message: "Please enter minimum of 5 characters." },
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="state"
            label="State "
            variant="filled"
            placeholder="Enter State Name"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.state)}
            helperText={errors.state?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            variant="filled"
            defaultValue=""
            label="Country *"
            error={errors.country}
            helperText={errors.country?.message}
            {...field}
          >
            {country.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        control={control}
        name="zipCode"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="zipCode"
            label="Zip Code *"
            variant="filled"
            placeholder="Enter Zip Code"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.zipCode)}
            helperText={errors.zipCode?.message}
          />
        )}
      />
      <br />
      <label>Contact Details</label>
      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="filled"
            placeholder="Enter Phone Number"
            size="small"
            margin="normal"
            fullWidth
            {...field}
            error={Boolean(errors?.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="mobileNumber"
        rules={{
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="mobileNumber"
            label="Mobile Number"
            variant="filled"
            placeholder="Enter Mobile Number"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.mobileNumber)}
            helperText={errors.mobileNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="emailAddress"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter valid email address. Format-example@mail.com"
          }
        }}
        render={({ field }) => (
          <TextField
            id="emailAddress"
            label="Email Address *"
            variant="filled"
            placeholder="Enter Email Address"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.emailAddress)}
            helperText={errors.emailAddress?.message}
          />
        )}
      />
    </>
  );
};

function getStepContent(step, methods) {
  switch (step) {
    case 0:
      return <FaciltyForm />;
    case 1:
      return <ContactForm />;
    default:
      return "unknown step";
  }
}

const EditWarehouseForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };
  const [actionType, payload] = props.data;

  const dispatch = useDispatch();
  const inventory = useSelector(state => state.inventory)

  let [Editdata, setEditData] = useState(null)

const methods = useForm({
  defaultValues: {
    facilityName: payload.name || "",
    facilityType: payload.type || "",
    facilityCode:payload.code || "",
    attentionName: payload.companyDetails.attentionName || "",
    companyName: payload.companyDetails.companyName || "",
    ownerName: payload.companyDetails.ownerName || "",
    businessNature: payload.companyDetails.businessNature || "",
    taxCode: payload.companyDetails.taxCode || "",
    TIN_No: payload.companyDetails.tinNo || "",
    address1: payload.addressDetails.addressLine1 || "",
    address2: payload.addressDetails.addressLine2 || "",
    city: payload.addressDetails.city || "",
    state: payload.addressDetails.state || "",
    country: payload.addressDetails.country || "",
    zipCode: payload.addressDetails.pinCode || "",
    phoneNumber: payload.contactDetails.phoneNumber || "",
    mobileNumber: payload.contactDetails.mobileNumber || "",
    emailAddress: payload.contactDetails.emailId || "",
  },
});

  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      const payloadData =
      {
        "id": payload.id || '',
        "name": data.facilityName,
        "type": data.facilityType,
        "companyDetails": {
          "attentionName": data.attentionName,
          "companyName": data.companyName,
          "ownerName": data.ownerName,
          "businessNature": data.businessNature,
          "taxCode": data.taxCode,
          "tinNo": data.TIN_No
        },
        "addressDetails": {
          "addressLine1": data.address1,
          "addressLine2": data.address2,
          "city": data.city,
          "state": data.state,
          "country": data.country,
          "pinCode": data.zipCode
        },
        "contactDetails": {
          "phoneNumber": data.phoneNumber,
          "mobileNumber": data.mobileNumber,
          "emailId": data.emailAddress
        }
      }
      dispatch(inventoryActions.updateWarehouse(payloadData))
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  useEffect(() => {
    if (inventory && inventory.warehouseCreated) {
      setActiveStep(activeStep + 1);
    }
},[inventory]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="EditForm" >
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
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
              > {getStepContent(activeStep, methods)} </Box>
              <div className="stepperButton">
                <Button size="small" label="Back"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                </Button>

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

export { EditWarehouseForm };
