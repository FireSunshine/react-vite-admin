import React, { useEffect, useState } from 'react';
import { DatePicker, Row, Col, Card, Statistic, Tag, Progress } from 'antd';
import expend from '@/assets/expend.png';
import income from '@/assets/income.png';
import styled from '@emotion/styled';
import { getData } from '@/api/data';
import moment from 'moment';
import PieChart from './components/PieChart';

const Home = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM')); // 选择月份
  const [totalType, setTotalType] = useState('expense'); // 收入或支出类型
  const [taoalMoney, setTotalMoney] = useState({
    totalIncome: 0, // 总收入金额
    totalExpense: 0 // 总支出金额
  });
  const [expenseData, setExpenseData] = useState([]); // 支出数据
  const [incomeData, setIncomeData] = useState([]); // 收入数据

  const getEchartsData = async () => {
    const res = await getData({ date: currentDate });
    // 总收支金额
    setTotalMoney({
      totalIncome: res?.data?.total_income ?? 0,
      totalExpense: res?.data?.total_expense ?? 0
    });
    // 过滤支出和收入数据
    const expense_data = res?.data?.total_data
      ?.filter((item) => item.pay_type === 1)
      .sort((a, b) => b.number - a.number);
    const income_data = res?.data?.total_data
      ?.filter((item) => item.pay_type === 2)
      .sort((a, b) => b.number - a.number);

    setExpenseData(expense_data);
    setIncomeData(income_data);
  };
  useEffect(() => {
    // 月份变化请求接口
    getEchartsData();
  }, [currentDate]);
  return (
    <>
      <Row gutter={16} style={{ lineHeight: '32px' }}>
        <Col>
          <span> 日期：</span>
          <DatePicker
            placeholder="选择月份"
            picker="month"
            value={moment(currentDate)}
            onChange={(e) => {
              setCurrentDate(moment(e).format('YYYY-MM'));
            }}
            allowClear={false}
          />
        </Col>
        <Col>
          <span>消费类型：</span>
          {/* 改变消费类型 */}
          <TagBox color={totalType === 'expense' ? 'success' : null} onClick={() => setTotalType('expense')}>
            支出
          </TagBox>
          <TagBox color={totalType === 'income' ? 'processing' : null} onClick={() => setTotalType('income')}>
            收入
          </TagBox>
        </Col>
      </Row>
      <CardBox>
        {/* 展示收支金额 */}
        <Row gutter={16} className="row">
          <Col span={12}>
            <Card>
              <Statistic
                title="支出"
                value={`¥ ${taoalMoney?.totalExpense ?? 0}`}
                precision={2}
                valueStyle={{
                  color: '#3f8600'
                }}
                prefix={<img src={expend} />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="收入"
                value={`¥ ${taoalMoney?.totalIncome ?? 0}`}
                precision={2}
                valueStyle={{
                  color: '#cf1322'
                }}
                prefix={<img src={income} />}
              />
            </Card>
          </Col>
        </Row>
      </CardBox>
      <ChartBox>
        <Row>
          {/* 绘制占比 */}
          <Col span={12}>
            <h1>收支构成</h1>
            {(totalType === 'expense' ? expenseData : incomeData)?.map((item) => (
              <ProgressBox key={item.type_id}>
                <b>{item.type_name}</b>
                <Progress
                  style={{ width: '500px' }}
                  strokeColor={{
                    '0%': '#0091ff',
                    '100%': '#33b0b6'
                  }}
                  percent={Number(
                    (item.number / Number(totalType === 'expense' ? taoalMoney.totalExpense : taoalMoney.totalIncome)) *
                      100
                  ).toFixed(2)}
                />
              </ProgressBox>
            ))}
          </Col>
          {/* 绘制图表 */}
          <Col span={12}>
            <h1>收支构成</h1>
            <PieChart totalType={totalType} expenseData={expenseData} incomeData={incomeData} />
          </Col>
        </Row>
      </ChartBox>
    </>
  );
};

export default Home;

const CardBox = styled.div`
  width: 800px;
  .row {
    margin-top: 20px;
    img {
      width: 24px;
      margin-top: -5px;
      margin-right: 10px;
    }
  }
`;
const TagBox = styled(Tag)`
  border-radius: 16px;
  cursor: pointer;
`;
const ChartBox = styled.div`
  width: 1300px;
  margin-top: 30px;
  .ant-progress-bg {
    height: 16px !important;
  }
  .ant-col {
    background-color: #fff;
    height: 600px;
    padding: 20px;
  }
`;
const ProgressBox = styled.div`
  display: flex;
  margin: 10px;
  b {
    display: block;
    width: 30px;
    margin-right: 5px;
  }
`;
