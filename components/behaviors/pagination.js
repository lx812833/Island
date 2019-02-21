const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneRoust: false, //有搜索结果
        loading: false
    },
    methods: {
        setMoreData(dataArray) {
            // const tempArray = this.data.dataArray.concat(res.books) //新获取的数组和原有的合并在一起
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },
        getCurrentStart() {
            return this.data.dataArray.length
        },
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneRoust: true // 没有搜索结果
                })
            }
        },
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
        },
        //按X取消输入框里的值
        initialSize() {
            this.setData({
                dataArray: [],
                noneRoust: false,
                loading: false
            })
            // 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的
            // 还会造成数据不一致。而这里 wxml页面没有total不需要，则无需修改页面的状态的
            this.data.total = null
        },
        isLocked() {
            return this.data.loading ? true : false
        },
        locked() {
            this.setData({
                loading: true
            })
        },
        unlocked() {
            this.setData({
                loading: false
            })
        }
    }
})
export {
    paginationBev
}