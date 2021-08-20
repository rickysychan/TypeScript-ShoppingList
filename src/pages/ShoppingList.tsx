import { useEffect, useState } from 'react';
import productData from '../data/productData.json';
import ShoppingListProduct, {
  IShoppingListProduct,
} from '../components/ShoppingListPorduct';

export interface IShoppingList {
  name: string;
}

export interface IAddToList {
  (name: IShoppingList): void;
}
const ShoppingList: React.FC = () => {
  const [productList, setProductList] = useState<IShoppingListProduct[]>([]);
  const [shoppingList, setShoppingList] = useState<IShoppingList[]>([]);

  useEffect(() => {
    let keyA: keyof typeof productData;
    let productDataArray = [];
    for (keyA in productData) {
      productDataArray.push(productData[keyA]);
    }
    setProductList(productDataArray);
  }, []);

  const addToList = (name: IShoppingList) => {
    setShoppingList([...shoppingList, name]);
  };

  const removeFromList = (name: IShoppingList) => {
    const index = shoppingList.indexOf(name);
    const array = [...shoppingList];
    if (index > -1) {
      array.splice(index, 1);
    }
    setShoppingList(array);
  };

  const shoppingListStyles = {
    height: '100%',
    width: '70%',
    overflow: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
  } as const;

  const listStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'center',
  };
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        margin: '1em',
      }}
    >
      <div style={{ width: '30%' }}>
        <div>Shopping List</div>
        <div>
          {shoppingList.map((name, index) => {
            return (
              <ul key={index}>
                <li>
                  <div style={listStyle}>
                    <p>{name}</p>
                    <div onClick={() => removeFromList(name)}>x</div>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      <div style={shoppingListStyles}>
        {productList.map((product) => {
          const { id, img, store, storeUrl, name, marketingCopy } = product;
          return (
            <ShoppingListProduct
              id={id}
              img={img}
              store={store}
              storeUrl={storeUrl}
              name={name}
              marketingCopy={marketingCopy}
              addToList={addToList}
              key={id}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ShoppingList;
