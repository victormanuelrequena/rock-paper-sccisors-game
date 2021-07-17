import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import Token from './token';
import Button from './button';
import { WhiteButton } from './button';
import {ScoreContext} from './App'

const TableStyled = styled.div`
	width: 240px;
	display: grid;
	grid-template-columns: 130px 130px;
	justify-content: center;
	justify-items: center;
	grid-gap: 30px 50px;
	margin: 2em auto;
	position: relative;
	& div:nth-of-type(3) {
		grid-column: span 2;
	}
	.in-game {
		text-align: center;
		text-transform: uppercase;
		font-size: .8em;
		font-weight: 700;
		letter-spacing: 1px;
	}
	.line {
		display: ${({ playing }) => !playing ? 'block' : 'none'};
		width: 100%;
		height: 14px;
		background: rgba(0,0,0, .3);
		position: absolute;
		left: 0px;
		right: 0px;
		top: 52px;
		margin: auto;
		&::before {
		content: '';
		height: 14px;
		background: rgba(0,0,0, .3);
		position: absolute;
		width: 240px;
		top: 0;
		transform: rotate(60deg);
		transform-origin: left top;
		}
		&::after {
			content: '';
			height: 14px;
			width: 240px;
			background: rgba(0,0,0, .3);
			position: absolute;
			right: 0;
			top: 0;
			transform: rotate(-60deg);
			transform-origin: right top;
		}
	}
	.results {
		text-align: center;
		h2 {
			text-transform: uppercase;
			font-size: 56px;
			margin: 0;
		}
	}
	@media screen and (min-width: 768px) {
		width: ${({playing}) => playing ? '600px' : '380px' };
		grid-template-columns: 200px 200px;

		& div:nth-of-type(2) {
			grid-column: 2 / 4;
			grid-row: 1;
		}
		.line {
			width: 100%;
			&::after {
				width: 400px;
			}
		}
		.in-game {
			font-size: 1.2em;
			display: flex;
			flex-direction: column;
			> div {
				order: 2;
			}
			> p {
				order: 1;
				margin-bottom: 2em;
			}
		}
	}
`;

	const elements = [
	"paper",
	"scissors",
	"rock"
	]

export default function Table() {
	const { score, setScore } = useContext(ScoreContext);
	const [results, setResults] = useState('');
	const [housePick, setHousePick] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [pick, setPick] = useState('');

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};

	function launchHousePick() {
		return new Promise((resolve, reject) =>{
		let pick;
		const interval = setInterval(() => {
			pick = elements[getRandomInt(0,3)];
			setHousePick(pick)
		}, 75);

		setTimeout(() => {
			clearInterval(interval);
			resolve(pick);
		}, 2000);
		});
	}
	async function onClick(name) {
		setPlaying(true);
		setPick(name);
		const house = await launchHousePick();
		const results = playWithIA(name, house);
		setResults(results);

		if (results === 'win') {
			setScore(score + 1);
		};
	};
	function playWithIA (pick, housePick) {
		if(pick === housePick) return 'draw';
		if(pick === 'paper' ) {

			if(housePick === 'scissors') return 'lose';
			if(housePick === 'rock') return 'win';
		};
		if(pick === 'scissors') {
			if(housePick === 'paper') return 'win';
			if(housePick === 'rock') return 'lose';
		};
		if(pick === 'rock') {
			if(housePick === 'paper') return 'lose';
			if(housePick === 'scissors') return 'win';
		};
		};

	function handleTryAgainClick() {
		setPlaying(false);
		setResults('');
	};
	return (
		<TableStyled playing={playing}>
		<span className="line"></span>
		{
			!playing ? (
			<>
			<Token name="paper" onClick={onClick} />
			<Token name="scissors" onClick={onClick} />
			<Token name="rock" onClick={onClick} />
			</>
			) : (
			<>
			<div className="in-game">
				<Token name={pick} isShadowAnimated={(results === 'win')} />
				<p>You Picked</p>
			</div>
			<div className="in-game">
			<Token name={housePick} isShadowAnimated={(results === 'lose')} />
			<p>The house Picked</p>
			</div>
			<div className="results">
			{
				results && (
				<>
				<h2>{`You ${results}`}</h2>
				<WhiteButton onClick={handleTryAgainClick}>
					Try again
				</WhiteButton>
				</>
				)
			}

			</div>
			</>
			)
		}
		</TableStyled>
	)
}