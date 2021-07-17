import React, {
  createContext,
  useState
} from 'react';
import './App.css';
import Header from './header';
import styled from 'styled-components';
import Wrapper from './wrapper';
import Table from './table';
import Rules from './rules';

export const ScoreContext = createContext()

const AppStyled = styled.main`
  background: #111f43;
  font-family: 'Barlow Semi Condensed', sans-serif;
  background-image: radial-gradient(circle at top, #1F3757 20%, #131537 100%);
  color: white;

  .app-content {
    min-height: 100vh;
    padding: 2em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
  }
`;

function App() {
  const [score, setScore] = useState(0)
  return (
    <ScoreContext.Provider value={{
      score,
      setScore,
    }}>
    <AppStyled>
     <Wrapper>
      <div className="app-content">
      <Header />
      <Table />
      <Rules />
      </div>
     </Wrapper>
     </AppStyled>
    </ScoreContext.Provider>
  );
}

export default App;
