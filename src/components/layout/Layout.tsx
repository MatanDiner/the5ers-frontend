import Header from "../header/Header";
import Fotter from "../fotter/fotter";
type Props = {
  children: any,
  showBackBtn?: boolean
}

const Layout = ({ children, showBackBtn = true }: Props) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Fotter showBackBtn={showBackBtn} />
    </div>
  );
};
export default Layout;
