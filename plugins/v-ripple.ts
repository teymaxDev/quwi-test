import Vue from 'vue'

const createStyles = () => {
  const style = document.createElement('style')
  style.innerHTML = `
    .ripple {
      width: 10px;
      height: 10px;
      opacity: 0;
      border-radius: 100em;
      position: absolute;
      animation: ripple 0.8s 1 ease-in-out;
    }
    @keyframes ripple {
      0% {transform: scale(0.01); opacity: 0.2;}
      80% {transform: scale(100); opacity: 0;}
    }
    @-webkit-keyframes ripple {
      0% {-webkit-transform: scale(0.01); opacity: 0.3;}
      100% {-webkit-transform: scale(50); opacity: 0;}
    }
  `
  return style
}

const getCircleStyle = ({ x, y, color }: { x: number, y: number, color: string }) => {
  return `
    background: ${color};
    top: ${y}px;
    left: ${x}px;
  `
}

Vue.directive('ripple', {
  inserted: function (el, binding) {
    const color = binding.value === undefined ? '#fff' : binding.value
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    el.onclick = function (ev) {
      const style = createStyles()
      const _self = this as HTMLElement
      const circle = document.createElement('div')
      circle.classList.add('ripple')
      circle.appendChild(style)
      const offset = _self.getBoundingClientRect()
      const x = ev.pageX - offset.left - document.body.scrollLeft
      const y = ev.pageY - offset.top - document.body.scrollTop
      circle.setAttribute('style', getCircleStyle({ x, y, color }))
      _self.append(circle)
      ev.stopPropagation()
      setTimeout(function () {
        circle.parentNode.removeChild(circle)
      }, 800)
    }
  }
})
