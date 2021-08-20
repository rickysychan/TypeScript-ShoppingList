export interface IShoppingListProduct {
  id: number;
  img: string;
  store: string;
  storeUrl: string;
  name: string;
  marketingCopy: string;
  purchaseDate?: string;
  addToList?: any;
}
const ShoppingListProduct: React.FC<IShoppingListProduct> = ({
  store,
  img,
  storeUrl,
  name,
  marketingCopy,
  addToList,
}) => {
  const imageStyles = {
    height: '50%',
  };

  const productContainerStyle = {
    flexDirection: 'column',
    height: '100%',
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1em',
    minWidth: '450px',
  } as const;
  return (
    <div style={productContainerStyle}>
      <h1>{name}</h1>
      <a href={storeUrl}>
        <p>{store}</p>
      </a>
      <img style={imageStyles} alt={name} src={img} />
      <h3>{marketingCopy}</h3>
      <button
        onClick={() => {
          addToList(name);
        }}
      >
        Add to shopping list
      </button>
    </div>
  );
};
export default ShoppingListProduct;
