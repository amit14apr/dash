import React from "react";
import Typography from '@mui/material/Typography';
import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';
import { withRouter } from "react-router-dom";
import arrowRight from '../../_icons/arrow-right.svg';
import './style.less'


const Breadcrumbs = props => {
  const {
    history,
    location: { pathname },
    sku,
    module,
    pathName
  } = props;
  const pathnames = pathname.split("/").filter(x => x);
  return (
   
    <MUIBreadcrumbs aria-label="breadcrumb" className="breadcrumb" style={{color:"#170F4F", backgroundColor: '#F3F3F6'}}>
     
        <><Link style={{cursor:"pointer"}} onClick={() => history.push(`/`)}><span className="rootLinkPath">{module}<span className="rootLinkPadding">{<img src={arrowRight}></img>}</span></span></Link><span className="rootPathDetails">{`${module} ID [${sku}]`} </span></>
 
      { (pathname !==`/${pathName}`) && pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const Name = name.charAt(0).toUpperCase()+ name.slice(1);
        return isLast ? (
          <Typography key={name}>{Name}</Typography>
        ) : (
          <Link key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
   
  );
};

export default withRouter(Breadcrumbs);