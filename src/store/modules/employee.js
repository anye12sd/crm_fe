// import orgApi from '@/api/organization';
// import dictApi from '@/api/dataDict';
import { constantFormMap, lastFormMap } from '@/config/employee.config';

export default {
    state: {
        depts: null,
        usrFields: null
    },
    getters: {
        usrFields: (state) => state.usrFields
    },
    mutations: {
        SET_DEPTS: (state, payload) => {
            state.depts = payload;
        },
        CLEAR_DEPTS: (state) => {
            state.depts = null;
        },
        SET_USR_FIELDS: (state, payload) => {
            state.usrFields = payload;
        }
    },
    actions: {
        // 查询全部部门
        getDepts: async ({ state, commit }) => {
            if (!state.depts) {
                // const depts = await orgApi.getDepartments({ all: 1 });
                // commit('SET_DEPTS', depts.data);
            }
            return state.depts;
        },

        // 查询自定义字段
        getUsrFields: async ({ state, commit }) => {
            if (!state.usrFields) {
                // const usrFields = await dictApi.getUserDicts({ parentName: 'JH_EMPLOYEE' });
                // commit('SET_USR_FIELDS', usrFields.data);
            }
            return state.usrFields;
        },

        // 生成表单对象
        getFormObject: async ({ dispatch }) => {
            const usrFields = await dispatch('getUsrFields');
            const depts = await dispatch('getDepts');
            const formItems = [...constantFormMap, ...usrFields, ...lastFormMap];
            const form = {};
            const rules = {};
            formItems.forEach((item, index) => {
                const key = item.location;
                if (key === 'deptId') {
                    formItems[index].enums = depts.rows.map((row) => {
                        const val = {
                            key: row.deptId,
                            value: row.deptName
                        };
                        return val;
                    });
                }
                form[key] = item.defaultValue !== undefined ? item.defaultValue : null;
                if (item.must) {
                    rules[key] = [{ required: true, message: `${item.dataType === 'int' ? '请选择' : '请输入'}${item.propertyName}`, trigger: 'blur' }];
                }
            });
            return {
                formItems,
                form,
                rules
            };
        }
    }
};
