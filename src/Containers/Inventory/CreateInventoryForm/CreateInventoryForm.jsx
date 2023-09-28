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
    "PO Details",
    "Supplier Details",
    "Review",
  ];
}
const POForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  const [value, setValue] = React.useState(null);
  const receiveLocation = [
    {
      value: "Makati Warehouse [1000]",
      label: "Makati Warehouse [1000]"
    },
    {
      value: "Makati Warehouse [1002]",
      label: "Makati Warehouse [10002]"
    }
  ];
  const stockSource = [
    {
      value: "Purchased",
      label: "Purchased"
    },
    {
      value: "Swap",
      label: "Swap"
    },
    {
      value: "Buyback (Trade In)",
      label: "Buyback (Trade In)"
    },
    {
      value: "Buyback-GBB",
      label: "Buyback-GBB"
    }, {
      value: "Repair Only - Internal",
      label: "Repair Only - Internal"
    },
    {
      value: "Repair Only - External",
      label: "Repair Only - External"
    }, {
      value: "Refurbished - Internal",
      label: "Refurbished - Internal"
    },
    {
      value: "Refurbished - External",
      label: "Refurbished - External"
    }, {
      value: "Rework",
      label: "Rework"
    },
    {
      value: "Salvaged Spare Parts",
      label: "Salvaged Spare Parts"
    }, {
      value: "Purchased Spare Parts",
      label: "Purchased Spare Parts"
    }
  ];
  const stockCondition = [
    {
      value: "New Device",
      label: "New Device"
    },
    {
      value: "Grade A",
      label: "Grade A"
    },
    {
      value: "Grade B",
      label: "Grade B"
    },
    {
      value: "Grade C",
      label: "Grade C"
    }, {
      value: "Grade D",
      label: "Grade D"
    },
    {
      value: "Grade E",
      label: "Grade E"
    }, {
      value: "Grade S",
      label: "Grade S"
    },
    {
      value: "Damaged Unit From Customer",
      label: "Damaged Unit From Customer"
    }, {
      value: "Ungraded",
      label: "Ungraded"
    },
    {
      value: "BER",
      label: "BER"
    }, {
      value: "Used Parts",
      label: "Used Parts"
    }, {
      value: "New Parts",
      label: "New Parts"
    },
  ];
  
  return (
    <>
      <br />
      <label>Please Enter Your Purchase Order Number</label>
      <Controller
        control={control}
        name="purchaseOrderNumber"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="purchaseOrderNumber"
            variant="filled"
            label="Purchase Order No. *"
            placeholder="Enter Purchase Order No."
            size="small"
            inputProps={{ maxLength: 30 }}
            {...field}
            error={Boolean(errors?.purchaseOrderNumber)}
            helperText={errors.purchaseOrderNumber?.message}
          />
        )}
      />

      <Controller
        render={({ field }) => (
          <div style={{ display: "inline-block", marginTop: "8px" }}><Button size="large" label="Populate PO Details" onClick={e => e}></Button></div>
        )}
      />
      <br />

      <br />
      <label>Purchase Order Details</label>
      <Controller
        control={control}
        name="receiveLocation"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            variant="filled"
            defaultValue=""
            label="Receive Location *"
            error={errors.receiveLocation}
            helperText={errors.receiveLocation?.message}
            {...field}
          >
            {receiveLocation.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="stockReceiveFromDate"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            type="date"
            id="stockReceiveFromDate"
            variant="filled"
            InputLabelProps={{ shrink: true }}
            label="Stock Receive From Date *"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.stockReceiveFromDate)}
            helperText={errors.stockReceiveFromDate?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="bolttechSKU"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="bolttechSKU"
            variant="filled"
            label="bolttech SKU*"
            placeholder="Enter bolttech SKU"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.bolttechSKU)}
            helperText={errors.bolttechSKU?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="bolttechSKUDescription"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^(?!\s)(?!.*\s$)[a-zA-Z\s]+$/,
            message: "This field can only contains alphabets."
          }
        }}
        render={({ field }) => (
          <TextField
            id="bolttechSKUDescription"
            variant="filled"
            label="bolttech SKU Description*"
            placeholder="Enter bolttech SKU Description"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.bolttechSKUDescription)}
            helperText={errors.bolttechSKUDescription?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="itemQuantity"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="itemQuantity"
            label="Item Quantity *"
            variant="filled"
            placeholder="Enter Item Quantity"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.itemQuantity)}
            helperText={errors.itemQuantity?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="stockSource"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            variant="filled"
            defaultValue=""
            label="Stock Source *"
            error={errors.stockSource}
            helperText={errors.stockSource?.message}
            {...field}
          >
            {stockSource.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        control={control}
        name="stockCondition"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            variant="filled"
            defaultValue=""
            label="Stock Condition *"
            error={errors.stockCondition}
            helperText={errors.stockCondition?.message}
            {...field}
          >
            {stockCondition.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        control={control}
        name="imei"
        rules={{
          required: "This field is required.",
          minLength: {
            value: 15,
            message: "Please enter minimum of 15 Numbers."
          },
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="imei"
            label="IMEI Number *"
            variant="filled"
            placeholder="Enter IMEI Number"
            size="small"
            margin="normal"
            inputProps={{ maxLength: 15 }}
            {...field}
            error={Boolean(errors?.imei)}
            helperText={errors.imei?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="warrantyExpiryDate"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            type="date"
            id="warrantyExpiryDate"
            variant="filled"
            InputLabelProps={{ shrink: true }}
            label="Warranty Expiry Date *"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.warrantyExpiryDate)}
            helperText={errors.warrantyExpiryDate?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="stockLocation"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            id="stockLocation"
            variant="filled"
            label="bolttech SKU*"
            placeholder="Enter stock Location"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.stockLocation)}
            helperText={errors.stockLocation?.message}
          />
        )}
      />
    </>
  );
};
const SupplierForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <br />
      <label>Supplier Details</label>
      <Controller
        control={control}
        name="supplierDONumber"
        rules={{
          required: "This field is required.",
          pattern: {
            value: /^[0-9]+$/,
            message: "This field can only contains numbers."
          }
        }}
        render={({ field }) => (
          <TextField
            id="supplierDONumber"
            label="Supplier DO Number *"
            variant="filled"
            placeholder="Enter Supplier DO Number"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.supplierDONumber)}
            helperText={errors.supplierDONumber?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="supplierDODate"
        rules={{
          required: "This field is required.",
        }}
        render={({ field }) => (
          <TextField
            type="date"
            id="SupplierDODate"
            variant="filled"
            InputLabelProps={{ shrink: true }}
            label="Supplier DO Date *"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.SupplierDODate)}
            helperText={errors.SupplierDODate?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="comments"
        render={({ field }) => (
          <TextField style={{ width: '60ch' }}
            id="comments"
            label="Comments"
            multiline
            rows={5}
            variant="filled"
            placeholder="Enter Comments"
            size="small"
            margin="normal"
            {...field}
            error={Boolean(errors?.comments)}
            helperText={errors.comments?.message}
          />
        )}
      />
    </>
  );
};
const Review = (props) => {
  const obj = props.data.getValues();
  console.log(obj)
  const reviewFormField = [
    'Purchase Order No.',
    'Receive Location',
    'Stock Receive From Date',
    'bolttech SKU',
    'bolttech SKU Description',
    'Item Quantity',
    'Stock Source',
    'Stock Condition',
    'IMEI No.',
    'Warranty Expiry Date',
    'Stock Location',
    'Supplier DO Number',
    'Supplier DO Date',
    'Comments'
  ];
  const listItems = Object.keys(obj).map((keys, i) =>
    <ListItem style={{ paddingLeft: "5px" }}
      secondaryAction={
        obj[keys] || "-"
      }
    >
      <ListItemText
        primary={reviewFormField[i]}
      />
    </ListItem>
  );
  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Summary
        </Typography>
        <List style={{ margin: "0 20px" }}>
          {listItems}
        </List>
      </Grid>
    </>
  );
};

