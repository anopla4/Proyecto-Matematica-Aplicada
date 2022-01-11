import React, { Component } from "react";
import { Figure } from "react-bootstrap";
import HomeImg from "../../static/home.png";
import Home1Img from "../../static/home1.png";
import Home2Img from "../../static/home2.png";
import Home3Img from "../../static/home3.png";
import LoadDataImg from "../../static/load_data.png";
import DataImg from "../../static/data.png";
import AttributesTypeImg from "../../static/attributes_type.png";
import ChangeAttributesTypeImg from "../../static/change_attributes_type.png";
import SubsetImg from "../../static/subset.png";
import NumberOfGroupsImg from "../../static/number_of_groups.png";
import CreateSubsetImg from "../../static/create_subset.png";
import SubsetGroupsImg from "../../static/subset_groups.png";
import ImportantAttributesImg from "../../static/important_attributes.png";
import AttributesImportanceImg from "../../static/select_attributes_importance.png";
import RestrictionsImg from "../../static/restrictions.png";
import AssignStudentsImg from "../../static/assign_students.png";
import AdvancedOptionsImg from "../../static/advanced_options.png";
import MethodImg from "../../static/method.png";
import LoadGroupsImg from "../../static/loading_groups.png";
import AttributesGroupImg from "../../static/attributes_groups.png";
import NameLastnameImg from "../../static/name_lastname.png";
import DownloadImg from "../../static/select_file_type.png";
import SidebarImg from "../../static/sidebar.png";
import SidebarButtonImg from "../../static/sidebar_button.png";
import StatisticsImg from "../../static/statistics.png";
import AttributesStatisticsImg from "../../static/attributes_statistics.png";
import StatisticsPerGroupImg from "../../static/statistics_per_group.png";
import GoBackImg from "../../static/go_back.png";

