const base = {
    get() {
        return {
            url : "http://localhost:8080/springboot43q56/",
            name: "springboot43q56",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot43q56/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "师生健康信息管理系统"
        } 
    }
}
export default base
