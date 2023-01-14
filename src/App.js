import './App.css';
import { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { setAuthToken } from './config/api';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import { API } from './config/api';
import UserRoute from "./components/router/userRoute"
import Home from "./pages/user/home"
import Profile from "./pages/user/profile"
import Header from "./components/headers"
import DetailFunding from "./pages/user/detailFunding"
import MyFunding from "./pages/user/myfunding"

//=======//
import AdminRoute from "./components/router/adminRoute"
import Form from "./pages/admin/formFund"
import DataFunding from "./pages/admin/dataFunding"

export const dataContext = createContext({


})

function App() {
  const navigate = useNavigate()
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  const [state, dispatch] = useContext(UserContext)

  // console.log(state)
  useEffect(() => {

    if (state.isLogin === false) {
      navigate('/')
    } else {
      if (state.user.role === 'admin') {
        navigate('/admin')

      } else if (state.user.role === 'user') {
        navigate('/')
      }
    }
  }, [state])
  const checkAuth = async () => {
    try {

      const response = await API.get("/checkAuth")
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        })
      }
      let payload = response.data.data
      payload.token = localStorage.token
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      })
      // console.log(response.data.data)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (localStorage.token) {
      checkAuth()
    }
  }, [])




  return (
    <>

      <Header />
      <Routes>

        <Route path="/" element={<UserRoute />}>
          <Route index element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/detail-funding/:id" element={<DetailFunding />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/myfunding" element={<MyFunding />} />


        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<DataFunding />} />
          <Route exact path="/admin/form" element={<Form />} />
        </Route>

      </Routes>

    </>
  );
}

export default App;
