// renders chart js graphs for trainer feedback

import React, { Component } from 'react';

import { HorizontalBar } from 'react-chartjs-2';
import {
  ChartWrapper,
  Description,
  Category,
  HeadlineDiv,
} from './Feedback.style';
import { sum } from '../../../helpers/createSum';

const createCategory = str =>
  str.includes('When I teach') ? 'train the trainer' : 'trainer feedback';

class HorizontalBarComponent extends Component {
  render() {
    const { feedbackData } = this.props;

    const chartsData = [];
    const items = Object.keys(feedbackData);
    // loop over question groups
    items.forEach(text => {
      const group = feedbackData[text];
      // loop over answer groups
      group.counter.forEach(answer => {
        const values = [];
        const labels = [];
        // loop over single answer objects
        answer.surveyTypes.forEach(item => {
          // create values for chartjs (no of answers per survey type) and labels (survey type) for chartJS
          const value = item[1];
          const surveyType = item[0];
          values.push(value);
          labels.push(surveyType);
          return null;
        });
        values.unshift(sum(values));
        labels.unshift('overall');
        // chart js data object
        const chartData = {
          question: group.questionText,
          answer: answer.answerText,
          labels,
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
              data: values,
            },
          ],
        };

        return chartsData.push(chartData);
      });
      return null;
    });

    return (
      // render questions
      feedbackData.map(group => {
        return (
          <div key={group.questionText}>
            <HeadlineDiv>
              <Category>
                category: {createCategory(group.questionText)}
              </Category>
              <Description>{group.questionText}</Description>
            </HeadlineDiv>
            {chartsData.map(dataA => {
              // render charts
              return (
                group.questionText === dataA.question && (
                  <ChartWrapper key={Math.random()}>
                    <HorizontalBar
                      data={dataA}
                      width={6}
                      height={1}
                      options={{
                        responsive: true,
                        title: {
                          display: true,
                          text: `${dataA.answer}`,
                          position: 'left',
                        },
                        legend: {
                          display: true,
                          labels: {
                            generateLabels(chart) {
                              const { labels } = dataA;
                              const dataset = chart.data.datasets[0];
                              const legend = labels.map((label, i) => {
                                return {
                                  datasetIndex: 0,
                                  fillStyle:
                                    dataset.backgroundColor &&
                                    dataset.backgroundColor[i],
                                  strokeStyle:
                                    dataset.borderColor &&
                                    dataset.borderColor[i],
                                  lineWidth: dataset.borderWidth,
                                  text: label,
                                };
                              });
                              return legend;
                            },
                          },
                        },
                        scales: {
                          xAxes: [
                            {
                              barPercentage: 0,
                              barThickness: 3,
                              maxBarThickness: 4,
                              minBarLength: 2,
                              ticks: {
                                beginAtZero: true,
                              },
                            },
                          ],
                          yAxes: [
                            {
                              barThickness: 5,
                              gridLines: {
                                offsetGridLines: true,
                              },
                              ticks: {
                                beginAtZero: true,
                                display: false,
                              },
                            },
                          ],
                        },
                        offsetGridLines: true,
                      }}
                    />
                  </ChartWrapper>
                )
              );
            })}
          </div>
        );
      })
    );
  }
}

export default HorizontalBarComponent;
