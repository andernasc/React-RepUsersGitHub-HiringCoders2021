import React, { useState } from 'react';
import axios from 'axios';   //npm install axios  ( rodar no powershel no diretorio)
import * as S from './styled'; 
import { useHistory } from 'react-router-dom';



function App(props) {
  const history = useHistory();
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);


  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => { 
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repository) => { 
        repositoriesName.push(repository.name);
     });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories');
     })
      .catch (erro => { 
      setErro(true);
     });

  }

  return (
   <S.HomeContainer> 
    <S.Content>
      <S.Input className="usuarioInput" placeholder="USUÁRIO GITHUB" value={usuario} onChange={e => setUsuario(e.target.value)} />
      <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
   </S.Content>
   { erro ? <S.ErrorMsg>Usuário não encontrado!</S.ErrorMsg> : '' }
  
  </S.HomeContainer> 
  );
}




export default App;
