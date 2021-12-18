export const Header = (props) => {
    return (
      <header id='header'>
        <div className='intro'>
          <div className='overlay'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-8 col-md-offset-2 intro-text'>
                  <h1>
                    KGrupos
                    <span></span>
                  </h1>
                  <p>Una herramienta para la conformación de grupos, ahorramos su tiempo,
                      lo hacemos con-ciencia.
                  </p>
                  <a
                    href='/data'
                    className='btn btn-custom btn-lg page-scroll'
                  >
                    Comenzar
                  </a>{' '}
                  <a
                    href='#features'
                    className='btn btn-custom btn-lg page-scroll'
                  >
                    Saber más
                  </a>{' '}
                  <a
                    href='/guia'
                    className='btn btn-custom btn-lg page-scroll'
                  >
                    Guía
                  </a>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }