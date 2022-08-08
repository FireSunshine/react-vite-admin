import AddUser from '@/pages/User/AddUser';
import EditUser from '@/pages/User/EditUser';
import AddAccount from '@/pages/Account/AddAccount';
import EditAccount from '@/pages/Account/EditAccount';
import AccountList from '@/pages/Account/AccountList';
import Home from '@/pages/Home/Home';

import { HomeOutlined, AccountBookOutlined, UserOutlined } from '@ant-design/icons';

const routes = [
  {
    key: 110,
    label: 'Home',
    icon: HomeOutlined,
    children: [
      {
        key: 1101,
        label: '面板',
        path: '/',
        component: Home
      }
    ]
  },
  {
    key: 111,
    label: '用户管理',
    icon: UserOutlined,
    children: [
      {
        key: 1111,
        label: '添加用户',
        path: '/user/adduser',
        component: AddUser
      },
      {
        key: 1112,
        label: '编辑用户',
        path: '/user/edituser/:id',
        component: EditUser
      }
    ]
  },
  {
    key: 112,
    label: '账单管理',
    icon: AccountBookOutlined,
    children: [
      {
        key: 1120,
        label: '账单列表',
        path: '/account/accountList/',
        component: AccountList
      },
      {
        key: 1121,
        label: '添加账单',
        path: '/account/addAccount/',
        component: AddAccount
      },
      {
        key: 1122,
        label: '编辑账单',
        path: '/account/editAccount/:id',
        component: EditAccount
      }
    ]
  }
];

export default routes;
