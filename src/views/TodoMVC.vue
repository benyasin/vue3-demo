<template>
    <section class="box">
        <h1>Vue3 TodoMVC</h1>

        <header class="header">
            <input class="new-todo"
                   autofocus
                   autocomplete="off"
                   placeholder="What needs to be done?"
                   v-model="newTodoTitle"
                   @keyup.enter="addTodo"
            />
        </header>


        <ul class="todo-list" v-show="todoList.length">
            <li v-for="todo in filteredTodoList" class="todo" :key="todo.id"
                :class="{ completed: todo.completed,  editing: todo.id === editedTodoId }">

                <div class="todo-view">
                    <input class="toggle" type="checkbox" v-model="todo.completed"/>
                    <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                    <span class="destroy" @click="removeTodo(todo.id)"></span>
                </div>

                <input
                        class="edit"
                        type="text"
                        v-model="todo.title"
                        v-todo-focus="todo.id === editedTodoId"
                        @blur="doneEdit(todo)"
                        @keyup.enter="doneEdit(todo)"
                        @keyup.escape="cancelEdit(todo)"
                />
            </li>
        </ul>

        <footer class="footer" v-show="todoList.length">
            <div class="todo-count">
                <input class="toggle-all" type="checkbox" v-model="allDone"/>
                <span><strong>{{ remaining }}</strong> items left</span>
            </div>

            <ul class="filters">
                <li><a href="#/todomvc/?q=all" :class="{ selected: visibility === 'all' }">All</a></li>
                <li><a href="#/todomvc/?q=active" :class="{ selected: visibility === 'active' }">Active</a></li>
                <li><a href="#/todomvc/?q=completed"
                       :class="{ selected: visibility === 'completed' }">Completed</a></li>
            </ul>

            <span class="clear-completed" @click="removeCompleted">
                Clear completed
            </span>
        </footer>

    </section>
</template>

<script lang="ts">
    import {
        defineComponent,
        ref,
        computed,
        onMounted,
        onUnmounted,
    } from "vue";
    import {useStore} from "vuex";

    function getQueryString(key: string) {
        const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
        const _url = window.location.hash.replace(/#\/todomvc\/\??/, "");
        const r = _url.match(reg);
        if (r != null) return r[2];
        return null;
    }

    export default defineComponent({
        name: "TodoMVC",
        setup(props: any) {
            const store = useStore();
            const todoList = computed(
                () => store.state.todoList
            );
            const id = computed(
                () => {
                    const {length} = store.state.todoList;
                    if (length > 0) {
                        return store.state.todoList[length - 1]?.id + 1;
                    }
                    return 0;
                }
            );
            let visibility = ref('all')
            let editedTodoId = ref(-1)
            let beforeEditTitleCache = ref('')
            const newTodoTitle = ref('')
            const newTodoCompleted = ref(false)
            const allDone = computed({
                get: () => store.getters.allDone,
                set: function (allCompleted: boolean) {
                    store.commit('markAsAllDone', allCompleted);
                },
            })
            const remaining = computed(() => store.getters.remaining)
            const filteredTodoList = computed(() => store.getters.filteredTodoList[visibility.value]())

            function addTodo() {
                if (!newTodoTitle.value) {
                    return
                }
                store.commit('createTodo', {
                    id: id.value,
                    title: newTodoTitle.value,
                    completed: newTodoCompleted.value
                });
                newTodoTitle.value = ''
            }

            function removeTodo(id: number) {
                store.commit('removeTodo', id);
            }

            function removeCompleted() {
                store.commit('removeCompleted');
            }

            function editTodo(todo: any) {
                beforeEditTitleCache = todo.title;
                editedTodoId.value = todo.id

            }

            function doneEdit(todo: any) {
                editedTodoId.value = -1;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    removeTodo(todo);
                }
            }

            function cancelEdit(todo: any) {
                editedTodoId.value = todo.id;
                todo.title = beforeEditTitleCache;
            }

            function onHashChange() {
                visibility.value = getQueryString("q") || "all";
            }

            onMounted(() => {
                window.addEventListener("hashchange", onHashChange);
                onHashChange();
            });

            onUnmounted(() => {
                window.removeEventListener("hashchange", onHashChange);
            });

            return {
                newTodoTitle,
                todoList,
                filteredTodoList,
                allDone,
                visibility,
                remaining,
                editedTodoId,
                addTodo,
                removeTodo,
                removeCompleted,
                editTodo,
                doneEdit,
                cancelEdit
            }
        },
        directives: {
            "todo-focus": (el, {value}) => {
                if (value) {
                    el.focus();
                }
            },
        },
    });
