
const {pool} = require('../database');


// RETOS-1

const getAlumnosOrId = async (req, res) => {
    try {
        let sql;
        if (req.query.id == null)
            sql = 'SELECT * FROM myschool.students';
        else
            sql = `SELECT * FROM myschool.students WHERE student_id=${req.query.id}`;

        let [result] = await pool.query(sql);

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send(`El alumno con el ID ${req.query.id} no existe en la base de datos.`);
        }
    } catch (err) {
        console.log(err);
    }
}


const createAlumno = async (req, res) => {
    try {
        console.log(req.body);

        const first_name = pool.escape(req.body.first_name);
        const last_name = pool.escape(req.body.last_name);
        // utilizo este código de pool.escape ya que al añadir los string de nombre y apellido en postman me salta un error de que no son válidos esos campos. Los confunde con el nombre la columna.

        let sql = `INSERT INTO myschool.students (student_id, first_name, last_name, group_id, year_income) VALUES (${req.body.student_id}, ${first_name}, ${last_name}, ${req.body.group_id}, ${req.body.year_income})`;

        let [result] = await pool.query(sql);
        console.log(result);
        // res.send('Alumno creado correctamente.');
        res.send(result);
    } 
    catch (err) {
        console.log(err);
        res.status(500).send('Error al crear el alumno.');
    }
}

// ESTE UPDATE FUNCIONA PERO HAY QUE METER TODOS LOS CAMPOS, LO DEJO POR SI ES NECESARIO
// const updateAlumno = async (req, res) => {
//     try {
//         // Verifica si los datos del alumno se proporcionaron correctamente
//         const { student_id, first_name, last_name, group_id, year_income } = req.body;
//         if (!student_id || !first_name || !last_name || !group_id || !year_income) {
//             return res.status(400).send('Por favor, proporciona todos los datos del alumno.');
//         }

//         // Crea la consulta SQL para actualizar los datos del alumno
//         const sql = `
//             UPDATE myschool.students
//             SET first_name = '${first_name}',
//                 last_name = '${last_name}',
//                 group_id = ${group_id},
//                 year_income = ${year_income}
//             WHERE student_id =${req.query.id};
//         `;

//         await pool.query(sql);

//         res.send('Datos del alumno actualizados correctamente.');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error al actualizar los datos del alumno.');
//     }
// };



const updateAlumno = async (req, res) => {
    try {
        // compruebo si se ha metido algún id por parámetro
        const student_id = req.query.id;
        if (!student_id) {
            return res.status(400).send('Por favor, introduce el ID del alumno.');
        }

        // Crea la consulta SQL para actualizar los datos del alumno con el ID específico
        let sql = 'UPDATE myschool.students SET';

        // Verifico que campos se piden para modificar en el body de postman
        if (req.body.first_name) {
            sql += ` first_name = '${req.body.first_name}',`;
        }
        if (req.body.last_name) {
            sql += ` last_name = '${req.body.last_name}',`;
        }
        if (req.body.group_id) {
            sql += ` group_id = ${req.body.group_id},`;
        }
        if (req.body.year_income) {
            sql += ` year_income = ${req.body.year_income},`;
        }

        // Elimina la coma final
        sql = sql.slice(0, -1);

        // Agrego el WHERE para el id pedido por parametro para modificar
        sql += ` WHERE student_id = ${req.query.id}`;
        

        // Actualizo alumno: Lo comento y uso el de prueba para que funcione en angular
        // await pool.query(sql);
        // res.send('Datos del alumno actualizados correctamente.');

        // versión para Angular:
        let [result] = await pool.query(sql);
        console.log(result);
        // res.send('Alumno actualizado correctamente.');
        res.send(result);


    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar los datos del alumno.');
    }
};



const deleteAlumno = async (req, res) => {
    try {
        // compruebo si se ha metido algún id por parámetro
        const student_id = req.query.id;
        if (!student_id) {
            return res.status(400).send('Por favor, introduce el ID del alumno a eliminar.');
        }

        // compruebo si existe algún alumno con ese id
        const existeAlumnoSql = `SELECT COUNT(*) AS count FROM myschool.students WHERE student_id = ${req.query.id}`;
        const [existeAlumnoResult] = await pool.query(existeAlumnoSql);

        if (existeAlumnoResult[0].count === 0) {
            return res.send('El alumno con ese ID no existe.');
        }


        // elimino alumno con el id pasado por parámetro: Lo comento y uso el de prueba para que funcione en angular
        // const eliminarAlumno = `DELETE FROM myschool.students WHERE student_id = ${req.query.id}`;
        // await pool.query(eliminarAlumno);
        // res.send('El alumno se ha eliminado correctamente.');
        
        // versión para Angular:
        let eliminarAlumno = `DELETE FROM myschool.students WHERE student_id = ${req.query.id}`;
        let [result] = await pool.query(eliminarAlumno);
        console.log(result);
        // res.send('Alumno eliminado correctamente.');
        res.send(result);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el alumno.');
    }
};



