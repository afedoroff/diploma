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
            height: 600,
            type: 'treemap'
          },
          title: {
            text: 'Basic Treemap'
          }
        }
      })
    } else if (context.type == "line_date") {
      context.type = 'line'
      setConfig({
        series: context.series,
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          grid: {
            row: {
              opacity: 0.5
            },
          },
          xaxis: context.xaxis
        },
      })
    } else if (context.type == "bar_date") {
      context.type = 'bar'
      setConfig({

        series: context.series,
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
          xaxis: context.xaxis,
          fill: {
            opacity: 1
          }
        }
      })
    } else if (context.type == "area") {
      setConfig({
        series: context.series,
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: context.xaxis.categories
          },
        },
      })
    } else if (context.type == "bar_num") {
      context.type = 'bar'
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
            categories: context.xaxis
          },
          fill: {
            opacity: 1
          }
        }
      })
    } else if (context.type == "scatter") {
      log(context)
      setConfig({
        series: [{
          name: "SAMPLE A",
          data: context.data1
        },{
          name: "SAMPLE B",
          data: context.data2
        }],
        chart: {
          height: 350,
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
      })
    }
  }, context)
  return (
      <Chart
          options={config.options}
          series={config.series}
          type={context.type}
          height={600}
      />
  )
}