var element = document.querySelector('#element');
var activator = document.querySelector('#activator');

function hideQR(){
    var qr = document.querySelector('#QR');
    qr.remove();
    element.style.width = '50px';
    element.style.height = '50px';
    element.style.borderRadius = '50%';
}

activator.addEventListener('click', () => {
    var url = new Url();
    var href = url.href
    var qrCode = new QRCodeApi(href);
    // qrCode.getQRCode();
    img = qrCode.getImage()
    img.then((response)=>{
        var image = new Image(response);
        image.createInto(element);
    })
})

class Url {
    constructor() {
        this.url = window.location.href
    }
    get href() {
        return this.url;
    }
}

class QRCodeApi {
    constructor(href,side=150) {
        this.href = href;
        this.side = side;
        this.image = null;
    }
    async getQRCode() {
        var response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${this.side}x${this.side}&data=${this.href}`)
        let blob = await response.blob();
        let img = document.createElement('img');
        img.style = 'position:fixed;bottom:10px;left:10px;';
        img.setAttribute('onclick','hideQR()');
        img.id ='QR';
        img.src = URL.createObjectURL(blob);
        
        // вывод
        element.append(img);
        element.style.width = '150px';
        element.style.height = '150px';
        element.style.borderRadius = 0;
    }
    async getImage(){
        var response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=${this.side}x${this.side}&data=${this.href}`)
        let blob = await response.blob();
        this.img = document.createElement('img');
        this.img.style = 'position:fixed;bottom:10px;left:10px;';
        this.img.setAttribute('onclick','hideQR()');
        this.img.id ='QR';
        this.img.src = URL.createObjectURL(blob);
        return this.img;
    }
}

class Image{
    constructor(img){
        this.img = img;
    }
    createInto(){
        element.append(this.img);
        element.style.width = '150px';
        element.style.height = '150px';
        element.style.borderRadius = 0;
    }
}

