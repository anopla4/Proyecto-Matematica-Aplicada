export const About = (props) => {
    return (
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/almamater.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>Acerca de</h2>
                <p>KGrupos es una herramienta de código abierto desarollada para la conformación óptima de grupos 
                    como parte de una problemática planteada en el grupo de Matemática Aplicada de la Universidad de La 
                    Habana. La misma, es extensible a cualquier ámbito donde se cuente con datos, atributos, y 
                    se requiera una organización basada en preferencias. La página trabaja en conjunción con una 
                    API también desarrollada por este equipo.
                </p>
                <spam></spam>
                <h3>
                  <a href="https://github.com/anoppa/Proyecto-Matematica-Aplicada">Código fuente</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };