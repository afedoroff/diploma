import Chart from 'react-apexcharts'
import {Context} from "../Context"
import {useContext} from "react";
import * as React from 'react';

export default function ApexChart() {
  const [context, setContext] = useContext(Context)
  return(
      <Chart
          options={{
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: context.keys,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }}
          height={400}
          series={context.values}
          type="donut"
      />
  )
}