import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './train.js';
import * as serviceWorker from './serviceWorker';
serviceWorker.unregister();

function Square(props){
  return (
    <button
      className={`square ${props.isLight ? 'cell__light' : ''}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, isLight = false) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        isLight={isLight}
      />
    );
  }

  render() {
    return (
      <div>
        {
          Array(3).fill(0).map((row, i) => {
            return (
              <div className="board-row" key={i}>
                {
                  Array(3).fill(0).map((col, j) => {
                    return (
                      this.renderSquare(i * 3 + j, this.props.lightCells.indexOf(i * 3 + j) !== -1)
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      isAsc: true
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        col: (i % 3) + 1,
        row: Math.floor(i / 3) + 1
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  handleIsAsc(){
    this.setState({
      isAsc: !this.state.isAsc
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const settlement = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}(${step.col},${step.row})` : `Go to game start`
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? 'text__bold' : ''}
          >
            {desc}
          </button>
        </li>
      );
    })

    let status;

    if(settlement){
      if(settlement.isDraw){
        status = `Draw game, click "Go to game start"`;
      }else{
        status = `Winner is ${settlement.winner}`;
      }
    }else{
      status = `Next Player is ${this.state.xIsNext? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            lightCells={settlement ? settlement.winLine : []}
          />
        </div>
        <div className="game-info">
          <div>
            {status}
          </div>
          <div>
            <button
              onClick = {() => this.handleIsAsc()}
            >
            {this.state.isAsc ? "↑desc↑" : "↓asc↓"}
            </button>
          </div>
          <ol>
            {this.state.isAsc ? moves : moves.reverse()}
          </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winLine: [a, b, c],
        isDraw: false
      }
    }
  }

  if(squares.filter((square) => !square).length === 0){
    return {
      winner: null,
      winLine: [],
      isDraw: true
    }
  }

  return null;
}