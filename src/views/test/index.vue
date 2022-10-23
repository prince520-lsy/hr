<template>
    <div>
        <h1 class="title">test</h1>
        <div class="content">content</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$border: 1px solid red;

.title {
    border: $border;

}

.content {
    border: $border;

    &::after {
        content: '-';

    }

    &::before {
        content: '+';
    }
}
</style>