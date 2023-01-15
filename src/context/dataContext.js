import React, { createContext, useState, useEffect } from 'react';
import { API } from '../config/api';
// Create context
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    // Fetch data function
    const fetchData = async () => {
        try {
            const response = await API.get("/fundings");
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, fetchData }}>
            {children}
        </DataContext.Provider>
    );
}