class Guide extends Component {
  render() {
    return (
      <div style={{ margin: "5%" }}>
        <b>KGrupos</b> es una aplicación que permite la creación de grupos a
        partir de un conjunto de datos, teniendo en cuenta las propiedades
        presentes en estos datos y los diferentes grados de importancia que se
        le asigne a cada una. Además, permite particionar dicho conjunto y
        realizar separaciones en grupos teniendo en cuenta diferentes
        propiedades para cada partición. Al navegar hacia la aplicación se
        mostrará la vista:
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={HomeImg}
          />
          <Figure.Caption>Página de inicio.</Figure.Caption>
        </Figure>
        <p>
          En la barra situada en la parte superior existen dos links:{" "}
          <i>Comenzar</i> y <i>Guía</i>. <i>Comenzar</i> redirige a la vista en
          la que se cargan los datos a partir de los cuales se conformarán los
          grupos y <i>Guía</i> muestra esta vista.
        </p>
        <p>
          Además existen tres botones: Comenzar, Saber Más, Guía. El primero y
          el último de estos navegan a las vistas explicadas anteriormente. El
          botón Saber Más sitúa al usuario en una parte más abajo de esta página
          donde se da una breve explicación de la herramienta que se presenta:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={Home1Img}
          />
          <Figure.Caption>Página de inicio: Acerca de.</Figure.Caption>
        </Figure>
        <p>
          En esta misma página, un poco más abajo, pueden verse las secciones{" "}
          <i>Características</i> y <i>Conoce al equipo</i>.
        </p>
        <p>
          En <i>Características</i> se exponen algunas de las propiedades y
          funcionalidades de la aplicación.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={Home2Img}
          />
          <Figure.Caption>
            Página de inicio: Características de la aplicación.
          </Figure.Caption>
        </Figure>
        <p>
          En <i>Conoce al equipo</i> se presentan los integrantes del grupo que
          desarrolló esta herramienta.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={Home3Img}
          />
          <Figure.Caption>Página de inicio: Conoce al equipo.</Figure.Caption>
        </Figure>
        <p>
          La navegación a través del botón <i>Comenzar</i> lleva al usuario a la
          vista:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={LoadDataImg}
          />
          <Figure.Caption>Cargar datos.</Figure.Caption>
        </Figure>
        <p>
          Al hacer clic en el botón <i>Choose file</i> se muestra una ventana
          que permite navegar a la ubicación de los datos que se quieren cargar.
          Al terminar se dará clic en <i>Aceptar</i> y estos serán mostrados en
          una tabla:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={DataImg}
          />
          <Figure.Caption>Datos cargados.</Figure.Caption>
        </Figure>
        <p>
          Abajo, en esta misma página, se puede cambiar el tipo que se les
          asigna por defecto a los atributos según el tipo de datos que
          reconozca la computadora (<i>string</i> o número). Existe un cuadro de
          selección para elegir los atributos a los que se les quiere cambiar el
          tipo:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={AttributesTypeImg}
          />
          <Figure.Caption>
            Elegir atributos para cambiarle el tipo.
          </Figure.Caption>
        </Figure>
        <p>
          En la siguiente imagen se seleccionaron atributos para modificar sus
          tipos: <i>Nombre</i> y <i>Edad</i>. Por defecto el primero de estos
          atributos mencionados tenía como tipo <i>Nominal</i> y el segundo,{" "}
          <i>Numérico</i>.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={ChangeAttributesTypeImg}
          />
          <Figure.Caption>Cambiar tipo de atributos.</Figure.Caption>
        </Figure>
        <p>
          El botón <i>Continuar</i> de la figura anterior permite avanzar hacia
          una vista en la que se harán las configuraciones necesarias para la
          conformación de grupos:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={SubsetImg}
          />
          <Figure.Caption>
            Partición y configuración de los datos.
          </Figure.Caption>
        </Figure>
        <p>
          Aquí se podrá particionar los datos (subconjuntos) y para cada una de
          estas particiones definir los atributos relevantes, así como las
          restricciones que deberán cumplir y la cantidad de grupos que
          incluirán.
        </p>
        <p>
          En la siguiente figura se señala con borde azul el cuadro en el que se
          selecciona la cantidad total de grupos que queremos que se conformen.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={NumberOfGroupsImg}
          />
          <Figure.Caption>Número total de grupos.</Figure.Caption>
        </Figure>
        <p>
          Al hacer clic en el botón verde <i>Crear subconjunto</i> se muestra el
          siguiente cuadro:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={CreateSubsetImg}
          />
          <Figure.Caption>Crear subconjunto.</Figure.Caption>
        </Figure>
        <p>
          La cantidad de grupos que se quiere que tenga el subconjunto que se
          está creando se podrá introducir en el cuadro señalado con borde azul
          en la siguiente imagen (este campo es requerido):
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={SubsetGroupsImg}
          />
          <Figure.Caption>Crear subconjunto.</Figure.Caption>
        </Figure>
        <p>
          Es necesario seleccionar también los atributos que se considerarán
          relevantes para la creación de grupos en este subconjunto en el cuadro
          de selección que se muestra:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={ImportantAttributesImg}
          />
          <Figure.Caption>Seleccionar atributos importantes.</Figure.Caption>
        </Figure>
        <p>
          Cuando se seleccionan dichos atributos relevantes se puede modificar
          la importancia (el peso) que estos tendrán (por defecto es 1).
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={AttributesImportanceImg}
          />
          <Figure.Caption>
            Seleccionar importancia de cada atributo.
          </Figure.Caption>
        </Figure>
        <p>
          En esta configuración se puede especificar restricciones sobre los
          valores de los atributos de los estudiantes que serán incluidos. Esto
          es opcional, en caso de que no se imponga ninguna restricción, todos
          los estudiantes que queden sin asignar serán incluidos en este
          subconjunto. En la siguiente figura se seleccionaron los atributos
          <i>Edad</i> y <i>Provincia</i> y se especifica el rango del primero y
          los valores del segundo (son de tipos Numérico y Nominal,
          respectivamente).
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={RestrictionsImg}
          />
          <Figure.Caption>Agregar restricciones al subconjunto.</Figure.Caption>
        </Figure>
        <p>
          Los estudiantes pueden ser agregados manualmente a algún subconjunto.
          En la siguiente figura aparece con borde azul el cuadro donde se debe
          introducir el subconjunto al que se desea añadir los estudiantes que
          se hayan seleccionado en la tabla mediante el <i>checkbox</i> que
          aparece en la primera columna de la tabla. Para asignar estos
          estudiantes se deberá dar clic en el botón gris{" "}
          <i>Asignar estudiantes al subconjunto</i>.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={AssignStudentsImg}
          />
          <Figure.Caption>Asignar estudiantes a un subconjunto.</Figure.Caption>
        </Figure>
        <p>
          El <i>tooltip</i> negro <i>Opciones avanzadas</i> para indica al
          usuario que al presionar dicho botón podrá configurar elementos más
          especializados.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={AdvancedOptionsImg}
          />
          <Figure.Caption>
            Botón para seleccionar opciones avanzadas.
          </Figure.Caption>
        </Figure>
        <p>
          En este caso al hacer clic en dicho botón se mostrará un cuadro que
          permitirá elegir la solución implementada que se quiera utilizar para
          la generación de grupos.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={MethodImg}
          />
          <Figure.Caption>
            Seleccionar método que se quiere usar para la generación de grupos.
          </Figure.Caption>
        </Figure>
        <p>
          Cuando se hayan hecho todas las configuraciones, el botón azul{" "}
          <i>Generar grupos</i> de la permitirá avanzar hacia la vista donde se
          mostrarán los grupos conformados y los datos de los estudiantes en
          cada uno de ellos. Mientras se obtiene respuesta del servidor se
          mostrará la vista:
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={LoadGroupsImg}
          />
          <Figure.Caption>Cargando grupos creados.</Figure.Caption>
        </Figure>
        <p>
          En la siguiente imagen se muestran los grupos creados y por defecto se
          muestra por cada estudiante el valor correspondiente al primer
          atributo del conjunto de datos. En el cuadro de selección que aparece
          desplegado se pueden seleccionar otros atributos para visualizar.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={AttributesGroupImg}
          />
          <Figure.Caption>Seleccionar atributos a visualizar.</Figure.Caption>
        </Figure>
        <p>
          En la imagen siguiente se muestran los datos correspondientes a los
          atributos <i>Nombre</i> y <i>Apellidos</i>.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={NameLastnameImg}
          />
          <Figure.Caption>
            Selección de los atributos
            <i>Nombre</i> y <i>Apellidos</i>.
          </Figure.Caption>
        </Figure>
        <p>
          La información relacionada con los subconjuntos, los grupos y los
          estudiantes en cada uno de ellos, puede ser exportado a un archivo.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={DownloadImg}
          />
          <Figure.Caption>
            Selección de los atributos
            <i>Nombre</i> y <i>Apellidos</i>.
          </Figure.Caption>
        </Figure>
        <p>
          En la imagen anterior se muestra el cuadro de selección donde se puede
          elegir el tipo de archivo: <i>csv</i> o <i>json</i>. El botón{" "}
          <i>Descargar</i> generará dicho archivo.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={SidebarButtonImg}
          />
          <Figure.Caption>
            Botón para desplegar la barra lateral.
          </Figure.Caption>
        </Figure>
        <p>
          Al hacer clic en el botón señalado en rojo de la imagen anterior se
          mostrará una barra lateral para consultar las estadísticas de cada
          subconjunto.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={SidebarImg}
          />
          <Figure.Caption>
            Barra lateral para consultar estadísticas.
          </Figure.Caption>
        </Figure>
        <p>
          En la siguiente imagen se muestran las estadísticas del Subconjunto 1.
          En la parte izquierda se muestra un resumen en tablas correspondientes
          a cada atributo de los valores de cada uno de estos y la cantidad de
          estudiantes en cada grupo que tienen dicho valor. En la parte derecha
          se muestran gráficos de barra por cada atributo en cuyo eje x se
          encuentran los valores que tome el atributo correspondiente y en el
          eje y las frecuencias. Las barras del mismo color representan al mismo
          grupo y cada una de estas tiene la altura correspondiente a la
          frecuencia del valor en el eje x en el grupo que esté representado por
          ese color.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={StatisticsImg}
          />
          <Figure.Caption>Estadísticas.</Figure.Caption>
        </Figure>
        <p>
          Los atributos de los que se quiere ver las tablas y los gráficos se
          seleccionan en el cuadro de selección que aparece desplegado en la
          siguiente figura. En este se muestran solo los atributos que se
          seleccionaron como relevantes cuando se creó el subconjunto.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={AttributesStatisticsImg}
          />
          <Figure.Caption>
            Seleccionar atributos para consultar estadísticas.
          </Figure.Caption>
        </Figure>
        <p>
          Al hacer clic en el botón azul <i>Estadísticas por grupo</i> se
          mostrará un cuadro con un resumen de las cantidades de valores de los
          atributos incluidas en cada grupo. En este caso se muestran las
          estadísticas relacionadas con los atributos <i>Provincia</i> y
          <i>Municipio</i>.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={StatisticsPerGroupImg}
          />
          <Figure.Caption>Estadísticas por grupos.</Figure.Caption>
        </Figure>
        <p>
          El botón gris <i>Volver</i> de la siguiente imagen permite regresar a
          la vista inicial donde se muestran los grupos creados.
        </p>
        <Figure>
          <Figure.Image
            style={{ width: "60vw", height: "100%" }}
            src={GoBackImg}
          />
          <Figure.Caption>
            Botón para volver a la información por grupos.
          </Figure.Caption>
        </Figure>
      </div>
    );
  }
}

export default Guide;
