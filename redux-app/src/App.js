import logo from './logo.svg';
import './App.css';
import Calculator from './calculator/container/Calculator';
import Timer from './calculator/container/Timer';
import BankApp from './bank/components/BankApp';
import FrameDemo from './iframes/FrameDemo';
import ReducerDemo from './hooks/ReducerDemo';
import Chat from './ai/Chat';
import ContextDemo from './hooks/ContextDemo';
import { ProductCount, ProductList, ProductProvider } from './hooks/Realcontext';
import Button from './hoc/Button';
import Hover from './hoc/Hover';

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <ProductList />
        <ProductCount />
      </ProductProvider>
      <Button/>
      <Hover />
    </div>
  );
}

export default App;
