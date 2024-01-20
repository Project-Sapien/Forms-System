import React from 'react'
import FormComponent from '../components/FormComponent'
import { useParams } from 'react-router-dom'

const Form = () => {

    const { regionid } = useParams();
  return (
      <div className="h-screen flex flex-col gap-y-5">
          <span className="font-bold text-2xl">Hello amazing people from Region:{regionid}</span>
          <FormComponent/>
    </div>
  )
}

export default Form