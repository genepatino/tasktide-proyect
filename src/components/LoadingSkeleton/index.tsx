import "./styles.css";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton_container_task skeleton"></div>;
      <div className="skeleton_container_task skeleton"></div>;
      <div className="skeleton_container_task skeleton"></div>;
    </div>
  );
};

export { LoadingSkeleton };
