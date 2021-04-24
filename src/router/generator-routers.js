/**
 * 请求后端动态生成路由
 */

// import api from '@/api/user';
import { BasicLayout, RouteView } from '@/components/layouts';
import router from '@/router';
import api from '@/api/user';
import store from '@/store';

// 页面组件
const constantRouterComponents = {
  // 引入基础页面组件
  BasicLayout: BasicLayout,
  RouteView: RouteView,

  // 配合动态引入的页面组件
  // 首页
  index: () => import('@/views/Index'),

  // 资源中心
  product_rules: () => import('@/views/ResourceCenter/ProductRules'),
  product_info: () => import('@/views/ResourceCenter/ProductInfo'),
  department_list: () => import('@/views/ResourceCenter/DepartmentList'),
  member_info_list: () => import('@/views/ResourceCenter/MemberInfoList'),
  member_manage_detail: () => import('@/views/ResourceCenter/MemberManageDetail'),
  member_online: () => import('@/views/ResourceCenter/MemberOnline'),
  message_center: () => import('@/views/ResourceCenter/MessageCenter'),
  product_info_detail: () => import('@/views/ResourceCenter/ProductInfoDetail'),
  department_info_detail: () => import('@/views/ResourceCenter/DepartmentInfoDetail'),
  member_info_detail: () => import('@/views/ResourceCenter/MemberInfoDetail'),
  message_center_detail: () => import('@/views/ResourceCenter/MessageCenterDetail'),
  product_add: () => import('@/views/ResourceCenter/ProductAdd'),
  message_add: () => import('@/views/ResourceCenter/MessageAdd'),

  // 销售管理
  customer_resource_plan: () => import('@/views/SalesManagement/CustomerResourcePlan'),
  sales_chance_management: () => import('@/views/SalesManagement/SalesChanceManagement'),
  chance_handle_process: () => import('@/views/SalesManagement/ChanceHandleProcess'),
  sales_chance_assignment: () => import('@/views/SalesManagement/SalesChanceAssignment'),
  chance_assess_standard: () => import('@/views/SalesManagement/ChanceAssessStandard'),
  sales_chance_assess: () => import('@/views/SalesManagement/SalesChanceAssess'),
  offer_management: () => import('@/views/SalesManagement/OfferManagement'),
  sales_chance_detail: () => import('@/views/SalesManagement/SalesChanceDetail'),
  sales_task_detail: () => import('@/views/SalesManagement/SalesTaskDetail'),
  sales_record_detail: () => import('@/views/SalesManagement/SalesRecordDetail'),
  chance_deal_process: () => import('@/views/SalesManagement/ChanceDealProcess'),
  sales_chance_distribution: () => import('@/views/SalesManagement/SalesChanceDistribution'),
  customer_resource_plan_detail: () => import('@/views/SalesManagement/CustomerResourcePlanDetail'),
  chance_assess_standard_detail: () => import('@/views/SalesManagement/ChanceAssessStandardDetail'),
  answer_list: () => import('@/views/SalesManagement/AnswerList'),
  sales_record_list: () => import('@/views/SalesManagement/SalesRecordList'),
  sales_record_add: () => import('@/views/SalesManagement/SalesRecordAdd'),

  // 销售订单
  sales_order_list: () => import('@/views/SalesOrder/SalesOrderList'),
  sales_return_goods_list: () => import('@/views/SalesOrder/SalesReturnGoodsList'),
  order_execute_plan_list: () => import('@/views/SalesOrder/OrderExecutePlanList'),
  order_execute_process_list: () => import('@/views/SalesOrder/OrderExecuteProcessList'),
  sales_received_list: () => import('@/views/SalesOrder/SalesReceivedList'),
  order_execute_detail: () => import('@/views/SalesOrder/OrderExecuteDetail'),
  order_info_detail: () => import('@/views/SalesOrder/OrderInfoDetail'),
  order_account_list: () => import('@/views/SalesOrder/OrderAccountList'),
  sales_received_detail: () => import('@/views/SalesOrder/SalesReceivedDetail'),
  sales_order_add: () => import('@/views/SalesOrder/SalesOrderAdd'),

  // 客户中心
  client_rules: () => import('@/views/ClientCenter/ClientRules'),
  client_infor: () => import('@/views/ClientCenter/ClientInfor'),
  client_add: () => import('@/views/ClientCenter/ClientAdd'),
  client_fav: () => import('@/views/ClientCenter/ClientFav'),
  client_fav_detail: () => import('@/views/ClientCenter/ClientFavDetail'),
  client_list_detail: () => import('@/views/ClientCenter/ClientListDetail'),
  client_repeat: () => import('@/views/ClientCenter/ClientRepeat'),
  client_browse: () => import('@/views/ClientCenter/ClientBrowse'),
  client_assign_employees: () => import('@/views/ClientCenter/ClientAssignEmployees'),
  client_assign_department: () => import('@/views/ClientCenter/ClientAssignDepartment'),
  client_distribution: () => import('@/views/ClientCenter/ClientDistribution'),
  client_contact_info: () => import('@/views/ClientCenter/ClientContactInfo'),
  client_contact_add: () => import('@/views/ClientCenter/ClientContactAdd'),
  client_contact_fav: () => import('@/views/ClientCenter/ClientContactFav'),
  client_contact_fav_detail: () => import('@/views/ClientCenter/ClientContactFavDetail'),
  client_contact_distribution: () => import('@/views/ClientCenter/ClientContactDistribution'),
  staff_list_detail: () => import('@/views/ClientCenter/StaffListDetail'),
  client_contact_info_detail: () => import('@/views/ClientCenter/ClientContactInfoDetail'),
  customer_info_detail: () => import('@/views/ClientCenter/CustomerInfoDetail'),
  account_info_list: () => import('@/views/ClientCenter/AccountInfoList'),

  //服务管理
  fdbk_list: () => import('@/views/ServiceManagement/FdbkList'),
  fdbk_add: () => import('@/views/ServiceManagement/FdbkAdd'),
  fdbk_rslt: () => import('@/views/ServiceManagement/FdbkRslt'),
  fdbk_info_detail: () => import('@/views/ServiceManagement/FdbkInfoDetail'),
  service_record: () => import('@/views/ServiceManagement/ServiceRecord'),
  service_record_add: () => import('@/views/ServiceManagement/ServiceRecordAdd'),
  service_record_detail: () => import('@/views/ServiceManagement/ServiceRecordDetail'),
  care_dig: () => import('@/views/ServiceManagement/CareDig'),
  care_dig_info_detail: () => import('@/views/ServiceManagement/CareDigInfoDetail'),
  add_fdbk_info: () => import('@/views/ServiceManagement/AddFdbkInfo'),

  //市场管理
  marketing_list: () => import('@/views/MarketManagement/MarketingList'),
  marketing_add: () => import('@/views/MarketManagement/MarketingAdd'),
  partake_client: () => import('@/views/MarketManagement/PartakeClient'),
  partake_contact: () => import('@/views/MarketManagement/PartakeContact'),
  market_info_detail: () => import('@/views/MarketManagement/MarketInfoDetail'),

  // 临时目录（某些暂不知道归类的先暂存此目录）
  CustomerContactInfoDetail: () => import('@/views/TempDirectory/CustomerContactInfoDetail'),
  AccountInfoDetail: () => import('@/views/TempDirectory/AccountInfoDetail'),
  StatusExpectDetail: () => import('@/views/TempDirectory/StatusExpectDetail'),
  PlanExecuteDetail: () => import('@/views/SalesOrder/PlanExecuteDetail'),
  ToDoListDetail: () => import('@/views/TempDirectory/ToDoListDetail'),
  StagePlanDetail: () => import('@/views/TempDirectory/StagePlanDetail'),
  FeedbackInfoDetail: () => import('@/views/TempDirectory/FeedbackInfoDetail'),
  PartnerInfoDetail: () => import('@/views/TempDirectory/PartnerInfoDetail'),
  AddSalesChance: () => import('@/views/TempDirectory/AddSalesChance'),
  DiscussList: () => import('@/views/TempDirectory/DiscussList'),
  DiscussDetail: () => import('@/views/TempDirectory/DiscussDetail'),
  SupplierInfoDetail: () => import('@/views/TempDirectory/SupplierInfoDetail'),
  OfferSheetDetail: () => import('@/views/TempDirectory/OfferSheetDetail'),
  OfferSheetDetail1: () => import('@/views/TempDirectory/OfferSheetDetail1'),
  Test: () => import('@/views/test/Test')
};

// 通配符匹配所有未找到页面组件的路由
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

// 根级路由
const rootRouter = {
  path: '/',
  name: 'home',
  component: 'BasicLayout',
  meta: { title: '' },
  redirect: '/index',
  children: []
};

// /**
//  * 示例数据
//     [
//         {
//             parentId: 0,
//             id: 1,
//             path: '/index',
//             name: 'index',
//             meta: { icon: 'home', title: '主页', keepAlive: false },
//             component: 'Index'
//         },
//         {
//             parentId: 0,
//             id: 2,
//             path: '/organization',
//             name: 'organization',
//             redirect: '/organization/biz_dept',
//             component: 'RouteView',
//             meta: { title: '组织机构', icon: 'apartment', permission: ['organization'] }
//         },
//         {
//             parentId: 2,
//             id: 3,
//             path: '/organization/biz_dept',
//             name: 'BizDept',
//             component: 'BizDept',
//             meta: { title: '业务机构', permission: ['BizDept'] }
//         },
//         {
//             parentId: 2,
//             id: 4,
//             path: '/organization/mng_dept',
//             name: 'MngDept',
//             component: 'MngDept',
//             meta: { title: '区域机构', permission: [] }
//         },
//         {
//             parentId: 2,
//             id: 5,
//             path: '/organization/department',
//             name: 'Department',
//             component: 'Department',
//             meta: { title: '部门管理', permission: [] },
//             hiddenChildren: true
//         },
//         {
//             parentId: 5,
//             id: 6,
//             path: '/organization/department/employee',
//             name: 'DeptEmpList',
//             component: 'DeptEmpList',
//             meta: { title: '员工列表', hidden: true }
//         }
//     ];
//  */

