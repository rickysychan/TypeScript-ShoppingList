import { useEffect, useState } from 'react';
import productData from '../data/productData.json';
import purchaseHistoryData from '../data/purchaseHistory.json';
import { IShoppingListProduct } from '../components/ShoppingListPorduct';
import { formatDate } from '../formatters/dates';

interface IShoppingHistory {
  name: string;
  store: string;
  purchaseDate: string;
  storeUrl: string;
}

const History: React.FC = () => {
  const [shoppingHistory, setShoppingHistory] = useState<IShoppingHistory[]>(
    []
  );
  const [filteredHistory, setFilteredHistory] = useState<IShoppingHistory[]>(
    []
  );
  const [input, setInput] = useState('');

  const getStoreLink = (
    name: string,
    productDataArray: IShoppingListProduct[]
  ) => {
    const index = productDataArray.findIndex(
      (product) => product.name === name
    );
    return productDataArray[index].storeUrl;
  };

  useEffect(() => {
    // product data processed into array of objects
    let keyA: keyof typeof productData;
    let productDataArray = [];
    for (keyA in productData) {
      productDataArray.push(productData[keyA]);
    }

    // purchase history data processed into array of objects
    let keyB: keyof typeof purchaseHistoryData;
    let historyDataArray = [];
    for (keyB in purchaseHistoryData) {
      let newObject = {
        ...purchaseHistoryData[keyB],
        storeUrl: getStoreLink(
          purchaseHistoryData[keyB].name,
          productDataArray
        ),
      };
      historyDataArray.push(newObject);
      setShoppingHistory(historyDataArray);
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if no input reset
    if (!input.length) {
      setFilteredHistory([]);
      return;
    }

    //filter products based on input
    let newArray: IShoppingHistory[] = [];
    shoppingHistory.filter((entry: IShoppingHistory) => {
      let k: keyof typeof entry;

      for (k in entry) {
        let value = entry[k];
        if (k === 'purchaseDate') {
          value = formatDate(value);
        }
        if (k === 'storeUrl') {
          return setInput('');
        }
        if (
          value
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(input.toLowerCase().replace(/\s/g, ''))
        ) {
          newArray.push(entry);
        }
      }
      setInput('');
      return setFilteredHistory(newArray);
    });
  };
  const tableRowStyle = {
    margin: '6px',
    backgroundColor: 'aliceBlue',
    textAlign: 'center',
  } as const;

  let history = filteredHistory.length ? filteredHistory : shoppingHistory;

  return (
    <div style={{ width: '100%', margin: '1em' }}>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          placeholder="filter"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button>Submit</button>
      </form>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Name</th>
            <th>Store Name</th>
          </tr>
        </thead>
        <tbody>
          {history.map((historyEntry, index) => {
            return (
              <tr style={tableRowStyle} key={index}>
                <td>{formatDate(historyEntry.purchaseDate)}</td>
                <td>{historyEntry.name}</td>
                <td>
                  <a
                    href={historyEntry.storeUrl}
                    rel="noreferrer"
                    target={'_blank'}
                  >
                    {historyEntry.store}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default History;
