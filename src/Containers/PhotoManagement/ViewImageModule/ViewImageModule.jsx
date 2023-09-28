import React, { useState, useEffect, useRef } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button,BoxLoader } from '../../../Components';
import imageNotAvailable from '../../../_icons/imageNotAvailable.svg'
import { alertActions } from '../../../_actions/alert.actions';
import { imageUploadAction } from '../../../_actions';
import { useDispatch } from 'react-redux';
import _appConfig from '../../../_appConfig/_appConfig';
import './style.less';

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const ViewImageForm = () => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const dispatch = useDispatch();
  const [imageFrontUrl, setImageFrontUrl] = useState(null);
  const [imageBackUrl, setImageBackUrl] = useState(null);
  const [loader , setLoader] = useState(true);

  useEffect(() => {
    let FrontURL = `https://d2mz9fyt6vwhct.cloudfront.net/${getValues("SKU")}-front.png`
    let BackURL = `https://d2mz9fyt6vwhct.cloudfront.net/${getValues("SKU")}-back.png`
    let imgFrontObj = new Image();
    imgFrontObj.src = FrontURL
    imgFrontObj.onload = () => {
      setImageFrontUrl(FrontURL);
      setLoader(false)
    }
    imgFrontObj.onerror = (e) => {
      setImageFrontUrl(null);
      setLoader(false)
    }
    let imgBackObj = new Image();
    imgBackObj.src = BackURL
    imgBackObj.onload = () => {
      setImageBackUrl(BackURL);
      setLoader(false)
    }
    imgBackObj.onerror = (e) => {
      setImageBackUrl(null);
      setLoader(false)
    }
  }, []);
  return (
    <>
    {loader && <BoxLoader /> }
      <br />
      <label className="viewImageSubheader">{`View front and back images for article ${getValues('SKU')}.`}</label>
      <br />
      <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%' }}>
        <Grid item lg={6} sm={6}>
          <label className="lableText">{"Front Image"}</label>
          {(imageFrontUrl) ? (
            <Box mt={2} textAlign="left">
              <div className="previewImageWrappar">
                <img style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }} src={imageFrontUrl} alt={""} height="100px" />
              </div>

            </Box>
          )
            :
            (
              <Box mt={2} textAlign="left">
                <div style={{ position: "relative" }}>
                  <img src={imageNotAvailable}>
                  </img>
                  <label style={{
                    position: "absolute",
                    top: "50%",
                    left: "40%",
                    transform: "translate(-50%, -50%)"
                  }}><span className="previewImageLabelText">{"Image Not Available"}</span></label>
                </div>
              </Box>
            )
          }
        </Grid>
        <Grid item lg={6} sm={6}>
          <label className="lableText">{"Back Image"}</label>
          {imageBackUrl ? (
            <Box mt={2} textAlign="left">
              <div className="previewImageWrappar">
                <img style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
                  src={imageBackUrl} alt={""} height="100px" />
              </div>
            </Box>
          )
            :
            (
              <Box mt={2} textAlign="left">
                <div style={{ position: "relative" }}>
                  <img src={imageNotAvailable}>
                  </img>
                  <label style={{
                    position: "absolute",
                    top: "50%",
                    left: "40%",
                    transform: "translate(-50%, -50%)"
                  }}><span className="previewImageLabelText">{"Image Not Available"}</span></label>
                </div>
              </Box>
            )
          }
        </Grid>
      </Grid>
    </>
  );

}

function getStepContent(step, methods) {
  switch (step) {
    default:
      return <ViewImageForm />;
  }
}

const ViewImageModule = (props) => {
  console.log("Props data", props)
  const methods = useForm({
    defaultValues: {
      SKU: props.data.sku,
      frontImage: null,
      backImage: null,
    },
  });
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const handleClose = () => {
    props.onCloseModal()
  };
  return (
    <div className="ImageViewStepperForm" >
      <br />
      <h5 className="PopupTitle">{"View Images"}</h5>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleClose)} >
          <Divider sx={{ width: "100% !important", marginTop: "10px" }} />
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { margin: "16px 0", width: '30ch', },
              '& .MuiSelect-select': { width: '21.4ch' },
              '&: .MuiFilledInput-input': { padding: "12px" },
            }}
            style={{ overflowY: "auto", paddingBottom: 20, maxHeight: 330, minHeight: 330 }}
            noValidate
            autoComplete="off"
          > {getStepContent(activeStep, methods)} </Box>

          <Divider sx={{ width: "100% !important" }} />

          <div className="stepperButton">
            <Button size="small" label={"Close"}
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

export { ViewImageModule };
