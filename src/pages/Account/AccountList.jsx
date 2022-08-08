import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getAccountList, deleteAccount } from '@/api/account';
import { message, Modal, Table, Tag } from 'antd';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

const AccountList = () => {
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 5
  });
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'));
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const getData = async (currentPage) => {
    const params = {
      page: currentPage ?? pageInfo.current, // 分页
      page_size: pageInfo.pageSize, // 分页大小默认 5
      date: currentTime, // 月份
      type_id: 'all' // 类型 id，不传默认所有
    };
    setLoading(true);
    const res = await getAccountList(params);
    setPageInfo({ ...pageInfo, current: currentPage, total: res?.data?.totalPage * pageInfo.pageSize });
    let list = res?.data?.list ?? [];
    list.forEach((item, index) => {
      item.children = item.bills;
      item.id = new Date().getTime() + '-' + index;
    });
    setDataSource(list);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTableChange = (newPagination) => {
    getData(newPagination.current);
  };

  const handleDelete = async () => {
    const res = await deleteAccount({ id: deleteId });
    if (Number(res?.code ?? '') === 200) {
      message.success('删除成功');
      if (dataSource.length === 1 && dataSource[0].children.length === 1) {
        getData(pageInfo.current - 1);
      } else {
        getData(1);
      }
      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 200,
      render: (text, record) => {
        if (text.toString().includes('-')) {
          return record.date;
        } else {
          return text;
        }
      }
    },
    {
      title: '账单类别',
      dataIndex: 'type_name',
      width: 200,
      render: (text) => text ?? '--'
    },
    {
      title: '收支类型',
      dataIndex: 'pay_type',
      width: 200,
      render: (text) => {
        if (text === 2) {
          return '收入';
        } else if (text === 1) {
          return '支出';
        } else {
          return '--';
        }
      }
    },
    {
      title: '金额',
      dataIndex: 'amount',
      width: 200,
      render: (text) => text ?? '--'
    },
    {
      title: '时间',
      dataIndex: 'date',
      width: 200,
      render: (text) => {
        if (text.includes('-')) {
          return text;
        } else {
          return dayjs(Number(text)).format('YYYY-MM-DD HH:mm');
        }
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 200,
      render: (text) => text ?? '--'
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 200,
      render: (text, record) =>
        typeof record.id === 'number' ? (
          <>
            <TagOperate
              color="#2db7f5"
              onClick={() => {
                history.push(`/account/editAccount/${record.id}`);
              }}
            >
              编辑
            </TagOperate>
            <TagOperate
              color="#f50"
              onClick={() => {
                setIsModalVisible(true);
                setDeleteId(record.id);
              }}
            >
              删除
            </TagOperate>
          </>
        ) : (
          <TagOperate color="processing">提示：点击 + 展开账单</TagOperate>
        )
    }
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
        pagination={pageInfo}
        onChange={handleTableChange}
        loading={loading}
      />
      <Modal title="删除账单" visible={isModalVisible} onOk={handleDelete} onCancel={() => setIsModalVisible(false)}>
        <p>你确定要删除这条数据吗？</p>
      </Modal>
    </>
  );
};

export default AccountList;

const TagOperate = styled(Tag)`
  cursor: pointer;
  border-radius: 2px;
`;
