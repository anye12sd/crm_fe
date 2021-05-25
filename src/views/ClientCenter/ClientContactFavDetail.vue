<template>
    <a-layout class="main-layout">
        <description-item
                :description="description"
                :descriptionColumn="descriptionColumn"
                :editButtons="editButtons"
        ></description-item>
        <div class="change-box">
            <a-button size="small" style="margin-right: 6px" @click="editFav">修改</a-button>
            <a-button size="small" @click="$router.go(-1)">退出</a-button>
        </div>
        <category-tabs
                :usedTabs="usedTabs"
                :usedTabsColumns="tabsSelected"
                @on-add="toAdd"
                @on-callback="onCallback"
                @on-click-btn="childBtnClicked"
                @on-tabsSelect="tabsSelect"
        ></category-tabs>
        <a-modal
                title="修改收藏夹"
                :visible="visible"
                @ok="handleOk"
                @cancel="handleCancel"
                ok-text="确定"
                cancel-text="取消"
        >
            <a-form-model
                    ref="ruleForm"
                    :model="formModal"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    :rules="rules"
            >
                <a-form-model-item label="标题" prop="typeName">
                    <a-input v-model="formModal.typeName" placeholder="标题"/>
                </a-form-model-item>
                <a-form-model-item label="描述">
                    <a-input v-model="formModal.businessIntro" placeholder="描述"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <modal-add-table ref="tableAdd" :modalAddTableParams="modalAddTableParams" :columns="modalAddColumns"
                         :data="modalAddData" @tableSelected="tableSelectedHandle" @on-select-change="onSelectChange"
                         @on-modalTablePagination-change="modalTablePaginationChange"
                         @modal-close="modalAddTableClose"></modal-add-table>
        <tabs-select-drawer
                :visibleConfig="tabsVisibleConfig"
                :childrenDrawerProps="tabsChildrenDrawer"
                :columns="originColumns"
                :checkedListProps="tabsCheckedList"
                @postShow="postShow"
                @hideDrawer="hideList"
        >
        </tabs-select-drawer>
    </a-layout>
</template>

