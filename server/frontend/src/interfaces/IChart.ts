export default interface IChart {
  options: {
    chart: {
      type: string
    },
    plotOptions: {
      bar: {
        horizontal: boolean
      }
    }
  },
  series: [
    data: {x: string, y: string}[],
    labels: string
  ]
}
