function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function returnServiceUrl() {
    const portNumber = window.location.port;
    const basePort = 3000;

    if (portNumber >= 80 && portNumber <= 100) {
        const servicePort = basePort + (portNumber - 80);
        return `http://localhost:${servicePort}`;
    }

    return `http://localhost:${basePort}`
}
function getBackendServerInfo(){
    const url = returnServiceUrl(); 
    const serverInfo = document.getElementById('server-info');
    if(url){
        serverInfo.innerText = serverInfo.innerText + " " + url;
      }
}