<script>
    import CategoryTabs from '../../components/tabsComponent/CategoryTabs';

    const modalAddTableParams = {
        modalTitle: '员工选择',
        tableTitle: '员工列表',
        hasRowHeaderSelect: true,
        hideCancelBtn: true,
        isCheckbox: true,
        headerContent: [],
        loading: false,
        showAdvanceBtn: false,
        headerSearchParams: [
            // {
            //     type: 'input',
            //     labelName: '分类编码',
            //     placeholder: '请输入',
            //     paramsName: 'code'
            // },
            // {
            //     type: 'input',
            //     labelName: '产品分类',
            //     paramsName: 'category'
            // },
            // {
            //     type: 'input',
            //     labelName: '备注',
            //     paramsName: 'remark'
            // },
            // {
            //     type: 'select',
            //     labelName: '选择',
            //     options: [
            //         {label: '0', value: 'select1'},
            //         {label: '1', value: 'select2'},
            //     ],
            // }
        ],
        pagination: {
            total: 0,
            current: 1,
            page_size: 10
        },
    }
    const modalAddColumns = [
        {
            title: '员工编码',
            dataIndex: 'empCode',
            key: 'empCode'
        },
        {
            title: '员工姓名',
            dataIndex: 'empName',
            key: 'empName'
        },
        {
            title: '助记符',
            dataIndex: 'empSimpleCode',
            key: 'empSimpleCode'
        },
        {
            title: '部门名称',
            dataIndex: 'deptName',
            key: 'deptName'
        },
        {
            title: '员工职务',
            dataIndex: 'empMobilePhone',
            key: 'empMobilePhone'
        },
        {
            title: '员工角色',
            dataIndex: 'empOfficePhone',
            key: 'empOfficePhone'
        },
        {
            title: '登录名',
            dataIndex: 'empEmail',
            key: 'empEmail'
        },
    ]
    const usedTabs = ['收藏标题', '收藏描述'];
    const usedTabsColumns = {
        contactColumns: {
            name: '联系人',
            show: true,
            columns: [
                {
                    title: '客户名',
                    dataIndex: 'clientName',
                    key: 'clientName'
                },
                {
                    title: '联系人姓名',
                    dataIndex: 'contactName',
                    key: 'contactName'
                },
                {
                    title: '联系人部门',
                    dataIndex: 'partnerDept',
                    key: 'partnerDept'
                },
                {
                    title: '职务',
                    dataIndex: 'duties',
                    key: 'duties'
                },
                {
                    title: '详细地址',
                    dataIndex: 'address',
                    key: 'address'
                },
                {
                    title: '电子邮件',
                    dataIndex: 'email',
                    key: 'email'
                },
                {
                    title: '办公电话',
                    dataIndex: 'officePhone',
                    key: 'officePhone'
                },
                {
                    title: '移动电话',
                    dataIndex: 'mobilephone',
                    key: 'mobilephone'
                }
            ],
            buttons: ['delete'],
            headerContent: ['add'],
            operateBtnFixed: true
        },
        staffColumns: {
            name: '员工',
            show: true,
            columns: [
                {title: '员工编码', dataIndex: 'staffCode', key: 'staffCode'},
                {title: '员工姓名', dataIndex: 'staffName', key: 'staffName'},
                {title: '助记码', dataIndex: 'mnemonicCode', key: 'mnemonicCode'},
                {title: '部门名称', dataIndex: 'departmentName', key: 'departmentName'},
                {title: '员工职务', dataIndex: 'position', key: 'position'},
                {title: '员工角色', dataIndex: 'role', key: 'role'},
                {title: '登录名', dataIndex: 'loginName', key: 'loginName'}
            ],
            buttons: ['delete'],
            headerContent: ['add'],
            operateBtnFixed: true
        }
    };
    const description = {
        title: '',
        description: ''
    };
    import qs from 'qs';
    import contact from '@/api/contact';
    import member from '@/api/member';
    import ModalAddTable from "../../components/ModalAddTable";
    import DescriptionItem from '../../components/DescriptionItem';
    import TabsSelectDrawer from "../../components/TabsSelectDrawer";

    export default {
        name: 'ClientContactInfoDetail',
        components: {TabsSelectDrawer, ModalAddTable, CategoryTabs, DescriptionItem},
        data() {
            return {
                visible: false,
                labelCol: {span: 3},
                wrapperCol: {span: 17},
                modalAddTableParams,
                modalAddColumns,
                modalAddData: [],
                type: '',
                modalSelectedArray: [],
                formModal: {},
                pane: null,
                description, //对象
                descriptionColumn: [
                    {name: 'title', span: 3},
                    {name: 'description', span: 3}
                ],
                rules: {
                    typeName: [{required: true, message: '请输入标题', trigger: 'blur'}]
                },
                // 对象按顺序排列的数组
                usedTabs: usedTabs,
                usedTabsColumns: usedTabsColumns,
                editButtons: [],
                // tabs选择参数
                tabsVisibleConfig: false,
                tabsChildrenDrawer: false,
                //checkboxgroup里需要默认选中的项
                checkedList: [],
                tabsCheckedList: [],
                originColumns: [],
                columns: [],
                loading: false,
                tabsSelected: {},
                checkedAAAAA: ['contactColumns'],
                // tabs选择参数结束
            };
        },
        mounted() {
            this.getShowList()
            this.getOriginColumns()
        },
        methods: {
            // 选中行
            customRow() {
                return {
                    on: {
                        click: (e) => {
                            const oldList = document.querySelectorAll('.checked-td-of-add-table');
                            if (oldList) {
                                for (let j = 0; j < oldList.length; j++) {
                                    oldList[j].classList.remove('checked-td-of-add-table');
                                }
                            }
                            const children = e.target.parentNode.children;
                            for (let i = 0; i < children.length; i++) {
                                children[i].classList.add('checked-td-of-add-table');
                            }
                        }
                    }
                };
            },
            editFav() {
                this.visible = true
            },
            handleOk() {
                const id = this.$route.query.code
                const data = {
                    clctTitle: this.formModal.typeName,
                    clctIntro: this.formModal.businessIntro
                };
                contact.putCnctCollection(id, data).then((res) => {
                    console.log(data);
                    if (res.code == 0) {
                        this.$message.success('修改成功！');
                        this.description.title = data.clctTitle;
                        this.description.description = data.clctIntro;
                        this.visible = false;
                    }
                })
            },
            handleCancel() {
                this.visible = false;
            },
            onCallback(key) {
                console.log('callback', key);
                this.modalAddTableParams.pagination.current = 1
                this.pane = key;
            },
            toAdd() {
                if (this.pane == '联系人') {
                    this.modalAddTableParams.modalTitle = '联系人选择'
                    this.modalAddTableParams.tableTitle = '联系人列表'
                    this.modalAddColumns = [
                        {
                            title: '客户名',
                            dataIndex: 'friendName',
                            key: 'friendName',
                            scopedSlots: {customRender: 'link'}
                        },
                        {
                            title: '联系人姓名',
                            dataIndex: 'contactName',
                            key: 'contactName',
                            scopedSlots: {customRender: 'link2'}
                        },
                        {
                            title: '联系人部门',
                            dataIndex: 'contactDept',
                            key: 'contactDept'
                        },
                        {
                            title: '职务',
                            dataIndex: 'contactPosition',
                            key: 'contactPosition'
                        },
                        {
                            title: '电子邮件',
                            dataIndex: 'contactEmail',
                            key: 'contactEmail'
                        },
                        {
                            title: '办公电话',
                            dataIndex: 'contactOfficePhone',
                            key: 'contactOfficePhone'
                        },
                        {
                            title: '移动电话',
                            dataIndex: 'contactMobilePhone',
                            key: 'contactMobilePhone'
                        },
                    ]
                    this.$refs.tableAdd.open();
                    this.openContactModal()
                } else if (this.pane === '员工') {
                    this.modalAddTableParams.modalTitle = '员工选择'
                    this.modalAddTableParams.tableTitle = '员工列表'
                    this.modalAddColumns = [
                        {
                            title: '员工编码',
                            dataIndex: 'empCode',
                            key: 'empCode',
                        },
                        {
                            title: '员工姓名',
                            dataIndex: 'empName',
                            key: 'empName',
                        },
                        {
                            title: '助记符',
                            dataIndex: 'empSimpleCode',
                            key: 'empSimpleCode'
                        },
                        {
                            title: '部门名称',
                            dataIndex: 'deptName',
                            key: 'deptName'
                        },
                        {
                            title: '员工职务',
                            dataIndex: 'empPosition',
                            key: 'empPosition'
                        },
                        {
                            title: '员工角色',
                            dataIndex: 'empPinNo',
                            key: 'empPinNo'
                        },
                        {
                            title: '登录名',
                            dataIndex: 'loginName',
                            key: 'loginName'
                        },
                    ]
                    this.$refs.tableAdd.open();
                    this.openMemberModal()
                }
            },
            openContactModal() {
                this.modalAddTableParams.loading = true
                let params = {page: this.modalAddTableParams.pagination.current}
                contact
                    .getContactList(params)
                    .then((res) => {
                        console.log(res);
                        if (res.code == 0) {
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows
                            this.modalAddData.map((item) => {
                                item.link = '/client_center/customer_info_detail?code=' + item.friendId
                                item.link2 = '/client_center/client_contact_info_detail?code=' + item.contactId
                            });
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            openMemberModal() {
                this.modalAddTableParams.loading = true
                let params = {page: this.modalAddTableParams.pagination.current}
                member
                    .getMemberList(params)
                    .then((res) => {
                        console.log(res);
                        if (res.code == 0) {
                            const pagination = {...this.modalAddTableParams.pagination};
                            pagination.total = res.data.count;
                            this.modalAddTableParams.pagination = pagination;
                            this.modalAddData = res.data.rows
                        }
                        this.modalAddTableParams.loading = false;
                    })
            },
            modalTablePaginationChange(val) {
                this.modalAddTableParams.pagination = val
                if (this.pane == '联系人') {
                    this.openContactModal()
                } else if (this.pane == '员工') {
                    this.openMemberModal()
                }
            },
            onSelectChange(val, flag) {
                // flag为true时往this.deptSelected里面添加值，为false时根据empId删除值
                if (this.pane == '联系人') {
                    if (flag) {
                        this.modalSelectedArray.push(val)
                    } else {
                        this.modalSelectedArray.splice(this.modalSelectedArray.findIndex(item => item.contactId === val.contactId), 1)
                    }
                } else if (this.pane == '员工') {
                    if (flag) {
                        this.modalSelectedArray.push(val)
                    } else {
                        this.modalSelectedArray.splice(this.modalSelectedArray.findIndex(item => item.empId === val.empId), 1)
                    }
                }
            },
            modalAddTableClose() {
                this.modalSelectedArray = []
            },
            tableSelectedHandle() {
                if (this.pane == '联系人') {
                    this.postAddContact()
                } else if (this.pane == '员工') {
                    this.postAddMember()
                }
            },
            postAddContact() {
                if (!this.modalSelectedArray.length) {
                    this.$message.error('请先选择联系人')
                    return -1
                }
                console.log('添加联系人')
            },
            postAddMember() {
                if (!this.modalSelectedArray.length) {
                    this.$message.error('请先选择员工')
                    return -1
                }
                console.log('添加员工')
            },
            childBtnClicked(type, text, record, index) {
                if (this.pane == '联系人') {
                    if (type == 'delete') {
                        this.deleteContact(record.contactId)
                    }
                } else if (this.pane == '员工') {
                    if (type == 'delete') {
                        this.deleteMember(record.empId)
                    }
                }
            },
            deleteContact() {
                console.log('删除联系人')
            },
            deleteMember() {
                console.log('删除员工')
            },
            tabsSelect() {
                this.tabsVisibleConfig = true;
            },
            getShowList(arr) {
                let obj = {}
                this.tabsCheckedList = arr || this.checkedAAAAA
                for (let i = 0; i < this.tabsCheckedList.length; i++) {
                    for (let key in this.usedTabsColumns) {
                        if (key == this.tabsCheckedList[i]) {
                            obj[key] = this.usedTabsColumns[key]
                        }
                    }
                }
                this.tabsSelected = obj
            },
            getOriginColumns() {
                this.originColumns = []
                let usedTabsColumns = this.usedTabsColumns
                for (let key in usedTabsColumns) {
                    this.originColumns.push({dataIndex: key, title: usedTabsColumns[key].name})
                }
                this.columns = []
                let k = 0
                for (let i = 0; i < this.tabsCheckedList.length; i++) {
                    for (let j = k; j < this.originColumns.length; j++)
                        if (this.originColumns[j].dataIndex.includes(this.tabsCheckedList[i])) {
                            this.columns.push(this.originColumns[j]);
                            [this.originColumns[k], this.originColumns[j]] = [this.originColumns[j], this.originColumns[k]]
                            k++
                            break
                            // this.originColumns.splice(j, 1)
                            // j--
                        }
                }
                console.log(this.originColumns)
            },
            hideList(){
                this.tabsVisibleConfig = false
            },
            postShow(val) {
                this.tabsChildrenDrawer = true
                let arr = []
                let obj = {}
                for (let i = 0; i < val.length; i++) {
                    for (let key in this.usedTabsColumns) {
                        if (key == val[i].dataIndex) {
                            obj[key] = this.usedTabsColumns[key]
                            arr.push(key)
                        }
                    }
                }
                this.tabsSelected = obj
                let that = this
                setTimeout(function(){
                    that.$message.success("修改成功")
                    that.getShowList(arr)
                    that.getOriginColumns(arr)
                    that.tabsVisibleConfig = false
                    that.tabsChildrenDrawer = false
                }, 500)
            },
        }
    };
</script>

<style scoped>
    .change-box {
        background: #fff;
        padding-left: 24px;
        padding-bottom: 24px;
    }
</style>