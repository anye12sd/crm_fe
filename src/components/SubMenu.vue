<template functional>
    <a-sub-menu :key="data.attrs.menuInfo.path" v-if="!data.attrs.menuInfo.meta.hidden">
        <template slot="title">
            <a-icon v-if="data.attrs.menuInfo.meta.icon" :type="data.attrs.menuInfo.meta.icon" />
            <span>{{ data.attrs.menuInfo.meta.title }}</span>
        </template>
        <template v-for="item in data.attrs.menuInfo.children">
<!--            <a-menu-item v-if="!item.children || item.meta.hiddenChildren" :key="item.path">-->
            <template v-if="!item.meta.hidden">
                <a-menu-item v-if="item.meta.hiddenChildren" :key="item.path">
                    <router-link :to="{ path: item.path }">
                        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
                        <span>{{ item.meta.title }}</span>
                    </router-link>
                </a-menu-item>
                <sub-menu v-else :key="item.path" :menuInfo="item" />
            </template>
        </template>
    </a-sub-menu>
</template>
