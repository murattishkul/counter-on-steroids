import {Container, Count, CounterButton} from './atoms';

const Counter = ({count, countRef, buttonRed, handleClick}) => {
    return (
        <Container>
            <Count ref={countRef}>{count}</Count>
            <CounterButton variant="contained" disabled={buttonRed} onClick={handleClick} style={{'background': `${buttonRed ? 'red' : '#fff'}`}}>Click me!</CounterButton>
        </Container>
    )
}

export default Counter;