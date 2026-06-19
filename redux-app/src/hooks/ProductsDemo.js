import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

// /c:/redux-app/src/hooks/realcontext.js

/*
    ProductContext provides:
        - products: array of product objects (15 fake initial records)
        - addProduct(product?): add a new product (if product omitted, a random one is created)
        - removeProduct(id): remove product by id

    Also exports example consumers:
        - ProductList: shows products, can add random product and remove individual products
        - ProductCount: displays total count (demonstrates multiple consumers reading same context)
*/

const ProductContext = createContext(null);

const initialProducts = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Number((Math.random() * 90 + 10).toFixed(2)),
    description: `Description for product ${i + 1}`,
    stock: Math.floor(Math.random() * 20) + 1,
    image: `https://picsum.photos/seed/product${i + 1}/200/200`,
}));

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(initialProducts);

    const addProduct = useCallback((product) => {
        setProducts((prev) => {
            const nextId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
            const newProduct =
                product ??
                {
                    id: nextId,
                    name: `Product ${nextId}`,
                    price: Number((Math.random() * 90 + 10).toFixed(2)),
                    description: `Automatically added product ${nextId}`,
                    stock: Math.floor(Math.random() * 20) + 1,
                    image: `https://picsum.photos/seed/product${nextId}/200/200`,
                };
            // Prepend so the newest appears first
            return [newProduct, ...prev];
        });
    }, []);

    const removeProduct = useCallback((id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const value = useMemo(
        () => ({ products, addProduct, removeProduct }),
        [products, addProduct, removeProduct]
    );

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
    const ctx = useContext(ProductContext);
    if (!ctx) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return ctx;
}

/* Example consumer components to demonstrate multiple consumers */

/* ProductCount: simple read-only consumer showing total product count */
export function ProductCount() {
    const { products } = useProducts();
    return (
        <div style={{ padding: 8 }}>
            <strong>Total products:</strong> {products.length}
        </div>
    );
}

/* ProductList: lists products, allows adding a random product and removing products */
export function ProductList() {
    const { products, addProduct, removeProduct } = useProducts();

    const handleAddRandom = () => {
        addProduct(); // will create a random product
    };

    return (
        <div style={{ padding: 8 }}>
            <div style={{ marginBottom: 8 }}>
                <button onClick={handleAddRandom}>Add Random Product</button>
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map((p) => (
                    <li
                        key={p.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: 8,
                            border: "1px solid #eee",
                            marginBottom: 8,
                            borderRadius: 4,
                        }}
                    >
                        <img src={p.image} alt={p.name} width={60} height={60} style={{ objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>{p.name}</div>
                            <div style={{ fontSize: 13, color: "#555" }}>{p.description}</div>
                            <div style={{ fontSize: 13, marginTop: 4 }}>
                                ${p.price} • stock: {p.stock}
                            </div>
                        </div>
                        <div>
                            <button onClick={() => removeProduct(p.id)} style={{ marginRight: 8 }}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* Export default for convenience (optional) */
export default {
    ProductProvider,
    useProducts,
    ProductCount,
    ProductList,
};