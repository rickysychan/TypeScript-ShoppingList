export interface IFeaturedProduct {
  img: string;
  name: string;
  marketingCopy: string;
}
const FeaturedProduct: React.FC<IFeaturedProduct> = ({
  img,
  name,
  marketingCopy,
}) => {
  const imageStyles = {
    height: '50%',
  };

  const productContainerStyle = {
    flexDirection: 'column',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '600px',
  } as const;
  return (
    <div style={productContainerStyle}>
      <h2>{name}</h2>
      <img style={imageStyles} alt={name} src={img} />
      <h3>{marketingCopy}</h3>
    </div>
  );
};
export default FeaturedProduct;
