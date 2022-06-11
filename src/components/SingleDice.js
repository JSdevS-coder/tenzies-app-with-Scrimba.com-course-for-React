import React from 'react'

export default function SingleDice({ number, isHeld, handleHeld }) {
	return (
		<div
			onClick={handleHeld}
			className='single-dice'
			style={{ background: isHeld ? '#59E391' : 'white' }}>
			{number}
		</div>
	)
}
