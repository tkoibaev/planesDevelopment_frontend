import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={360}
    height={538}
    viewBox="0 0 360 538"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="434" rx="0" ry="0" width="129" height="24" />
    <rect x="0" y="479" rx="0" ry="0" width="140" height="44" />
    <rect x="382" y="560" rx="10" ry="10" width="95" height="30" />
    <rect x="0" y="375" rx="0" ry="0" width="164" height="45" />
    <rect x="0" y="0" rx="0" ry="0" width="360" height="360" />
    <rect x="245" y="475" rx="20" ry="20" width="115" height="48" />
    <rect x="299" y="497" rx="0" ry="0" width="30" height="3" />
    <rect x="280" y="497" rx="0" ry="0" width="19" height="1" />
  </ContentLoader>
);

export default Skeleton;
