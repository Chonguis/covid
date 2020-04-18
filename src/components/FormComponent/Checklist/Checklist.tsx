import React from 'react'

interface Props {
  id: string;
  label: string;
}

const Checklist:React.FC<Props> = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input type="checkbox" id={props.id} />
    </div>
  )
}

export default Checklist
