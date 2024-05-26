let grille; // Déclaration de la variable grille
let randPiece; // Déclaration de la variable randPiece
let currentForm = 0;
let p = 0;

class Pieces {
  constructor() {
    this.liste_pieces = [
      // ordre -> L/T/I/J/Z/S/O
      // L
      [  
        [
          [3,0],[4,0],[5,0],
          [3,1]
        ],
        // L gauche
        [
          [4,0],
          [4,1],
          [4,2],[5,2]
        ],
        // L gauche *2
        [
                      [5,0],
          [3,1],[4,1],[5,1]
        ],
        // L gauche * 3
        [
          [3,0],[4,0],
                [4,1],
                [4,2]
        ],
      ], // fin de L
      // T
      [
        [
          [3,0],[4,0],[5,0],
                [4,1]
        ],
  
        [
          [4,0],
          [4,1],[5,1],
          [4,2],
        ],
  
        [
                [4,0],
          [3,1],[4,1],[5,1]
        ],
  
        [
                [4,0],
          [3,1],[4,1],
                [4,2]
        ]
      ], // fin de T
  
      // I
      [
        [
          [3,0],[4,0],[5,0],[6,0]
        ],
        // I debout
        [
          [4,0],
          [4,1],
          [4,2],
          [4,3]
        ]
      ], // fin I
      // J
      [
        [
          [3,0],[4,0],[5,0],
                      [5,1]
        ],
        [
          [4,0],[5,0],
          [4,1],
          [4,2]
        ],
        [
          [3,0],
          [3,1],[4,1],[5,1]
        ],
        [
                [4,0],
                [4,1],
          [3,2],[4,2]
        ]
      ], // fin J
      // Z
      [
        [
          [3,0],[4,0],
                [4,1],[5,1]
        ],
        [
                [4,0],
          [3,1],[4,1],
          [3,2]
        ]
      ], // fin Z
      // S
      [
        [
                [4,0],[5,0],
          [3,1],[4,1]
        ],
        // S debout
        [
          [3,0],
          [3,1],[4,1],
                [4,2]
        ]
      ], // fin S
      // O
      [
        [
          [4,0],[5,0],
          [4,1],[5,1]
        ],

      ], // fin O
    ];
  }

  choix_piece() {
    const r = Math.floor(Math.random() * 7);
    const piece = [];
    piece.push(this.liste_pieces[r]);
    return piece;
  }

}

