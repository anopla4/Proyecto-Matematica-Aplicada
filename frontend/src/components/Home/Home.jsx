import { Header } from "./home_components/header";
import { Features } from "./home_components/feature";
import { About } from "./home_components/about";
import { Team } from "./home_components/team";
import { Footer } from "./home_components/footer";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Features />
      <About />
      <Team />
      <Footer />
    </div>
  );
};

export default Home;
