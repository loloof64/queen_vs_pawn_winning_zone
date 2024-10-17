import Exercice from "./exercice";

interface ExerciceConfig {
    fen: string,
    expectedCells: Array<string>,
}

const availableExercicesConfigs : Array<ExerciceConfig> = [
    // white on king side
    {
        fen: "6K1/7P/8/8/8/8/8/8 b - - 0 1",
        expectedCells: [
            "h8", "g8", "f8", "e8", "d8",
            "h7", "g7", "f7", "e7", "d7",
            "h6", "g6", "f6", "e6", "d6",
            "h5", "g5", "f5", "e5", "d5",
            "h4", "g4", "f4", "e4",
        ],
    },
    {
        fen: "6K1/5P2/8/8/8/8/8/8 b - - 0 1",
        expectedCells: [
            "h8", "g8", "f8", "e8", "d8",
            "h7", "g7", "f7", "e7", "d7",
            "h6", "g6", "f6", "e6", "d6",
            "h5", "g5", "f5",
        ],
    },
    {
        fen: "4K3/5P2/8/8/8/8/8/8 b - - 0 1",
        expectedCells: [
            "h8", "g8", "f8", "e8", "d8", "c8", "b8",
            "h7", "g7", "f7", "e7", "d7", "c7", "b7",
            "h6", "g6", "f6", "e6", "d6", "c6", "b6",
            "h5", "g5", "f5", "e5", "d5", "c5", "b5",
            "h4", "g4", "f4", "e4",
        ]
    },
    // white on queen side
    {
        fen: "1K6/P7/8/8/8/8/8/8 b - - 0 1",
        expectedCells: [
            "a8", "b8", "c8", "d8", "e8",
            "a7", "b7", "c7", "d7", "e7",
            "a6", "b6", "c6", "d6", "e6",
            "a5", "b5", "c5", "d5", "e5",
            "a4", "b4", "c4", "d4"
        ]
    },
    {
        fen: "1K6/2P5/8/8/8/8/8/8 b - - 0 1",
        expectedCells: [
            "a8", "b8", "c8", "d8", "e8",
            "a7", "b7", "c7", "d7", "e7",
            "a6", "b6", "c6", "d6", "e6",
            "a5", "b5", "c5"
        ]
    },
    {
        fen: "3K4/2P5/8/8/8/8/8/8 b - - 0 1",
        expectedCells: [
            "a8", "b8", "c8", "d8", "e8", "f8", "g8",
            "a7", "b7", "c7", "d7", "e7", "f7", "g7",
            "a6", "b6", "c6", "d6", "e6", "f6", "g6",
            "a5", "b5", "c5", "d5", "e5", "f5", "g5",
            "a4", "b4", "c4", "d4"
        ]
    },
    //black on king side
    {
        fen: "8/8/8/8/8/8/7p/6k1 w - - 0 1",
        expectedCells: [
            "h1", "g1", "f1", "e1", "d1",
            "h2", "g2", "f2", "e2", "d2",
            "h3", "g3", "f3", "e3", "d3",
            "h4", "g4", "f4", "e4", "d4",
            "h5", "g5", "f5", "e5"
        ]
    },
    {
        fen: "8/8/8/8/8/8/5p2/6k1 w - - 0 1",
        expectedCells: [
            "h1", "g1", "f1", "e1", "d1",
            "h2", "g2", "f2", "e2", "d2",
            "h3", "g3", "f3", "e3", "d3",
            "h4", "g4", "f4"
        ],
    },
    {
        fen: "8/8/8/8/8/8/5p2/4k3 w - - 0 1",
        expectedCells: [
            "h1", "g1", "f1", "e1", "d1", "c1", "b1",
            "h2", "g2", "f2", "e2", "d2", "c2", "b2",
            "h3", "g3", "f3", "e3", "d3", "c3", "b3",
            "h4", "g4", "f4", "e4", "d4", "c4", "b4",
            "h5", "g5", "f5", "e5"
        ]
    },
    //black on queen side
    {
        fen: "8/8/8/8/8/8/p7/1k6 w - - 0 1",
        expectedCells: [
            "a1", "b1", "c1", "d1", "e1",
            "a2", "b2", "c2", "d2", "e2",
            "a3", "b3", "c3", "d3", "e3",
            "a4", "b4", "c4", "d4", "e4",
            "a5", "b5", "c5", "d5"
        ],
    },
    {
        fen: "8/8/8/8/8/8/2p5/1k6 w - - 0 1",
        expectedCells: [
            "a1", "b1", "c1", "d1", "e1",
            "a2", "b2", "c2", "d2", "e2",
            "a3", "b3", "c3", "d3", "e3",
            "a4", "b4", "c4"
        ]
    },
    {
        fen: "8/8/8/8/8/8/2p5/3k4 w - - 0 1",
        expectedCells: [
            "a1", "b1", "c1", "d1", "e1", "f1", "g1",
            "a2", "b2", "c2", "d2", "e2", "f2", "g2",
            "a3", "b3", "c3", "d3", "e3", "f3", "g3",
            "a4", "b4", "c4", "d4", "e4", "f4", "g4",
            "a5", "b5", "c5", "d5"
        ]
    }
];

