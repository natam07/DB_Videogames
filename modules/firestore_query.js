/*Hace querys genéticas*/
/*Where Query:
    - 1 solo filtro
    - Consulta básica
    - Recupera todos los documentos
*Ordered Query
    - Aplica Order by (Ascendente y descendiente)
    - Direcciones
*Limited query
    - n registros
*/
import { db } from './firebase_init.js';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAt,
    endAt,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class FirestoreQuery {
    constructor(collectionName) {
        this.collectionRef = collection(db, collectionName);
    }

    async whereQuery(column, comparison, value) {
        const q = query(this.collectionRef, where(column, comparison, value));
        return this.runQuery(q);
    }

    async orderedQuery(column, direction = 'asc') {
        const q = query(this.collectionRef, orderBy(column, direction));
        return this.runQuery(q);
    }

    async limitedQuery(maxResults = 5) {
        const q = query(this.collectionRef, limit(maxResults));
        return this.runQuery(q);
    }

    /*
    Recibe: 
    - Una lista de filtros. 
    - El orden.
    - Un límite.
    */
    async combinedQuery(filters = [], order = null, maxResults = null) {
        /*Crea una lista de consultas. Almacena todas las consultas para poder anidarlas, consuñtarlas y ordenarlas. 
        Estos son los filtros*/
        let constraints = filters.map(f => where(f.column, f.comparison, f.value));

        /*El orden en que los quiero */
        if (order) {
            constraints.push(orderBy(order.column, order.direction || 'asc'));
        }

        /*El maximo de resultados que quiero */
        if (maxResults) {
            constraints.push(limit(maxResults));
        }

        const q = query(this.collectionRef, ...constraints);
        return this.runQuery(q);
    }

    async prefixSearch(column, prefix) {
        const endText = prefix + '\uf8ff';
        const q = query(
            this.collectionRef,
            orderBy(column),
            startAt(prefix),
            endAt(endText)
        );
        return this.runQuery(q);
    }

    /*Busca todos los documentos que cumplan con la condición dada. Si hay algo, arroja algo, sino avisa que no hay documentos.*/
    async runQuery(q) {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        const results = [];
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            results.push({ id: doc.id, ...doc.data() });
        });
        return results;
    }
}