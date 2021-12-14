export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <a className='navbar-brand page-scroll' href='#page-top'>
            KGrupos
          </a>{' '}
        </div>
        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#features' className='page-scroll'>
                Funcionalidades
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                Acerca de
              </a>
            </li>
            <li>
              <a href='#team' className='page-scroll'>
                Equipo
              </a>
            </li>
            <li>
              <a href='#contact' className='page-scroll'>
                Guía
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}