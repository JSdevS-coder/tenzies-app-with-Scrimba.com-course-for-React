import React, { useEffect, useState } from 'react'
import SingleDice from './SingleDice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function Dices() {
	const [arrNumbers, setArrNumbers] = useState(getDice(10))
	const [tenzies, setTenzies] = useState(false)
	function getDice(num) {
		let arr = []
		for (let i = 0; i < num; i++) {
			arr.push({
				value: Math.ceil(Math.random() * 6),
				isHeld: false,
				id: nanoid(),
			})
		}
		return arr
	}

	const rollDices = () => {
		let newArr = getDice(arrNumbers.filter(dice => !dice.isHeld).length)
		arrNumbers.map(dice => {
			if (dice.isHeld) {
				newArr.splice(arrNumbers.indexOf(dice), 0, dice)
				return setArrNumbers(newArr)
			}
		})
		if (tenzies === true) {
			setArrNumbers(getDice(10))
			setTenzies(false)
		}
	}

	const toggleHeld = id => {
		setArrNumbers(prevArr =>
			prevArr.map(dice => {
				if (dice.id === id) {
					return { ...dice, isHeld: !dice.isHeld }
				} else {
					return { ...dice }
				}
			})
		)
	}

	useEffect(() => {
		let nums = arrNumbers.filter(item => !item.isHeld)
		arrNumbers.map(dice => {
			let same = arrNumbers.filter(item => item.value === dice.value)
			return setTenzies(nums.length === 0 && same.length === 10 ? true : false)
		})
	}, [arrNumbers])

	return (
		<div className='box'>
			<div className='dice-box'>
				{arrNumbers &&
					arrNumbers.map(item => (
						<SingleDice
							key={item.id}
							number={item.value}
							isHeld={item.isHeld}
							handleHeld={() => toggleHeld(item.id)}
						/>
					))}
			</div>

			<div className='result'>
				{tenzies && 'You won! Start new game'}
				{tenzies && <Confetti width={window.width} height={window.height} />}
			</div>

			<button className='primary' onClick={rollDices}>
				{tenzies ? 'Restart game' : 'Roll'}
			</button>
		</div>
	)
}
