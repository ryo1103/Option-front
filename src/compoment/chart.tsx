import Chart from 'kaktana-react-lightweight-charts'
import { Component } from 'react'
type ChartProps = {}
type stateType = {
  options: any
  areaSeries: any
}

export default class MyChart extends Component<ChartProps, stateType> {
  constructor(props: ChartProps) {
    super(props)
    const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } }

    const areaSeriesData = [
      { value: 0, time: 1642425322 },
      { value: 8, time: 1642511722 },
      { value: 10, time: 1642598122 },
      { value: 20, time: 1642684522 },
      { value: 3, time: 1642770922 },
      { value: 43, time: 1642857322 },
      { value: 41, time: 1642943722 },
      { value: 43, time: 1643030122 },
      { value: 56, time: 1643116522 },
      { value: 46, time: 1643202922 }
    ]
    this.state = {
      options: chartOptions,
      areaSeries: [
        {
          data: areaSeriesData,
          options: { lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)' }
        }
      ]
    }
  }

  render() {
    return <Chart options={this.state.options} areaSeries={this.state.areaSeries} darkTheme autoWidth height={320} />
  }
}
