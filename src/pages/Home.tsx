import { useEffect, useState, useReducer } from 'react';
import productData from '../data/productData.json';
import FeaturedProduct, {
  IFeaturedProduct,
} from '../components/FeaturedProduct';

const Home: React.FC = () => {
  const [products, setProducts] = useState<IFeaturedProduct[]>([]);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'Increment':
        return state === products.length - 1 ? 0 : state + 1;
      case 'decrement':
        return state === 0 ? products.length - 1 : state - 1;
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    let key: keyof typeof productData;
    let array = [];
    for (key in productData) {
      array.push(productData[key]);
    }
    setProducts(array);
    const interval = setInterval(() => {
      dispatch({ type: 'Increment' });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const changeBanner = (direction: string) => {
    if (direction === 'left') {
      dispatch({ type: 'decrement' });
    } else {
      dispatch({ type: 'Increment' });
    }
  };
  const bannerStyle = {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  };

  const arrowStyle = {
    height: '40%',
    margin: '2em',
  };
  return products.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Featured Products</h1>
      </div>
      <div style={bannerStyle}>
        <div onClick={() => changeBanner('left')} style={arrowStyle}>
          {' '}
          {'<'}{' '}
        </div>
        <FeaturedProduct
          img={products[count].img}
          name={products[count].name}
          marketingCopy={products[count].marketingCopy}
        />
        <div onClick={() => changeBanner('right')} style={arrowStyle}>
          {' '}
          {'>'}{' '}
        </div>
      </div>
    </div>
  );
};
export default Home;
