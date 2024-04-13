import React, { Component, useEffect, useState } from 'react'
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Card } from './index';

function Chart(props) {
    const options = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }
        ]
    };

    function prepChartData(data, labels) {
        const { datasets } = options;
        return {
            labels,
            datasets: [
                {
                    ...datasets[0],
                    data
                }
            ]

        }
    }

    function getChart(type, data, labels) {
        const chartData = prepChartData(data, labels)
        switch (type) {
            case 'Donught':
                return <Doughnut data={chartData} />
            case 'Line':
                return <Line data={chartData} />
            case 'Bar' :
                return <Bar data={chartData} />

        }

    }

    return (
        <Card title={props.title} body={getChart(props.type, props.data, props.labels)} />
    );
}


export default Chart;