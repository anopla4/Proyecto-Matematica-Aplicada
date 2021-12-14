export const Team = (props) => {
    return (
      <div id='team' className='text-center'>
        <div className='container'>
          <div className='col-md-8 col-md-offset-2 section-title'>
            <h2>Conoce al equipo</h2>
            <p>
                Somos estudiantes de 3er año de Ciencias de la Computación de la Universidad de La Habana
            </p>
          </div>
          <div id='row2' className='row'>
            <div id='javier' className='col-md-3 col-sm-6 team'>
              <div className='thumbnail'>
                {' '}
                  <img src="img/team/jlopetegui98.jpg" alt='...' className='team-img' />
                  <div className='caption'>
                    <h4>Javier A. Lopetegui</h4>
                      <a href="https://github.com/jlopetegui98">jlopetegui98</a>
                  </div>
              </div>
            </div>
            <div id='ana' className='col-md-3 col-sm-6 team'>
              <div className='thumbnail'>
                {' '}
                  <img src="img/team/anoppa.jpg" alt='...' className='team-img' />
                  <div className='caption'>
                    <h4 >Ana P. Agüelles</h4>
                      <a href="https://github.com/anoppa">anoppa</a>
                  </div>
                </div>
            </div>
            <div id='abel' className='col-md-3 col-sm-6 team'>
              <div className='thumbnail'>
                {' '}
                  <img src="img/team/abel1927.jpg" alt='...' className='team-img' />
                  <div className='caption'>
                    <h4>Abel Molina</h4>
                      <a href="https://github.com/abel1927">abel1927</a>
                  </div>
                </div>
            </div>
            <div id='alejandro' className='col-md-3 col-sm-6 team'>
              <div className='thumbnail'>
                {' '}
                  <img src="img/team/alejbv.jpg" alt='...' className='team-img' />
                  <div className='caption'>
                    <h4>Alejandro Beltrán</h4>
                      <a href="https://github.com/alejbv">alejbv</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }