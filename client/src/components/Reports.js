import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
    const [financialData, setFinancialData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                const response = await axios.get('/api/reports/financial');
                setFinancialData(response.data);
            } catch (err) {
                setError('Failed to fetch financial data');
            } finally {
                setLoading(false);
            }
        };
        fetchFinancialData();
    }, []);

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Financial Report', 14, 16);
        const tableData = financialData.map(item => [item.date, item.amount, item.category]);
        doc.autoTable({
            head: [['Date', 'Amount', 'Category']],
            body: tableData,
        });
        doc.save('financial_report.pdf');
    };

    const chartData = {
        labels: financialData.map(item => item.date),
        datasets: [
            {
                label: 'Financial Data',
                data: financialData.map(item => item.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <h2>Financial Reports</h2>
            <Bar data={chartData} />
            <Button variant="primary" onClick={generateReport} className="mt-3">
                Export Report
            </Button>
        </div>
    );
};

export default Reports;