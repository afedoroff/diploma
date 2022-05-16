import {useContext} from "react";
import {Context} from "../Context";

export default function setChartConfig(data){
  const [context, setContext] = useContext(Context)
  if (context.type == 'bar'){
    setContext ({
      options: {
        chart: {
          id: "bar",

        },
        xaxis: {
          categories: data.keys,
          tickPlacement: 'on'
        },
        yaxis: {
          title: {
            text: 'Amount',
          }
        }
      },
      series: [
        {
          name: "amount",
          data: data.values()
        }
      ],
      type: data.type
    })
  }
  else if (data.type == 'pie') {
    setContext ({
      series: data.values(),
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: data.keys,
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
    })
  }
}