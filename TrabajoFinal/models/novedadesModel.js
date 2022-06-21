var pool = require('./bd');

/*sirve para lista de novedades*/
async function getNovedades() {
    var query = 'select * from novedades order by id desc';
    var rows = await pool.query(query);
    return rows;
}

async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ? ';
    var rows = await pool.query(query, [id]);
    return rows;
}

//funcion necesaria para dar de alta una novedad// 
async function insertNovedades(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
} //cierra isert


/* traigo datos para modificar una novedad */
//dos funciones nuevas.Una nos permitirá obtener una noticia única de la base de datos utilizando el id de la misma para seleccionarla. La otra será la encargada de modificar los campos de la novedad que seleccionemos por id y que reciba como parámetro.//
async function getNovedadesById(id) {
    var query = "select * from novedades where id= ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

/*update */
async function modificarNovedadesById(obj, id) {
    try {
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
} /*cierra update*/ 

async function buscarNovedades(busqueda) {
    var query = "select * from novedades where titulo like ? OR subtitulo like ? OR cuerpo like ? ";
    var rows = await pool.query(query, ['%' + busqueda + '%','%' + busqueda + '%','%' + busqueda + '%']);
    return rows;
}

module.exports = { getNovedades, deleteNovedadesById, insertNovedades, getNovedadesById, modificarNovedadesById, buscarNovedades }