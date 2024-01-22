import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

//for material ui tabs
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import QuestionSetEditor from '../components/QuestionSetEditor';

const Form = () => {

  const { formid } = useParams();
  
  const [docname, setDocName] = useState("Untitled");//later we will fetch from the database and get the name using the formid

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
      <div className="min-h-screen flex flex-col">
      <div className="top flex py-[1vh] px-[10vw] justify-between">
        <span>{docname}</span>
        <button className="px-[10px] py-[5px] bg-[#673ab7] text-white rounded-lg">Send</button>
      </div>
      <div className="tabs flex flex-col">
        <style>
          {`
            .css-jpln7h-MuiTabs-scroller{
              display:flex;
              justify-content:center;
            }
            .MuiTabs-indicator{
              background-color:#673ab7;
            }
            .Mui-selected{
              color:#673ab7;
            }
          `}
        </style>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Questions" {...a11yProps(0)} />
          <Tab label="Responses" {...a11yProps(1)} />
          <Tab label="Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
          <QuestionSetEditor formid={formid} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Responses
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Settings
      </CustomTabPanel>
      </div>
    </div>
  )
}

export default Form

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}