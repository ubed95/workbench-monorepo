import { Routes, Route, Navigate } from 'react-router';
import Login from '@features/Auth/Login.jsx';
import Demo from '@features/Demo/Demo';
import Home from '@features/home/Home';
import AuthRoute from './components/AuthRoute';
// import { ApiConfigForm } from '@mono/nvest-dynamic-form';
//
// const dataFetched = (params: unknown) => {
//   console.log('Data fetched successfully', params);
// };
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    {/*<Route path="/nvest-form" element={<ApiConfigForm onDataFetched={dataFetched} />} />*/}
    <Route path="/components" element={<Demo />} />
    <Route path="/demo" element={<Demo />} />
    <Route element={<AuthRoute />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
