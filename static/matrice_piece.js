// Importer un autre fichier JavaScript
/*
var script = document.createElement('script');
script.src = "{{ url_for('static', filename='matrice_piece.js') }}";
document.head.appendChild(script);
*/
//import { Pieces } from './matrice_piece.js';

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
        ]
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
};

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

  async parcours() {
    // fonction asynchrone sinon le sleep marche pas

    for (let cell in this.cells) {
      this.fillcell(cell);
      await sleep(20); // await c'est pour pas que le reste s'execute
      this.emptycell(cell);
      console.log("cell : %d", cell);
    }
  };

  cellules() { // c du débugguage 
    console.log(`tabl de cellule : ${this.cells}`);
    console.log(`taille tabl de cellule : ${this.cells.length}`);
    console.log(`test : ${this.height * this.width}`);
  };
  
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
  
  x_piece_state(randpiece){

    for (let pixel of randpiece[0]) {
      
      pixel[0] += this.x_counter

    }

  }

  y_piece_modif(randPiece){

    for  (let forme of randPiece){
      for (let pixel of forme){

        this.emptycell(this.xyToIndex(pixel));// 'éteint' le pixel actuel
        pixel[1]++;

      }
      
    }
      
    
    return randPiece

  }

  can_move(randPiece){//retourne un booléen true si on peut bouger la pièce et flase sinon

    let collision;
    let list_of_index = [];
    console.log('liste randPiece:',randPiece);

    for(let index of randPiece){
      
      list_of_index.push(this.xyToIndex(index));

    }
    console.log('liste d\'index de randPiece:',list_of_index);

    for (let pixel of randPiece){
      if(this.xyToIndex(pixel) > 210){

        return Boolean(false);

      } else if(this.piece_around(pixel,list_of_index)){

        return Boolean(false);

      } else {

        collision = Boolean(true);

      }
    }
    return collision;

  }

  piece_around(pixel,list_of_index){//retourne un booléen true si il y a une pièce autour et false sinon
    
    const new_pixel = pixel;
    console.log('pixel :',pixel);

    new_pixel[1] += 1;

    if(!list_of_index.includes(this.xyToIndex(new_pixel)) && this.cells[this.xyToIndex(new_pixel)].classList == 'grid-item full' ) {// || = or | ! = not ("not in" in that case with includes) | and = &&

    new_pixel[1] -= 1;
    console.log('c\'est bon')
    return Boolean(true);

    } else {
    
    new_pixel[1] -= 1
    console.log('c\'est pas bon')
    return Boolean(false)

    }
  }
}

async function main() {
   
 await sleep(1500);//j'ai mis ça la parce que la page met du temps à se charger et le temps qu'elle se charge la piece est déja descendu de deux lignes sans
 const grille = new Grid();
 var randPiece = grille.pieces.liste_pieces[RandInt(6)];
 var n = 21;
 console.log(grille.cells[6].classList == 'grid-item')
  
  while (grille.can_move(randPiece[0])) {
    await grille.affichePiece(randPiece[0]);
    console.log(randPiece[0][0])
    console.log('Fonction canmove : ', grille.can_move(randPiece[0]))
    await sleep(200);
    grille.y_counter += 1 ;
    randPiece = grille.y_piece_modif(randPiece);
    console.log("randPiece :",randPiece);
    await grille.affichePiece(randPiece[0]);
    var n = n - 1;
    console.log(grille.cells[6].classList == 'grid-item')
    await sleep(200);
  }

  var randPiece = grille.pieces.liste_pieces[RandInt(6)];
  var n = 21;

  while (grille.can_move(randPiece[0])) {
    await grille.affichePiece(randPiece[0]);
    console.log('Fonction canmove : ', grille.can_move(randPiece[0]))
    await sleep(200);
    grille.y_counter += 1 ;
    randPiece = grille.y_piece_modif(randPiece);
    console.log("randPiece :",randPiece);
    await grille.affichePiece(randPiece[0]);
    var n = n - 1;
    console.log(grille.cells[6].classList == 'grid-item')
    await sleep(200);
  }
  //affiche la première forme d'une piece au piff dans la liste 
  
}
//setI nterval(function () {location.reload()}, 8000);

main();
