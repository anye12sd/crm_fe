const itemList = {
    'productCode': '产品编码' ,
    'productMnemonic': '产品助记符',
    'status': '状态',
    'productName': '产品名称',
    'productCategory': '产品分类',
    'productPrice': '定价',
    'productCost': '单位成本',
    'unitcost': '单位价格',
    'unit': '计量单位',
    'purchaseReferencePrice': '采购参考价',
    'consumptionCycle': '消费周期（天）',
    'compose': '组合产品',
    'stock': '当前库存',
    'taxRate': '税率',
    'description': '描述',
    'changeTime': '修改时间',
    'remark': '备注',
    'changer': '修改人',
    'memberCode': '员工编码',
    'memberName': '员工姓名',
    'memberMnemonic': '员工助记码',
    'memberDuty': '员工职务',
    'memberAddress': '员工地址',
    'departmentName': '部门名称',
    'departmentAddress': '部门地址',
    'departmentCode': '部门编码',
    'phone': '电话',
    'fax': '传真',
    'email': '电子邮件',
    'businessCode': '业务机构编码',
    'businessName': '业务机构名称',
    'regionCode': '区域机构代码',
    'regionName': '区域机构名称',
    'loginName': '登录名',
    'officePhone': '办公电话',
    'mobilePhone': '移动电话',
    'orderCode': '订单编号',
    'orderDate': '订单日期',
    'billCategory': '单据分类',
    'customerName': '客户名',
    'customerCode': '客户编码',
    'customerMnemonic': '客户助记符',
    'orderStatus': '订单状态',
    'formalInvoice': '发票形式',
    'orderAmount': '订单金额',
    'paidAmount': '已收金额',
    'lockMember': '锁定员工',
    'lockTime': '锁定时间',
    'employee': '业务员',
    'closeMember': '关闭员工',
    'isClosed': '是否关闭',
    'isLocked': '是否锁定',
    'closeTime': '关闭时间',
    'orderSummary': '订单摘要',
    'domainName': '域名群名',
    'supplierCode': '供应商编码',
    'supplierMnemonic': '供应商助记符',
    'supplierName': '供应商名称',
    'categoryName': '分类名称',
    'lastContactTime': '最近联络时间',
    'superiorDepartment': '上级单位',
    'addressDetail': '详细地址',
    'postcode': '邮编',
    'createTime': '创建时间',
    'creator': '创建人',
    'nation': '国家',
    'website': '网站主页',
    'province': '省份',
    'city': '城市',
    'recognizeNumber': '识别号码',
    'recognizeWay': '识别方式',
    'feedbackType': '反馈类型',
    'feedbackCategory': '反馈分类',
    'important': '重要性',
    'emergency': '紧急性',
    'theme': '主题',
    'deadline': '解决期限',
    'feedbackTargetType': '反馈对象类型',
    'feedbackTarget': '反馈对象',
    'feedbackerType': '反馈者类型',
    'feedbacker': '反馈者',
    'feedbackerPhone': '反馈者电话',
    'feedbackerMail': '反馈者邮件',
    'responsibleEmployee': '负责员工',
    'result': '处理结果',
    'ICQ': 'ICQ号',
    'BP': 'BP机',
    'homeNumber': '家庭电话',
    'idNumber': '身份证号',
    'birthday': '生日',
    'sex': '性别',
    'nativePlace': '籍贯',
    'education': '学历',
    'entryTime': '入职时间',
    'leaveTime': '离职时间',
    'cdf': 'cdf',
    'QQ': 'QQ',
    'national': '民族',
    'wechat': '微信号',
    'addressNow': '现住址',
    'hobby': '兴趣爱好',
    'policy': '政治面貌',
    'speciality': '特长',
    'sculpture': '头像',
		//详情页里的复选框（例：资源中心-产品信息-产品信息详情）
    'checkbox': '',
		'reminder': '重要提醒',
		'friendSimpleCode': '客户助记符',
		'reactivity': '反应特性',
		'webServiceProvider': '网站服务商',
		'valueScales': '价值等级',
		'domainName1': '域名1',
		'domainName2': '域名2',
		'registrationTime1': '1注册时间',
		'registrationTime2': '2注册时间',
		'ICP': 'ICP备案',
		'authType': '认证类型',
		'WechatGroupNo': '微信群编号',
		'recordName': '备案户名',
		'recordPassword': '备案密码',
		'recordData': '备案资料地址',
		'lastPurchase': '最近一次购买R',
		'dockingRequirements': '可对接需求',
		'monetary': '购买金额M',
		'industry': '行业',
		'webProducts': '网站产品',
		'lossReasons': '流失原因',
		'lossType': '流失前类型',
		'contactName': '联系人姓名',
		'directSuperior': '直接上级',
		'duty': '职务',
		'personnelCharacteristics': '人员特性',
		'call': '称呼',
		'unifiedContactTime': '统一联络时间',
		'phoneTimes': '移动电话呼叫次数',
		'clientPhone': '客户电话',
		'maritalStatus': '婚姻状况',
		'monthlyContact': '每月联系',
		'monthlyContactInfo': '每月联系方式',
		'maturity': '成熟度',
		'title': '标题',
    'planName': '计划名称',
    'lifeCycle': '生命周期',
    'avgSalesAmount': '平均销售额',
    'effectSalesAmount': '有效销售额',
    'effectAmount': '有效销售额',
    'startDate': '开始时间',
    'endDate': '结束时间',
    'expectDate': '预期日期',
    'saleExpect': '销售预期',
    'originCategory': '来源类型',
    'answerExplain': '填答说明',
    'score': '总分',
    'offerSheetCode': '报价单号',
    'offerDate': '报价日期',
    'offerCategory': '报价单分类',
    'partnerName': '伙伴名',
    'partnerCode': '伙伴编号',
    'partnerMnemonic': '伙伴助记符',
    'offerSummary': '报价摘要',
    'paidPerson': '付款方',
    'offerPerson': '报价人',
    'amount': '金额',
    'number': '数量',
    'coinType': '币种',
    'exchangeRate': '汇率',
    'paymentCredit': '付款信用',
    'creditAmount': '信用额度',
    'marketMode': '营销模式',
    'clientSource': '客户来源',
    'identificationWay': '认证方式',
    'enroller': '报名人',
    'deliverTarget': '交付对象',
    'deliverAmount': '交付金额',
    'deliverDate': '交付日期',
    'deliveredAmount': '已交付数量',
    'undeliveredAmount': '未交付数量',
    'paidDeadline': '付款期限',
    'accountName': '账户名称',
    'planDate': '计划日期',
    'action': '动作',
    'planReceivedAmount': '计划收款金额',
    'returnCode': '收付款编码',
    'paymentDate': '支付日期',
    'occurAmount': '发生金额',
    'billCode': '票据号',
    'cancelOutAmount': '冲减预收',
    'paidWay': '付款方式',
    'verifyEmployee': '审核人',
    'depositBank': '开户行',
    'bankAccount': '银行账号',
    'accountSurplus': '账户余额',
    'receiveOccur': '应收发生',
    'percentageCost': '提成成本',
    'planReceiveOccur': '预收发生',
    'receivedOccur': '已收发生',
    'responsibleDepartment': '负责部门',
    'accountRemark': '账户备注',
    'focusPoint': '关注点',
    'map': '地图',
    'approver': '批准人',
    'approveAmount': '批准金额',
    'workReportTarget': '工作记录对象',
    'relatedWebsite': '相关网址',
    'planeCharger': '平面负责人',
    'cutCharger': '分割负责人',
    'dataCharger': '资料负责人',
    'activityCode': '活动代码',
    'activityName': '活动名称',
    'activityCategory': '市场活动分类',
    'activityBudget': '活动预算',
    'activityExpenses': '活动费用',
    'speaker': '主讲人',
    'attendance': '到场人数',
    'enterprises': '到场企业数',
    'relatedCourses': '相关课程',
    'address': '地址',
    'occurFee': '发生费用',
    'approvalFee': '批准费用',
    'currency': '货币',
    '': '',
}

export default {
    itemList,
}