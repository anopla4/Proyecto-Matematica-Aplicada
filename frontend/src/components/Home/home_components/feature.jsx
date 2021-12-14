export const Features = (props) => {
    return (
      <div id='features' className='text-center'>
        <div className='container'>
          <div className='col-md-10 col-md-offset-1 section-title'>
            <h2>Características</h2>
          </div>
          <div className='row'>
              <div id="Simple" className='col-xs-6 col-md-3'>
                <i className="fa fa-magic"></i>
                  <h3>Simple</h3>
                  <p>Tan simple como desees. 
                    En pocos clics tu solución</p>
              </div>
              <div id="Data1" className='col-xs-6 col-md-3'>
                <i  className="fa fa-cloud-upload"></i>
                  <h3>Múltiple fuente</h3>
                  <p>Puede proporcionar sus datos en varios formatos de los más utilizados:
                  csv, xls, xlsx, xlsm, xlsb, odf, json.
                  </p>
              </div>
              <div id="ia2" className='col-xs-6 col-md-3'>
                <i className="fa fa-users"></i>
                  <h3>Clousters</h3>
                  <p>Utilizamos algoritmos de cloustering para ofrecele la mejor solución</p>
              </div>
              
              <div id="statadistic" className='col-xs-6 col-md-3'>
                <i className="fa fa-bar-chart"></i>
                  <h3>Estadísticas</h3>
                  <p>Va a obtener un análisis estadístico de sus grupos</p>
              </div>
          </div>
        </div>
      </div>
    )
  }