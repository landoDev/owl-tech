import {  Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App" style={{margin:'1%'}}>
      {/* this page is the root but not the home page*/}
      <header className="App-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%'}}>
        <h1><Link to="/" style={{color: 'inherit', textDecoration:'none'}}>OWL Stock Prices</Link></h1>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
