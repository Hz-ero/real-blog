<script setup lang='ts'>

const props = defineProps<{
    isShow: boolean,
    action: string,
    size: number,
    comp: any,
    color: string
}>()


const emit = defineEmits<{
    (event: 'click-action', action: string): void
}>()
</script>

<template>
    <div class="borderd m-1.5" cursor-pointer v-show="isShow" p-6px shadow border-gray-100 flex justify-center
        items-center @click="emit('click-action', props.action)">
        <n-icon :color="color" :size="size" :component="comp" :depth="2" />
    </div>
</template>

<style scoped>
.borderd {
    border-radius: 50%;
}
</style>