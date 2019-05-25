/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';

import Spin from '../Spin';

import { fetchbehavioralInsight as fetchbehavioralInsightAction } from '../../../actions/users';

import { Wrapper, ChartWrapper, Description } from './BehavioralInsight.style';

class BehavioralInsight extends Component {
  componentDidMount() {
    const { fetchbehavioralInsight, userRole, idOrPIN } = this.props;

    fetchbehavioralInsight(userRole, idOrPIN);
  }

  render() {
    const { data, loaded } = this.props;
    const texts = Object.keys(data);
    const chartsData = [];
    texts.forEach(text => {
      const chartData = {
        labels: data[text].labels,
        type: 'horizontalBar',
        datasets: [
          {
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
            ],
            data: data[text].values,
          },
        ],
      };

      chartsData.push(chartData);
    });

    return (
      <Wrapper>
        {loaded ? (
          chartsData.map((dataA, index) => (
            <div key={texts[index]}>
              <ChartWrapper>
                <Description>{texts[index]}</Description>
                <HorizontalBar
                  data={dataA}
                  width={30}
                  height={10}
                  options={{
                    legend: {
                      display: false,
                    },

                    scales: {
                      xAxes: [
                        {
                          barPercentage: 0.5,
                          barThickness: 6,
                          maxBarThickness: 8,
                          minBarLength: 2,
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          barThickness: 20,
                          gridLines: {
                            offsetGridLines: true,
                          },
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    offsetGridLines: true,
                  }}
                />
              </ChartWrapper>
            </div>
          ))
        ) : (
          <Spin />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.behavioralInsight.data,
  loaded: state.behavioralInsight.loaded,
});

export default connect(
  mapStateToProps,
  { fetchbehavioralInsight: fetchbehavioralInsightAction }
)(BehavioralInsight);