// 动态生成路由
export const generatorDynamicRouter = async () => {
  // const childRouterArray = [
  //   {
  //     parentId: 0,
  //     id: 0,
  //     title: '首页',
  //     path: '/Index',
  //     name: 'Index',
  //     icon: 'home',
  //     component: 'Index',
  //     meta: { title: '首页', icon: 'home', permission: ['organization'] }
  //   },
  //   {
  //     parentId: 0,
  //     id: 2,
  //     title: '客户中心',
  //     hidden: false,
  //     icon: 'team',
  //     path: '/ClientCenter',
  //     name: 'ClientCenter',
  //     meta: { icon: 'home', title: '客户中心', keepAlive: false },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 1,
  //         id: 200,
  //         title: '客户规则',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientRules',
  //         name: 'ClientRules',
  //         meta: { icon: 'home', title: '客户规则', keepAlive: false },
  //         component: 'ClientRules'
  //       },
  //       {
  //         parentId: 1,
  //         id: 201,
  //         title: '客户信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientInfor',
  //         name: 'ClientInfor',
  //         meta: { icon: 'home', title: '客户信息', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 201,
  //             id: 2011,
  //             title: '客户信息',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientInfor',
  //             name: 'ClientInfor',
  //             meta: { icon: 'home', title: '客户信息', keepAlive: false },
  //             component: 'ClientInfor'
  //           },
  //           {
  //             parentId: 201,
  //             id: 2012,
  //             title: '客户信息详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/CustomerInfoDetail',
  //             name: 'CustomerInfoDetail',
  //             meta: { icon: 'home', title: '客户信息详情', keepAlive: false },
  //             component: 'CustomerInfoDetail'
  //           },
  //           {
  //             parentId: 201,
  //             id: 2013,
  //             title: '新增客户',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientAdd',
  //             name: 'ClientAdd',
  //             meta: { icon: 'home', title: '新增客户', keepAlive: false },
  //             component: 'ClientAdd'
  //           },
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 202,
  //         title: '客户收藏夹',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientFav',
  //         name: 'ClientFav',
  //         meta: { icon: 'home', title: '客户收藏夹', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 202,
  //             id: 2021,
  //             title: '客户收藏夹',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientFav',
  //             name: 'ClientFav',
  //             meta: { icon: 'home', title: '客户收藏夹', keepAlive: false },
  //             component: 'ClientFav'
  //           },
  //           {
  //             parentId: 202,
  //             id: 2022,
  //             title: '客户收藏夹详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientFavDetail',
  //             name: 'ClientFavDetail',
  //             meta: { icon: 'home', title: '客户收藏夹详情', keepAlive: false },
  //             component: 'ClientFavDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 203,
  //         title: '客户查重',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientRepeat',
  //         name: 'ClientRepeat',
  //         meta: { icon: 'home', title: '客户查重', keepAlive: false },
  //         component: 'ClientRepeat'
  //       },
  //       {
  //         parentId: 1,
  //         id: 204,
  //         title: '客户浏览',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientBrowse',
  //         name: 'ClientBrowse',
  //         meta: { icon: 'home', title: '客户浏览', keepAlive: false },
  //         component: 'ClientBrowse'
  //       },
  //       {
  //         parentId: 1,
  //         id: 205,
  //         title: '分配到员工',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientAssignEmployees',
  //         name: 'ClientAssignEmployees',
  //         meta: { icon: 'home', title: '分配到员工', keepAlive: false },
  //         component: 'ClientAssignEmployees'
  //       },
  //       {
  //         parentId: 1,
  //         id: 206,
  //         title: '分配到部门',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientAssignDepartment',
  //         name: 'ClientAssignDepartment',
  //         meta: { icon: 'home', title: '分配到部门', keepAlive: false },
  //         component: 'ClientAssignDepartment'
  //       },
  //       {
  //         parentId: 1,
  //         id: 207,
  //         title: '无负责员工客户分配',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientDistribution',
  //         name: 'ClientDistribution',
  //         meta: { icon: 'home', title: '无负责员工客户分配', keepAlive: false },
  //         component: 'ClientDistribution'
  //       },
  //       {
  //         parentId: 1,
  //         id: 208,
  //         title: '客户联系人信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientContactInfo',
  //         name: 'ClientContactInfo',
  //         meta: { icon: 'home', title: '客户联系人信息', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 208,
  //             id: 2081,
  //             title: '客户联系人信息',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientContactInfo',
  //             name: 'ClientContactInfo',
  //             meta: { icon: 'home', title: '客户联系人信息', keepAlive: false },
  //             component: 'ClientContactInfo'
  //           },
  //           {
  //             parentId: 208,
  //             id: 2082,
  //             title: '客户联系人信息详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientContactInfoDetail',
  //             name: 'ClientContactInfoDetail',
  //             meta: { icon: 'home', title: '客户联系人信息详情', keepAlive: false },
  //             component: 'ClientContactInfoDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 209,
  //         title: '客户联系人收藏夹',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientContactFav',
  //         name: 'ClientContactFav',
  //         meta: { icon: 'home', title: '客户联系人收藏夹', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 209,
  //             id: 2091,
  //             title: '客户联系人收藏夹',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientContactFav',
  //             name: 'ClientContactFav',
  //             meta: { icon: 'home', title: '客户联系人收藏夹', keepAlive: false },
  //             component: 'ClientContactFav'
  //           },
  //           {
  //             parentId: 209,
  //             id: 2092,
  //             title: '客户联系人收藏夹详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ClientCenter/ClientContactFavDetail',
  //             name: 'ClientContactFavDetail',
  //             meta: { icon: 'home', title: '客户联系人收藏夹详情', keepAlive: false },
  //             component: 'ClientContactFavDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 2,
  //         id: 211,
  //         title: '客户列表',
  //         hidden: true,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/ClientListDetail',
  //         name: 'ClientListDetail',
  //         meta: { icon: 'home', title: '客户列表', keepAlive: false },
  //         component: 'ClientListDetail'
  //       },
  //       {
  //         parentId: 2,
  //         id: 212,
  //         title: '员工列表',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/StaffListDetail',
  //         name: 'StaffListDetail',
  //         meta: { icon: 'home', title: '员工列表', keepAlive: false },
  //         component: 'StaffListDetail'
  //       },
  //       {
  //         parentId: 2,
  //         id: 213,
  //         title: '账号信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ClientCenter/AccountInfoList',
  //         name: 'AccountInfoList',
  //         meta: { icon: 'home', title: '账号信息', keepAlive: false },
  //         component: 'AccountInfoList'
  //       }
  //     ]
  //   },
  //   {
  //     parentId: 0,
  //     id: 1,
  //     title: '资源中心',
  //     hidden: false,
  //     icon: 'deployment-unit',
  //     path: '/ResourceCenter',
  //     name: 'ResourceCenter',
  //     meta: { icon: 'home', title: '资源中心', keepAlive: true },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 1,
  //         id: 100,
  //         title: '产品规则',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ResourceCenter/ProductRules',
  //         name: 'ProductRules',
  //         meta: { icon: 'home', title: '产品规则', keepAlive: true },
  //         component: 'ProductRules'
  //       },
  //       {
  //         parentId: 1,
  //         id: 101,
  //         title: '产品信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ResourceCenter/ProductInfo',
  //         name: 'ProductInfo',
  //         meta: { icon: 'home', title: '产品信息', keepAlive: true },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 101,
  //             id: 1012,
  //             title: '产品信息',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/ProductInfo',
  //             name: 'ProductInfo',
  //             meta: { icon: 'home', title: '产品信息', keepAlive: true },
  //             component: 'ProductInfo'
  //           },
  //           {
  //             parentId: 101,
  //             id: 1011,
  //             title: '产品信息详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/ProductInfoDetail',
  //             name: 'ProductInfoDetail',
  //             meta: { icon: 'home', title: '产品信息详情', keepAlive: true },
  //             component: 'ProductInfoDetail'
  //           },
  //           {
  //             parentId: 101,
  //             id: 1012,
  //             title: '新增产品',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/ProductAdd',
  //             name: 'ProductAdd',
  //             meta: { icon: 'home', title: '新增产品', keepAlive: false },
  //             component: 'ProductAdd'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 102,
  //         title: '部门列表',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ResourceCenter/DepartmentList',
  //         name: 'DepartmentList',
  //         meta: { icon: 'home', title: '部门列表', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 102,
  //             id: 1021,
  //             title: '部门信息',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/DepartmentInfoDetail',
  //             name: 'DepartmentInfoDetail',
  //             meta: { icon: 'home', title: '部门信息', keepAlive: false },
  //             component: 'DepartmentInfoDetail'
  //           },
  //           {
  //             parentId: 102,
  //             id: 1022,
  //             title: '部门列表',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/DepartmentList',
  //             name: 'DepartmentList',
  //             meta: { icon: 'home', title: '部门列表', keepAlive: false },
  //             component: 'DepartmentList'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 103,
  //         title: '员工信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ResourceCenter/MemberInfoList',
  //         name: 'MemberInfoList',
  //         meta: { icon: 'home', title: '员工信息', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 103,
  //             id: 1031,
  //             title: '员工信息',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/MemberInfoList',
  //             name: 'MemberInfoList',
  //             meta: { icon: 'home', title: '员工信息', keepAlive: false },
  //             component: 'MemberInfoList'
  //           },
  //           {
  //             parentId: 103,
  //             id: 1032,
  //             title: '员工详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/MemberInfoDetail',
  //             name: 'MemberInfoDetail',
  //             meta: { icon: 'home', title: '员工详情', keepAlive: false },
  //             component: 'MemberInfoDetail'
  //           },
  //           {
  //             parentId: 103,
  //             id: 1033,
  //             title: '员工管理详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/MemberManageDetail',
  //             name: 'MemberManageDetail',
  //             meta: { icon: 'home', title: '员工管理详情', keepAlive: false },
  //             component: 'MemberManageDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 104,
  //         title: '在线员工',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ResourceCenter/MemberOnline',
  //         name: 'MemberOnline',
  //         meta: { icon: 'home', title: '在线员工', keepAlive: false },
  //         component: 'MemberOnline'
  //       },
  //       {
  //         parentId: 1,
  //         id: 105,
  //         title: '消息中心',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ResourceCenter/MessageCenter',
  //         name: 'MessageCenter',
  //         meta: { icon: 'home', title: '消息中心', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 105,
  //             id: 1051,
  //             title: '消息中心',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/MessageCenter',
  //             name: 'MessageCenter',
  //             meta: { icon: 'home', title: '消息中心', keepAlive: false },
  //             component: 'MessageCenter'
  //           },
  //           {
  //             parentId: 105,
  //             id: 1052,
  //             title: '消息中心详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/MessageCenterDetail',
  //             name: 'MessageCenterDetail',
  //             meta: { icon: 'home', title: '消息中心详情', keepAlive: false },
  //             component: 'MessageCenterDetail'
  //           },
  //           {
  //             parentId: 105,
  //             id: 1053,
  //             title: '消息新增',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ResourceCenter/MessageAdd',
  //             name: 'MessageAdd',
  //             meta: { icon: 'home', title: '消息新增', keepAlive: false },
  //             component: 'MessageAdd'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     parentId: 0,
  //     id: 3,
  //     title: '临时文件',
  //     hidden: false,
  //     hiddenChildren: true,
  //     path: '/TempDirectory',
  //     name: 'TempDirectory',
  //     meta: { icon: 'home', title: '临时文件', keepAlive: false },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 3,
  //         id: 301,
  //         title: '客户信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/CustomerContactInfoDetail',
  //         name: 'CustomerContactInfoDetail',
  //         meta: { icon: 'home', title: '客户信息', keepAlive: false },
  //         component: 'CustomerContactInfoDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 302,
  //         title: '账户信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/AccountInfoDetail',
  //         name: 'AccountInfoDetail',
  //         meta: { icon: 'home', title: '账户信息', keepAlive: false },
  //         component: 'AccountInfoDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 304,
  //         title: '状态预期',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/StatusExpectDetail',
  //         name: 'StatusExpectDetail',
  //         meta: { icon: 'home', title: '状态预期', keepAlive: false },
  //         component: 'StatusExpectDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 305,
  //         title: '执行计划',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/PlanExecuteDetail',
  //         name: 'PlanExecuteDetail',
  //         meta: { icon: 'home', title: '执行计划', keepAlive: false },
  //         component: 'PlanExecuteDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 306,
  //         title: '待办事宜',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/ToDoListDetail',
  //         name: 'ToDoListDetail',
  //         meta: { icon: 'home', title: '待办事宜', keepAlive: false },
  //         component: 'ToDoListDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 307,
  //         title: '阶段计划详情',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/StagePlanDetail',
  //         name: 'StagePlanDetail',
  //         meta: { icon: 'home', title: '阶段计划详情', keepAlive: false },
  //         component: 'StagePlanDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 308,
  //         title: '反馈信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/FeedbackInfoDetail',
  //         name: 'FeedbackInfoDetail',
  //         meta: { icon: 'home', title: '反馈信息', keepAlive: false },
  //         component: 'FeedbackInfoDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 309,
  //         title: '合作伙伴详情',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/PartnerInfoDetail',
  //         name: 'PartnerInfoDetail',
  //         meta: { icon: 'home', title: '合作伙伴详情', keepAlive: false },
  //         component: 'PartnerInfoDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 310,
  //         title: '供应商信息详情',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/SupplierInfoDetail',
  //         name: 'SupplierInfoDetail',
  //         meta: { icon: 'home', title: '供应商信息详情', keepAlive: false },
  //         component: 'SupplierInfoDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 311,
  //         title: '报价单',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/OfferSheetDetail',
  //         name: 'OfferSheetDetail',
  //         meta: { icon: 'home', title: '报价单', keepAlive: false },
  //         component: 'OfferSheetDetail'
  //       },
  //       {
  //         parentId: 3,
  //         id: 312,
  //         title: '报价单',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/OfferSheetDetail1',
  //         name: 'OfferSheetDetail1',
  //         meta: { icon: 'home', title: '报价单', keepAlive: false },
  //         component: 'OfferSheetDetail1'
  //       },
  //       {
  //         parentId: 3,
  //         id: 313,
  //         title: '添加销售机会',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/TempDirectory/AddSalesChance',
  //         name: 'AddSalesChance',
  //         meta: { icon: 'home', title: '添加销售机会', keepAlive: false },
  //         component: 'AddSalesChance'
  //       }
  //       // {
  //       //   parentId: 3,
  //       //   id: 312,
  //       //   title: '讨论组',
  //       //   hidden: false,
  //       //   path: '/TempDirectory/DiscussList',
  //       //   name: 'DiscussList',
  //       //   meta: { icon: 'home', title: '讨论组', keepAlive: false },
  //       //   component: 'DiscussList',
  //       // },
  //       // {
  //       //   parentId: 312,
  //       //   id: 3121,
  //       //   title: '讨论帖',
  //       //   hidden: true,
  //       //   path: '/TempDirectory/DiscussDetail',
  //       //   name: 'DiscussDetail',
  //       //   meta: { icon: 'home', title: '讨论帖', keepAlive: false },
  //       //   component: 'DiscussDetail'
  //       // },
  //     ]
  //   },
  //   {
  //     parentId: 0,
  //     id: 6,
  //     title: '市场管理',
  //     hidden: false,
  //     icon: 'pie-chart',
  //     path: '/MarketManagement',
  //     name: 'MarketManagement',
  //     meta: { icon: 'home', title: '市场管理', keepAlive: false },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 1,
  //         id: 601,
  //         title: '市场活动',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/MarketManagement/MarketingList',
  //         name: 'MarketingList',
  //         meta: { icon: 'home', title: '市场活动', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 601,
  //             id: 6011,
  //             title: '市场活动',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/MarketManagement/MarketingList',
  //             name: 'MarketingList',
  //             meta: { icon: 'home', title: '市场活动', keepAlive: false },
  //             component: 'MarketingList'
  //           },
  //           {
  //             parentId: 601,
  //             id: 6012,
  //             title: '市场活动详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/MarketManagement/MarketInfoDetail',
  //             name: 'MarketInfoDetail',
  //             meta: { icon: 'home', title: '市场活动详情', keepAlive: false },
  //             component: 'MarketInfoDetail'
  //           }
  //         ]
  //       },
  //       {
  //         id: 602,
  //         title: '参与客户',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/MarketManagement/PartakeClient',
  //         name: 'PartakeClient',
  //         meta: { icon: 'home', title: '参与客户', keepAlive: false },
  //         component: 'PartakeClient'
  //       },
  //       {
  //         parentId: 1,
  //         id: 603,
  //         title: '参与联系人',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/MarketManagement/PartakeContact',
  //         name: 'PartakeContact',
  //         meta: { icon: 'home', title: '参与联系人', keepAlive: false },
  //         component: 'PartakeContact'
  //       }
  //     ]
  //   },
  //   {
  //     parentId: 0,
  //     id: 5,
  //     title: '销售管理',
  //     hidden: false,
  //     icon: 'tag',
  //     path: '/SalesManagement',
  //     name: 'SalesManagement',
  //     meta: { icon: 'home', title: '销售管理', keepAlive: false },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 1,
  //         id: 501,
  //         title: '客户资源计划',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/CustomerResourcePlan',
  //         name: 'CustomerResourcePlan',
  //         meta: { icon: 'home', title: '客户资源计划', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 501,
  //             id: 5011,
  //             title: '客户资源计划',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/CustomerResourcePlan',
  //             name: 'CustomerResourcePlan',
  //             meta: { icon: 'home', title: '客户资源计划', keepAlive: false },
  //             component: 'CustomerResourcePlan'
  //           },
  //           {
  //             parentId: 501,
  //             id: 5012,
  //             title: '客户资源计划详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/CustomerResourcePlanDetail',
  //             name: 'CustomerResourcePlanDetail',
  //             meta: { icon: 'home', title: '客户资源计划详情', keepAlive: false },
  //             component: 'CustomerResourcePlanDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 502,
  //         title: '销售机会管理',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/SalesChanceManagement',
  //         name: 'SalesChanceManagement',
  //         meta: { icon: 'home', title: '销售机会管理', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 502,
  //             id: 5021,
  //             title: '销售机会管理',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/SalesChanceManagement',
  //             name: 'SalesChanceManagement',
  //             meta: { icon: 'home', title: '销售机会管理', keepAlive: false },
  //             component: 'SalesChanceManagement'
  //           },
  //           {
  //             parentId: 502,
  //             id: 5022,
  //             title: '销售机会详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/SalesChanceDetail',
  //             name: 'SalesChanceDetail',
  //             meta: { icon: 'home', title: '销售机会详情', keepAlive: false },
  //             component: 'SalesChanceDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 503,
  //         title: '机会处理过程',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/ChanceHandleProcess',
  //         name: 'ChanceHandleProcess',
  //         meta: { icon: 'home', title: '机会处理过程', keepAlive: false },
  //         component: 'ChanceHandleProcess'
  //       },
  //       {
  //         parentId: 1,
  //         id: 504,
  //         title: '销售机会分配',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/SalesChanceAssignment',
  //         name: 'SalesChanceAssignment',
  //         meta: { icon: 'home', title: '销售机会分配', keepAlive: false },
  //         component: 'SalesChanceAssignment'
  //       },
  //       {
  //         parentId: 1,
  //         id: 505,
  //         title: '机会评估标准',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/ChanceAssessStandard',
  //         name: 'ChanceAssessStandard',
  //         meta: { icon: 'home', title: '机会评估标准', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 505,
  //             id: 5051,
  //             title: '机会评估标准',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/ChanceAssessStandard',
  //             name: 'ChanceAssessStandard',
  //             meta: { icon: 'home', title: '机会评估标准', keepAlive: false },
  //             component: 'ChanceAssessStandard'
  //           },
  //           {
  //             parentId: 505,
  //             id: 5052,
  //             title: '机会评估标准详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/ChanceAssessStandardDetail',
  //             name: 'ChanceAssessStandardDetail',
  //             meta: { icon: 'home', title: '机会评估标准详情', keepAlive: false },
  //             component: 'ChanceAssessStandardDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 506,
  //         title: '销售机会评估',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/SalesChanceAssess',
  //         name: 'SalesChanceAssess',
  //         meta: { icon: 'home', title: '销售机会评估', keepAlive: false },
  //         component: 'SalesChanceAssess'
  //       },
  //       {
  //         parentId: 1,
  //         id: 507,
  //         title: '报价管理',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/OfferManagement',
  //         name: 'OfferManagement',
  //         meta: { icon: 'home', title: '报价管理', keepAlive: false },
  //         component: 'OfferManagement'
  //       },
  //       {
  //         parentId: 1,
  //         id: 516,
  //         title: '销售记录',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/SalesRecordList',
  //         name: 'SalesRecordList',
  //         meta: { icon: 'home', title: '销售记录', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 516,
  //             id: 5161,
  //             title: '销售记录',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/SalesRecordList',
  //             name: 'SalesRecordList',
  //             meta: { icon: 'home', title: '销售记录', keepAlive: false },
  //             component: 'SalesRecordList'
  //           },
  //           {
  //             parentId: 516,
  //             id: 5162,
  //             title: '销售记录详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/SalesRecordDetail',
  //             name: 'SalesRecordDetail',
  //             meta: { icon: 'home', title: '销售记录详情', keepAlive: false },
  //             component: 'SalesRecordDetail'
  //           },
  //           {
  //             parentId: 516,
  //             id: 5163,
  //             title: '销售记录新增',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesManagement/SalesRecordAdd',
  //             name: 'SalesRecordAdd',
  //             meta: { icon: 'home', title: '销售记录新增', keepAlive: false },
  //             component: 'SalesRecordAdd'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 509,
  //         title: '销售任务详情',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/SalesTaskDetail',
  //         name: 'SalesTaskDetail',
  //         meta: { icon: 'home', title: '销售任务详情', keepAlive: false },
  //         component: 'SalesTaskDetail'
  //       },
  //       {
  //         parentId: 1,
  //         id: 511,
  //         title: '机会处理过程',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/ChanceDealProcess',
  //         name: 'ChanceDealProcess',
  //         meta: { icon: 'home', title: '机会处理过程', keepAlive: false },
  //         component: 'ChanceDealProcess'
  //       },
  //       {
  //         parentId: 1,
  //         id: 512,
  //         title: '销售机会分配',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/SalesChanceDistribution',
  //         name: 'SalesChanceDistribution',
  //         meta: { icon: 'home', title: '销售机会分配', keepAlive: false },
  //         component: 'SalesChanceDistribution'
  //       },
  //       {
  //         parentId: 1,
  //         id: 515,
  //         title: '答卷列表',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesManagement/AnswerList',
  //         name: 'AnswerList',
  //         meta: { icon: 'home', title: '答卷列表', keepAlive: false },
  //         component: 'AnswerList'
  //       }
  //     ]
  //   },
  //   {
  //     parentId: 0,
  //     id: 4,
  //     title: '服务管理',
  //     hidden: false,
  //     icon: 'heart',
  //     path: '/ServiceManagement',
  //     name: 'ServiceManagement',
  //     meta: { icon: 'home', title: '服务管理', keepAlive: false },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 1,
  //         id: 400,
  //         title: '反馈管理',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ServiceManagement/FdbkList',
  //         name: 'FdbkList',
  //         meta: { icon: 'home', title: '反馈管理', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 400,
  //             id: 4001,
  //             title: '反馈管理',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ServiceManagement/FdbkList',
  //             name: 'FdbkList',
  //             meta: { icon: 'home', title: '反馈管理', keepAlive: false },
  //             component: 'FdbkList'
  //           },
  //           {
  //             parentId: 400,
  //             id: 4002,
  //             title: '反馈信息详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ServiceManagement/FdbkInfoDetail',
  //             name: 'FdbkInfoDetail',
  //             meta: { icon: 'home', title: '反馈信息详情', keepAlive: false },
  //             component: 'FdbkInfoDetail'
  //           },
  //           {
  //             parentId: 400,
  //             id: 4003,
  //             title: '新增反馈',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ServiceManagement/FdbkAdd',
  //             name: 'FdbkAdd',
  //             meta: { icon: 'home', title: '新增反馈', keepAlive: false },
  //             component: 'FdbkAdd'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 401,
  //         title: '处理过程',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ServiceManagement/FdbkRslt',
  //         name: 'FdbkRslt',
  //         meta: { icon: 'home', title: '处理过程', keepAlive: false },
  //         component: 'FdbkRslt'
  //       },
  //       {
  //         parentId: 1,
  //         id: 402,
  //         title: '客户关怀',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ServiceManagement/CareDig',
  //         name: 'CareDig',
  //         meta: { icon: 'home', title: '客户关怀', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 402,
  //             id: 4021,
  //             title: '客户关怀',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ServiceManagement/CareDig',
  //             name: 'CareDig',
  //             meta: { icon: 'home', title: '客户关怀', keepAlive: false },
  //             component: 'CareDig'
  //           },
  //           {
  //             parentId: 402,
  //             id: 4022,
  //             title: '客户关怀详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ServiceManagement/CareDigInfoDetail',
  //             name: 'CareDigInfoDetail',
  //             meta: { icon: 'home', title: '客户关怀详情', keepAlive: false },
  //             component: 'CareDigInfoDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 403,
  //         title: '服务记录',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ServiceManagement/ServiceRecord',
  //         name: 'ServiceRecord',
  //         meta: { icon: 'home', title: '服务记录', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 403,
  //             id: 4031,
  //             title: '服务记录',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/ServiceManagement/ServiceRecord',
  //             name: 'ServiceRecord',
  //             meta: { icon: 'home', title: '服务记录', keepAlive: false },
  //             component: 'ServiceRecord'
  //           },
  //           {
  //             parentId: 403,
  //             id: 4032,
  //             title: '服务记录详情',
  //             hidden: false,
  //             path: '/ServiceManagement/ServiceRecordDetail',
  //             name: 'ServiceRecordDetail',
  //             meta: { icon: 'home', title: '服务记录详情', keepAlive: false },
  //             component: 'ServiceRecordDetail'
  //           },
  //           {
  //             parentId: 403,
  //             id: 4033,
  //             title: '服务记录新增',
  //             hidden: false,
  //             path: '/ServiceManagement/ServiceRecordAdd',
  //             name: 'ServiceRecordAdd',
  //             meta: { icon: 'home', title: '服务记录新增', keepAlive: false },
  //             component: 'ServiceRecordAdd'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 406,
  //         title: '添加反馈信息',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/ServiceManagement/AddFdbkInfo',
  //         name: 'AddFdbkInfo',
  //         meta: { icon: 'home', title: '添加反馈信息', keepAlive: false },
  //         component: 'AddFdbkInfo'
  //       }
  //     ]
  //   },
  //   {
  //     parentId: 1,
  //     id: 7,
  //     title: '销售订单',
  //     icon: 'reconciliation',
  //     path: '/SalesOrder',
  //     name: 'SalesOrder',
  //     hidden: false,
  //     hiddenChildren: true,
  //     meta: { icon: 'home', title: '销售订单', keepAlive: false },
  //     component: 'RouteView',
  //     children: [
  //       {
  //         parentId: 1,
  //         id: 700,
  //         title: '销售订单',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/SalesOrderList',
  //         name: 'SalesOrderList',
  //         meta: { icon: 'home', title: '销售订单', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 700,
  //             id: 7001,
  //             title: '销售订单',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesOrder/SalesOrderList',
  //             name: 'SalesOrderList',
  //             meta: { icon: 'home', title: '销售订单', keepAlive: false },
  //             component: 'SalesOrderList'
  //           },
  //           {
  //             parentId: 700,
  //             id: 7002,
  //             title: '订单信息',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesOrder/OrderInfoDetail',
  //             name: 'OrderInfoDetail',
  //             meta: { icon: 'home', title: '订单信息', keepAlive: false },
  //             component: 'OrderInfoDetail'
  //           },
  //           {
  //             parentId: 700,
  //             id: 7003,
  //             title: '订单新增',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesOrder/SalesOrderAdd',
  //             name: 'SalesOrderAdd',
  //             meta: { icon: 'home', title: '订单新增', keepAlive: false },
  //             component: 'SalesOrderAdd'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 1,
  //         id: 701,
  //         title: '销售退货',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/SalesReturnGoodsList',
  //         name: 'SalesReturnGoodsList',
  //         meta: { icon: 'home', title: '销售退货', keepAlive: false },
  //         component: 'SalesReturnGoodsList'
  //       },
  //       {
  //         parentId: 1,
  //         id: 702,
  //         title: '订单执行计划',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/OrderExecutePlanList',
  //         name: 'OrderExecutePlanList',
  //         meta: { icon: 'home', title: '订单执行计划', keepAlive: false },
  //         component: 'OrderExecutePlanList'
  //       },
  //       {
  //         parentId: 1,
  //         id: 703,
  //         title: '订单执行过程',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/OrderExecuteProcessList',
  //         name: 'OrderExecuteProcessList',
  //         meta: { icon: 'home', title: '订单执行过程', keepAlive: false },
  //         component: 'OrderExecuteProcessList'
  //       },
  //       {
  //         parentId: 3,
  //         id: 705,
  //         title: '销售收款',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/SalesReceivedList',
  //         name: 'SalesReceivedList',
  //         meta: { icon: 'home', title: '销售收款', keepAlive: false },
  //         component: 'RouteView',
  //         children: [
  //           {
  //             parentId: 705,
  //             id: 7051,
  //             title: '销售收款',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesOrder/SalesReceivedList',
  //             name: 'SalesReceivedList',
  //             meta: { icon: 'home', title: '销售收款', keepAlive: false },
  //             component: 'SalesReceivedList'
  //           },
  //           {
  //             parentId: 705,
  //             id: 7052,
  //             title: '销售收款详情',
  //             hidden: false,
  //             hiddenChildren: true,
  //             path: '/SalesOrder/SalesReceivedDetail',
  //             name: 'SalesReceivedDetail',
  //             meta: { icon: 'home', title: '销售收款详情', keepAlive: false },
  //             component: 'SalesReceivedDetail'
  //           }
  //         ]
  //       },
  //       {
  //         parentId: 3,
  //         id: 706,
  //         title: '销售账目',
  //         hidden: false,
  //         hiddenChildren: true,
  //         path: '/SalesOrder/OrderAccountList',
  //         name: 'OrderAccountList',
  //         meta: { icon: 'home', title: '销售账目', keepAlive: false },
  //         component: 'OrderAccountList'
  //       },
  //       {
  //         parentId: 3,
  //         id: 707,
  //         title: '销售账目',
  //         hidden: true,
  //         hiddenChildren: true,
  //         path: '/test/Test',
  //         name: 'Test',
  //         meta: { icon: 'home', title: '彩票', keepAlive: false },
  //         component: 'Test'
  //       }
  //     ]
  //   }
  // ];
  // const res = await api.getRouters(); // 请求后端获取路由数据
  // console.log(res)
  let childRouterArray1 = []
  if(localStorage.getItem('router')){
    childRouterArray1 = JSON.parse(localStorage.getItem('router'))
  }
  const routerArray = [];
  rootRouter.children = childRouterArray1
  // 传入根级路由
  routerArray.push(rootRouter);
  // 生成路由对象
  const routers = await generator(routerArray);
  // 传入 404 页
  routers.push(notFoundRouter);
  console.log(routers);
  return routers;
};

// 格式化树形结构数据 生成 vue-router 层级路由表
export const generator = (routerMap, parent) => {
  return routerMap.map((item) => {
    const {
      id,
      name,
      title,
      hidden,
      hiddenChildren,
      icon,
      path,
      redirect,
      component,
      children
    } = item;
    const currentRouter = {
      path,
      name,
      component: constantRouterComponents[component],
      meta: {
        id,
        title,
        icon: icon,
        permission: name,
        hidden,
        hiddenChildren
      }
    };
    // 重定向
    redirect && (currentRouter.redirect = redirect);
    // 是否有子菜单，并递归处理
    if (children && children.length > 0) {
      currentRouter.children = generator(children, currentRouter);
    }
    return currentRouter;
  });
};
