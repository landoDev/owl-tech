import {  Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App" style={{margin:'1%'}}>
      {/* this page is the home page */}
      <header className="App-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%'}}>
        <h1>OWL Stock Prices</h1>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
