import LeatestProducts from "../components/LeatestProducts";

const leatestProducts = fetch('http://localhost:5000/leatest_products')
.then(res => res.json())

const Home = () => {
    return (
        <div>
            <h3>This is home</h3>
            <LeatestProducts leatestProducts = {leatestProducts}></LeatestProducts>
        </div>
    );
};

export default Home;