const isEmpty = require('lodash/isEmpty');

function App() {
  let dinos = [];

  this.human = [];

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

  function isCenterTile(row, col) {
    return row === 2 && col === 2;
  }

  function renderGrid() {
    let humanData = {
      name: document.getElementById('name').value,
      feet: document.getElementById('feet').value,
      inches: document.getElementById('inches').value,
      weight: document.getElementById('weight').value,
      diet: document.getElementById('diet').value,
    }

    function renderDinos() {
      const data = getDinos();

      let row = 1;
      let col = 1;

      for (const dino of data.Dinos) {
        if (isCenterTile(row, col)) {
          col++;
        }

        if (row === 3 && col === 3) {
          let imgObj = document.createElement('img');
          imgObj.setAttribute('src', 'images/pigeon.png')
          imgObj.setAttribute('title', 'Pigeon')
          imgObj.setAttribute('alt', 'Pigeon')

          let element = document.querySelector('#row' + row + ' .col' + col);
          element.appendChild(imgObj);

          let para = document.createElement("p");
          let node = document.createTextNode("All birds are considered dinosaurs.");
          para.appendChild(node);
          element = document.querySelector('#row' + row + ' .col' + col);
          element.appendChild(para);

          para = document.createElement("p");
          node = document.createTextNode(dino.species);
          para.appendChild(node);
          element = document.querySelector('#row' + row + ' .col' + col);
          element.appendChild(para);

        } else {
          let para = document.createElement("p");
          let node = document.createTextNode(dino.species);
          para.appendChild(node);
          let element = document.querySelector('#row' + row + ' .col' + col);
          element.appendChild(para);

          para = document.createElement("p");
          node = document.createTextNode(dino.fact);
          para.appendChild(node);
          element.appendChild(para);

          (function displayWeightComparison() {
            let weightDiff = dino.weight - humanData.weight;
            para = document.createElement("p");
            node = document.createTextNode('Weight difference to human: ' + weightDiff);
            para.appendChild(node);
            element.appendChild(para);
          })();

          (function displayFeetHeightComparison() {
            let heightDiff = dino.height - humanData.feet;
            para = document.createElement("p");
            node = document.createTextNode('Height difference to human in feet: ' + heightDiff);
            para.appendChild(node);
            element.appendChild(para);
          })();

          (function displayInchesHeightComparison() {
            let dinoHeightInInches = dino.height * 12;
            let heightDiff = dinoHeightInInches - humanData.inches;
            para = document.createElement("p");
            node = document.createTextNode('Height difference to human in inches: ' + heightDiff);
            para.appendChild(node);
            element.appendChild(para);
          })();

          let imgObj = document.createElement('img');
          imgObj.setAttribute('src', 'images/' + dino.species.toLowerCase() + '.png')
          imgObj.setAttribute('title', dino.species)
          imgObj.setAttribute('alt', dino.species)
          element.appendChild(imgObj);
        }

        if (col === 3) {
          row++;
          col = 1;
        } else {
          col++;
        }
      }
    }

    function renderHuman() {
      let imgObj = document.createElement('img');
      imgObj.setAttribute('src', 'images/human.png')
      imgObj.setAttribute('title', 'Human')
      imgObj.setAttribute('alt', 'Human')

      let element = document.querySelector('#row2 .col2');
      element.appendChild(imgObj);

      let para = document.createElement("p");
      let node = document.createTextNode("Name: " + humanData.name);
      para.appendChild(node);
      element = document.querySelector('#row2 .col2');
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
