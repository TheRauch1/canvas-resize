var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')
var rectangleArray = []
var colorArray  = [
    "#716DF9",
    "#4931A8",
    "#807EFB",
    "#75E2E4",
    "#48CDD2"
]
var maxSize = 70
var maxRectangles = 1000
var maxRGB = 255

var spawnedRectancles = 0

while (spawnedRectancles < maxRectangles) {
    var u = Math.random() * 20 + 10
    var i = Math.random() * innerWidth
    var o = Math.random() * innerHeight
    var velocity = (Math.random() * 5) - 2.5
    //var color = colorArray[Math.floor(Math.random() * colorArray.length)]
    var colorR = 50
    var colorB = 50
    var colorG = 50

    if (i + u > innerWidth || o + u > innerHeight) {
        console.log("Did not spawn")
    }
    else {
        rectangleArray.push(new Rectangle(u, i, o, velocity, colorR, colorG, colorB))
        spawnedRectancles++;
    }

}

var mouse = {
    x: undefined,
    y: undefined

}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x
    mouse.y = event.y
})


function Rectangle(a, startx, starty, velocity, colorR, colorG, colorB) {

    this.a = a
    this.starta = a
    this.startx = startx
    this.starty = starty
    this.dx = velocity
    this.dy = velocity
    this.colorR = colorR
    this.colorstartR = colorG
    this.colorG = colorG
    this.colorB = colorB

    this.draw = function () {
        c.fillRect(this.startx, this.starty, this.a, this.a)
    }

    this.update = function () {
        if (this.startx + this.a > innerWidth || this.startx < 0) {
            this.dx = -this.dx
        }

        if (this.starty + this.a > innerHeight || this.starty < 0) {
            this.dy = -this.dy
        }

        this.startx += this.dx
        this.starty += this.dy

        //Interactivity
        if (this.startx - mouse.x < 50 && this.startx + this.a - mouse.x > -50 && this.starty - mouse.y < 50 && this.starty + this.a - mouse.y > -50) {
            if (this.a < maxSize) {
                this.a += 9
            }
            if (this.colorR < maxRGB) {
                this.colorR += 30
            }
            console.log("asfe")
        } else if (this.a > this.starta) {
            this.a -= 1
        } else if (this.colorR > this.colorstartR) {
            this.colorR -= 10
        }

        this.color = "rgb(" + this.colorR + "," + this.colorG + "," + this.colorB + ")"
        c.fillStyle = this.color

        this.draw()
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (var j = 0; j < rectangleArray.length; j++) {
        rectangleArray[j].update();

    }
}

animate()


/* window.addEventListener('mousemove', function(event) {
    rectwidth = 100
    rectheight = 100
    var rect = new Rectangle(rectwidth, rectheight)
    rect.update()
}) */