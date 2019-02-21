/**
 *  behaviors 是用于组件间代码共享的特性，类似于一些编程语言中的“mixins”或“traits”。
    每个 behavior 可以包含一组属性、数据、生命周期函数和方法，
    组件引用它时，它的属性、数据和方法会被合并到组件中，生命周期函数也会在对应时机被调用。
    每个组件可以引用多个 behavior 。 behavior 也可以引用其他 behavior 。
*/
let classicBeh = Behavior({
    properties: { //外部属性
        img: String,
        content: String,
        hidden: Boolean
    },
    data: {

    },
    methods: {

    }
})

export { classicBeh }