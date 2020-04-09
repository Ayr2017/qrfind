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
    img = qrCode.getImage()
    img.then((response)=>{
        var image = new Image(response, element);
        image.createInto(element);
    })
})

// Получение URL страницы
class Url {
    constructor() {
        this.url = window.location.href
    }
    get href() {
        return this.url;
    }
}

// получение изображения из API
class QRCodeApi {
    constructor(href,side=150) {
        this.href = href;
        this.side = side;
        this.image = null;
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


// вывод изображения на нужном элементе
class Image{
    constructor(img, element){
        this.img = img;
        this.element = element;
    }
    createInto(){
        this.element.append(this.img);
        this.element.style.width = '150px';
        this.element.style.height = '150px';
        this.element.style.borderRadius = 0;
    }
}

