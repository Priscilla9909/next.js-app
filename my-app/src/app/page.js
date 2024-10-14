import Image from "next/image";
import Counter from "./components/counter";
import UserList from "./components/useEffect";
import App from "./components/useContext";

export default function Home() {
  return (
    <div>
      {/* <Counter/> */}
      <UserList/>
      <App/>
    </div>
  );
}
