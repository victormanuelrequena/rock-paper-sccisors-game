import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
	max-width: 700px;
	margin: auto;
 `;

export default function Wrapper({ children }) {
	return (
		<WrapperStyled>
			{children}
		</WrapperStyled>
	)
}