function getStepContent(step, methods) {
  switch (step) {
    case 0:
      return <POForm />;

    case 1:
      return <SupplierForm />;
    case 2:
      return <Review data={methods} />;
    default:
      return "unknown step";
  }
}

const CreateInventoryForm = () => {
  const methods = useForm({
    defaultValues: {
      purchaseOrderNumber: "",
      receiveLocation: "",
      stockReceiveFromDate: "",
      bolttechSKU: "",
      bolttechSKUDescription: "",
      itemQuantity: "",
      stockSource: "",
      stockCondition: "",
      imei: "",
      warrantyExpiryDate: "",
      stockLocation: "",
      supplierDONumber: "",
      supplierDODate: "",
      comments: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };

  const dispatch = useDispatch();
  const inventory = useSelector(state => state.inventory)
  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      const payload =
      {
        "purchaseOrderNumber": data.purchaseOrderNumber,
        "receiveLocation": data.receiveLocation,
        "stockReceiveFromDate": formatDate(data.stockReceiveFromDate),
        "bolttechSKU": data.bolttechSKU,
        "bolttechSKUDescription": data.bolttechSKUDescription,
        "itemQuantity": data.itemQuantity,
        "stockSource": data.stockSource,
        "stockCondition": data.stockCondition,
        "isFinishedReceiving": 'yes',
        "imei": data.imei,
        "warrantyExpiryDate": formatDate(data.warrantyExpiryDate),
        "stockLocation": data.stockLocation,
        "supplierDetails": {
          "supplierDONumber": data.supplierDONumber,
          "supplierDODate": formatDate(data.supplierDODate),
          "comments": data.comments
        }
      }
      dispatch(inventoryActions.createInventory(payload))
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  useEffect(() => {
    if (inventory && inventory.inventoryCreated) {
      setActiveStep(activeStep + 1);
    }
  }, [inventory]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  };

  return (
    <div className="StepperForm" >
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

            <Button size="small" label={activeStep === steps.length - 1 ? "Create" : "Next"}
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

export { CreateInventoryForm };
