import React from "react";
import results from './results.json';
import "./results.css";
import PageTitle from "../Components/PageTitle/PageTitle";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar'

const responsivePieData = [
    {
        "id": "python",
        "label": "python",
        "value": 119,
        "color": "hsl(272, 70%, 50%)"
    },
    {
        "id": "make",
        "label": "make",
        "value": 263,
        "color": "hsl(214, 70%, 50%)"
    },
    {
        "id": "elixir",
        "label": "elixir",
        "value": 458,
        "color": "hsl(103, 70%, 50%)"
    },
    {
        "id": "stylus",
        "label": "stylus",
        "value": 431,
        "color": "hsl(329, 70%, 50%)"
    },
    {
        "id": "haskell",
        "label": "haskell",
        "value": 173,
        "color": "hsl(138, 70%, 50%)"
    }
]
const barData = [
    {
        "country": "June",
        "hot dog": 200,
    },
    {
        "country": "July",
        "hot dog": 64,
        "hot dogColor": "hsl(70,23%,21%)",
    },
    {
        "country": "August",
        "hot dog": 28,
    },
    {
        "country": "Sept",
        "hot dog": 147,
    },
    {
        "country": "November",
        "hot dog": 61,
    },
    {
        "country": "October",
        "hot dog": 89,
    },
    {
        "country": "December",
        "hot dog": 12,
    }
]

export default class Results extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            results: results
        }
    }

    render() {
        const {results} = this.state;
        return <div className="pl-10">
            <PageTitle align={'left'}>Results for the month {results.month}/{results.year}</PageTitle>

            <div className="grid grid-cols-12 h-screen">
                <div className="col-span-6 pb-10">
                    <table>
                        <thead>
                            <tr><td>Table with the outcome of the month</td></tr>
                        </thead>
                    </table>
                </div>
                <div className="col-span-6">
                    <p>Notes</p>
                </div>

                <div className="col-span-9 bar-height">
                    <ResponsiveBar
                        data={barData}
                        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
                        indexBy="country"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#4e093d',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'fries'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'sandwich'
                                },
                                id: 'lines'
                            }
                        ]}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'country',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'food',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                </div>
                <div className="col-span-3 bar-height">
                    <ResponsivePie
                        data={responsivePieData}
                        innerRadius={0.35}
                        colors={{ scheme: 'nivo' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{ from: 'color' }}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'ruby'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'c'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'go'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'python'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'scala'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'lisp'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'elixir'
                                },
                                id: 'lines'
                            },
                            {
                                match: {
                                    id: 'javascript'
                                },
                                id: 'lines'
                            }
                        ]}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    }
}