export default function generate(): Exercice {
    const configsCount = availableExercicesConfigs.length;
    const selectedBaseConfiguration = availableExercicesConfigs[Math.floor(Math.random() * configsCount)];
    const selectedFen = selectedBaseConfiguration.fen;
    const whiteTurn = selectedFen.split(" ")[1] === "w";
    const fenWithStrongSideQueen = placePiece(selectedFen, whiteTurn ? "Q": "q");
    const finalFen = placePiece(fenWithStrongSideQueen, whiteTurn ? "K": "k");

    return new Exercice(finalFen, selectedBaseConfiguration.expectedCells);
}

function placePiece(startFen : string, pieceToPlaceFen: string) : string {
    let piecesValues = getPiecesFromFen(startFen);
    while (true) {
        let selectedRank = Math.floor(Math.random() * 8);
        let selectedFile = Math.floor(Math.random() * 8);
        let cellOccupied = "PNBRQKpnbrqk".split("").includes(piecesValues[7-selectedRank][selectedFile]);
        if (!cellOccupied) {
            piecesValues[7-selectedRank][selectedFile] = pieceToPlaceFen;
            break;
        }
    }
    const boardFenPart = getBoardFenPartFromPiecesValues(piecesValues);
    let newFenParts = startFen.split(" ");
    newFenParts[0] = boardFenPart;

    return newFenParts.join(" ");
}

function getPiecesFromFen(fen: string) : string[][] {
    const cellsLines = fen.split(" ")[0].split("/");
    let result: string[][] = [];
    for (let line of cellsLines) {
        let lineResult: string[] = [];
        const values = line.split("");
        for (let cell of values) {
            const isDigit = "0123456789".split("").includes(cell);
            if (isDigit) {
                const digit = parseInt(cell);
                for (let _ of new Array(digit)) {
                    lineResult = [...lineResult, ""];
                }
            }
            else {
                lineResult = [...lineResult, cell];
            }
        }
        result = [...result, lineResult];
    }
    return result;
}

function getBoardFenPartFromPiecesValues(values: string[][]) : string {
    let result: string[] = [];
    for (let row of [0,1,2,3,4,5,6,7]) {
        let lineResult = "";
        let holes = 0;
        for (let col of [0,1,2,3,4,5,6,7]) {
            const currentValue = values[7-row][col];
            const isPiece = "PNBRQKpnbrqk".split("").includes(currentValue);
            if (isPiece) {
                if (holes > 0) {
                    lineResult += holes;
                    holes = 0;
                }
                lineResult += currentValue;
            }
            else {
                holes++;
            }
        }
        if (holes > 0) {
            lineResult += holes;
        }
        result = [...result, lineResult];
    }
    return result.join("/");
}