function RandInt(max) {
  return Math.floor(Math.random() * max);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Pause() { 

  if(p==1){
    
    p-=1

  }else{

    p+=1
    document.addEventListener('keydown', function(event) {
      const keysToDisable = [81,68,83,37,39,27,82];
  
      if (keysToDisable.includes(KeyboardEvent.keyCode)) {
          KeyboardEvent.keyCode.preventDefault();
          console.log(`Touche ${KeyboardEvent.key} désactivée`);
      }

  });
  
  }
}

function New_game() {{location.reload()}}

// Declaration classe de la grille de jeu
class Grid {
  constructor() {
    this.height = 22;
    this.width = 10;
    this.grid = document.querySelector(".container");
    this.cells = Array.from(document.querySelectorAll(".line div")); // un tabl avec les cellules de la grille
    this.pieces = new Pieces();
    this.x_counter = 0;
    this.y_counter = 0;
    this.currentForm = 0;
    this.score = 0;
  }

  fillcell(index) {
    // la méthode de remplissage de case
    console.log(`fill ici : ${index}`);
    this.cells[index].classList.add("full");
    console.log(this.cells[index].outerHTML);
  }

  emptycell(index) {
    // la méthode de "vidage" de case
    console.log(`vider ici : ${index}`);
    console.log(`classe :`,this.cells[index].classList);
    this.cells[index].classList.remove("full");
    console.log(this.cells[index].outerHTML);
  }
  
  xyToIndex(xy) {// converti coordonnées en index
    let index = -1;
    
    index = xy[0] + 10*xy[1];
    return index;
  };
    
  affichePiece(formePiece) {// la méthode pour afficher une pièce, c'est juste une boucle qui utilise fillcell et le convertisseur de coordonnées en gros
    for (let pixel of formePiece){
      this.fillcell(this.xyToIndex(pixel));
      };
    };

  y_piece_modif(randPiece) {
          if (this.can_move(randPiece[this.currentForm])) {
            for (let pixel of randPiece[this.currentForm]) {
              if (pixel[1] < this.height - 1) { // Si on est pas en bas
                  this.emptycell(this.xyToIndex(pixel)); // 'éteint' le pixel actuel
                  pixel[1]++;
                  
              }
          }
          this.y_counter++;

      }
            
      return randPiece;
}


  can_move(piece){ //retourne un booléen true si on peut bouger la pièce et flase sinon

    let collision;
    let list_of_index = [];
    console.log('liste randPiece:',piece);

    for(let index of piece){
      
      list_of_index.push(this.xyToIndex(index));

    }
    console.log('liste d\'index de randPiece:',list_of_index);

    for (let pixel of piece){
      if(this.xyToIndex(pixel) > 209){

        return Boolean(false);

      } else if(this.piece_around(pixel,list_of_index)){

        return Boolean(false);

      } else {

        collision = Boolean(true);

      }
    }
    return collision;

  }

  piece_around(pixel,list_of_index){ //retourne un booléen true si il y a une pièce autour et false sinon

    pixel[1] += 1;

    if(!list_of_index.includes(this.xyToIndex(pixel)) && this.cells[this.xyToIndex(pixel)].classList == 'grid-item full' ) {// || = or | ! = not ("not in" in that case with includes) | and = &&

    pixel[1] -= 1;
    return Boolean(true);

    } else {
    
    pixel[1] -= 1
    return Boolean(false)

    }
  }

  piece_left(pixel,list_of_index){ //retourne un booléen true si il y a une pièce autour et false sinon

    pixel[0] -= 1;

    if(!list_of_index.includes(this.xyToIndex(pixel)) && this.cells[this.xyToIndex(pixel)].classList == 'grid-item full' ) {// || = or | ! = not ("not in" in that case with includes) | and = &&

    pixel[0] += 1;
    return Boolean(true);

    } else {
    
    pixel[0] += 1
    return Boolean(false)

    }
  }

  piece_right(pixel,list_of_index){ //retourne un booléen true si il y a une pièce autour et false sinon

    pixel[0] += 1;

    if(!list_of_index.includes(this.xyToIndex(pixel)) && this.cells[this.xyToIndex(pixel)].classList == 'grid-item full' ) {// || = or | ! = not ("not in" in that case with includes) | and = &&

    pixel[0] -= 1;
    return Boolean(true);

    } else {
    
    pixel[0] -= 1
    return Boolean(false)

    }
  }
  
  canMoveLeft(piece) {
    let list_of_index = [];

    for(let index of piece){
      
      list_of_index.push(this.xyToIndex(index));

    }

    for (let pixel of piece) {
      if (pixel[0] <= 0 || this.piece_left(pixel,list_of_index)) {
        return false;
      }
    }
    return true;
  }
  
  canMoveRight(piece) {
    let list_of_index = [];

    for(let index of piece){
      
      list_of_index.push(this.xyToIndex(index));

    }

    for (let pixel of piece) {
      if (pixel[0] >= 9 || this.piece_right(pixel,list_of_index)) {
        console.log('canMoveRight : false');
        return false;
      }
    }
    console.log('canMoveRight : true');
    return true;
  }
  
  canRotate(piece) {
    
  }
  
  isCellFull(x, y) {
    const index = this.xyToIndex([x, y]);
    //console.log('x:', x, 'y:', y, 'index:', index);
    //console.log('classList:', this.cells[index].classList);
    return this.cells[index].classList ==  '.grid item.full';
  }
  
  clear_blocks(){

  let number_of_line_cleared = 0;

  for (var y = 0; y < 22;y++) {

    let line = 0;

    for (var x = 0; x < 10;x++) {

      let index = [x,y];
      //console.log('xy : ',x,y);
      if(this.cells[this.xyToIndex(index)].classList == 'grid-item full'){

        line ++;

      } 

      //console.log('case remplie ? : ',this.cells[this.xyToIndex(index)].classList == 'grid-item full');
      if(line == 10){
        
        number_of_line_cleared++;
        for (var i = 0; i < 10; i++ ){
          //console.log('in dex i et y : ',this.xyToIndex([i,y]));
          this.emptycell(this.xyToIndex([i,y]));

        }

        for (var k = y; k >= 0;k--) {

          for (var i = 0; i < 10; i++ ){
            
            if(this.cells[this.xyToIndex([i,k])].classList == 'grid-item full'){

              this.emptycell(this.xyToIndex([i,k]));
              this.fillcell(this.xyToIndex([i,k+1]));

      
            } 

          }
        }

      }

    }
  }
  this.score_update(number_of_line_cleared)
 }

 score_update(number_of_line_cleared){

  console.log('score',this.score)
  if(number_of_line_cleared==1){

    this.score += 100
    document.getElementById("Score").innerHTML = ("Score : ",this.score);
    console.log('score updated',this.score)

  }

  if(number_of_line_cleared==2){

    this.score += 300
    document.getElementById("Score").innerHTML = ("Score : ",this.score);

  }

  if(number_of_line_cleared==3){

    this.score += 500
    document.getElementById("Score").innerHTML = ("Score : ",this.score);
    
  }

  if(number_of_line_cleared==4){

    this.score += 800
    document.getElementById("Score").innerHTML = ("Score : ",this.score);
    
  }

 }

}

function deplacement(e) {
  if(p==1){
    switch (e.keyCode) {
      case 27:
          Pause();
          break;
          
      case 82 :
        New_game();
        break;
    }
  }else{
    switch (e.keyCode) {
      case 81: // Touche Q
        deplacerGauche();
        break;
      case 68: // Touche D
        deplacerDroite();
        break;
      
      case 83: // Touche S
        deplacerBas();
        break;
      
      case 37: // Touche flèche gauche
        rotationGauche();
        break;
      case 39: // Touche flèche droite
        rotationDroite();
        break;
        
      case 27:
        Pause();
        break;
        
      case 82 :
        New_game();
        break;
    }
  }
}


async function deplacerBas() {
  if (grille.can_move(randPiece[grille.currentForm])) {
    for (let i = 0; i < randPiece[grille.currentForm].length; i++) {
      grille.emptycell(grille.xyToIndex(randPiece[grille.currentForm][i])); // Vide la cellule avant le déplacement
      randPiece[grille.currentForm][i][1] += 1;
    }
    
    grille.affichePiece(randPiece[grille.currentForm]);
  }
}


async function deplacerGauche() {
  if (grille.canMoveLeft(randPiece[grille.currentForm])) {
    grille.x_counter--;
    for (let i = 0; i < randPiece[grille.currentForm].length; i++) {
      grille.emptycell(grille.xyToIndex(randPiece[grille.currentForm][i])); // Vide la cellule avant le déplacement
      randPiece[grille.currentForm][i][0] -= 1;
    }
    
    grille.affichePiece(randPiece[grille.currentForm]);
  }
}

async function deplacerDroite() {
  if (grille.canMoveRight(randPiece[grille.currentForm])) {
    grille.x_counter++;
    for (let i = 0; i < randPiece[grille.currentForm].length; i++) {
      grille.emptycell(grille.xyToIndex(randPiece[grille.currentForm][i])); // Vide la cellule avant le déplacement
      randPiece[grille.currentForm][i][0] += 1;
    }
    grille.affichePiece(randPiece[grille.currentForm]);
  }
}


function rotationGauche() {
  console.log("rotation Gauche");
  
  for (let pixel of randPiece[grille.currentForm]) {
    grille.emptycell(grille.xyToIndex(pixel));
  }
      
  if (grille.currentForm < randPiece.length - 1) { 
    grille.currentForm++;
  } 
  else {
    grille.currentForm = 0;
  }
  for (let pixel of randPiece[grille.currentForm]){
    console.log("x_counter :",grille.x_counter)
    console.log("y_counter :",grille.y_counter)

    pixel[0] += grille.x_counter;

    if(pixel[0]<0){

      while (pixel[0]<0){

        for (let pixel of randPiece[grille.currentForm]){

          pixel[0]++

        }
      }

    }

    else if (pixel[0]>9){

      while (pixel[0]>9){

        for (let pixel of randPiece[grille.currentForm]){

          pixel[0]--

        }
      }

    }
    pixel[1] += grille.y_counter;
    
    if(pixel[1]>21){
      console.log('ground foireux')
      while (pixel[1]>21){

        for (let pixel of randPiece[grille.currentForm]){

          pixel[1]--

        }
      }

    }
    }
    
  //console.log('piece actuel affiché et y_counter : ',randPiece[grille.currentForm],grille.y_counter);
  //console.log("le truc chiant la tu sais : ",randPiece[grille.currentForm][randPiece.length - 1][1],pixel[1],randPiece[grille.currentForm][randPiece.length - 1][1] - pixel[1])
  //for (let pixel of randPiece[grille.currentForm]){if (pixel[1] + grille.y_counter > 21){pixel[1] = 21 - (randPiece[grille.currentForm][randPiece.length - 1][1] - pixel[1]);}else{pixel[1] += grille.y_counter;}}
  grille.affichePiece(randPiece[grille.currentForm]);
}

  
function rotationDroite() {
  
  for (let pixel of randPiece[grille.currentForm]) {
    grille.emptycell(grille.xyToIndex(pixel));
  }
      
  if (grille.currentForm > 0) { 
    grille.currentForm--;
  } 
  else {
    grille.currentForm = randPiece.length-1;
  }
  for (let pixel of randPiece[grille.currentForm]){
    console.log("x_counter :",grille.x_counter);
    console.log("y_counter :",grille.y_counter);
    console.log("pixel rotate :",grille.xyToIndex(pixel));
    
    pixel[0] += grille.x_counter;
    if(pixel[0]<0){

      while (pixel[0]<0){

        for (let pixel of randPiece[grille.currentForm]){

          pixel[0]++

        }
      }

    }

    else if (pixel[0]>9){

      while (pixel[0]>9){

        for (let pixel of randPiece[grille.currentForm]){

          pixel[0]--

        }
      }

    }
    //if (pixel[1] + grille.y_counter > 21){pixel[1] = 21;}else{pixel[1] += grille.y_counter;}
    pixel[1] += grille.y_counter;
    
    if(pixel[1]>21){
      console.log('ground foireux')
      while (pixel[1]>21){

        for (let pixel of randPiece[grille.currentForm]){

          pixel[1]--

        }
      }

    }
  }
  
  grille.affichePiece(randPiece[grille.currentForm]);
}



document.onkeydown = deplacement;

document.addEventListener('DOMContentLoaded', function showRanks() { // dès que la page est chargée ça affiche le tableau de scores
  
  console.log("DOMContentLoaded");
  
  fetch('rankdb.json')
    .then(response => {
      return response.json()
  })
      .then(ranks => {

        ranks.sort((a,b) => b.score - a.score);
        
        ranks = ranks.slice(0,10);
        
        const ranksArrayBody = document.querySelector('#rankArray tbody');
        ranksArrayBody.innerHTML = ''; 

        ranks.forEach( (rank,index) => {

        // Crée un nouvel élément de ligne de tableau
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = rank.name;
        row.appendChild(nameCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = rank.score;
        row.appendChild(scoreCell);

        ranksArrayBody.appendChild(row);
        });

      });
 
});

document.addEventListener('DOMContentLoaded', function GameOver() {
    // Sélection des éléments de la fenêtre modale
    const gameOverModal = document.getElementById('gameOverModal');
    const playerNameInput = document.getElementById('playerName');
    const saveScoreButton = document.getElementById('saveScoreButton');
    const scoreNumber = document.getElementById('scoreNumber');

  
  
  
    saveScoreButton.addEventListener('click', function SaveScore() {
      const playerName = playerNameInput.value.trim();
      
      if (playerName !== '') {
          const newScore = { name: playerName, score: grille.score };
          saveScoreToJson(newScore).catch(error => {
                console.error('Erreur lors de l\'enregistrement du score:', error);
                alert('Erreur lors de l\'enregistrement du score. Veuillez réessayer.');
            });
      }
    });
      async function saveScoreToJson(newScore) {
        
        const response = await fetch('rankdb.json');
        const ranks = await response.json();
        ranks.push(newScore);
        
        const postResponse = await fetch('Tetris_main',{
          method: 'POST',
          headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(ranks)
          
          
        });
    }
  });


async function main() {
   
   grille = new Grid(); // Initialisation de la grille
   await sleep(1750); //j'ai mis ça la parce que la page met du temps à se charger et le temps qu'elle se charge la piece est déja descendu de deux lignes sans
  
    while (true){
    grille.y_counter = 0;
    grille.x_counter = 0;
    grille.currentForm = 0;
    
    randPiece = JSON.parse(JSON.stringify(grille.pieces.liste_pieces[RandInt(7)])); // Assignation de randPiece
    //randPiece = JSON.parse(JSON.stringify(grille.pieces.liste_pieces[6]));

    console.log(grille.cells[6].classList == 'grid-item')
    
    
      if(grille.can_move(randPiece[grille.currentForm])){
        while (grille.can_move(randPiece[grille.currentForm])) { 
          //let debugPiece = randPiece[grille.currentForm].map(pixel => pixel[1]++); 
          
          console.log("y_counter : ",grille.y_counter);
          await grille.affichePiece(randPiece[grille.currentForm]); 
          //console.log(randPiece[0][0])
          //console.log('Fonction canmove : ', grille.can_move(randPiece[0]))
          await sleep(200);
          randPiece = grille.y_piece_modif(randPiece);
          console.log("randPiece :",randPiece);
          await grille.affichePiece(randPiece[grille.currentForm]);

          await sleep(200);

          while(p==1){await sleep(1000)}
        }
      grille.clear_blocks();
      }
      else{
        console.log("Game Over Score :",grille.score);
        gameOverModal.style.display = 'block';
        document.getElementById('scoreNumber').innerHTML = grille.score;   
        break;
      }
    }
  }


main();
