import React from 'react'

function Devendra() {
    const drp = [
        {
            id: 1,
            name: "Dev"
        },
        {
            id:2,
            name:"Rugwed"
        }
    ]
  return (
    <div>
      <select name="drp" id="drp">
        {drp.map((item) => (<option value={item.id}>{item.name}</option>))}
      </select>
    </div>
  )
}

export default Devendra
