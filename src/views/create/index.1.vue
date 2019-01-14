<template>
        <div>
                <!-- <Header class="header-fixed">编辑帖子</Header> -->
                <div class="bg"></div>
                <section class="title-wrapper border-bm">
                        <div class="item placeholder">标题<span>（不超过30个字）</span></div>
                        <div class="item input-hook" contenteditable="true" style="display: none;"></div>
                </section>
                <div id="editorContainer">
                        <!-- 编辑器容器 -->
                </div>
        </div>
</template>

<script>
import Header from "@src/components/v-header"
import { ZxEditor } from 'zx-editor'
export default {
        components: { Header },
        data() {
                return {
                        zxEditor: null
                }
        },
        mounted() {
                this.initZxEditor();
        },
        methods: {
                initZxEditor() {
                        this.zxEditor = new ZxEditor('#editorContainer', {
                                fixed: true,
                                top: 104,
                                padding: 13
                        })
                }
        }
}
</script>

<style>
#editorContainer {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
}

/** *******************************
 * title-wrapper
 * ********************************
 */
.title-wrapper {
        margin-top: 5px;
        padding: 15px 0;
}

.title-wrapper .item {
        margin: 0 13px;
}

.title-wrapper .placeholder {
        line-height: 24px;
        font-size: 20px;
        color: #ccc;
}

.title-wrapper .placeholder span {
        font-size: 16px;
}

.title-wrapper .input-hook {
        line-height: 26px;
        font-size: 20px;
        caret-color: #00c1b7;
}
</style>
