/*
 *  class for generating component [input type=checkbox, button]
 *
 */
function Component(data, container) {

    var qCounter,

        cont = document.querySelector(container),

        store = window.localStorage,

        qNumber = {"1": "&#10102;", "2": "&#10103;", "3": "&#10104;","4": "&#10105;","5": "&#10106;","6": "&#10107;"},

        self = this;

    function writeQCount() {

        if (store.getItem("qcount") === null) {
            store.setItem("qcount", 0);
        } else if (store.getItem("qcount") !== null) {
            qCounter = +store.getItem("qcount");
            qCounter++;
            store.setItem("qcount", qCounter);
        }
    }

    function readQCount() {
        return store.getItem("qcount");
    }

    function setEvent(radio, button) {
        var radios = document.querySelectorAll(radio);
        for (var i = 0; i < radios.length; i++) {
            radios[i].onchange = function() {
                document.querySelector(button).removeAttribute("disabled");
                document.querySelector(button).onclick = function() {
                    self.creatQElements.call(self);
                }
            }
        }
    }

    this.endQ = function() {
        if (qCounter >= data.length) {
            this.createQLink();
            store.clear();
            return false;
        }
    }

    this.clearContainer = function() {
            cont.innerHTML = "";
            cont.classList.remove("bg-hide");
    }

    this.creatQElements = function() {
        writeQCount();
        this.clearContainer();
        this.endQ();
        var p = document.createElement("p");
        p.classList.add("q-description");
        var n = readQCount();
        n++;
        p.innerHTML = qNumber[n] + "&nbsp;";
        p.innerHTML += data[readQCount()].description;
        cont.appendChild(p);

        for (var i = 0; i < data[readQCount()].list.length; i++) {
            var radio = document.createElement("input"), label = document.createElement("label");
            label.classList.add("list-element");
            radio.type = "radio";
            radio.name = "q-list-element";
            label.appendChild(radio);
            label.innerHTML += "&nbsp;" + data[readQCount()].list[i];
            cont.appendChild(label);
        }
        var btn = document.createElement("button");
            btn.id = "btn-f";
            btn.className = "btn-f";
            btn.setAttribute("disabled","");
            btn.textContent = "следующий вопрос";
            cont.appendChild(btn);

        setEvent("input[name='q-list-element']", ".btn-f");
    }

    this.createQLink = function() {
        //cont.classList.add("bg-hide");
        var a = document.createElement("a"), p = document.createElement("p"), qrpath = "qr.jpg";
        a.textContent = "получить QR-код!";
        a.href="https://tinyurl.com/uppdatesnew";
        a.classList.add("btn-f");
        p.innerHTML = `
            Благодарим за ответы! Теперь вам доступен подарок от магазина SUNLIGHT.<br>
            Для этого скачайте QR-код и покажите его в любом магазине.<br>
            <img src="${qrpath}" style="display:block;margin:0 auto;" width="60" alt="qr-code">
        `;
        cont.appendChild(p);
        cont.appendChild(a);
    }

}
