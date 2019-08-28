let model = {
    currentCat: null,
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
    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    getAllCats: function () {
        return model.cats;
    },

    increaseCount: function () {
        model.currentCat.clickCount += 1;
        catView.render();
    },

    setCurrentCat: function (cat) {
        model.currentCat = cat;
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
        this.catCountElem.textContent = currentCat.clickCount;
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
        for(let i = 0; i < cats.length; i ++){
            let cat = cats[i];
            let catElem = document.createElement('li');
            catElem.textContent = cat.name;

            catElem.addEventListener('click', function (cat) {
                return function () {
                    octopus.setCurrentCat(cat);
                    catView.render();
                }
            }(cat));

            this.catListElem.appendChild(catElem);
        }
    }
}

let adminView = {

}

octopus.init();
