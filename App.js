/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import params from './src/params'
import Field from './src/components/Field'
import Flag from './src/components/Flag'
import MineField from './src/components/MineField'
import {flagsUsed ,createMinedBoard, cloneBoard, openField, hasExplosion, wonGame, showMines, invertFlag} from './src/functions'
import Cabecalho from './src/components/Header'
import LevelSelector from './src/screens/LevelSelection'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)
    if(lost) {
      showMines(board)
      Alert.alert('Perdeu')
    }
    if(won) {
      Alert.alert('Ganhou')
    }
    this.setState({board, lost, won})
  }


  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)
    if(won) {
      Alert.alert('Ganhou')
    }
    this.setState({board, won})
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

render(){
  return (
    <SafeAreaView style={styles.container}>
      <LevelSelector isVisible={this.state.showLevelSelection}
                      onLevelSelected={this.onLevelSelected}
                      onCancel={() => this.setState({showLevelSelection: false})}/>
      <Cabecalho flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
       onNewGame={() => this.setState(this.createState())}
       onFlagPress={() => this.setState({showLevelSelection: true})}/>
      <View style={styles.board} >
        <MineField board={this.state.board} 
        onOpenField={this.onOpenField}
        onSelectField={this.onSelectField}/>
      </View>
      
    </SafeAreaView>
  );
}
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board:{
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});

export default App;
