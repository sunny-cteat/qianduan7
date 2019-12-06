//level1 使用XHR发送GET请求
    let button1 = document.getElementById("submit1")
    button1.addEventListener('click', () => {
        ajaxGet()
    })
    function ajaxGet() {
        alert('请求已发送')
        const xhr1 = new XMLHttpRequest()
        xhr1.open("GET", "http://39.107.142.107:3000/mock/25/getText")
        xhr1.send(null)
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                if (xhr1.status === 200) {
                    console.log(xhr1.responseText)
                    console.log("请求成功")
                } else {
                    console.log('请求失败')
                }
            }
        }
    }



//leve1 使用XHR发送POST请求
    let button2= document.getElementById("submit2")
    button2.addEventListener('click', () => {
        ajaxPost()
    })
    let msg2 = {
        name:'string',
        id:'number',
    }
    function ajaxPost() {
        alert('请求已发送')
        const xhr2 = new XMLHttpRequest()
        xhr2.open("POST", "http://39.107.142.107:3000/mock/25/testPost")
        xhr2.setRequestHeader('Accept','application/json')
        xhr2.send(JSON.stringify(msg2))
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState === 4) {
                if (xhr2.status === 200) {
                    console.log(xhr2.responseText)
                } else {
                    console.log('请求失败')
                }
            }
        }
    }


//level2 fetch发送GET请求
    let button3 = document.getElementById("submit3")
    button3.addEventListener('click', () => {
        fetch('http://39.107.142.107:3000/mock/25/getText')
        .then(function (response){
            return response.json()
        })
        .then(function(myJson){
            console.log(myJson)
        })
    })


//level2 fetch发送POST请求
let msg4={
            name:'string',
            id:'number'
        }
        let button4 = document.getElementById("submit4")
        button4.addEventListener('click', () => {
            fetch('http://39.107.142.107:3000/mock/25/testPost',{
                method:'POST',
                body:JSON.stringify(msg4),
                headers:{
                    'content-type':'application/json'
                }
            })

            .then(function (response){
                return response.json()
            })
            .then(function(myJson){
                console.log(myJson)
            })
        })


//level3 使用promise+XHR封装ajax函数（post请求）
let msg5={
    name:'string',
    id:'number',
}
let button5=document.getElementById('submit5')
button5.addEventListener('click', ()=>{
    postJSON("http://39.107.142.107:3000/mock/25/testPost").then(function(json){
        console.log(json)
    },function(error){
        console.log('出错了', error)
    })
})
const postJSON = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText))
            }
        }
        const client = new XMLHttpRequest()
        client.open("POST", url)
        client.onreadystatechange = handler
        client.responseType = "json"
        client.setRequestHeader("Accept", "application/json")
        client.send(JSON.stringify(msg5))
    })
    return promise;
}