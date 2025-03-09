import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

export const FinancialRecordsContext = createContext(undefined);

export const FinancialRecordsProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const { user } = useUser();

    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(`http://localhost:3000/financial-records/getAllByUserID/${user.id}`);

        if (response.ok) {
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record) => {
        try {
            const response = await fetch("http://localhost:3000/financial-records/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(record),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const newRecord = await response.json();
            setRecords((prev) => [...prev, newRecord]);

        } catch (error) {
            console.error("Failed to add record:", error);
        }
    };

    const updateRecord = async (id, updatedRecord) => {
        try {
            const response = await fetch(`http://localhost:3000/financial-records/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedRecord),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const updated = await response.json();
            setRecords((prev) =>
                prev.map((record) => (record._id === id ? updated : record))
            );

        } catch (error) {
            console.error("Failed to update record:", error);
        }
    };

    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/financial-records/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            setRecords((prev) => prev.filter((record) => record._id !== id));

        } catch (error) {
            console.error("Failed to delete record:", error);
        }
    };

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);

    if (!context) {
        throw new Error("Context Not Found");
    }
    return context;
};
