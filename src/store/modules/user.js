const user = {
    state: {
        roles: null
    },

    mutations: {
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 获取用户权限
        async getInfo({ commit }) {
            // 模拟后端返回的权限数据
            const roles = {
                permissions: [
                    {
                        permissionId: 'bizDept',
                        permissionName: '业务机构',
                        actionList: ['add']
                    },
                    {
                        permissionId: 'Department',
                        permissionName: '部门管理',
                        actionList: ['add']
                    }
                ]
            };
            roles.permissionList = roles.permissions.map((permission) => {
                return permission.permissionId;
            });
            commit('SET_ROLES', roles);
            return roles;
        }
    }
};

export default user;
