"use client"

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


interface RenderBarChartProps{
    fill: string;
    data: { name: string, uv: number, pv: number, amt: number | null }[];
    barSize: number;
    height: number;
}

const RenderBarChart = ({fill, data, barSize, height}: RenderBarChartProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null;
    }

    
  return (
    <ResponsiveContainer width="100%" height={height}>
        <BarChart  data={data}>
      <XAxis dataKey="name" stroke="#8884d8" axisLine={false} tickLine={false} tick={{ fill: '#000000' }} />
      <YAxis axisLine={false} tickLine={false}/>
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <Bar dataKey="amt" fill={fill} barSize={barSize} />
    </BarChart>
    </ResponsiveContainer>
    
  );
};

export default RenderBarChart;