</script>

<style lang="scss">
    .box {
        background: #fff;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);

        input::-webkit-input-placeholder,
        input::-moz-placeholder,
        input:-ms-input-placeholder {
            font-style: italic;
            font-weight: 300;
            color: rgba(0, 0, 0, 0.4);
        }

        input:focus {
            outline: 0;
        }

        h1 {
            padding: 20px;
            color: #b83f45;
        }

        .header {
            .new-todo {
                font-style: italic;
                width: 100%;
                font-size: 22px;
                padding: 16px 16px 16px 60px;
                border: none;
                box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
            }
        }

        .todo-list {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                position: relative;
                font-size: 22px;
                border-bottom: 1px solid #ededed;

                .todo-view {
                    text-align: left;

                    label {
                        word-break: break-all;
                        padding: 15px 15px 15px 60px;
                        display: block;
                        color: #4d4d4d;
                    }

                    .toggle {
                        text-align: center;
                        width: 40px;
                        height: auto;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        border: none; /* Mobile Safari */
                        -webkit-appearance: none;
                        appearance: none;
                    }

                    .toggle + label {
                        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
                        background-repeat: no-repeat;
                        background-position: center left;
                    }

                    .toggle:checked + label {
                        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
                    }
                }

                &:last-child {
                    border-bottom: none;
                }

                &.editing {
                    border-bottom: none;
                    padding: 0;

                    .edit {
                        display: block;
                        width: calc(100% - 43px);
                        padding: 12px 16px;
                        margin: 0 0 0 43px;
                        font-size: 24px;
                        line-height: 1.4em;
                        border: 1px solid #999;
                        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
                        box-sizing: border-box;
                    }

                    .todo-view {
                        display: none;
                    }

                    &:last-child {
                        margin-bottom: -1px;
                    }
                }

                .edit {
                    display: none;
                }

                .destroy {
                    display: none;
                    position: absolute;
                    top: 0;
                    right: 10px;
                    bottom: 0;
                    width: 40px;
                    height: 40px;
                    margin: auto 0;
                    font-size: 30px;
                    color: #cc9a9a;
                    margin-bottom: 11px;
                    transition: color 0.2s ease-out;

                    &:hover {
                        color: #af5b5e;
                    }

                    &:after {
                        content: "×";
                    }
                }

                &:hover .destroy {
                    display: block;
                }

                &.completed label {
                    color: #cdcdcd;
                    text-decoration: line-through;
                }

            }
        }

        .footer {
            height: 50px;
            border-top: 1px solid #e6e6e6;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
            0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
            0 17px 2px -6px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-right: 50px;

            .todo-count {
                height: 100%;
                text-align: left;
                position: relative;
                display: flex;
                align-items: center;

                .toggle-all {
                    text-align: center;
                    width: 40px;
                    height: auto;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                    border: none; /* Mobile Safari */
                    -webkit-appearance: none;
                    appearance: none;

                    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: center left;

                    &:checked {
                        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
                    }
                }

                span {
                    margin-left: 50px;

                    strong {
                        font-weight: 300;
                    }
                }
            }

            .filters {
                margin: 0;
                padding: 0;
                list-style: none;

                li {
                    display: inline;

                    a {
                        color: inherit;
                        margin: 3px;
                        padding: 3px 7px;
                        text-decoration: none;
                        border: 1px solid transparent;
                        border-radius: 3px;

                        &:hover {
                            border-color: rgba(175, 47, 47, 0.1);
                        }

                        &.selected {
                            border-color: rgba(175, 47, 47, 0.2);
                        }
                    }
                }
            }

            .clear-completed {
                cursor: pointer;
            }
        }
    }
</style>
