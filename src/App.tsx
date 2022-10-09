import { useState } from "react";
import Chat from "./pages/Chat/Chat";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <Chat />
    </>
  );
}

export default App;
