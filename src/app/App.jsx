import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import MessageInputContainer from '@/components/MessageInputContainer/MessageInputContainer';
import MakeTreePage from '@/pages/MakeTreePage/MakeTreePage';
import SignUpPage from '@/pages/SignUp/SignUpPage';
import SignInPage from '@/pages/SignIn/SignInPage';
import ShareTreePage from '@/pages/ShareTreePage/ShareTreePage';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/make-tree" element={<MakeTreePage />} />
          <Route path="/share-tree/:uid" element={<ShareTreePage />} />
        </Routes>
      </BrowserRouter> */}
      <ModalEnroll />
      {/* <ModalButtonList firstText={'완료'} secondText={'취소'} /> */}
      {/* <ModalButton /> */}
    </div>
  );
}

export default App;
