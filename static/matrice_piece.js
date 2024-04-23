
var container = document.getElementById("container");


export default class Pieces {
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

function main () {
  
  var pieces = new Pieces()

  // Exemple d'utilisation
  var pieceChoisie = pieces.choix_piece(pieces.liste_piece);
  container.innerHTML = pieceChoisie;
  
}

export { Pieces };

  