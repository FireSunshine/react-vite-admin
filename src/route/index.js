import loadable from '@loadable/component';

// import AddUser from '@/pages/User/AddUser';

const EditUser = loadable(() => import('@/pages/User/EditUser'));
const AddAccount = loadable(() => import('@/pages/Account/AddAccount'));
const EditAccount = loadable(() => import('@/pages/Account/EditAccount'));
const AccountList = loadable(() => import('@/pages/Account/AccountList'));
const Home = loadable(() => import('@/pages/Home/Home'));
const ModifyPassword = loadable(() => import('@/pages/User/ModifyPassword'));

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
      // {
      //   key: 1111,
      //   label: '添加用户',
      //   path: '/user/adduser',
      //   component: AddUser
      // },
      {
        key: 1112,
        label: '修改用户信息',
        path: '/user/edituser/',
        component: EditUser
      },
      {
        key: 1113,
        label: '重置密码',
        path: '/user/modifyPassword/',
        component: ModifyPassword
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
