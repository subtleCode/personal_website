// 与数据库交互，返回与blog相关的数据


// 根据作者与关键字返回数据
const getList = (author,keyword) => {
  return [
    {
        id: 1,
        title: "标题A",
        content: "内容A",
        author: "zhanshan",
        createTime: 111
    },
    {
        id: 2,
        title: "标题B",
        content: "内容B",
        author: "lisi",
        createTime: 111
    }
  ]
}

module.exports = {
  getList
}
