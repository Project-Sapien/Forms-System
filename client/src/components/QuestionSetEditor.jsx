import React from 'react'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//abstraction of params
import { useParams } from 'react-router-dom';

//unique id for questions
import { v4 as uuidv4 } from 'uuid';

//mui utilities
import {Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select} from '@mui/material';
import { Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import AccordionActions from '@mui/material/AccordionActions';
import Divider from '@mui/material/Divider';

//mui icons
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';

//image model
import ImageUploadModel from './ImageUploadModel';

//form service
import formService from '../services/formService';

function QuestionSetEditor()
{
  const {formId} = useParams();

  const [questions, setQuestions]= React.useState([]);
  const [openUploadImagePop, setOpenUploadImagePop] = React.useState(false);
  const [imageContextData, setImageContextData] = React.useState({question: null, option: null});
  const [formData, setFormData] = React.useState({name:"Untitled",description:"Form Description"});
  const [loadingFormData, setLoadingFormData] = React.useState(true);

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
  

  function saveQuestions(){
    console.log("auto saving questions initiated");
    var data = {
      formId,
      name: formData.name,
      description: formData.description,
      questions: questions
    }

    formService.autoSave(data)
    .then((result) => {     
         console.log(result);
         setQuestions(result.questions)
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

  function checkImageHereOrNotForQuestion(gg){
   // console.log(gg);
    if ((gg === undefined)||(gg==="")){
      return false;
    } else{
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg){
   // console.log(gg);
    if ((gg === undefined)||(gg==="")){
      return false;
    } else{
      return true;
    }
  }

  function addMoreQuestionField(){
      expandCloseAll(); 

      setQuestions(questions=> [...questions, {questionText: "Question", options : [{optionText: "Option 1"}],questionType:"Multiple Choice", open: true ,questionId:uuidv4()+""}]);
  }

  function copyQuestion(i){
    let qs = [...questions]; 
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach(opn => {
      if ((opn.optionImage !== undefined)||(opn.optionImage !=="")) {
        var opn1new = {
          optionText : opn.optionText,
          optionImage: opn.optionImage
        }
      } else{
        var opn1new = {
          optionText : opn.optionText
        }
      }
      myNewOptions.push(opn1new)
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = {questionText: qs[i].questionText, questionImage : qImage ,options:myNewOptions, open: true}
     setQuestions(questions=> [...questions, newQuestion]); 
  }

  const handleImagePopupOpen = () => {
    setOpenUploadImagePop(true);
  };


  function uploadImage(i, j){
    
    setImageContextData({
      question: i,
      option: j
    });
    handleImagePopupOpen();
    
  }

  function updateImageLink(link, context){
    
    var optionsOfQuestion = [...questions];
    var i = context.question

    if (context.option == null) {
      optionsOfQuestion[i].questionImage= link;
    } else {
      var j = context.option
      optionsOfQuestion[i].options[j].optionImage = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i){
    let qs = [...questions]; 
    if(questions.length > 0){
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }

  function handleOptionValue(text,i, j){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
      setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
      setQuestions(optionsOfQuestion);
  }
//onDragEnd and reorder are used for drag and drop
 function onDragEnd(result) {
  if (!result.destination) {
    return;
  }
  var itemgg = [...questions];

  const itemF = reorder(
    itemgg,
    result.source.index,
    result.destination.index
  );

  setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i){
    let qs = [...questions];  
     qs[i].open = false;
     setQuestions(qs);
  }

  function addOption(i){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length < 5){
      optionsOfQuestion[i].options.push({optionText: "Option " + (optionsOfQuestion[i].options.length + 1)})
    } else{
      console.log("Max  5 options ");  
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion)
  }

  function removeOption(i, j){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length > 1){
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
      console.log(i + "__" + j);
    }   
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ===j ){
        qs[i].open = true;
 
      } else{
        qs[j].open = false;
       }
    }
     setQuestions(qs);
  }

  function changeQuestionType(i, indicator) {
    let questionsCopy = [...questions];
    questionsCopy[i].questionType = (indicator === 1) ? "Multiple Choice" : "Paragraph";
    setQuestions(questionsCopy);
  }

  function questionsUI() {
    //you need to mainly disable react strict mode to use drag and drop
    return  questions.map((ques, i)=> (
      <Draggable  draggableId={ques.questionId}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
          <div className={`rounded-xl ${ques.open?"border-l-4 border-[#4285f4]":""}`}>          
            <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
              <AccordionSummary            
                aria-controls="panel1a-content"
                id="panel1a-header"
                  elevation={1} 
                >
                  <div className="flex flex-col w-full">
                  <div className="drag-icon text-center">
              <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2'}} fontSize="small"/>
                  </div>
                  { !questions[i].open ? (
                                        <div className="accordion-child flex flex-col items-start ml-[3px] pt-[15px] pb-[15px]">
                {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}
                
                <Typography variant="subtitle1" style={{marginLeft: '0px'}}>{ques.questionText}</Typography>
                      {
                        ques.questionImage !== "" ?
                        (
                          <div>
                            <img src={ques.questionImage} width="400px" height="auto" /><br></br><br></br>
                          </div> 
                        )
                        :
                        ""
                      }
                
                      {
                        ques.questionType === "Multiple Choice" ?
                          ques.options.map((op, j) => (
                            <div key={j}> 
                              <div style={{ display: 'flex' }}> 
                                <FormControlLabel disabled control={<Radio style={{ marginRight: '3px', }} />} label={
                                  <Typography style={{ color: '#555555' }}>
                                    {ques.options[j].optionText} 
                                  </Typography> 
                                }
                                /> 
                              </div>
                              <div>
                                {
                                  op.optionImage !== "" ? (
                                    <img src={op.optionImage} width="160px" height="auto" />  
                                  )
                                    :
                                    ""
                                }
                              </div>    
                            </div>      
                          ))    
                          :   
                          <input defaultValue="Short/Long Text" />
                        
              }  
              </div>            
              ): ""}
                  </div>
              </AccordionSummary>

                <AccordionDetails>
              <div className="questions-options flex flex-col items-start p-[10px] gap-y-[10px]">
                    <div className="flex w-full lg:flex-row flex-col  gap-x-[1vw] gap-y-[3vh]">
                      <div className="w-full">
                      <TextField  
                        placeholder="Question Text" 
                        rows={1}
                        rowsMax={20}
                        multiline={true}
                        value={ques.questionText}
                        variant="filled"
                        sx={{width:"100%",borderRadius:"10px"}}
                      onChange={(e)=>{handleQuestionValue(e.target.value, i)}}
                        />
                        <style>
                          {`
                            .css-phksla-MuiInputBase-root-MuiFilledInput-root{
                              padding:16px 12px 16px;
                            }
                          `}
                        </style>
                      </div>
                      <div className="flex gap-x-[1vw] float-right justify-center">
                      <FormControl sx={{width:"200px"}}>
        <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select" 
                          defaultValue={1}
                            label="Question Type"
                            onChange={(e) => { changeQuestionType(i, e.target.value); }}
                        >    
                          <MenuItem value={1}>Multiple Choice</MenuItem>
                          <MenuItem value={2}>Paragraph</MenuItem>       
                          </Select>
                          </FormControl>
                      <style>
                        {`
                          .css-10ukbsc-MuiInputBase-root-MuiFilledInput-root{
                            padding:15px;
                          }
                        `}
                      </style>
                  <IconButton aria-label="upload image" onClick={()=>{uploadImage(i, null)}}>
                        <CropOriginalIcon />
                  </IconButton>
                      </div>
                </div>

                <div>
                     {
                       checkImageHereOrNotForQuestion(ques.questionImage) ? (
                        <div>
                            <div className="w-[150px] flex items-start pl-5">
                            <img src={ques.questionImage} width="150px" height="auto"/>
                            <IconButton style={{marginLeft: '-15px', marginTop: '-15px',zIndex:999, backgroundColor: 'lightgrey', color:'grey'}} 
                                        size="small"
                                        onClick={()=>{
                                          updateImageLink("", {question: i, option: null})
                                        }}>
                              <CloseIcon />
                            </IconButton>
                            </div>
                        </div>
                       ): ""
                     }
                </div>
                
                <div className="either-radio-or-paragraph" style={{width: '100%'}}>
                      {ques.questionType === "Multiple Choice" ?
                        ques.options.map((op, j) => (
                 
                 <div key={j}>
                    <div className="options flex justify-between ">

                      <Radio disabled sx={{ paddingLeft: "0" }} /> 
                          <TextField 
                            fullWidth={true} 
                            placeholder="Option text" 
                            style={{marginTop: '5px'}} 
                            value={ques.options[j].optionText}
                            onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                          />

                          <IconButton aria-label="upload image" onClick={()=>{uploadImage(i, j)}}>
                            <CropOriginalIcon />
                          </IconButton>

                          <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                            <CloseIcon />
                          </IconButton>
                          </div>

                          <div>
                          {
                            checkImageHereOrNotForOption(op.optionImage) ? (
                            <div>
                            <div className="w-[150px] flex items-start ">
                                <img src={op.optionImage} width="90px" height="auto"/>
                                
                                <IconButton style={{marginLeft: '-15px', marginTop: '-15px',zIndex:999, backgroundColor: 'lightgrey', color:'grey'}}
                                            size="small"
                                            onClick={()=>{
                                              updateImageLink("", {question: i, option: j})
                                            }}
                                            >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                              <br></br>
                              <br></br>  
                            </div>
                            ): ""
                          }
                          </div>
                 </div>
                        ))
                        :
                        <input defaultValue="Short/Long Text" />
                      }  
                </div>  
                
                
                {ques.questionType==="Multiple Choice"&&ques.options.length < 5 ? (
                  <div>
                  <FormControlLabel disabled control={<Radio />} label={
                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none', marginLeft:"-5px"}}>
                      Add Option
                    </Button>
                  } /> 
                  </div>
                ): ""}

                <br></br>
                <br></br>

                <Typography variant="body2" style={{color: 'grey'}}>You can add maximum 5 options. If you want to add more then change in settings. Multiple choice single option is availible</Typography>
              </div>
              </AccordionDetails>

              <Divider />
              
              <AccordionActions>               
                    <IconButton aria-label="View" onClick={()=>{showAsQuestion(i)}}>
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                      <FilterNoneIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem/>

                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                      <DeleteOutlineIcon />
                    </IconButton>

                    <IconButton aria-label="Image">
                      <MoreVertIcon />
                    </IconButton>
              </AccordionActions>
            </Accordion>
          </div>
      </div>
                  )}
      </Draggable>
      
     )
    )
  }




  return (
       <div className="question-set-with-progresser flex flex-col justify-center items-center gap-y-[3vh] py-[3vh] bg-[#f0ebf8]">
              {loadingFormData ? (<CircularProgress />):""}
              
             <div className="questions-with-name-description w-[90vw] sm:w-[55vw] flex flex-col gap-y-[3vh]">
                 
                  <div className="name-description border-t-8 border-[#673ab7] rounded-lg bg-white">
                                  <div className="inputarea flex flex-col items-start p-[10px] gap-y-[2vh]">
                              <input
                                  className="form-name outline-none border-none text-3xl"
                                  type="text"
                  value={formData.name}
                  onChange={(e)=>{setFormData({...formData,name:e.target.value})}}/>
                              <input
                                  className="form-description outline-none border-none text-lg"
                                  type="text"
                  value={formData.description}
                  onChange={(e)=>{setFormData({...formData,description:e.target.value})}}/>
                              </div>    
                  </div>  

                  <div className="questions-div">
                    <ImageUploadModel handleImagePopOpen={openUploadImagePop} handleImagePopClose={()=>{setOpenUploadImagePop(false)}} updateImageLink={updateImageLink} contextData={imageContextData}/>

                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-y-[3vh]"
                          >
                            {questionsUI()}

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div className="buttons  flex justify-center gap-x-[2vw] pt-[3vh]">                       
                        <Button
                          variant="contained"
                          
                          onClick={addMoreQuestionField}
                          endIcon={<AddCircleIcon />}
                        >Add Question </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={saveQuestions}
                          endIcon={<SaveIcon />}
                        >Save Questions </Button>
                      </div>
                  </div>        
              </div>           
           </div>
  );
}
export default QuestionSetEditor