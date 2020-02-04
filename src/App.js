import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {


    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 50;
      const key = '15131649-335714cc04f7d2a870ef5472e';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      console.log(resultado);

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultarAPI();


  }, [busqueda, paginaactual])

  //Defenir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }
  // Definir la pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <div className="lead text-center">

          <Formulario
            guardarBusqueda={guardarBusqueda}
          />
        </div>


      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />

        {(paginaactual === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>
        )}

        {(paginaactual === totalpaginas ? null :
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
