import React, { useState, useEffect } from 'react';
import { fetchData } from "../../utilities/apputils";
import "../../index.css";
import Sidebar from "./Sidebar";

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(transactions.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem("user")).role;
        if (role === 1) {
            async function fetchAllTransactions() {
                try {
                    const response = await fetchData("get", `checkout/getCheckouts`);
                    if (response.data) {
                        // Sort transactions by date in descending order
                        const sortedTransactions = response.data.sort((a, b) => new Date(b.date_of_creation) - new Date(a.date_of_creation));
                        setTransactions(sortedTransactions);
                        setLoading(false);
                    } else {
                        setError("No transactions found.");
                        setLoading(false);
                    }
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }
            fetchAllTransactions();
        } else {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            async function fetchUserTransactions() {
                try {
                    const response = await fetchData("get", `checkout/getCheckouts/${userId}`);
                    if (response.data) {
                        // Sort transactions by date in descending order
                        const sortedTransactions = response.data.sort((a, b) => new Date(b.date_of_creation) - new Date(a.date_of_creation));
                        setTransactions(sortedTransactions);
                        setLoading(false);
                    } else {
                        setError("No transactions found.");
                        setLoading(false);
                    }
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }
            fetchUserTransactions();
        }
    }, []);

    if (loading) {
        return <div className="history-loading">Loading...</div>;
    }
    if (error) {
        return <div className="history-error">Error: {error}</div>;
    }

    return (
        <>
            <div className="history-body">
                <Sidebar />
                <div className="history-container">
                    <h2 className="history-header">Transaction History</h2>
                    {transactions.length === 0 ? (
                        <p className="no-transactions">No transactions found.</p>
                    ) : (
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Product Image</th> {/* New column for product image */}
                                    <th>Customer Name</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(transaction => (
                                    <tr key={transaction._id}>
                                        <td>{transaction._id}</td>
                                        <td>
                                            {transaction.product && transaction.product.imageUrl ? (
                                                <img
                                                    src={transaction.product.imageUrl}
                                                    alt={transaction.product.name}
                                                    className="product-image"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            ) : (
                                                'No image available'
                                            )}
                                        </td>
                                        <td>{transaction.user_id ? `${transaction.user_id.firstName} ${transaction.user_id.lastName}` : 'No customer name'}</td>
                                        <td>{transaction.product ? transaction.product.name : 'No product name'}</td>
                                        <td>{transaction.quantity}</td>
                                        <td>{new Date(transaction.date_of_creation).toLocaleDateString()}</td>
                                        <td>{new Date(transaction.date_of_creation).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <ul className="pagination">
                        <li className={currentPage === 1 ? 'disabled' : ''}>
                            <button className="arrow" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Back</button>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number} className={currentPage === number ? 'active' : ''}>
                                <button onClick={() => setCurrentPage(number)}>{number}</button>
                            </li>
                        ))}
                        <li className={currentPage === pageNumbers.length ? 'disabled' : ''}>
                            <button className="arrow" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default TransactionHistory;
