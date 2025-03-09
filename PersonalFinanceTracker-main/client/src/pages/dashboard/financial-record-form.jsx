import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [category, setCategory] = useState("");

    const { addRecord } = useFinancialRecords();
    const { user } = useUser();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newRecord = {
            userId: user?.id,
            date: new Date(),
            description,
            amount: parseFloat(amount),
            category,
            paymentMethod
        };

        addRecord(newRecord);

        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount:</label>
                    <input
                        type="number"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                    <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method:</label>
                    <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">Select a payment method</option>
                        <option value="creditcard">Credit Card</option>
                        <option value="debitcard">Debit Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ease-in-out duration-300"
                >
                    Add Record
                </button>
            </form>
        </div>
    );
};
