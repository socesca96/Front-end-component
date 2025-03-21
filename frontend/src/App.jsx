import './App.css'
import store from './Core/redux/store/store'
import { Provider } from 'react-redux'

function App() {


  return (
    <Provider store = {store}>
     
    </Provider>
  )
}

export default App
