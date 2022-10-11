import Menubutton from './Menu'
import styled, { keyframes } from 'styled-components'

export default function MobileNav() {
	return (
        <Wrapper>
            <Menubutton />
        </Wrapper>
	)
}



const Wrapper = styled.div`
	display: flex;
	z-index: 10;
	button {
		flex-shrink: 0;
	}
	@media (min-width: 950px) {
		display: none;
	}
`