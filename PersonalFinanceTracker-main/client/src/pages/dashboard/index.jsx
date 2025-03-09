import { useUser } from '@clerk/clerk-react';
import { FinancialRecordForm } from './financial-record-form';
import FinancialRecordList from '/src/pages/dashboard/financial-record-list.jsx';
import { useMemo } from 'react';
import { useFinancialRecords } from '../../contexts/financial-record-context';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    // Calculate the total amount
    const totalAmount = useMemo(() => {
        return records.reduce((acc, record) => acc + record.amount, 0);
    }, [records]);

    // Prepare data for Pie chart
    const pieData = useMemo(() => {
        const categories = {};
        records.forEach((record) => {
            if (categories[record.category]) {
                categories[record.category] += record.amount;
            } else {
                categories[record.category] = record.amount;
            }
        });

        return {
            labels: Object.keys(categories),
            datasets: [
                {
                    data: Object.values(categories),
                    backgroundColor: [
                        '#FF6384', // Red
                        '#36A2EB', // Blue
                        '#FFCE56', // Yellow
                        '#4BC0C0', // Teal
                        '#9966FF', // Purple
                        '#FF9F40', // Orange
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                    ],
                },
            ],
        };
    }, [records]);

    return (
        <div className="dashboard-container min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">
                Welcome {user?.firstName}! Here are your Finances:
            </h1>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Record:</h2>
                <FinancialRecordForm />
            </div>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Total Monthly Expenses:</h2>
                <div className="text-3xl font-bold text-blue-600">
                    ${totalAmount.toFixed(2)}
                </div>
            </div>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Financial Records:</h2>
                <FinancialRecordList />
            </div>
            {/* Conditionally render the Pie chart */}
            {records.length > 0 && (
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">Expense Breakdown by Category:</h2>
                    <div className="flex justify-center"> 
                        <div className="max-w-xs w-full"> {/* Max width for the Pie chart */}
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
