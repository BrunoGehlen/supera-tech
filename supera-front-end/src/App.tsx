import './App.css';
import ProductsView from './views/ProductsView'
import CartView from './views/CartView'
import { store } from './store/store'
import { StoreProvider } from 'easy-peasy'

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <header className="App-header">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <ProductsView />
            <CartView />
          </div>
        </header>
      </div>
    </StoreProvider>

  );
}

export default App;
