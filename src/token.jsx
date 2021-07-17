import React from 'react';
import styled, { keyframes } from 'styled-components';

const shadow = keyframes`
	// from {
	// 	box-shadow: 0 0 0 0px rgba(255,255,255, .04),0 0 0 0px rgba(255,255,255, .03), 0 0 0 0px rgba(255,255,255, .02);
	// }

	to {
		box-shadow: 0 0 0 40px rgba(255,255,255, .04),0 0 0 80px rgba(255,255,255, .03), 0 0 0 120px rgba(255,255,255, .02);
		transform: rotateY(360deg) scale(1.1);
	}
 `;


const box = keyframes`
	to {
		transform: rotateY(360deg);
	}
 `;

const TokenStyled = styled.div`
	width: 130px;
	height: 125px;
	border: 15px solid ${({name, color}) => name === 'default' ? 'transparent' : color.base}};
	box-sizing: border-box;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({name}) => name === 'default' ? 'transparent' : 'white'};
	box-shadow: 0 5px 0 ${({name, color}) => name === 'default' ? 'transparent' : color.border};
	cursor: pointer;
	position: relative;
	z-index: 2;
	animation: 1s ${({isShadowAnimated}) => isShadowAnimated ? shadow : ''} forwards;
	${({isShadowAnimated}) => isShadowAnimated && 'box-shadow: 0 0 0 0px rgba(255,255,255, .04),0 0 0 0px rgba(255,255,255, .03), 0 0 0 0px rgba(255,255,255, .02)'}
	&:active {
		transform: scale(.9);
	}
	.box {
		background: ${({name}) => name === 'default' ? '#122343' : 'white'};
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 -4px 0 ${({ name }) => name === 'default' ? 'transparent' : 'BABFD4'};
		flex: 1;
		align-self: stretch;
		border-radius: 50%;
		img {
		animation: 1s ${({isShadowAnimated}) => isShadowAnimated ? box : ''} forwards;
		}
	}

	@media screen and (min-width: 768px) {
		width: 200px;
		height: 195px;
	}
 `;

 const colors = {
 	paper: {
 		base: '#516ef4',
 		border: '#2545c3'
 	},
 	rock: {
		base: '#de3a5a',
 		border: '#980e31'
 	},
 	scissors: {
		base: '#eca81e',
 		border: '#c76c14'
 	},
 	default: {
		base: '#122343',
 		border: '#122343'
 	}
 };


export default function Token({ name = 'default', onClick, isShadowAnimated = false }) {
	function handleClick() {
		if(onClick) {
		onClick(name)
	}
	}
	const color = (colors[name]) ? (colors[name]) : colors.default ;
	return (
		<TokenStyled color={color} onClick={handleClick} name={name} isShadowAnimated={isShadowAnimated}>
			<div className="box">
			<img src={`./images/icon-${name}.svg`} alt="" />
			</div>
		</TokenStyled>
	)
}