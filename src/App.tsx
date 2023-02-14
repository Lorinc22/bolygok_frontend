
import './App.css';
import { Component } from 'react';



interface State{
  bolygok: Bolygo[];
  nev: string;
  nev2: string;
  atmero: number
}

interface Bolygo{
  id: number;
  nev: string;
  nev2: string;
  atmero: number;
}

class App extends Component<{}, State>{

  constructor(props: {}){
    super(props);

    this.state = {
      nev: "",
      nev2: "",
      atmero: 0,
      bolygok: [],
    }
  }


  async loadBolygok() {
    let respone = await fetch('http://localhost:3000/bolygo');
    let data = await respone.json() as Bolygo[];
    this.setState({
      bolygok: data
    })
  }

  componentDidMount() {
    this.loadBolygok();
  }

  handleUpload = async () => {
    const { nev, nev2, atmero } = this.state;
    if(nev.trim() === '' || nev2.trim() === '' || atmero <1){
      return;
    }

    const adat = {
      nev: nev,
      nev2: nev2,
      atmero: atmero,
    }

    let response = await fetch('http://localhost:3000/bolygo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({ 
      nev: '',
      nev2: '',
      atmero: 0,
    })

    await this.loadBolygok();
  };

  async handleDelete(id: number) {
    let respone = await fetch('http://localhost:3000/bolygo/ '+ id,{
      method: 'DELETE',
    }
    
    
    )
    await this.loadBolygok();
  }


render() {
  return <div className='div'>
    <h2>Bolygok</h2>
    Név: <input type="text" value={this.state.nev} onChange={e => this.setState({ nev: e.currentTarget.value})}/><br />
    Név2: <input type="text" value={this.state.nev2} onChange={e => this.setState({ nev2: e.currentTarget.value})} /><br />
    Atmero: <input type="number" value={this.state.atmero} onChange={e => this.setState({ atmero: parseInt(e.currentTarget.value)})}/><br />
    <button onClick={this.handleUpload}>Hozzáad</button> <br />
   
   
  </div>
}
}
export default App;