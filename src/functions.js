const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, col) => {
            return {
                row,
                col,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while(minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const colSel = parseInt(Math.random() * columns, 10)

        if(!board[rowSel][colSel].mined){
            board[rowSel][colSel].mined = true
            minesPlanted += 1
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}

const getNeighbors = (board, row, col) => {
    const neighbors = []
    const rows = [ row -1, row, row + 1]
    const cols = [ col -1, col, col + 1]

    rows.forEach(r => {
        cols.forEach(c => {
            const different = r !== row || c !== col
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if(different && validRow && validColumn){
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

const safeNeighborhood = (board, row, col) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, col).reduce(safes, true)
}

const openField = (board, row, col) =>{
    const field = board[row][col]  
    if(!field.opened){
        field.opened = true
        if(field.mined){
            field.exploded = true
        } else if (safeNeighborhood(board, row, col)){
            getNeighbors(board, row, col).forEach(n => openField(board, n.row, n.col))
        } else {
            const neighbors = getNeighbors(board, row, col)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const invertFlag = (board, row, col) => {
    const field = board[row][col]
    field.flagged = !field.flagged
}
const flagsUsed = board => fields(board).filter(field => field.flagged).length

const fields = board => [].concat(...board)
const hasExplosion = board => fields(board).filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.flagged) 
const wonGame = board => fields(board).filter(pendding).length === 0
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

export {
    createMinedBoard,
    cloneBoard,
    openField,
    hasExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}