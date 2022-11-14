import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import jsCookie from 'js-cookie';

import TopBar from './components/tools/TopBar';
import LoginPage from './components/pages/Login/LoginPage';
import CodeBlocksPage from './components/pages/CodeBlocks/CodeblocksPage';
import UsersTable from './components/pages/UsersTable/UsersTable';
import SocketContext from './context/socketProvider';
import SharedCodeRoom from './components/pages/SharedCodeRoom/SharedCodeRoom';

function App() {
  const { socketRef } = useContext(SocketContext);
  const socket = io.connect(process.env.REACT_APP_SERVER_URL)
  socketRef.current = socket;

  return (
    <Router>
      <TopBar />
      <Routes >
        <Route path='/' element={< LoginPage />} />
        <Route path='/code-blocks' element={< CodeBlocksPage />} />
        <Route path='/users-table' element={< UsersTable />} />
        <Route path='/shared-code-room/:tokenId/:student_login' element={< SharedCodeRoom />} />
      </Routes >

    </Router>
  );
}

export default App;
