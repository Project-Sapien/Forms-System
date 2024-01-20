import React from 'react'
import Navbar from '../components/Navbar'
import TransferList from '../components/TransferList'
import SelectBar from '../components/SelectBar'
import QuestionSetEditor from '../components/QuestionSetEditor'
const Landing = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  
  return (
      <div className="h-screen w-screen flex flex-col mt-5">
          <SelectBar 
            isSwitchOn={isSwitchOn} 
            setIsSwitchOn={setIsSwitchOn} 
            selectedValue={selectedValue} 
            setSelectedValue={setSelectedValue} 
          />

          {(isSwitchOn && selectedValue) && <TransferList/>}
          {(!isSwitchOn && selectedValue) && <QuestionSetEditor/>}

    </div>
  )
}

export default Landing