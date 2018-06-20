<template>
  <div id="particle" class="particle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Particle',
    mounted () {
      let maxParticles = 50
      let particles = []
      let frequency = 1000
      let initNum = maxParticles
      let maxTime = frequency * maxParticles
      let timeToRecreate = false

      // Enable repopolate
      setTimeout(function () {
        timeToRecreate = true
      }, maxTime)

      // Popolate particles
      popolate(maxParticles)

      let particle = this.$('#particle')
      let tela = document.createElement('canvas')
      tela.width = particle.width()
      tela.height = particle.height()
      particle.append(tela)

      let canvas = tela.getContext('2d')

      class Particle {
        constructor (canvas, options) {
//          let colors = ['#feea00', '#a9df85', '#5dc0ad', '#ff9a00', '#fa3f20']
          let colors = ['#0798ec', '#1bcee6', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#ba5be9']
          let types = ['full', 'fill', 'empty']
          this.random = Math.random()
          this.canvas = canvas
          this.progress = 0

          this.x = (particle.width() / 2) + (Math.random() * 300 - Math.random() * 300)
          this.y = (particle.height() / 2) + (Math.random() * 200 - Math.random() * 200)
          this.w = particle.width()
          this.h = particle.height()
          this.radius = 3 + (8 * this.random) // 控制小球的大小
          this.type = types[this.randomIntFromInterval(0, types.length - 1)]
          this.color = colors[this.randomIntFromInterval(0, colors.length - 1)]
          this.a = 0
          this.s = (this.radius + (Math.random() * 1)) / 10
        }

        getCoordinates () {
          return {
            x: this.x,
            y: this.y
          }
        }

        randomIntFromInterval (min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min)
        }

        render () {
          // Create arc
          let lineWidth = 0.2 + (2.8 * this.random)
          let color = this.color
          switch (this.type) {
            case 'full':
              this.createArcFill(this.radius, color)
              this.createArcEmpty(this.radius + lineWidth, lineWidth / 2, color)
              break
            case 'fill':
              this.createArcFill(this.radius, color)
              break
            case 'empty':
              this.createArcEmpty(this.radius, lineWidth, color)
              break
          }
        }

        createArcFill (radius, color) {
          this.canvas.beginPath()
          this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI)
          this.canvas.fillStyle = color
          this.canvas.fill()
          this.canvas.closePath()
        }

        createArcEmpty (radius, lineWidth, color) {
          this.canvas.beginPath()
          this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI)
          this.canvas.lineWidth = lineWidth
          this.canvas.strokeStyle = color
          this.canvas.stroke()
          this.canvas.closePath()
        }

        move () {
          this.x += Math.cos(this.a) * this.s
          this.y += Math.sin(this.a) * this.s
          this.a += Math.random() * 0.4 - 0.2

          if (this.x < 0 || this.x > this.w - this.radius) {
            return false
          }

          if (this.y < 0 || this.y > this.h - this.radius) {
            return false
          }
          this.render()
          return true
        }

        calculateDistance (v1, v2) {
          let x = Math.abs(v1.x - v2.x)
          let y = Math.abs(v1.y - v2.y)
          return Math.sqrt((x * x) + (y * y))
        }
      }

      /*
       * Function to clear layer canvas
       * @num:number number of particles
       */
      function popolate (num) {
        for (let i = 0; i < num; i++) {
          setTimeout(
            (x => function () {
              // Add particle
              particles.push(new Particle(canvas))
            })(i)
            , frequency * i)
        }
        return particles.length
      }

      function clear () {
        // canvas.globalAlpha=0.04;
        canvas.fillStyle = '#41B883'
        canvas.fillRect(0, 0, tela.width, tela.height)
        // canvas.globalAlpha=1;
      }

      function connection () {
        let oldElement = null
        particles.forEach(function (element, i) {
          if (i > 0) {
            let box1 = oldElement.getCoordinates()
            let box2 = element.getCoordinates()
            canvas.beginPath()
            canvas.moveTo(box1.x, box1.y)
            canvas.lineTo(box2.x, box2.y)
            canvas.lineWidth = 0.45
            canvas.strokeStyle = '#ffb3d2'
            canvas.stroke()
            canvas.closePath()
          }
          oldElement = element
        })
      }

      /*
       * Function to update particles in canvas
       */
      function update () {
        clear()
        connection()
        particles = particles.filter(function (p) { return p.move() })
        // Recreate particles
        if (timeToRecreate) {
          if (particles.length < initNum) { popolate(1) }
        }
        requestAnimationFrame(update.bind(this))
      }

      update()
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Montserrat:200,300,400,600");
  .more-pens {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 10;
    font-family: "Montserrat";
    font-size: 12px;
  }

  a.white-mode, a.white-mode:link, a.white-mode:visited, a.white-mode:active {
    font-family: "Montserrat";
    font-size: 12px;
    text-decoration: none;
    background: #212121;
    padding: 4px 8px;
    color: #f7f7f7;
  }
  a.white-mode:hover, a.white-mode:link:hover, a.white-mode:visited:hover, a.white-mode:active:hover {
    background: #edf3f8;
    color: #212121;
  }

  .particle {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 607px;
  }

  .title {
    z-index: 10;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-family: "Montserrat";
    text-align: center;
    width: 100%;
  }
  .title h1 {
    position: relative;
    color: #EEEEEE;
    font-weight: 600;
    font-size: 60px;
    padding: 0;
    margin: 0;
    line-height: 1;
    text-shadow: 0 0 30px #000155;
  }
  .title h1 span {
    font-weight: 600;
    padding: 0;
    margin: 0;
    color: #BBB;
  }
  .title h3 {
    font-weight: 200;
    font-size: 20px;
    padding: 0;
    margin: 0;
    line-height: 1;
    color: #EEEEEE;
    letter-spacing: 2px;
    text-shadow: 0 0 30px #000155;
  }
</style>
