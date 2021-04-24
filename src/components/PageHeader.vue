<template>
    <div>
        <a-page-header v-if="title != '主页'" :key="title" class="page-header" :ghost="false" @back="() => $router.go(-1)" :title="title" :breadcrumb="{ props: { routes, itemRender } }" >
            <template slot="backIcon">

            </template>
        </a-page-header>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    computed: {
        title() {
            return this.$route.meta.title;
        },
        routes() {
            return this.$route.matched.map((item) => {
                return {
                    path: item.name ? item.path : '',
                    breadcrumbName: item.meta.title || ''
                };
            });
        }
    },
    methods: {
        itemRender({ route, params, routes, paths, h }) {
            if(routes[routes.length - 1].path === routes[routes.length - 2].path){
                routes.pop()
            }
            let vNode = h('span', {}, route.breadcrumbName);
            if (routes.indexOf(route) !== routes.length - 1) {
                vNode = h('router-link', { props: { to: route.path || '/' } }, route.breadcrumbName);
            }
            if (route.path === '') {
                vNode = h('router-link', { props: { to: '/' } }, [h('a-icon', { props: { type: 'home' } }, '')]);
            }
            return vNode;
        }
    }
};
</script>

<style></style>
