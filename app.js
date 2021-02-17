const isEmpty = require('lodash/isEmpty');

function App() {
  function getDinos(err, data) {
    const json = '{"Dinos":[{"species":"Triceratops","weight":13000,"height":114,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"First discovered in 1889 by Othniel Charles Marsh"},{"species":"Tyrannosaurus Rex","weight":11905,"height":144,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"The largest known skull measures in at 5 feet long."},{"species":"Anklyosaurus","weight":10500,"height":55,"diet":"herbavor","where":"North America","when":"Late Cretaceous","fact":"Anklyosaurus survived for approximately 135 million years."},{"species":"Brachiosaurus","weight":70000,"height":"372","diet":"herbavor","where":"North America","when":"Late Jurasic","fact":"An asteroid was named 9954 Brachiosaurus in 1991."},{"species":"Stegosaurus","weight":11600,"height":79,"diet":"herbavor","where":"North America, Europe, Asia","when":"Late Jurasic to Early Cretaceous","fact":"The Stegosaurus had between 17 and 22 seperate places and flat spines."},{"species":"Elasmosaurus","weight":16000,"height":59,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Elasmosaurus was a marine reptile first discovered in Kansas."},{"species":"Pteranodon","weight":44,"height":20,"diet":"carnivor","where":"North America","when":"Late Cretaceous","fact":"Actually a flying reptile, the Pteranodon is not a dinosaur."},{"species":"Pigeon","weight":0.5,"height":9,"diet":"herbavor","where":"World Wide","when":"Holocene","fact":"All birds are living dinosaurs."}]}';

    return JSON.parse(json);
  }

  function validateForm(humanData) {
    let allDataAvailable = true;
    for (const humanProperty in humanData) {
      if (isEmpty(humanData[humanProperty]) && humanProperty !== 'diet') {
        allDataAvailable = false;
      }
    }

    if (allDataAvailable === true) {
      document.getElementById('dino-compare').remove();
      document.getElementById('alert').remove();
    } else {
      document.getElementById('alert').style.display = 'block';
    }

    return allDataAvailable;
  }

  function renderGrid() {
    let element = document.getElementById("grid");
    element.classList.remove("hidden");

    let humanData = {
      name: document.getElementById('name').value,
      feet: document.getElementById('feet').value,
      inches: document.getElementById('inches').value,
      weight: document.getElementById('weight').value,
      diet: document.getElementById('diet').value,
    }

    function ContainerNumberManager(){
      let humanContainerNumber = 5;
      let birdContainerNumber = 9;
      let dinoContainerNumbers = [1, 2, 3, 4, 6, 7, 8];

      function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      dinoContainerNumbers = shuffle(dinoContainerNumbers);

      return {
        getHumanContainerNum: function () {
          return humanContainerNumber;
        },
        getBirdContainerNumber: function () {
          return birdContainerNumber;
        },
        getDinoContainerNumber: function () {
          for (let dinoContainerNumber of dinoContainerNumbers) {
            dinoContainerNumbers.shift();
            return dinoContainerNumber;
          }
        }
      };
    }

    function renderDinos() {
      const containerNumberManager = new ContainerNumberManager();

      function Dino(species, weight, height, diet, where, when, fact){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = "images/" + this.species + ".png";
      }

      let dinoArray = [];
      const data = getDinos();
      for (const rawDino of data.Dinos) {
        const dino = new Dino(rawDino.species, rawDino.weight, rawDino.height, rawDino.diet, rawDino.where, rawDino.when, rawDino.fact);
        dinoArray[dino.species] = dino;
      }

      (function computePigeon() {
        let imgObj = document.createElement('img');
        imgObj.setAttribute('src', dinoArray.Pigeon.image)
        imgObj.setAttribute('title', dinoArray.Pigeon.species)
        imgObj.setAttribute('alt', dinoArray.Pigeon.species)

        let element = document.querySelector(' .container' + containerNumberManager.getBirdContainerNumber());
        element.appendChild(imgObj);

        let para = document.createElement("span");
        let node = document.createTextNode("All birds are considered dinosaurs.");
        para.appendChild(node);
        element = document.querySelector(' .container' + containerNumberManager.getBirdContainerNumber());
        element.appendChild(para);

        para = document.createElement("span");
        node = document.createTextNode(dinoArray.Pigeon.species);
        para.appendChild(node);
        element = document.querySelector(' .container' + containerNumberManager.getBirdContainerNumber());
        element.appendChild(para);
      })(containerNumberManager, dinoArray);

      delete dinoArray.Pigeon;

      console.log(dinoArray);

      for (const dino in dinoArray) {
        const containerNumber = containerNumberManager.getDinoContainerNumber();
        let para = document.createElement("p");
        let node = document.createTextNode(dinoArray.[dino].species);
        para.appendChild(node);
        let element = document.querySelector(' .container' + containerNumber);
        element.appendChild(para);

        para = document.createElement("span");
        node = document.createTextNode(dinoArray.[dino].fact);
        para.appendChild(node);
        element.appendChild(para);

        (function displayWeightComparison(dinoWeight) {
          let weightDiff = dinoWeight - humanData.weight;
          para = document.createElement("span");
          node = document.createTextNode('Weight difference to human in lbs: ' + weightDiff);
          para.appendChild(node);
          element.appendChild(para);
        })(dinoArray.[dino].weight);

        (function displayFeetHeightComparison(dinoHeight) {
          let heightDiff = dinoHeight - humanData.feet;
          para = document.createElement("span");
          node = document.createTextNode('Height difference to human in feet: ' + heightDiff);
          para.appendChild(node);
          element.appendChild(para);
        })(dinoArray.[dino].height);

        (function displayInchesHeightComparison(dinoHeight) {
          let dinoHeightInInches = dinoHeight * 12;
          let heightDiff = dinoHeightInInches - humanData.inches;
          para = document.createElement("span");
          node = document.createTextNode('Height difference to human in inches: ' + heightDiff);
          para.appendChild(node);
          element.appendChild(para);
        })(dinoArray.[dino].height);

        let imgObj = document.createElement('img');
        imgObj.setAttribute('src', 'images/' + dinoArray.[dino].species.toLowerCase() + '.png')
        imgObj.setAttribute('title', dinoArray.[dino].species)
        imgObj.setAttribute('alt', dinoArray.[dino].species)
        element.appendChild(imgObj);
      }
    }

    function renderHuman() {
      const containerManager = new ContainerNumberManager();

      let imgObj = document.createElement('img');
      imgObj.setAttribute('src', 'images/human.png')
      imgObj.setAttribute('title', 'Human')
      imgObj.setAttribute('alt', 'Human')

      let element = document.querySelector('.container' + containerManager.getHumanContainerNum());
      element.appendChild(imgObj);

      let para = document.createElement("span");
      let node = document.createTextNode("Name: " + humanData.name);
      para.appendChild(node);
      element = document.querySelector('.container' + containerManager.getHumanContainerNum());
      element.appendChild(para);
    }

    if (validateForm(humanData)) {
      renderDinos();
      renderHuman();
    }

  };

  document.getElementById('btn').addEventListener('click', function() {
    renderGrid();
  });

};

const app = new App();
