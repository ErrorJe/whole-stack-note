module.exports = {
  text: "后端进阶",
  items: [
    {
      text: "服务器部署",
      items: [
        { text: "Linux", link: "/back/server/linux/" },
        { text: "Max", link: "/back/server/mac/" },
        { text: "Nginx", link: "/back/server/nginx/" }
      ]
    },
    {
      text: "搜索引擎",
      items: [
        { text: "Elastic Search", link: "/back/search/elastic-search/" }
      ]
    },
    {
      text: "RPC 框架和中间件",
      items: [
        { text: "Dubbo", link: "/back/middleware/dubbo/" },
        { text: "RabbitMQ", link: "/back/middleware/rabbit-mq/" },
        { text: "RocketMQ", link: "/back/middleware/rockert-mq/" },
        { text: "ActiveMQ", link: "/back/middleware/active-mq/" },
        { text: "Kafka", link: "/back/middleware/kafka/" },
      ]
    },
    {
      text: "虚拟化容器",
      items: [
        { text: "Docker", link: "/back/container/docker/" },
        { text: "K8S", link: "/back/container/k8s/" }
      ]
    }
  ]
};
