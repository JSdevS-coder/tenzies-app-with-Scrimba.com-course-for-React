import { Button } from 'react-bootstrap'
import React from 'react'
import Dices from './Dices'

export default function Game() {
	return (
		<main>
			<h1 className='title'>Tenzies</h1>
			<p className='game-text'>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<Dices />
		</main>
	)
}
