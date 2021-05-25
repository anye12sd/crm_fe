<template>
    <a-result title="正在身份验证" subTitle="验证中，请稍候...">
        <template #icon>
            <a-icon type="hourglass" theme="twoTone" />
        </template>
    </a-result>
</template>

<script>
import api from '@/api/user';
export default {
    mounted() {
        this.postToken();
    },
    methods: {
        postToken() {
            api.postAuth().then((res) => {
                const { redirectUrl } = this.$route.query;
                const redirect = decodeURIComponent(redirectUrl || '/');
                this.$router.push({ path: redirect, replace: true });
            });
        }
    }
};
</script>

<style></style>
