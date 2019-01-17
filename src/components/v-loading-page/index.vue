<template>
        <Nodata class="show-page-loading" :imgurl="require('@src/assets/img/sousuo.png')"></Nodata>
</template>

<script>
import Nodata from "@src/components/v-no-data"
export default {
        components: { Nodata }
}
</script>

<style scoped>
@keyframes flash {
        from,
        50%,
        to {
                opacity: 1;
        }

        25%,
        75% {
                opacity: 0.5;
        }
}

.show-page-loading {
        transform: scale(1);
        margin-top: 50%;
        animation: flash 1.5s infinite;
}
</style>
