import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";


function App() {
  return (
    <>
    <div className="header">
      <Header />
    </div>
    <div className="main">
      <Main />
    </div>
    <div className="footer">
      <Footer />
    </div>
    </>
  );
}

export default App;
