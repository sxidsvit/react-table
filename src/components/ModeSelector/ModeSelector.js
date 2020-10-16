import React from 'react'

const ModeSelector = ({ onSelect }) => {


  const PROXY = "https://cors-anywhere.herokuapp.com/"

  const smallUrl = `${PROXY}http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`

  const bigUrl = `${PROXY}http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: ' 50px 0' }}>
      <button onClick={onSelect(smallUrl)} className="btn btn-success mr-3">
        32 elements</button>
      <button onClick={onSelect(bigUrl)} className="btn btn-danger">
        1000 elements</button>
    </div>
  )
}

export default ModeSelector
