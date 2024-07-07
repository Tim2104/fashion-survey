/*
 *  class with methods of animation
 *
 **/
function Animation(selector) {

    this.elem = document.querySelectorAll(selector);

    this.opacity = function() {
        for (var i = 0; i < this.elem.length; i++) {
            if (!this.elem[i].classList.contains("opacity")) this.elem[i].classList.add("opacity");
        }
    }


}
