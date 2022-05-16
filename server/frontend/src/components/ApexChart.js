import Chart from 'react-apexcharts'
import {Context} from "../Context"
import {useCallback, useContext, useEffect, useState} from "react";
import * as React from 'react';

export default function ApexChart() {
  const [context, setContext] = useContext(Context)
  const [config, setConfig] = useState({options: {}, series: {}, type: ''})

  const init = useEffect(() => {
    if (context.type == "bar") {
      setConfig({
        series: [{
          name: 'Amount',
          data: context.yaxis
        }],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              tools: {
                zoom: true,
                zoomin: true,
                zoomout: true,
              }
            }
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: context.xaxis,
            tickPlacement: 'on'
          }
        },


      })
    } else if (context.type == "pie") {
      setConfig({

        series: context.yaxis,
        options: {
          chart: {
            width: '50%',
            height: '30%',
            type: 'donut',
          },
          labels: context.xaxis,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      })
    } else if (context.type == "treemap") {
      let data = []
      for (let i = 0; i < context.xaxis.length; i++) {
        data.push({x: context.xaxis[i], y: context.yaxis[i]})
      }
      console.log(data)
      setConfig({
        series: [
          {
            data: data
          }
        ],
        options: {
          legend: {
            show: false
          },
          chart: {
            height: 500,
            type: 'treemap'
          },
          title: {
            text: 'Basic Treemap'
          }
        }
      })
    } else if (context.type == "line") {
      let dateArray = []
      for (let date in context.xaxis) {
        dateArray.push(new Date(date).toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}))
      }
      setConfig({
        series: [{
          data: context.yaxis
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: dateArray,
            labels: {
              rotate: -45
            }
          }
        },
      })
    } else if (context.type == "bar_date") {
      context.type = 'bar'
      let dateArray = []
      for (let date in context.xaxis) {
        dateArray.push(new Date(date).toLocaleDateString('en-us', {year: "numeric", month: "short", day: "numeric"}))
      }
      setConfig({

        series: [{
          name: 'Net Profit',
          data: context.yaxis
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
          },
          xaxis: {
            categories: dateArray
          },
          fill: {
            opacity: 1
          }
        }
      })
    }
  }, context)
  return (
      <Chart
          options={config.options}
          series={config.series}
          type={context.type}
          height={400}
      />
  )
}