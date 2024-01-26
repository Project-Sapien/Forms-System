import React from 'react'

//importing service
import formService from '../services/formService';

//material ui utilities
import { Paper, Typography,Grid} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RadioGroup from '@mui/material/RadioGroup';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';

// import auth from '../../services/authService';


function UserView() {

    const {formId} = useParams()
    const [userId, setUserId] = React.useState("")
    const [formData, setFormData] = React.useState({});
    const [responseData, setResponseData] = React.useState([])
    //console.log(responseData);
    
    const [optionValue, setOptionValue] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    
    
    const [questions, setQuestions] = React.useState([]);
    const [value, setValue] = React.useState('');
    //console.log(value);
    // React.useEffect(()=>{
    //   if(auth.isAuthenticated()){
    //     var userr = auth.getCurrentUser();
    //     console.log(userr.id);
    //     setUserId(userr.id);  
    //   } else{
    //     var anonymousUserId = "anonymous" +  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    //     console.log(anonymousUserId);
    //     setUserId(anonymousUserId)
    //   }
    // }, [])
    
    React.useEffect(() => {
       
        console.log(formId);
        formService.getForm(formId)
        .then((data) => { 
            console.log(data);
            
            setFormData(data)      
            setQuestions(data.questions) 
           },
           error => {
           const resMessage =
               (error.response &&
               error.response.data &&
               error.response.data.message) ||
               error.message ||
               error.toString();
               console.log(resMessage);
           }
        ); 
    },[formId]);
    
    

    const handleRadioChange = (j, i) => {
      var questionId = questions[i]._id
      var optionId = questions[i].options[j]._id

      var fakeData = {
        question: i,
        option: j
      }
      var data = {
        questionId, optionId
      }
    //  console.log(data);
      //console.log(fakeData);
     // console.log(j);
      
      setValue(j)

      var fakeRData = [...responseData];
      
      var indexOfResponse = fakeRData.findIndex(x => x.questionId===questionId);
        if(indexOfResponse === -1){
        setResponseData(responseData=> [...responseData, data])

        } else{
          fakeRData[indexOfResponse].questionId = questionId
          setResponseData(fakeRData);
        }

      
     // setOptionValue(fakeData);
    //  
    };


    function submitResponse(){
      var submissionData = {
        formId: formData._id,
        userId: userId,
        response: responseData
      }
      console.log(submissionData);
      
      formService.submitResponse(submissionData)
      .then((data2) => { 
        setIsSubmitted(true)
        console.log(data2);
       },
       error => {
       const resMessage =
           (error.response &&
           error.response.data &&
           error.response.data.message) ||
           error.message ||
           error.toString();
           console.log(resMessage);
       }
   );
      
    }

    function reloadForAnotherResponse(){
      window.location.reload(true);
    }

    return (
        <div style={{minHeight: '100vh'}}>
         <div>
         <AppBar position="static" style={{backgroundColor: 'teal'}}>
            <Toolbar>
              <IconButton edge="start" style={{marginRight: '10px', marginBottom: '5px'}} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{}}>
                Project Sapien Forms
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={5} style={{width: '100%'}}>         
                  <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}>
                        <div>
                          <div>
                            <Paper elevation={2} style={{width:'100%'}}>
                              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                                <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
                                  {formData.name}
                                </Typography>
                                <Typography variant="subtitle1">{formData.description}</Typography>
                              </div>
                            </Paper>
                          </div> 
                      </div>       
                  </Grid>  

                 {!isSubmitted ? (
                   <div>
                   <Grid>
                      
                      { questions.map((ques, i)=>(
                        <div className="certain_question" key={i}>
                          <br></br>
                        <Paper>
                          <div>
                            <div className="flex flex-col items-start ml-[6px] pt-[15px] pb-[15px">
                                <Typography variant="subtitle1" style={{marginLeft: '10px'}}>{i+1}. {ques.questionText}</Typography>
                               
                                {ques.questionImage !==""?(
                                    <div>
                                      <img src={ques.questionImage} width="80%" height="auto" /><br></br><br></br>
                                    </div>
                                ): "" }
                                
                                  {ques.questionType==="Multiple Choice"&&<div className="radio-when-req">
    
                                  <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e)=>{handleRadioChange(e.target.value, i)}}>
    
                                    {ques.options.map((op, j)=>(
                                      <div key={j}>
                                        <div style={{display: 'flex', marginLeft: '7px'}}>
                                           <FormControlLabel  value={j} control={<Radio />} label={op.optionText} />
                  
    
                                        </div>
    
                                        <div style={{display: 'flex', marginLeft: '10px'}}>
                                            {op.optionImage !==""?(
                                              <img src={op.optionImage} width="64%" height="auto" />
                                            ): "" }
                                          <Divider />
                                        </div>
                                      </div>
                                      ))}  
                                    </RadioGroup>
    
                                </div>}
                                {
                                  ques.questionType === "Paragraph" && <div className="paragraph-if-req">
                                    <input type="text" className="border-black" placeholder="Enter your answer here"/>                                   
                                  </div>
                                }
                            </div>
                          </div>  
                        </Paper>  
                        </div>
                      ))}
                      </Grid>   
                      <Grid>
                    <br></br>
                    <div className="flex">
                      <Button variant="contained" color="primary" onClick={submitResponse}>
                        Submit
                      </Button>
                    </div>
                    <br></br>

                    <br></br>

                  </Grid>
                   </div>
                 ):
                 (
                   <div>
                     <Typography variant="body1">Form submitted</Typography>
                     <Typography variant="body2">Thanks for submitting form</Typography>
                     

                     <Button onClick={reloadForAnotherResponse}>Submit another response</Button>
                   </div>
                 )
                }               
                </Grid>          
              </Grid>   
         </div>
        </div>
    )
}

export default UserView;

const FormControlLabelWrapper = props => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};