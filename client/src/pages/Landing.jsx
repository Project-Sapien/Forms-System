import React from 'react'
import TransferList from '../components/TransferList'
import SelectBar from '../components/SelectBar'
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

    </div>
  )
}

export default Landing