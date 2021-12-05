// HTML Canvas Effect
// adjustX and adjustY variables help placement of canvas
// CSS is also used for centering with a position: absolute, top: ..., left: ...
// Change the text on line 32 - ctx.filltext()
// change color in the Particle class Particle.draw()

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// canvas.width = 120
// canvas.height = 100
let particleArray = []

//shortcut method to postioning text
let adjustX = 27
let adjustY = 8

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})


ctx.fillStyle = 'white'
ctx.font = '17px Verdana'
ctx.fillText('{Web Dev}', 0, 35) //controls margin top
const textCoordinates = ctx.getImageData(0, 0, 120, 100)//controls text area size and location



class Particle {
    constructor(x, y){
        this.x = x
        this.y = y
        this.size = 2
        this.baseX = this.x
        this.baseY = this.y
        this.density = (Math.random() * 40) + 5
    }
    draw(){
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    update(){
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        let forceDirectionX = dx / distance
        let forceDirectionY = dy / distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density
        let directionY = forceDirectionY * force * this.density

        if(distance < mouse.radius){
            this.x -= directionX 
            this.y -= directionY
        }else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX
                this.x -= dx/10
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY
                this.y -= dy/10
            }
        }
    }
}
console.log(textCoordinates);
function init(){
    particleArray = []
    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) +3] > 128){
                let positionX = x + adjustX
                let positionY = y + adjustY
                particleArray.push(new Particle(positionX * 10, positionY * 10))//control size of particle spread
            }
        }
    }
}
init()
// console.log(particleArray);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw()
        particleArray[i].update()
    }
    connect()
    requestAnimationFrame(animate)
}
animate()

function connect(){
    let opacityValue = 1
    for(let a = 0; a < particleArray.length; a++){
        for(let b = a; b < particleArray.length; b++){
            let dx = particleArray[a].x - particleArray[b].x
            let dy = particleArray[a].y - particleArray[b].y
            let distance = Math.sqrt(dx * dx + dy * dy)

            if(distance < 22){  
                opacityValue = 1 -(distance/22) // keep number same as line 105
                ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')'              
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(particleArray[a].x, particleArray[a].y)
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke()
            }
        }
    }
}