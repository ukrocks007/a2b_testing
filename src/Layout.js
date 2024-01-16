import Layout1 from "./layouts/Layout1";
import Layout2 from "./layouts/Layout2";
import Layout3 from "./layouts/Layout3";

const Layout = (props) => {
  return (
    <div className="App">
      {props.layoutId === 1 && <Layout1 />}
      {props.layoutId === 2 && <Layout2 />}
      {props.layoutId === 3 && <Layout3 />}
    </div>
  );
};

export default Layout;
