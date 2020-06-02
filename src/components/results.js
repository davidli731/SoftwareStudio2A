import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      probs: [],
      labels: [],
      chartData: {}
    };    
  }

  extractProbs = (data) => {
    if (data === undefined || typeof data === "string") return; 
    let newProbs = []

    for (var key in data) {
      newProbs.push(data[key].prob)
    };

    this.setState({labels: Object.getOwnPropertyNames(data).sort((a, b) => {return a - b})})
    this.setState({probs: newProbs})
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.extractProbs(this.props.resultChartData)
    }
  }

  render() {
    return (
      <div class="row" style={{ margin: '8px', padding: '1%' }}>
        <Bar
          data={{
            labels: this.state.labels,
            datasets: [{
              label: 'Probability',
              data: this.state.probs
            }]
          }}
          width={this.props.width}
          height={this.props.height}
          options={{
            legend: {
              display: true,
              position: 'bottom'
            },
            title: {
              display: true,
              fontSize: 24,
              text: this.props.title
            }
          }}
        />
      </div>
    )
  }
}