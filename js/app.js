let model = {
    currentCat: null,
    catNum: 0,
    cats: [
        {
            clickCount: 0,
            name: 'H',
            imgSrc: 'img/cat_picture1.jpg'

        },
        {
            clickCount: 0,
            name: 'Q',
            imgSrc: 'img/cat_picture2.jpg'
        },
        {
            clickCount: 0,
            name: 'X',
            imgSrc: 'img/cat_picture3.jpg'
        },
        {
            clickCount: 0,
            name: 'Y',
            imgSrc: 'img/cat_picture4.jpg'
        },
        {
            clickCount: 0,
            name: 'L',
            imgSrc: 'img/cat_picture5.jpg'
        },
    ]
}

let octopus = {
    init: function () {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    getCurrentCatNum: function() {
        return model.catNum;
    },

    getAllCats: function () {
        return model.cats;
    },

    increaseCount: function () {
        model.currentCat.clickCount += 1;
        console.log(model.currentCat.clickCount);
        catView.render();
    },

    setCurrentCat: function (cat, i) {
        model.currentCat = cat;
        model.catNum = i;
    },

    updateCat: function (catNum, name, clickNum, url) {
        model.cats[catNum].name = name;
        model.cats[catNum].clickCount = clickNum;
        model.cats[catNum].imgSrc = url;
        catView.render();
        catListView.render();
    }
}

let catView = {
    init: function () {
        this.catElem = document.getElementById('cat')
        this.catNameElem = document.getElementById('cat-name');
        this.catCountElem = document.getElementById('cat-count');
        this.catImgElem = document.getElementById('cat-img');

        this.catImgElem.addEventListener('click', function () {
            octopus.increaseCount();
        });
        this.render();
    },

    render: function () {
        let currentCat = octopus.getCurrentCat();
        this.catNameElem.textContent = currentCat.name;
        this.catCountElem.textContent = currentCat.clickCount + " clicks";
        this.catImgElem.src = currentCat.imgSrc;
    }
}

let catListView = {
    init: function () {
        this.catListElem = document.getElementById('cat-list');
        this.render();
    },

    render: function () {
        let cats = octopus.getAllCats();
        this.catListElem.innerText = '';
        for(let i = 0; i < cats.length; i ++){
            let cat = cats[i];
            let catElem = document.createElement('li');
            catElem.textContent = cat.name;

            catElem.addEventListener('click', function (cat, i) {
                return function () {
                    octopus.setCurrentCat(cat, i);
                    adminView.init();
                    catView.render();
                }
            }(cat, i));

            this.catListElem.appendChild(catElem);
        }
    }
}

let adminView = {
    init: function () {
        this.adminElem = document.getElementById('open-admin');
        this.adminListElem = document.getElementById('admin-option');
        this.adminInputName = document.getElementById('input-name');
        this.adminInputNum = document.getElementById('input-num');
        this.adminInputUrl = document.getElementById('input-url');
        this.adminCancelBtn = document.getElementById('cancel');
        this.adminSaveBtn = document.getElementById('save');

        this.adminListElem.style.visibility = 'hidden';

        this.adminElem.addEventListener('click', function () {
           if(adminView.adminListElem.style.visibility === "hidden"){
               adminView.render();
               adminView.adminListElem.style.visibility = "visible";
           }
        })
        this.adminListElem.style.visibility = 'hidden';
        this.render();
    },

    render: function () {
        let currentCat = octopus.getCurrentCat();
        this.adminInputName.value = currentCat.name;
        this.adminInputNum.value = currentCat.clickCount;
        this.adminInputUrl.value = currentCat.imgSrc;

        this.adminCancelBtn.addEventListener('click', function () {
            adminView.init();
        })

        this.adminSaveBtn.addEventListener('click', function () {
            let catName = adminView.adminInputName.value;
            let clickNum = parseInt(adminView.adminInputNum.value);
            let url = adminView.adminInputUrl.value;
            let catNum = octopus.getCurrentCatNum();
            octopus.updateCat(catNum, catName, clickNum, url);
        })
    }
}

octopus.init();
