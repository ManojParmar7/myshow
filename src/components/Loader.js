import Skeleton  from "react-loading-skeleton";
const skeletonItems = Array.from({ length: 10 }, (_, index) => (
  <div key={index} className="grid-item">
    <Skeleton height={200} width={150} />
    <Skeleton height={20} width={150} style={{ marginTop: "8px" }} />
  </div>
));
const Loader = () => {
  

  

  return <div className="grid-container">{skeletonItems}</div>;

};

export default Loader;
