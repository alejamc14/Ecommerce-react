import { useState, useEffect } from 'react';
import './Products.css'; // <--- Importa aquí tu CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="status-message"><h1>Loading...</h1></div>;
    if (error) return <div className="status-message"><h1>Error: {error}</h1></div>;

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    }
    return (
        <div className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h3>{product.title}</h3>
                        <p className="product-price">Price: ${product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Rating:</strong> {product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
                        <p>{product.description.substring(0, 100)}...</p> 
                    </div>
                ))}
            </div>
        </div>
    );
}
