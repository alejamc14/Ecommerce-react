
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
}, [id]);

    if (loading) return <div className="status-message"><h1>Loading...</h1></div>;
    if (error) return <div className="status-message"><h1>Error: {error}</h1></div>;

    return (
        <div className="product-detail-container">
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} className="product-detail-image" />
            <p className="product-detail-price">Price: ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Rating:</strong> {product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
            <p>{product.description}</p>
        </div>
    );
}