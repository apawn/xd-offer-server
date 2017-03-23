db.company.insert({
    name: "新华三集团",
    desc: "新华三集团（简称新华三）是全球领先的新IT解决方案领导者，致力于新IT解决方案和产品的研发、生产、咨询、销售及服务，拥有H3C®品牌的全系列服务器、存储、网络、安全、超融合系统和IT管理系统等产品，能够提供大互联、大安全、云计算、大数据和IT咨询服务在内的一站式、全方位IT解决方案。同时，新华三也是HPE®品牌的服务器、存储和技术服务的中国独家提供商。",
    password: "hello", email: "test@qq.com", phone: "123", location: ["北京", "上海", "杭州"], number: 20,
    position: [{
        name: "软件工程师",
        job: "1、独立完成小型项目的系统分析、 设计，并主导完成详细设计和编码的任务，确保项目的进度和质量\r\n 2、完成Code Review的任务，确保相关代码的有效性和正确性，并能够通过Code Review提供相关性能以及安全的建议；\r\n3、能够有效地对新人或普通开发工程师进行辅导，帮助其快速成长；",
        salary: "8000-1000 元"
    }, {
        name: "软件工程师",
        job: "1、独立完成小型项目的系统分析、 设计，并主导完成详细设计和编码的任务，确保项目的进度和质量\r\n 2、完成Code Review的任务，确保相关代码的有效性和正确性，并能够通过Code Review提供相关性能以及安全的建议；\r\n3、能够有效地对新人或普通开发工程师进行辅导，帮助其快速成长；",
        salary: "8000-1000 元"
    }, {
        name: "软件工程师",
        job: "1、独立完成小型项目的系统分析、 设计，并主导完成详细设计和编码的任务，确保项目的进度和质量\r\n 2、完成Code Review的任务，确保相关代码的有效性和正确性，并能够通过Code Review提供相关性能以及安全的建议；\r\n3、能够有效地对新人或普通开发工程师进行辅导，帮助其快速成长；",
        salary: "8000-1000 元"
    }],
    invatation: [{
        email: "999@qq.com",
        position: "软件工程师",
        time: new Date()
    }, {
        email: "999@qq.com",
        position: "软件工程师",
        time: new Date()
    }, {
        email: "999@qq.com",
        position: "软件工程师",
        time: new Date()
    }],
    received: [{
        email: "999@qq.com",
        position: "软件工程师",
        time: new Date()
    }, {
        email: "999@qq.com",
        position: "软件工程师",
        time: new Date()
    }, {
        email: "999@qq.com",
        position: "软件工程师",
        time: new Date()
    }],
    message: [{
        content: "",
        time: new Date(),
        hasread: true
    }, {
        content: "",
        time: new Date(),
        hasread: false
    }, {
        content: "",
        time: new Date(),
        hasread: false
    }],
    comments: [{
        content: "",
        time: new Date(),
        author: "88@qq.com"
    }, {
        content: "",
        time: new Date(),
        author: "88@qq.com"
    }, {
        content: "",
        time: new Date(),
        author: "88@qq.com"
    }]
})









var Company = new mongoose.Schema({
    name: String,        // 公司名
    desc: String,
    password: String,    // 密码
    path: String,         // 招聘简章路径
    email: String,       // 邮箱
    phone: String,      // 电话
    location: [String],  // 工作地点
    number: Number,      // 招聘人数
    position: [{ name: String, job: String, salary: String }],  // 岗位,职责&要求  薪水
    invitation: [{ student: String, position: String, time: Date }],    //  发出的邀请
    received: [{ student: String, position: String, time: Date }],     // 接受到的邀请
    message: [{ Content: String, time: Date, hasread: Boolean }],   //  content ,date ,has read
    comments: [{ content: String, time: Date, author: String }]
})
