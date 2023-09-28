import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import './style.less'
import currentLang from '../../Lang';
export default function Footer() {
  return (
    <footer className="footer-text" >
      <Typography variant="root" color="inherit">
        {currentLang.FooterText.CopyRightText}
      </Typography>
    </footer>
  )
}