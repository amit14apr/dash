import React, { useState, useEffect, useRef } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { OutlinedButton,Button } from '../../../Components';
import imageNotAvailable from '../../../_icons/imageNotAvailable.svg'
import { alertActions } from '../../../_actions/alert.actions';
import { imageUploadAction } from '../../../_actions';
import { useDispatch } from 'react-redux';
import CrossIcon from '../controls/CrossIcon';
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

function getSteps() {
  return [];
}

const UploadImageForm = () => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const dispatch = useDispatch();
  const [selectedFrontImage, setSelectedFrontImage] = useState(null);
  const [imageFrontUrl, setImageFrontUrl] = useState(null);
  const [selectedBackImage, setSelectedBackImage] = useState(null);
  const [imageBackUrl, setImageBackUrl] = useState(null);

  useEffect(() => {
    if (selectedFrontImage) {
      setImageFrontUrl(URL.createObjectURL(selectedFrontImage));
    }
  }, [selectedFrontImage]);

  
  useEffect(() => {
    if (selectedBackImage) {
      setImageBackUrl(URL.createObjectURL(selectedBackImage));
    }
  }, [selectedBackImage]);

  const frontImageRef = useRef();
  const backImageRef = useRef();
  
  const handleClickFrontImage = (e) => {
    frontImageRef.current.click()
  }
  const handleClickBackImage = (e) => {
    backImageRef.current.click()
  }
  const handleDeleteAttachment = (imageName) => {
   if(imageName == 'frontImage'){
    setSelectedFrontImage(null);
    setImageFrontUrl(null);
    setValue('frontImage',null)
   } else {
    setSelectedBackImage(null);
    setImageBackUrl(null);
    setValue('backImage', null)
   }
   
  }
  
  const validateFileType =(targetData, imageSide) => {
    let validate = true;
    var fileName = targetData.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        var file = targetData.files[0];
        if (extFile !=="png") { 
          dispatch(alertActions.error('Only .png file is allowed'))
          validate = false
          return
        }
        let img = new Image();
        img.src = window.URL.createObjectURL(file)
        img.onload = () => {
           if(img.width !== 400 && img.height !== 560){
            validate && dispatch(alertActions.error(`Image resolution should be 400x560px.`));
            validate = false;
            return 
           }     
          
          if ( file.size > 1000000 ) { 
            dispatch(alertActions.error('Image size should be less than or equals to 1MB'))
            validate = false
            return
          } 
          if(validate) {
            var blob = file.slice(0, file.size, 'image/png'); 
            var newFile = new File([blob], `${getValues("SKU")}-${(imageSide == "imageFront") ? `front` : `back`}.${extFile}`, {type: 'image/png'});
            console.log("newFile",newFile)
            console.log("targetData.files[0]",targetData.files[0]);
            if(imageSide == 'imageFront') {
              setSelectedFrontImage(newFile);
              setValue("frontImage",newFile)
          } else {
              setSelectedBackImage(newFile);
              setValue("backImage",newFile)
            }
            
          }
        }
        
  
}
  return (
    <>
      <br />
      <label className="uploadImageSubheader">{`Add front and back images for article ${getValues('SKU')}.`}</label>
      <br />
      <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" direction="row" style={{ height: '100%' }}>
      <Grid item lg={6} sm={6}>
      <label className="lableText">{"Upload Front Image"}</label>
      <label className="uploadImageSubheaderInfo">
        {`Naming format for front image is ${getValues("SKU")}-front.png. Max file size is 1MB at 400x560px resolution, and supported file type is .png`}
      </label>
      <br />
      <input
        type="file"
        accept="image/*.png"
        id="select-image-front"
        ref={frontImageRef}
        style={{ display: 'none' }}
        onChange={e => validateFileType(e.target , 'imageFront')}
      />
    
      {selectedFrontImage === null ? <OutlinedButton label={"Add file"} onClick={handleClickFrontImage}></OutlinedButton>
      : <Chip label={`${getValues("SKU")}-front.png`} onDelete={e=> handleDeleteAttachment('frontImage')} deleteIcon={<a style={{paddingLeft: 20}}><CrossIcon /></a>} />}
     
      <label className="lableText previewHeadingText">{"Front Image Preview"}</label>
      {(imageFrontUrl && selectedFrontImage) ? (
        <Box mt={2} textAlign="left">
          <div className="previewImageWrappar">
          <img style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                  }} src={imageFrontUrl} alt={selectedFrontImage.name} height="100px" />
          </div>
          
        </Box>
      )
      :
      (
        <Box mt={2} textAlign="left">
          <div style={{position: "relative"}}>
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
      <label className="lableText">{"Upload Back Image"}</label>
      <label className="uploadImageSubheaderInfo">
        {`Naming format for Back image is ${getValues("SKU")}-back.png. Max file size is 1MB at 400x560px resolution, and supported file type is .png`}
      </label>
      <br />
      <input
        accept="image/*"
        type="file"
        ref={backImageRef}
        id="select-image-back"
        style={{ display: 'none' }}
        onChange={e => validateFileType(e.target , 'imageBack')}
      />
      {selectedBackImage === null ?  <OutlinedButton label={"Add file"} onClick={handleClickBackImage}></OutlinedButton>
      : <Chip label={`${getValues("SKU")}-back.png`} onDelete={e=> handleDeleteAttachment('backImage')} deleteIcon={<a style={{paddingLeft: 20}}><CrossIcon/></a>} />}
 
      <label className="lableText previewHeadingText">{"Back Image Preview"}</label>
      {(imageBackUrl && selectedBackImage) ? (
        <Box mt={2} textAlign="left">
          <div className="previewImageWrappar">
            <img style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                  }}
             src={imageBackUrl} alt={selectedBackImage.name} height="100px" />
          </div>
        </Box>
      )
      :
      (
        <Box mt={2} textAlign="left">
          <div style={{position: "relative"}}>
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
      return <UploadImageForm />;
  }
}

const UploadImageModule = (props) => {
  console.log("Props data",props)
  const methods = useForm({
    defaultValues: {
      SKU : props.data.sku,
      frontImage : null,
      backImage: null,
    },
  });
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const handleSave = () => {
    if((methods.getValues("frontImage") || methods.getValues("backImage"))){
      const formData = new FormData();
      methods.getValues("frontImage") && formData.append("frontImage", methods.getValues("frontImage"), methods.getValues("frontImage")?.name);
      methods.getValues("backImage") && formData.append("backImage", methods.getValues("backImage"), methods.getValues("backImage")?.name);
       dispatch(imageUploadAction.UploadImageArticle(formData, props.data.sku))
    } else {
      dispatch(alertActions.error('Please add atleast one(front/back) image'))
    }
   
  };
  return (
    <div className="ImageUploadStepperForm" >
       <br />
      <h5 className="PopupTitle">{"Edit Images"}</h5>
    
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSave)} >
        <Divider sx={{ width: "100% !important", marginTop: "10px" }} />
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { margin: "16px 0", width: '30ch', },
              '& .MuiSelect-select': { width: '21.4ch' },
              '&: .MuiFilledInput-input': {padding: "12px"},
            }}
            style={{overflowY:"auto", paddingBottom:20, maxHeight:330, minHeight:330}}
            noValidate
            autoComplete="off"
          > {getStepContent(activeStep, methods)} </Box>
               
          <Divider sx={{ width: "100% !important" }} />
         
          <div className="stepperButton">
          <Typography className="cancelPopup" onClick={props.onCloseModal}>{"Cancel"}</Typography>
            <Button size="small" label={ "Save"}
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

export { UploadImageModule };
