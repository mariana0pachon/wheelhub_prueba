import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import useAppTheme, { GlobalStyle } from './theme';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';

export default function App() {
  const themeProps = useAppTheme();
  return (
    <ConfigProvider {...themeProps}>
      <AntApp>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path='/users' element={<UsersPage />} />
            <Route path='/users/:id' element={<UserDetailPage />} />
            <Route path='/' element={<Navigate to='/users' />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
