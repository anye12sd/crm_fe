export const constantFormMap = [
    { propertyName: '员工编码', location: 'empCode', dataType: 'char' },
    { propertyName: '员工姓名', location: 'empName', dataType: 'char', must: true },
    { propertyName: '助记码', location: 'empSimpleCode', dataType: 'char' },
    { propertyName: '部门名称', location: 'deptId', dataType: 'int', enums: [], must: true },
    { propertyName: '登录名', location: 'loginName', dataType: 'char' },
    { propertyName: '员工职务', location: 'empPosition', dataType: 'char' },
    { propertyName: '员工地址', location: 'empAddress', dataType: 'char', span: 2 },
    { propertyName: '办公电话', location: 'empOfficePhone', dataType: 'char' },
    { propertyName: '电子邮件', location: 'empEmail', dataType: 'char' },
    { propertyName: '微信号', location: 'empWechat', dataType: 'char' },
    { propertyName: 'QQ', location: 'empQq', dataType: 'char' },
    { propertyName: '移动电话', location: 'empMobilePhone', dataType: 'char' },
    { propertyName: '家庭电话', location: 'empHomePhone', dataType: 'char' },
    { propertyName: '身份证号', location: 'empPinNo', dataType: 'char' },
    { propertyName: '生日', location: 'birthday', dataType: 'datePicker' },
    {
        propertyName: '性别',
        location: 'empGender',
        dataType: 'int',
        defaultValue: 0,
        enums: [
            { key: 0, value: '未知' },
            { key: 1, value: '男' },
            { key: 2, value: '女' }
        ]
    },
    { propertyName: '籍贯', location: 'empBirthPlace', dataType: 'char' },
    {
        propertyName: '学历',
        location: 'empEduLevel',
        dataType: 'int',
        defaultValue: 0,
        enums: [
            { key: 0, value: '无' },
            { key: 1, value: '中专' },
            { key: 2, value: '大专' },
            { key: 3, value: '本科' },
            { key: 4, value: '硕士' },
            { key: 5, value: '博士' },
            { key: 6, value: '博士后' }
        ]
    }
];

export const lastFormMap = [{ propertyName: '备注', location: 'empMemo1k', dataType: 'text', span: 3 }];
