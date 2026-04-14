import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import useAppTheme, { GlobalStyle } from './theme';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import UserEditPage from './pages/UserEditPage';
import UserCreatePage from './pages/UserCreatePage';

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
            <Route path='/users/:id/edit' element={<UserEditPage />} />
            <Route path='/users/new' element={<UserCreatePage />} />
            <Route path='/' element={<Navigate to='/users' />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
