import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({});

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                isAddProductModalOpen,
                setIsAddProductModalOpen,
                isEditProductModalOpen,
                setIsEditProductModalOpen,
                isDeleteProductModalOpen,
                setIsDeleteProductModalOpen,
                loading,
                setLoading,
                errorMessage,
                setErrorMessage,
                selectedProduct,
                setSelectedProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
