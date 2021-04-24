<template>
    <a-layout class="main-layout">
        <table-list
                :columns="columns"
                :loading="tableLoading"
                :table-data="tableData"
                :headerContent="headerContent"
                :buttons="buttons"
                :pagination="pagination"
                @on-add="toAdd"
                @on-search="toSearch"
                @on-click-btn="onClickBtn"
                @on-statistics="showStatistics"
                @on-change-table="handleTableChange"
        ></table-list>
        <a-modal
                :visible="visible"
                :title="modalTitle"
                @ok="handleOk"
                @cancel="handleCancel"
                :ok-text="okText"
                cancel-text="取消"
        >
            <a-form-model
                    ref="clientCateForm"
                    :labelAlign="'right'"
                    :model="formData"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
            >
                <a-form-model-item label="标题" prop="clctTitle">
                    <a-input v-model="formData.clctTitle" placeholder="标题"/>
                </a-form-model-item>
                <a-form-model-item label="描述">
                    <a-input v-model="formData.clctIntro" placeholder="描述"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal v-model="statisticsVisible" title="统计数据" on-ok="handleOk">
            <template slot="footer">
                <a-button type="primary" @click="hideStatistics">
                    确定
                </a-button>
            </template>
            <p>共有{{this.pagination.total}}条数据</p>
        </a-modal>
    </a-layout>
</template>

<script>
    const tableData = [
        {
            clctTitle: '收藏标题',
            clctIntro: '收藏描述',
            link: '/client_center/client_fav_detail'
        }
    ];
    const columns = [
        {
            title: '标题',
            dataIndex: 'clctTitle',
            key: 'clctTitle',
            scopedSlots: {customRender: 'link'}
        },
        {
            title: '描述',
            dataIndex: 'clctIntro',
            key: 'clctIntro'
        }
    ];
    import qs from 'qs';
    import api from '@/api/friend';
    import TableList from '@/components/TableList';
    import Favorite from '@/components/details/Favorite';

    export default {
        name: 'ClienFav',
        components: {TableList},
        data() {
            return {
                tableLoading: false,
                labelCol: {span: 3},
                wrapperCol: {span: 15},
                tableData,
                columns,
                statisticsVisible: false,
                buttons: ['view', 'delete', 'edit'],
                headerContent: ['add', 'excel', 'statistics', 'search'],
                modalTitle: '',
                visible: false,
                formData: {},
                type: 'add',
                okText: '',
                clctId: "",
                rules: {
                    clctTitle: [{required: true, message: '请输入标题', trigger: 'blur'}]
                },
                pagination: {
                    total: 0,
                    current: 1,
                    page_size: 10
                },
            };
        },
        mounted() {
            this.fetch();
        },
        methods: {
            // 页码切换
            handleTableChange(pagination) {
                this.pagination.current = pagination.current;
                this.pagination.page_size = pagination.pageSize;
                this.fetch();
            },
            fetch() {
                let params = {page: this.pagination.current}
                this.tableLoading = true;
                api
                    .getFrndCollection(params)
                    .then((res) => {
                        console.log(res);
                        if(res.code == 0){
                            const pagination = {...this.pagination};
                            pagination.total = res.data.count;
                            this.pagination = pagination;
                            this.tableData = res.data.rows;
                        }
                        this.tableLoading = false;
                    })
            },
            toAdd() {
                this.type = 'add';
                this.okText = '确认';
                this.visible = true;
                this.modalTitle = '添加收藏夹';
            },
            toSearch() {
                this.type = 'edit';
                this.okText = '查询';
                this.visible = true;
                this.modalTitle = '查询收藏夹';
            },
            handleOk() {
                console.log(this.type)
                this.$refs.clientCateForm.validate((valid) => {
                    if (valid) {
                        if (this.type === 'add') {
                            this.addFav()
                        } else if (this.type === 'edit') {
                            this.putFav()
                        }
                        this.visible = false;
                    }
                });
            },
            addFav(){
                const data = {
                    clctTitle: this.formData.clctTitle,
                    clctIntro: this.formData.clctIntro
                };
                api
                    .postFrndCollection(data)
                    .then((res) => {
                        console.log(res);
                        if (res.code == 0) {
                            this.$message.success('添加成功')
                            this.formData.clctTitle = ''
                            this.formData.clctIntro = ''
                        }
                        this.fetch();
                    })
            },
            putFav(){
                const data = {
                    clctTitle: this.formData.clctTitle,
                    clctIntro: this.formData.clctIntro
                };
                console.log(345666)
                api
                    .putFrndCollection(this.clctId, data)
                    .then((res) => {
                        console.log(res);
                        if (res.code == 0) {
                            this.$message.success('修改成功')
                            this.formData.clctTitle = ''
                            this.formData.clctIntro = ''
                        }
                        this.fetch();
                    })
            },
            handleCancel() {
                this.visible = false;
                this.formData = {};
                this.type = '';
                this.modalTitle = '';
                this.$refs.clientCateForm.resetFields();
            },
            onClickBtn(type, text, record, index) {
                if (type === 'delete') {
                    this.deleteList(record.clctId)
                } else if (type === 'view') {
                    this.$router.push({path: '/client_center/client_fav_detail', query: {record: record}});
                } else if(type === 'edit') {
                    this.type = 'edit'
                    this.visible = true;
                    this.modalTitle = '修改收藏夹';
                    this.formData.clctTitle = record.clctTitle
                    this.formData.clctIntro = record.clctIntro
                    this.clctId = record.clctId
                }
            },
            deleteList(clctId){
                api.delFrndCollection(clctId).then((res) => {
                    if (res.code == 0) {
                        this.$message.success('删除成功！');
                        this.fetch();
                    }
                })
            },
            showStatistics(){
                this.statisticsVisible = true
            },
            hideStatistics() {
                this.statisticsVisible = false
            },
        }
    };
</script>

<style scoped></style>