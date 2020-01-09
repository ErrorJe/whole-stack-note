module.exports = {
  text: "后端基础",
  items: [
    {
      text: "JAVA SE",
      link: "/back/java-se/"
    },
    {
      text: "Spring 全家桶",
      items: [
        { text: "Spring", link: "/back/spring/spring-base/" },
        { text: "SpringBoot", link: "/back/spring/spring-boot/" },
        { text: "SpringCloud", link: "/back/spring/spring-cloud/" }
      ]
    },
    {
      text: "包管理工具",
      items: [
        { text: "Maven", link: "/back/package/maven/" },
        { text: "Gradle", link: "/back/package/gradle/" }
      ]
    },
    {
      text: "数据库与缓存",
      items: [
        { text: "SQL 基础", link: "/back/database/sql/" },
        { text: "MySQL", link: "/back/database/mysql/" },
        { text: "Oracle", link: "/back/database/oracle/" },
        { text: "MongoDB", link: "/back/database/mongodb/" },
        { text: "Redis", link: "/back/database/redis/" },
        { text: "数据库高级优化", link: "/back/database/performance/" }
      ]
    }
  ]
};
