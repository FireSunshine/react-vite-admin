import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ totalType, currentDate, expenseData, incomeData }) => {
  // 用于存放 echart 初始化返回的实例
  let myChart = null;
  // 绘制饼图的方法
  const setPieChart = (data) => {
    // 初始化饼图，返回实例
    let chartDom = document.getElementById('main');
    myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: 'Account',
        subtext: 'The Billing Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      // 图例
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: data.map((item) => {
            return {
              name: item.type_name,
              value: item.number
            };
          }),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  };
  useEffect(() => {
    setPieChart(totalType === 'expense' ? expenseData : incomeData);
    return () => {
      // 组件卸载时，调用 ECharts 的销毁函数
      myChart.dispose();
    };
    // 当账单类型、当前月、收支数据发生改变，重新绘制图表
  }, [totalType, currentDate, expenseData, incomeData]);
  return <div id="main" style={{ width: '700px', height: '600px' }} />;
};

export default PieChart;
