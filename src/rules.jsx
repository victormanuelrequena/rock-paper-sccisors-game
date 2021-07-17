import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './button'

const RulesStyled = styled.div`
	text-align: center;
		&::before {
			content: '';
			display: ${({ visible }) => visible ? 'block' : 'none'};
			position: absolute;
			z-index: 2;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background: rgba(0,0,0, .6);
		}
	.rules-modal {
		background: white;
		padding: 4em 0;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.close-button {
		margin-top: 2em;
		cursor: pointer;
	}
	h2 {
		color: #3b4262;
		text-transform: uppercase;
		font-weight: 700;
  		font-family: 'Barlow Semi Condensed', sans-serif;
  		letter-spacing: -2px;
		margin-bottom: 2em;
	}
	@media screen and (min-width: 768px) {
		.button {
			position: fixed;
			right: 2em;
			bottom: 2em;
		}
		.rules-modal {
			width: 400px;
			margin: auto;
			border-radius: 10px;
			top: 0;
			bottom: initial;
			transform: translateY(50%);
			padding: 2em;
			box-sizing: border-box;
			h2 {
				font-size: 32px;
				margin: 0;
				align-self:flex-start ;
				margin: 0 0 1.2em 0;
			}
		}
		.close-button {
			position: absolute;
			right: 2em;
			top: 1em;
			top: .8em;
		}

	}

 `;
export default function Rules() {
	const [visible, setVisible] = useState(false);
	function handleToggleClick() {
		setVisible(!visible);
	};
	return (
		<RulesStyled visible={visible}>
		{
			(visible) && (
			<div className="rules-modal">
				<h2>rules</h2>
				<img src="./images/image-rules.svg" alt="Game Rules" />
				<img
				onClick={handleToggleClick}
				src="./images/icon-close.svg"
				alt="Close the game rules"
				className="close-button"
				/>
			</div>
			)
		}
			<Button onClick={handleToggleClick} className="button">
				Rules
			</Button>
		</RulesStyled>
	)
}