// RETOS-2

const notaMediaById = async (req, res) => {
    try {
        // compruebo si se ha metido algún id por parámetro
        const student_id = req.query.id;
        if (!student_id) {
            return res.status(400).send('Por favor, proporciona el ID del alumno.');
        }

        // consulto la nota media del alumno con el ID indicado
        const sql = `SELECT AVG(mark) AS nota_media FROM myschool.marks WHERE student_id = ${student_id}`;
        const [result] = await pool.query(sql);

        if (result.length === 0 || result[0].nota_media === null) {
            return res.send('El alumno con ese ID no tiene notas registradas.');
        }

        // Dejo comentadas estas dos lines para que funcione en angular, eso solo sería para postman:
        // const notaMediaRedondeada = Math.round(result[0].nota_media * 100) / 100;
        // res.send(`La nota media del alumno con ID ${student_id} es: ${notaMediaRedondeada}`);

        // Pongo esta opción para que me mande la nota a angular:
        res.send(result);
        // en el caso de querer verlo solo en postman, descomentar las lineas 168 y 169
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la nota media del alumno.');
    }
};



const allAsignaturasOrByAlumnoId = async (req, res) => {
    try {
        // Compruebo si se ha proporcionado un ID de alumno
        const student_id = req.query.id;
        if (!student_id) {
            // Si no se proporciona un ID, obtengo los nombres y apellidos de todos los alumnos, y sus asignaturas
            const sqlAllStudents = 'SELECT students.student_id AS id, title, first_name, last_name FROM myschool.students INNER JOIN myschool.marks ON (students.student_id = marks.student_id) INNER JOIN myschool.subjects ON (marks.subject_id = subjects.subject_id)';
            const [allStudents] = await pool.query(sqlAllStudents);
            return res.json(allStudents);
        }

        // Consulto las asignaturas del alumno con el ID indicado
        const sqlAsignaturas = `
            SELECT title FROM myschool.students
            INNER JOIN myschool.marks ON (students.student_id = marks.student_id)
            INNER JOIN myschool.subjects ON (marks.subject_id = subjects.subject_id)
            WHERE students.student_id = ${student_id}
        `;

        const [result] = await pool.query(sqlAsignaturas);

        if (result.length === 0) {
            return res.send('El alumno con ese ID no está apuntado a ninguna asignatura o no existe.');
        }

        // Obtengo los nombres de las asignaturas. Lo hago con map para obtenerlo como array de strings
        // const asignaturas = result.map(row => row.title); Así funcionaría para postman, pero lo dejo comentado para mandar solo el result y que funcionen en Angular
        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las asignaturas del alumno.');
    }
};



const allAsignaturasOrByProfesorId = async (req, res) => {
    try {
        // Compruebo si se ha proporcionado un ID de profesor
        const teacher_id = req.query.id;
        if (!teacher_id) {
            // Si no se proporciona un ID, obtengo los nombres y apellidos de todos los profesores, y sus asignaturas
            const sqlAllTeachers = 'SELECT teachers.teacher_id AS id, first_name, last_name, title FROM myschool.teachers INNER JOIN myschool.subject_teacher ON (subject_teacher.teacher_id = teachers.teacher_id) INNER JOIN myschool.subjects ON (subjects.subject_id = subject_teacher.subject_id)';
            const [allTeachers] = await pool.query(sqlAllTeachers);
            return res.json(allTeachers);
        }

        // Consulto las asignaturas del profesor con el ID indicado
        const sqlAsignaturas = `
            SELECT title FROM myschool.teachers
            INNER JOIN myschool.subject_teacher ON (teachers.teacher_id = subject_teacher.teacher_id)
            INNER JOIN myschool.subjects ON (subject_teacher.subject_id = subjects.subject_id)
            WHERE teachers.teacher_id = ${teacher_id}
        `;

        const [result] = await pool.query(sqlAsignaturas);

        if (result.length === 0) {
            return res.send('El profesor con ese ID no imparte ninguna asignatura o no existe.');
        }

        // Obtengo los nombres de las asignaturas. Lo hago con map para obtenerlo como array de strings
        // const asignaturas = result.map(row => row.title); Así funcionaría para postman, pero lo dejo comentado para mandar solo el result y que funcionen en Angular
        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las asignaturas del profesor.');
    }
};



module.exports = {getAlumnosOrId, createAlumno, updateAlumno, deleteAlumno, notaMediaById, 
    allAsignaturasOrByAlumnoId, allAsignaturasOrByProfesorId}