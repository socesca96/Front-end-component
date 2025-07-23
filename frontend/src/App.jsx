import './App.css'
import store from './Core/redux/store/store'
import 'reset-css-pro'
import { Provider } from 'react-redux'
import MainPage from './Pages/MainPage';

function App() {
  

  return (
    <Provider store = {store}>
     <MainPage/>
    </Provider>
  )
}

export default App
